
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'socket.io chat'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// server

var count = 0
var io = require('socket.io').listen(app);

chat = io.sockets.on('connection', function (socket) {
  console.log('socket connected');
  chat.emit('audience', { count: ++count });

  socket.on('send message', function (data) {
    console.log('send message is ' + data);
    socket.emit('push message', data);
    socket.broadcast.emit('push message', data);
  });

  socket.on('disconnect', function() {
    console.log('socket disconnected');
    chat.emit('audience', { count: --count });
  });
});
