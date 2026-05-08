from __future__ import annotations

import asyncio
import datetime
import functools
import logging
import random
import time
from collections import deque
from enum import Enum
from typing import Optional

import discord
import yt_dlp
from discord import app_commands
from discord.ext import commands

log = logging.getLogger("music-bot.cog")

# ── yt-dlp options ──────────────────────────────────────────────────────────

YTDL_OPTIONS = {
    "format": "bestaudio/best",
    "noplaylist": True,
    "nocheckcertificate": True,
    "ignoreerrors": False,
    "quiet": True,
    "no_warnings": True,
    "default_search": "ytsearch",
    "source_address": "0.0.0.0",
    "extract_flat": False,
}

FFMPEG_OPTIONS = {
    "before_options": "-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5",
    "options": "-vn",
}

ytdl = yt_dlp.YoutubeDL(YTDL_OPTIONS)


# ── Data classes ────────────────────────────────────────────────────────────

class LoopMode(Enum):
    OFF = 0
    SINGLE = 1
    QUEUE = 2


class Song:
    """Represents a playable song."""

    def __init__(self, source_url: str, title: str, url: str,
                 duration: int, thumbnail: str, requester: discord.Member):
        self.source_url = source_url
        self.title = title
        self.url = url
        self.duration = duration
        self.thumbnail = thumbnail
        self.requester = requester
        self.started_at: Optional[float] = None

    @classmethod
    async def from_query(cls, query: str, requester: discord.Member, loop: asyncio.AbstractEventLoop) -> "Song":
        partial = functools.partial(ytdl.extract_info, query, download=False)
        data = await loop.run_in_executor(None, partial)

        if data is None:
            raise ValueError(f"Could not extract info for: {query}")

        if "entries" in data:
            entries = data["entries"]
            if not entries:
                raise ValueError(f"No results found for: {query}")
            data = entries[0]

        if "url" not in data:
            raise ValueError(f"No playable URL found for: {query}")

        return cls(
            source_url=data["url"],
            title=data.get("title", "Unknown"),
            url=data.get("webpage_url", ""),
            duration=data.get("duration", 0),
            thumbnail=data.get("thumbnail", ""),
            requester=requester,
        )

    async def refresh_source(self, loop: asyncio.AbstractEventLoop) -> None:
        """Re-extract the stream URL to avoid expiration."""
        try:
            partial = functools.partial(ytdl.extract_info, self.url or self.title, download=False)
            data = await loop.run_in_executor(None, partial)
            if data is None:
                return
            if "entries" in data:
                entries = data["entries"]
                if not entries:
                    return
                data = entries[0]
            if "url" in data:
                self.source_url = data["url"]
        except Exception as e:
            log.warning("Failed to refresh source URL for %s: %s", self.title, e)

    @property
    def duration_str(self) -> str:
        if not self.duration:
            return "LIVE"
        return str(datetime.timedelta(seconds=self.duration))

    def create_source(self, volume: float = 0.5) -> discord.PCMVolumeTransformer:
        source = discord.FFmpegPCMAudio(self.source_url, **FFMPEG_OPTIONS)
        return discord.PCMVolumeTransformer(source, volume=volume)

    def embed(self, title_prefix: str = "Now Playing") -> discord.Embed:
        em = discord.Embed(
            title=f"{title_prefix}",
            description=f"[**{self.title}**]({self.url})",
            color=discord.Color.from_rgb(255, 50, 50),
        )
        em.add_field(name="Duration", value=self.duration_str, inline=True)
        em.add_field(name="Requested by", value=self.requester.mention, inline=True)
        if self.thumbnail:
            em.set_thumbnail(url=self.thumbnail)
        em.set_footer(text="Music Bot", icon_url="https://cdn-icons-png.flaticon.com/512/727/727269.png")
        return em


# ── Player controls view ───────────────────────────────────────────────────

