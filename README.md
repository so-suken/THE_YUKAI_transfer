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


# Google apps scripts on script.google.com

to use this code, add file .env.gs

```zsh
function setscprop(){
  var LINE_token = {YOUR LINE ACCESS TOKEN};
  var GLITCH_token = {YOUR GLITCH TOKEN};
  var ID = {YOUR TARGET LINE ID};
  
  //save the variable to script property
  var prop = PropertiesService.getScriptProperties();
  prop.setProperty("LINE_TOKEN", LINE_token);
  prop.setProperty("GLITCH_TOKEN", GLITCH_token);
  prop.setProperty("TO_ID", ID);
}
```

and make it as library names "ENV"

To get your ID in LINE, refer my code: https://github.com/so-suken/GET_ID_INFO_LINE
