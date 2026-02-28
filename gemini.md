# ♊ Gemini Documentation for Finy Bot

This document outlines the architecture, setup, and deployment of **Finy Bot**, a Telegram bot built with `grammY` and optimized for deployment on **Railway**.

## 🚀 Overview
Finy Bot is designed as a modular Telegram bot template. It uses dynamic command loading to keep the codebase clean and extensible.

## 🏗️ Technical Architecture
- **Framework**: [grammY](https://grammy.dev/)
- **Runtime**: Node.js (ES Modules)
- **Deployment**: [Railway](https://railway.app/)
- **Dynamic Command Loader**: The bot scans the `commands/` directory at startup and registers each command found.

## 📂 Project Structure
```text
finy_bot/
├── commands/          # Individual command logic
│   ├── 8ball.js       # Fun "magic 8-ball" command
│   ├── help.js        # Dynamic help menu generator
│   └── start.js       # Welcome message command
├── index.js           # Main entry point & bot initialization
├── package.json       # Dependencies and scripts
└── .env               # (Local) Environment variables
```

## 🛠️ Infrastructure & Deployment (Railway)
The bot is configured to run as a long-polling service on Railway.

### Environment Variables
For the bot to function on Railway, the following variable must be set in the Railway project dashboard:
- `BOT_TOKEN`: Your official Telegram Bot token from [@BotFather](https://t.me/botfather).

### Deployment Workflow
1. **GitHub Integration**: Connected to the `finy_bot` repository.
2. **Auto-Deploy**: Railway automatically triggers a build and deploy on every push to the `main` branch.
3. **Start Command**: Uses `npm start` as defined in `package.json`.

## 🧩 Dynamic Command System
To add a new command, create a `.js` file in the `commands/` folder following this template:

```javascript
export default {
  name: "yourcommand",
  description: "What it does",
  alias: ["optional_alias"],
  usage: "/yourcommand <args>",
  example: "/yourcommand hello",
  category: "CategoryName",
  handler: async (ctx) => {
    await ctx.reply("Your response here!");
  },
};
```

## 🧪 Verification
The bot has been verified to be working on Railway. Commands currently active:
- `/start`: Initializes interaction.
- `/help`: Lists all available commands with usage details.
- `/8ball`: Provides random answers to user questions.
