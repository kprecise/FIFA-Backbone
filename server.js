var express = require('express'),
    app = express.createServer(),
    io = require('socket.io').listen(app),
    redis = require('redis'),
    redisClient = redis.createClient(9386,'koi.redistogo.com');

/* Redis */
//redis://nodejitsu:5b1913c44ccc1629110fc7a597f17a77@koi.redistogo.com:9386
redisClient.auth('5b1913c44ccc1629110fc7a597f17a77');

redisClient.on("error", function (err) {
    console.log("Error " + err);
});


/* Express Setup */
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

app.listen(80);
console.log('Server started...');



/* Sockets */
io.sockets.on('connection', function (socket) {
  socket.emit('news', 'News : You connectd!');
  socket.on('message', function(message) {
     socket.broadcast.send(message);
  });
});