class PlayerView(discord.ui.View):
    """Interactive player buttons."""

    def __init__(self, cog: "Music"):
        super().__init__(timeout=None)
        self.cog = cog

    @discord.ui.button(emoji="⏸️", style=discord.ButtonStyle.secondary, custom_id="music:pause")
    async def pause_resume(self, interaction: discord.Interaction, button: discord.ui.Button):
        guild_player = self.cog.players.get(interaction.guild_id)
        if not guild_player or not interaction.guild.voice_client:
            return await interaction.response.send_message("Nothing is playing.", ephemeral=True)

        vc: discord.VoiceClient = interaction.guild.voice_client
        if vc.is_paused():
            vc.resume()
            button.emoji = "⏸️"
            await interaction.response.edit_message(view=self)
        elif vc.is_playing():
            vc.pause()
            button.emoji = "▶️"
            await interaction.response.edit_message(view=self)
        else:
            await interaction.response.send_message("Nothing is playing.", ephemeral=True)

    @discord.ui.button(emoji="⏭️", style=discord.ButtonStyle.secondary, custom_id="music:skip")
    async def skip(self, interaction: discord.Interaction, button: discord.ui.Button):
        guild_player = self.cog.players.get(interaction.guild_id)
        if not guild_player or not interaction.guild.voice_client:
            return await interaction.response.send_message("Nothing to skip.", ephemeral=True)

        interaction.guild.voice_client.stop()
        await interaction.response.send_message(
            embed=discord.Embed(description="⏭️ Skipped!", color=discord.Color.orange()),
            ephemeral=True,
        )

    @discord.ui.button(emoji="⏹️", style=discord.ButtonStyle.danger, custom_id="music:stop")
    async def stop(self, interaction: discord.Interaction, button: discord.ui.Button):
        guild_player = self.cog.players.get(interaction.guild_id)
        if not guild_player:
            return await interaction.response.send_message("Nothing is playing.", ephemeral=True)

        guild_player.queue.clear()
        guild_player.current = None
        guild_player.loop_mode = LoopMode.OFF
        if interaction.guild.voice_client:
            interaction.guild.voice_client.stop()
            await interaction.guild.voice_client.disconnect()
        await interaction.response.send_message(
            embed=discord.Embed(description="⏹️ Stopped and disconnected.", color=discord.Color.red()),
            ephemeral=True,
        )

    @discord.ui.button(emoji="🔁", style=discord.ButtonStyle.secondary, custom_id="music:loop")
    async def loop(self, interaction: discord.Interaction, button: discord.ui.Button):
        guild_player = self.cog.players.get(interaction.guild_id)
        if not guild_player:
            return await interaction.response.send_message("Nothing is playing.", ephemeral=True)

        modes = [LoopMode.OFF, LoopMode.SINGLE, LoopMode.QUEUE]
        idx = (modes.index(guild_player.loop_mode) + 1) % len(modes)
        guild_player.loop_mode = modes[idx]

        labels = {LoopMode.OFF: "Loop: Off", LoopMode.SINGLE: "Loop: Song 🔂", LoopMode.QUEUE: "Loop: Queue 🔁"}
        await interaction.response.send_message(
            embed=discord.Embed(description=labels[guild_player.loop_mode], color=discord.Color.blurple()),
            ephemeral=True,
        )

    @discord.ui.button(emoji="📜", style=discord.ButtonStyle.secondary, custom_id="music:queue")
    async def show_queue(self, interaction: discord.Interaction, button: discord.ui.Button):
        guild_player = self.cog.players.get(interaction.guild_id)
        if not guild_player or (not guild_player.current and not guild_player.queue):
            return await interaction.response.send_message("Queue is empty.", ephemeral=True)

        em = discord.Embed(title="Music Queue", color=discord.Color.blurple())

        if guild_player.current:
            em.add_field(
                name="Now Playing",
                value=f"[{guild_player.current.title}]({guild_player.current.url}) | `{guild_player.current.duration_str}`",
                inline=False,
            )

        if guild_player.queue:
            lines = []
            for i, song in enumerate(list(guild_player.queue)[:10], 1):
                lines.append(f"`{i}.` [{song.title}]({song.url}) | `{song.duration_str}`")
            if len(guild_player.queue) > 10:
                lines.append(f"*...and {len(guild_player.queue) - 10} more*")
            em.add_field(name="Up Next", value="\n".join(lines), inline=False)

        total = sum(s.duration for s in guild_player.queue if s.duration)
        if guild_player.current and guild_player.current.duration:
            total += guild_player.current.duration
        em.set_footer(text=f"{len(guild_player.queue)} songs in queue | Total: {datetime.timedelta(seconds=total)}")
        await interaction.response.send_message(embed=em, ephemeral=True)


# ── Guild player state ─────────────────────────────────────────────────────

class GuildPlayer:
    def __init__(self):
        self.queue: deque[Song] = deque()
        self.current: Optional[Song] = None
        self.loop_mode: LoopMode = LoopMode.OFF
        self.volume: float = 0.5
        self.now_playing_msg: Optional[discord.Message] = None


# ── Music cog ──────────────────────────────────────────────────────────────

