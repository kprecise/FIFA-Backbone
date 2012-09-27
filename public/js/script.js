$(document).ready(function() {
  var socket = io.connect(); 
  socket.on('connect', function() {
    socket.send('A client connected.');
  });
  socket.on('news', function (data) {
    console.log(data);
  });
  socket.on('message', function(message) {
    $('div#messages').html('<p>' + message + '</p>' + $('div#messages').html());
  });
  socket.on('disconnect', function() {
  });

  $('input').keydown(function(event) {
    if(event.keyCode === 13) {
      socket.send($('input').val());
      console.log('sending message...');
      $('input').val('');
    }
  });
});