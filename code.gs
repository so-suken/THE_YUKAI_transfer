ENV.setscprop()
var prop = PropertiesService.getScriptProperties();
var CHANNEL_ACCESS_TOKEN = prop.getProperty("LINE_TOKEN");
var GLITCH_URL = prop.getProperty("GLITCH_TOKEN");
var TO_ID = prop.getProperty("TO_ID")

// Glitchサーバーを起動させる
function wakeGlitch(){
 var json = {
   'type':'wake'
 };
 sendGlitch(GLITCH_URL, json);
}

function sendGlitch(url, json){
 var params = {
   'contentType' : 'application/json; charset=utf-8',
   'method' : 'post',
   'payload' : json,
   'muteHttpExceptions': true
 };
 response = UrlFetchApp.fetch(url, params);
}

/*
 * ボットイベント処理
 */
function doPost(e) {

  if(e != null){
    var events = JSON.parse(e.postData.contents).events;
  }
  if(e == null) {
    var events = [{"type":"discord","name":"so-suken)","message":" hu"}]
  }
  events.forEach(function(event) {
    if(event.type == 'discord') {
      sendLineMessage(event);
    }
 });
}

/*
 * LINEBotへメッセージを送信処理
 */
function sendLineMessage(e) {
  // メッセージの内容(送信先と内容)
  var message = {
    'messages' : [
      {
        'type' : "text",
        'text' : e.name + ": " + e.message
      }
    ],
    'to' : TO_ID
  };

  Logger.log(e.message);
  // LINEにpostするメッセージデータ
  var replyData = {
    'method' : "post",
    'headers' : {
      'Content-Type' : "application/json",
      'Authorization' : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    'payload' : JSON.stringify(message)

  };

  // LINEにデータを投げる
  var response = UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push", replyData);
  // LINEにステータスコード200を返す
  return response.getResponseCode();
}