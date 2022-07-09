// Response for GAS
const http = require("http");
const querystring = require('querystring');

http.createServer(function(req, res){
 if (req.method == 'POST'){
   var data = "";
   req.on('data', function(chunk){
     data += chunk;
   });
   req.on('end', function(){
     if(!data){
        console.log("No post data");
        res.end();
        return;
     }
     var dataObject = querystring.parse(data);
     console.log("post:" + dataObject.type);
     if(dataObject.type == "wake"){
       console.log("Woke up in post");
       res.end();
       return;
     }
     res.end();
   });
 }
 else if (req.method == 'GET'){
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('Discord Bot is active now\n');
 }
}).listen(3000);

// Discord bot implements
const discord = require("discord.js");
const client = new discord.Client();


client.on("ready", message => {
  // botのステータス表示
  client.user.setPresence({ game: { name: "with discord.js" } });
  console.log("bot is ready!");
});

client.on("message", message => {
  if (message.author.bot) {
    return;
  }
  // DMには応答しない
  if (message.channel.type == "dm") {
    message.reply("そんなにそうすけと会話したいのかい??"); //そうすけのいたずら
    return;
  }

  var msg = message;

  // botへのリプライは無視
  if (msg.mentions.has(client.user)) {
    msg.reply("hahaha- so-suke dayo");
    return;
  } else {
    //GASにメッセージを送信
    if (msg.content.startsWith("@test")){
      sendGAS(msg);
    }
    else 
    return;
  }

  function sendGAS(msg) {
    var jsonData = {
      events: [
        {
          type: "discord",
          name: msg.author.username,
          message: msg.content
        }
      ]
    };
    //GAS URLに送る
    console.log(msg.author.username);
    console.log(msg.content);
    post(process.env.GAS_URL, jsonData);
  }

  function post(url, data) {
    //requestモジュールを使う
    var request = require("request");
    var options = {
      url: url, //cheanged to "url" from "uri" <-- typo??
      headers: { "Content-type": "application/json" },
      json: data,
      followAllRedirects: true
    };
    // postする
    request.post(options, function(error, response, body) {
      if (error != null) {
        msg.reply("更新に失敗しました\n" + error);
        console.log("更新に失敗しました");
        return;
      }
      
      //msg.reply("yatta")
      
      //var userid = response.body.userid;
      var userid = msg.author.username
      //var channelid = response.body.channelid;
      var channelid = "980183122081636474"
      // var message = response.body.message;
      var message = msg.content
      if (
        userid != undefined &&
        channelid != undefined &&
        message != undefined
      ) {
        var channel = client.channels.cache.get(channelid);
        if (channel != null) {
          //console.log(channel);
          channel.send("次の文章をLINEに転送しました: " + message);
        }
      }
      //else{
      //  console.log("userid: " + userid + "\n" + "channelid: " + channelid + "\n message: " + message);
      //}
    });
  }
});

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);