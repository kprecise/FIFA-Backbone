var express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app);
    //redis = require('redis-url').connect(process.env.REDISTOGO_URL);

/* Redis */
/*
redis.set('foo', 'bar');

redis.get('foo', function(err, value) {
  console.log('foo is: ' + value);
});
*/

/* Express Setup */
var port = process.env.PORT || 3000;

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions: true, 
    showStack: true
  }));
  app.use(app.router);
});

app.get("/", function(req, res) {
  res.redirect("/index.html");
});

app.listen(port);
console.log('Server started...');



/* Sockets */
io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', 'News : You connected!');
  socket.on('message', function(message) {
     socket.broadcast.send(message);
  });
});