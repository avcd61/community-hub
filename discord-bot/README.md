# Discord Music Bot

Discord music bot with a convenient interface for playing music from YouTube.

## Features

- **YouTube playback** — play by URL or search query
- **Queue system** — add songs, view queue, shuffle, remove
- **Interactive buttons** — pause/resume, skip, stop, loop, queue right from the player
- **Rich embeds** — song info, thumbnails, progress bar
- **Loop modes** — off, single song, entire queue
- **Volume control** — adjust volume from 0 to 100

## Commands

| Command | Description |
|---|---|
| `/play <query>` | Play a song (YouTube URL or search) |
| `/pause` | Pause playback |
| `/resume` | Resume playback |
| `/skip` | Skip current song |
| `/stop` | Stop and disconnect |
| `/queue` | Show the queue |
| `/nowplaying` | Current song with progress bar |
| `/volume <0-100>` | Set volume |
| `/shuffle` | Shuffle the queue |
| `/loop` | Toggle loop (Off → Song → Queue) |
| `/remove <pos>` | Remove song from queue |
| `/clear` | Clear the queue |
| `/help_music` | Show all commands |

## Setup

### Prerequisites

- Python 3.10+
- FFmpeg installed on the system
- Discord Bot Token

### 1. Install FFmpeg

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/download.html and add to PATH.

### 2. Install dependencies

```bash
cd discord-bot
pip install -r requirements.txt
```

### 3. Configure the bot token

```bash
cp .env.example .env
```

Edit `.env` and paste your bot token:
```
DISCORD_TOKEN=your_bot_token_here
```

### 4. Create a Discord Bot

1. Go to https://discord.com/developers/applications
2. Click **New Application**, give it a name
3. Go to **Bot** → click **Reset Token** → copy the token
4. Enable **MESSAGE CONTENT INTENT** under Privileged Gateway Intents
5. Go to **OAuth2** → **URL Generator**
   - Scopes: `bot`, `applications.commands`
   - Bot Permissions: `Send Messages`, `Embed Links`, `Connect`, `Speak`
6. Open the generated URL to invite the bot to your server

### 5. Run the bot

```bash
python bot.py
```

## Usage

1. Join a voice channel
2. Use `/play <song name or YouTube URL>`
3. Use the buttons on the player message or slash commands to control playback
