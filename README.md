# Sezzle
Chanllenge Description: A calculator website which logs calculations as they happen and shares those calculations with everyone connected to the website. For example, user A and user B go to your site at the same time. User A calculates "5 + 5", which equals "10". This is logged below the calculator as "5+5 = 10". User B is updated about this calculation right after user A posts it. Now, user B calculates "3*4". This calcs to 12 and displays "3*4=12" right below the prior calculation. User A sees this update immediately after user B posts it. Results should remain between sessions. Only show the last 10 calculations descending from most recent to oldest.

Demo: https://boiling-tor-33079.herokuapp.com/

## My thoughts
### ~~Auth0 + MongoDb(Not Work)~~
Based on my experience of using React + Auth0 + MongoDB, the first idea came into my mind is to use Auth0 as the authentication and MongDB as the database. When user signs in the application, system will insert a new record. After caculating, the result will be sent to database. Then the server gets the updated list and sends back to clients. During the process, I found that it was not necessary to use MongoDB as a database beacuse we only need to get the most 10 recent results. And the conversation should be a real-time conversation. So I turned to another method.
### WebSocket
Then I thought that I could regard the real-time calculator as a real-time chat combined with calculator. Instead of text, the input is only a equation. So I used **React + WebSocket**. My project is based on a real-time chat room: https://github.com/ymyqwe/Websocket-React-Chatroom.

## Process
### Front-end design:
I first design the UI of calculator and complete the function of calcularing and get the equation string in the client.

### Back-end design:
I use 'socket.io' to listen on the event.  

## Heroku Deployment

While deploying the project, I met an error:
Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch

The reason is "A common cause for this error is due to the fact that Heroku dynamically assigns a port to your application process, something that doesn’t seem to be mentioned in the documentation. If you have forced a port number in your node server, Heroku will fail to bind to it."

The following line will ensure your application makes use of the port assigned to the user environment by Heroku:

var port = process.env.PORT || 5000;