class Music(commands.Cog):
    def __init__(self, bot: commands.Bot):
        self.bot = bot
        self.players: dict[int, GuildPlayer] = {}
        self.player_view = PlayerView(self)
        bot.add_view(self.player_view)

    def get_player(self, guild_id: int) -> GuildPlayer:
        if guild_id not in self.players:
            self.players[guild_id] = GuildPlayer()
        return self.players[guild_id]

    async def ensure_voice(self, interaction: discord.Interaction) -> Optional[discord.VoiceClient]:
        if not interaction.user.voice or not interaction.user.voice.channel:
            await interaction.followup.send(
                embed=discord.Embed(description="You need to be in a voice channel!", color=discord.Color.red()),
                ephemeral=True,
            )
            return None

        vc: Optional[discord.VoiceClient] = interaction.guild.voice_client

        if vc is None:
            vc = await interaction.user.voice.channel.connect(self_deaf=True)
        elif vc.channel != interaction.user.voice.channel:
            await vc.move_to(interaction.user.voice.channel)

        return vc

    def play_next(self, guild_id: int, error=None):
        if error:
            log.error("Player error in guild %s: %s", guild_id, error)

        player = self.players.get(guild_id)
        if not player:
            return

        guild = self.bot.get_guild(guild_id)
        if not guild or not guild.voice_client:
            return

        if player.loop_mode == LoopMode.SINGLE and player.current:
            song = player.current
            asyncio.run_coroutine_threadsafe(
                song.refresh_source(self.bot.loop), self.bot.loop
            ).result(timeout=15)
        elif player.queue:
            if player.loop_mode == LoopMode.QUEUE and player.current:
                player.queue.append(player.current)
            song = player.queue.popleft()
        else:
            player.current = None
            asyncio.run_coroutine_threadsafe(self._send_finished(guild_id), self.bot.loop)
            return

        player.current = song
        song.started_at = time.time()

        try:
            source = song.create_source(volume=player.volume)
            guild.voice_client.play(source, after=lambda e: self.play_next(guild_id, e))
        except Exception as e:
            log.error("Failed to play %s: %s", song.title, e)
            self.play_next(guild_id)

    async def _send_finished(self, guild_id: int):
        player = self.players.get(guild_id)
        if not player:
            return

        guild = self.bot.get_guild(guild_id)
        if guild and guild.voice_client:
            await asyncio.sleep(120)
            if guild.voice_client and not guild.voice_client.is_playing():
                await guild.voice_client.disconnect()
                if player.now_playing_msg:
                    try:
                        await player.now_playing_msg.channel.send(
                            embed=discord.Embed(
                                description="Queue finished. Disconnected due to inactivity.",
                                color=discord.Color.greyple(),
                            )
                        )
                    except discord.HTTPException:
                        pass

    # ── Slash Commands ──────────────────────────────────────────────────────

    @app_commands.command(name="play", description="Play a song from YouTube (URL or search query)")
    @app_commands.describe(query="YouTube URL or search query")
    async def play(self, interaction: discord.Interaction, query: str):
        await interaction.response.defer()

        vc = await self.ensure_voice(interaction)
        if not vc:
            return

        player = self.get_player(interaction.guild_id)

        try:
            song = await Song.from_query(query, interaction.user, self.bot.loop)
        except Exception as e:
            log.error("Failed to fetch song: %s", e)
            return await interaction.followup.send(
                embed=discord.Embed(description=f"Could not find: **{query}**", color=discord.Color.red()),
            )

        if vc.is_playing() or vc.is_paused():
            player.queue.append(song)
            em = song.embed(title_prefix="Added to Queue")
            em.add_field(name="Position", value=str(len(player.queue)), inline=True)
            await interaction.followup.send(embed=em)
        else:
            player.current = song
            song.started_at = time.time()
            source = song.create_source(volume=player.volume)
            vc.play(source, after=lambda e: self.play_next(interaction.guild_id, e))

            em = song.embed()
            view = PlayerView(self)
            msg = await interaction.followup.send(embed=em, view=view)
            player.now_playing_msg = msg

    @app_commands.command(name="pause", description="Pause the current song")
    async def pause(self, interaction: discord.Interaction):
        vc = interaction.guild.voice_client
        if vc and vc.is_playing():
            vc.pause()
            await interaction.response.send_message(
                embed=discord.Embed(description="⏸️ Paused.", color=discord.Color.orange())
            )
        else:
            await interaction.response.send_message("Nothing is playing.", ephemeral=True)

    @app_commands.command(name="resume", description="Resume the paused song")
    async def resume(self, interaction: discord.Interaction):
        vc = interaction.guild.voice_client
        if vc and vc.is_paused():
            vc.resume()
            await interaction.response.send_message(
                embed=discord.Embed(description="▶️ Resumed.", color=discord.Color.green())
            )
        else:
            await interaction.response.send_message("Nothing is paused.", ephemeral=True)

    @app_commands.command(name="skip", description="Skip the current song")
    async def skip(self, interaction: discord.Interaction):
        vc = interaction.guild.voice_client
        if vc and (vc.is_playing() or vc.is_paused()):
            vc.stop()
            await interaction.response.send_message(
                embed=discord.Embed(description="⏭️ Skipped!", color=discord.Color.orange())
            )
        else:
            await interaction.response.send_message("Nothing to skip.", ephemeral=True)

    @app_commands.command(name="stop", description="Stop playback and clear the queue")
    async def stop(self, interaction: discord.Interaction):
        player = self.players.get(interaction.guild_id)
        vc = interaction.guild.voice_client

        if player:
            player.queue.clear()
            player.current = None
            player.loop_mode = LoopMode.OFF

        if vc:
            vc.stop()
            await vc.disconnect()
            await interaction.response.send_message(
                embed=discord.Embed(description="⏹️ Stopped and disconnected.", color=discord.Color.red())
            )
        else:
            await interaction.response.send_message("Not connected.", ephemeral=True)

    @app_commands.command(name="queue", description="Show the current music queue")
    async def queue(self, interaction: discord.Interaction):
        player = self.players.get(interaction.guild_id)
        if not player or (not player.current and not player.queue):
            return await interaction.response.send_message(
                embed=discord.Embed(description="Queue is empty.", color=discord.Color.greyple()),
            )

        em = discord.Embed(title="🎵 Music Queue", color=discord.Color.blurple())

        if player.current:
            em.add_field(
                name="🔊 Now Playing",
                value=f"[{player.current.title}]({player.current.url}) | `{player.current.duration_str}`\n"
                      f"Requested by {player.current.requester.mention}",
                inline=False,
            )

        if player.queue:
            lines = []
            for i, song in enumerate(list(player.queue)[:15], 1):
                lines.append(f"`{i}.` [{song.title}]({song.url}) | `{song.duration_str}` — {song.requester.mention}")
            if len(player.queue) > 15:
                lines.append(f"\n*...and {len(player.queue) - 15} more*")
            em.add_field(name="Up Next", value="\n".join(lines), inline=False)

        total = sum(s.duration for s in player.queue if s.duration)
        if player.current and player.current.duration:
            total += player.current.duration

        loop_label = {LoopMode.OFF: "Off", LoopMode.SINGLE: "🔂 Song", LoopMode.QUEUE: "🔁 Queue"}
        em.set_footer(
            text=f"{len(player.queue)} songs queued | Total: {datetime.timedelta(seconds=total)} | Loop: {loop_label[player.loop_mode]}"
        )
        await interaction.response.send_message(embed=em)

    @app_commands.command(name="nowplaying", description="Show the currently playing song")
    async def nowplaying(self, interaction: discord.Interaction):
        player = self.players.get(interaction.guild_id)
        if not player or not player.current:
            return await interaction.response.send_message(
                embed=discord.Embed(description="Nothing is playing right now.", color=discord.Color.greyple()),
            )

        song = player.current
        em = song.embed()

        if song.started_at and song.duration:
            elapsed = int(time.time() - song.started_at)
            elapsed = min(elapsed, song.duration)
            bar_len = 20
            filled = int(bar_len * elapsed / song.duration)
            bar = "▓" * filled + "░" * (bar_len - filled)
            elapsed_str = str(datetime.timedelta(seconds=elapsed))
            em.add_field(
                name="Progress",
                value=f"`{elapsed_str}` {bar} `{song.duration_str}`",
                inline=False,
            )

        loop_label = {LoopMode.OFF: "Off", LoopMode.SINGLE: "🔂 Song", LoopMode.QUEUE: "🔁 Queue"}
        em.add_field(name="Loop", value=loop_label[player.loop_mode], inline=True)

        view = PlayerView(self)
        await interaction.response.send_message(embed=em, view=view)

    @app_commands.command(name="volume", description="Set the playback volume (0-100)")
    @app_commands.describe(level="Volume level from 0 to 100")
    async def volume(self, interaction: discord.Interaction, level: app_commands.Range[int, 0, 100]):
        player = self.get_player(interaction.guild_id)
        player.volume = level / 100.0

        vc = interaction.guild.voice_client
        if vc and vc.source and isinstance(vc.source, discord.PCMVolumeTransformer):
            vc.source.volume = player.volume

        emoji = "🔇" if level == 0 else "🔈" if level < 30 else "🔉" if level < 70 else "🔊"
        await interaction.response.send_message(
            embed=discord.Embed(
                description=f"{emoji} Volume set to **{level}%**",
                color=discord.Color.green(),
            )
        )

    @app_commands.command(name="shuffle", description="Shuffle the queue")
    async def shuffle(self, interaction: discord.Interaction):
        player = self.players.get(interaction.guild_id)
        if not player or len(player.queue) < 2:
            return await interaction.response.send_message("Not enough songs to shuffle.", ephemeral=True)

        queue_list = list(player.queue)
        random.shuffle(queue_list)
        player.queue = deque(queue_list)

        await interaction.response.send_message(
            embed=discord.Embed(
                description=f"🔀 Shuffled **{len(player.queue)}** songs!",
                color=discord.Color.green(),
            )
        )

    @app_commands.command(name="loop", description="Toggle loop mode (Off → Song → Queue)")
    async def loop(self, interaction: discord.Interaction):
        player = self.get_player(interaction.guild_id)

        modes = [LoopMode.OFF, LoopMode.SINGLE, LoopMode.QUEUE]
        idx = (modes.index(player.loop_mode) + 1) % len(modes)
        player.loop_mode = modes[idx]

        labels = {
            LoopMode.OFF: "Loop disabled",
            LoopMode.SINGLE: "🔂 Looping current song",
            LoopMode.QUEUE: "🔁 Looping entire queue",
        }
        await interaction.response.send_message(
            embed=discord.Embed(description=labels[player.loop_mode], color=discord.Color.blurple())
        )

    @app_commands.command(name="remove", description="Remove a song from the queue by position")
    @app_commands.describe(position="Position in the queue (1 = first)")
    async def remove(self, interaction: discord.Interaction, position: int):
        player = self.players.get(interaction.guild_id)
        if not player or not player.queue:
            return await interaction.response.send_message("Queue is empty.", ephemeral=True)

        if position < 1 or position > len(player.queue):
            return await interaction.response.send_message(
                f"Invalid position. Must be 1-{len(player.queue)}.", ephemeral=True
            )

        queue_list = list(player.queue)
        removed = queue_list.pop(position - 1)
        player.queue = deque(queue_list)

        await interaction.response.send_message(
            embed=discord.Embed(
                description=f"🗑️ Removed **{removed.title}** from position {position}.",
                color=discord.Color.orange(),
            )
        )

    @app_commands.command(name="clear", description="Clear the entire queue")
    async def clear(self, interaction: discord.Interaction):
        player = self.players.get(interaction.guild_id)
        if not player or not player.queue:
            return await interaction.response.send_message("Queue is already empty.", ephemeral=True)

        count = len(player.queue)
        player.queue.clear()
        await interaction.response.send_message(
            embed=discord.Embed(
                description=f"🗑️ Cleared **{count}** songs from the queue.",
                color=discord.Color.orange(),
            )
        )

    @app_commands.command(name="help_music", description="Show all music bot commands")
    async def help_music(self, interaction: discord.Interaction):
        em = discord.Embed(
            title="🎵 Music Bot Commands",
            description="All available commands for the music bot:",
            color=discord.Color.blurple(),
        )

        commands_list = [
            ("`/play <query>`", "Play a song from YouTube (URL or search)"),
            ("`/pause`", "Pause the current song"),
            ("`/resume`", "Resume playback"),
            ("`/skip`", "Skip the current song"),
            ("`/stop`", "Stop playback and disconnect"),
            ("`/queue`", "Show the current queue"),
            ("`/nowplaying`", "Show the currently playing song with progress"),
            ("`/volume <0-100>`", "Set playback volume"),
            ("`/shuffle`", "Shuffle the queue"),
            ("`/loop`", "Toggle loop mode (Off → Song → Queue)"),
            ("`/remove <pos>`", "Remove a song from the queue"),
            ("`/clear`", "Clear the entire queue"),
        ]
        em.add_field(
            name="Commands",
            value="\n".join(f"{cmd} — {desc}" for cmd, desc in commands_list),
            inline=False,
        )
        em.add_field(
            name="Player Controls",
            value="When a song is playing, use the buttons below the message:\n"
                  "⏸️ Pause/Resume | ⏭️ Skip | ⏹️ Stop | 🔁 Loop | 📜 Queue",
            inline=False,
        )
        em.set_footer(text="Music Bot")
        await interaction.response.send_message(embed=em)


async def setup(bot: commands.Bot):
    await bot.add_cog(Music(bot))
