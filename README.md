# Discord sample bot working on glitch.com
main.js, package-lock.json, package.json, shrinkwrap.yaml

## How to launch bot

1. Import this repository to `glitch.com`.
1. Add this line to `.env` file; `DISCORD_BOT_TOKEN={YOUR_DISCORD_BOT_USER_TOKEN}, GAS_URL={YOUR_GOOGLE_SCRIPTS_APPS_URL}, TARGET_VOICE_CHAN={YOUR_SPECIFIC_VOICE_CHANNEL_IN_DISCORD}, GENERAL_CHAN={YOUR_GENERAL_CHANNEL_IN_DISCORD}, BOT_DUMP={THE_CHANNEL_TO_NOTIFY_YOUR_BOT_ACTIVITY}`
1. Just run on `glitch.com` !

To get discord bot token, visit discord official develoer site; https://discordapp.com/developers/applications/me/

## Running bot 24h on glitch.com

Applications on `glitch.com` may sleep when keep no access for 5 minutes.
You must ping application URL every 5 minutes to run your bot continuously.
Using `uptimerobot.com` service is just good.
