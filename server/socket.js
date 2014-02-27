// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var users = require('./users');
var port = process.env.PORT || 80;
var mongoose = require('mongoose');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
app.use(express.json());
app.use(express.urlencoded());

// Routing
//app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname+ '/../dist'));
app.get('/users', users.all);
app.post('/users', users.register);
// Chatroom

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;
var ids = {};
io.on('connection', function (socket) {
  var addedUser = false;
  socket.emit('identify');
  socket.on('identification',function(data){
	ids[data.id] = {};
	ids[data.id][data.type] = socket;
	socket.id=data.id;
	socket.type=data.type;
	console.log(data.type + ' ' + data.id + ' connected');
	if(data.type == 'magician') getStatus(data.id);
  });
  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  socket.on('getStatus', function(){
	getStatus(socket.id);
  });
function getStatus(id){
	console.dir(ids[id]);
	console.dir(ids[id].magician);
//	ids[id].magician.emit('status',{spectator: !!ids[id].spectator});
//	socket.emit('status', 'second try');
	socket.broadcast.emit('status', {spectator: !!ids[socket.id].spectator});
	console.log('status reqest sent');
}
  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username
      });
    }
  });
});