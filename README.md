# Sezzle
Web: https://boiling-tor-33079.herokuapp.com/
Based on: chatroom

##My thoughts
1. Auth0 + MongoDb
2. real-time: Websocket

##Process
###Front-end design:
login,Calculator, result div

###Back-end design:
press equal: send message to sever
result part: listen to server

##Heroku Deployment

While deploying a node.js application to Heroku recently, I was receiving the following error:

Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch
A common cause for this error is due to the fact that Heroku dynamically assigns a port to your application process, something that doesn’t seem to be mentioned in the documentation. If you have forced a port number in your node server, Heroku will fail to bind to it.

The following line will ensure your application makes use of the port assigned to the user environment by Heroku:

var port = process.env.PORT || 5000;
