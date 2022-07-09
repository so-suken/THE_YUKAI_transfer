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
    //msg.reply("hahaha- so-suke dayo");
    return;
  } else {
    //GASにメッセージを送信
    var key_trigger = "@everyone";
    if (msg.content.startsWith(key_trigger)){
      msg.content = msg.content.replace(key_trigger, "");
      sendGAS(msg);
    }
    else console.log(1)
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
    console.log("sent to -> " + process.env.GAS_URL);
    console.log("Data -> " + JSON.stringify(jsonData));
  }


  function post(url, data) {
    //axiosモジュールを使う
    const axiosBase = require("axios")
    
    // postする
    const axios = axiosBase.create({
      baseURL: "https://script.google.com", // gas以外の場合はそれぞれ書き換え
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      responseType: "json",
    });
    
    axios.post(url, data)
      .then(async function (response) {
      const responsedata = response.data; // 受け取ったデータ一覧(object)
    })
      .catch(function (error) {
        msg.reply("Error!!\n" + error);
        console.log("ERROR!! occurred in Backend.");
        console.log(error.message);
    });
    
      
    //var userid = response.body.userid;
    //var channelid = response.body.channelid;
    // var message = response.body.message;  
    var userid = msg.author.username
    var channelid = "980183122081636474"
      
    var message = msg.content
    if (
      userid != undefined &&
      channelid != undefined &&
      message != undefined
    ) {
      var channel = client.channels.cache.get(channelid);
      if (channel != null) {
        channel.send("次の文章をLINEに転送しました: " + message);
        }
      }
    //else{
    //  console.log("userid: " + userid + "\n" + "channelid: " + channelid + "\n message: " + message);
    //}
  }
});

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}
  
client.login(process.env.DISCORD_BOT_TOKEN);