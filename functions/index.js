
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
'use strict';

const {actionssdk} = require('actions-on-google');
const functions = require('firebase-functions');
// exports.myFunction = functions.https.onRequest(app);
const actionsOnGoogleAdapter = require("bot-framework-actions-on-google");
const express = require("express");

//const app = express();
const app = actionssdk({debug: true});
///////
const { DirectLine } = require('botframework-directlinejs');

//const appExp = express();

//appExp.use(actionsOnGoogleAdapter("UXfjuxJwKgg.cwA.m2Q.f7nifUIIXY7T2SmKA7Q2MAQ0vZp6s74UKIoGqRO6izo").router);



// var directLine = new DirectLine({
//   secret: "UXfjuxJwKgg.cwA.m2Q.f7nifUIIXY7T2SmKA7Q2MAQ0vZp6s74UKIoGqRO6izo"/* put your Direct Line secret here */,
//   token: "UXfjuxJwKgg.cwA.m2Q.f7nifUIIXY7T2SmKA7Q2MAQ0vZp6s74UKIoGqRO6izo"/* or put your Direct Line token here (supply secret OR token, not both) */,
//   domain: "https://vendingmachine-b866.azurewebsites.net/api/messages", /* optional: if you are not using the default Direct Line endpoint, e.g. if you are using a region-specific endpoint, put its full URL here */
//   webSocket: false /* optional: false if you want to use polling GET to receive messages. Defaults to true (use WebSocket). */,
//   pollingInterval: 1000/* optional: set polling interval in milliseconds. Default to 1000 */,
// });





  const directLine = new DirectLine({
    secret: "UXfjuxJwKgg.cwA.m2Q.f7nifUIIXY7T2SmKA7Q2MAQ0vZp6s74UKIoGqRO6izo"
   // conversationId: /* the conversationid you stored from previous conversation */
  });
///////////

// Construct and use router.
//app.use(actionsOnGoogleAdapter('UXfjuxJwKgg.cwA.m2Q.f7nifUIIXY7T2SmKA7Q2MAQ0vZp6s74UKIoGqRO6izo'));

app.intent('actions.intent.MAIN', (conv) => {
  conv.ask('Hi!');
});


app.intent('actions.intent.TEXT', (conv, input) => {
  if (input == 'Hello') {
   
     directLine.postActivity({
       from: { id: 'myUserId', name: 'myUserName' }, // required (from.name is optional)
       type: 'message',
       text: input
       }).subscribe(
           id => console.log("Posted activity, assigned ID ", id),
           error => console.log("Error posting activity", error)
       );

     conv.ask('How can I help you today?');
  } 
  else {
    conv.ask('How do you feel today?');

    directLine.postActivity({
      from: { id: 'myUserId', name: 'myUserName' }, // required (from.name is optional)
      type: 'message',
      text: input
      }).subscribe(
          id => console.log("Posted activity, assigned ID ", id),
          error => console.log("Error posting activity", error)
      );
  }
});

directLine.activity$
 .filter(activity => activity.type === 'message')
 .subscribe(
     message =>  conv.ask(message)// console.log("received message ", message)
 );



// handle the initialTrigger
function handleMainIntent(conv, input) {
    conv.ask(`Hi, I'm Do It All. You can ask to do this or that. What would you like to do?`);
  }




// More intent handling if needed



exports.myfunction = functions.https.onRequest(app)