var path = require('path');
var express = require('express');
var app = express();
var webpack = require('webpack');
var config = require('./webpack.config');
var server =require('http').createServer(app);
var io = require('socket.io')(server);
var compiler = webpack(config);
var port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '/')))

// use in develope mode
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
})

var onlineUsers = {};
var onlineCount = 0;

// listen to client login
io.on('connection', function(socket) {

    socket.on('login', function(obj){

        // let user.id = socket.id
        socket.id = obj.uid;

        // add the new user to the list, count++
        if (!onlineUsers.hasOwnProperty(obj.uid)) {
            onlineUsers[obj.uid] = obj.username;
            onlineCount++;
        }

        // send 'login' event and related objs to client
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
        console.log(obj.username+'connect to the Calculator');
    })

//listen to client leave
    socket.on('disconnect', function() {
        if(onlineUsers.hasOwnProperty(socket.id)) {
            var obj = {uid:socket.id, username:onlineUsers[socket.id]};
            delete onlineUsers[socket.id];
            onlineCount--;

            // send 'logout'event, update data
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
            console.log(obj.username+'disconnect to the Calculator');
        }
    })

    // listen to the message(results)
    socket.on('message', function(obj){
        io.emit('message', obj);
        console.log(obj.username+" Calculated "+ obj.message)
    })

})

server.listen(port, function(err) {
    console.log('Listening at *:5000');
})
