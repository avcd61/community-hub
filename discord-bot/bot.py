import os
import asyncio
import logging

import discord
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
log = logging.getLogger("music-bot")

intents = discord.Intents.default()
intents.message_content = True
intents.voice_states = True

bot = commands.Bot(
    command_prefix="!",
    intents=intents,
    description="Discord Music Bot - plays music from YouTube",
)


@bot.event
async def on_ready():
    log.info("Bot is online as %s (ID: %s)", bot.user, bot.user.id)
    await bot.change_presence(
        activity=discord.Activity(
            type=discord.ActivityType.listening,
            name="/play | Music Bot",
        )
    )
    try:
        synced = await bot.tree.sync()
        log.info("Synced %d slash commands", len(synced))
    except Exception as e:
        log.error("Failed to sync commands: %s", e)


async def main():
    token = os.getenv("DISCORD_TOKEN")
    if not token:
        log.error("DISCORD_TOKEN not set. Create a .env file with your bot token.")
        return

    async with bot:
        await bot.load_extension("cogs.music")
        log.info("Music cog loaded")
        await bot.start(token)


if __name__ == "__main__":
    asyncio.run(main())
