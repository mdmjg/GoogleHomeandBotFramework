
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
'use strict';

const {actionssdk} = require('actions-on-google');
const functions = require('firebase-functions');

const actionsOnGoogleAdapter = require("bot-framework-actions-on-google");

const app = actionssdk({debug: true});

var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;
 
var client = new Client();
var conversationID = "holis";
var finalResponse = "Hello hello";


var args = {
    data: { from: "mar", text: "hola", type: "message" },
    headers: { "Content-Type": "application/json", "Authorization": "Bearer UXfjuxJwKgg.cwA.cYo.EXRcORb0XwBIBkBjvLFMjW8EqcOhukov-9FR_GcT4Fw" }
};


function sendMessage(input, callback) {
    var args2 = {
        data: { from: {id: conversationID}, text: input, type: "message" },
        headers: { "Content-Type": "application/json", "Authorization": "Bearer UXfjuxJwKgg.cwA.cYo.EXRcORb0XwBIBkBjvLFMjW8EqcOhukov-9FR_GcT4Fw" }
    };
    client.post(`https://directline.botframework.com/v3/directline/conversations/${conversationID}/activities`, args2, function (data, response) {
  
        callback(data);
    });
}

function getMessage(input, callback) {
    var args3 = {
        data: { from: {id: conversationID}, text: input, type: "message" },
        headers: { "Content-Type": "application/json", "Authorization": "Bearer UXfjuxJwKgg.cwA.cYo.EXRcORb0XwBIBkBjvLFMjW8EqcOhukov-9FR_GcT4Fw" }
    };
    client.get(`https://directline.botframework.com/v3/directline/conversations/${conversationID}/activities`, args3, function (data, response) {
        callback(data);
    });
}


app.intent('actions.intent.MAIN', (conv) => {
  client.post("https://directline.botframework.com/v3/directline/conversations", args, function (data, response) {
  conversationID = data.conversationId;
});
  conv.ask('Hi!');
});


app.intent('actions.intent.TEXT', (conv, {input}) => {
  conv.ask("funciona");
  var promise1 = new Promise(function(resolve, reject) {
    // conv.ask("hey gurl before promise");
    sendMessage(input, function(data){
        if(data) {
          conv.ask("hola ma")
            resolve(data);
        } else{
            reject(data);
        }
    });
  });
    return promise1.then(function(data) {
        getMessage(input, function(data){
            finalResponse = data.activities[Object.keys(data.activities).length-1].text;
            conv.ask("hey gurl");
        });
      }, function(err) {
        console.log(err); // Error: "It broke"
    });
});
 

// handle the initialTrigger
function handleMainIntent(conv, input) {
    conv.ask(`Hi, I'm Do It All. You can ask to do this or that. What would you like to do?`);
  }


// More intent handling if needed



exports.myfunction = functions.https.onRequest(app)