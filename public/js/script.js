$(document).ready(function() {
  /*
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
  */

  $('#create-btn').click(function() {
    jQuery.post('/webservices/create', {
      "title": "My Awesome T-shirt",
      "description": "All about the details. Of course it's black.",
      "style": "12345"
    }, function (data, textStatus, jqXHR) {
        console.log("Post response:"); console.dir(data); console.log(textStatus); console.dir(jqXHR);
    });
  });

  $('#get-btn').click(function() {
    jQuery.get('/webservices/list', function (data, textStatus, jqXHR) {
      console.log("Get response:");
      console.dir(data);
      console.log(textStatus);
      console.dir(jqXHR);
    });
  });

  $('#update-btn').click(function() {   
    jQuery.ajax({
      url: '/webservices/update/' + $('#prod-id').val(),
      type: "PUT",
      data: {
        "title": "My Awesome T-shirt in Black",
        "description": "All about the details. Of course it's black, and long sleeve",
        "style": "12345"
      },
      success: function (data, textStatus, jqXHR) {
          console.log("Post response:");
          console.dir(data);
          console.log(textStatus);
          console.dir(jqXHR);
      }
    });
  });

  $('#delete-btn').click(function() {
    jQuery.ajax({
      url: '/webservices/delete/' + $('#prod-id').val(), 
      type: "DELETE",
      success: function (data, textStatus, jqXHR) { 
          console.log("Post response:"); 
          console.dir(data); 
          console.log(textStatus); 
          console.dir(jqXHR); 
      }
    });
  });

  $('#populate-btn').click(function() {
    jQuery.get('/webservices/populate', function (data, textStatus, jqXHR) {
      console.log("Get response:");
      console.dir(data);
      console.log(textStatus);
      console.dir(jqXHR);
    });
  });

  $('#deleteAll-btn').click(function() {
    jQuery.get('/webservices/deleteAll', function (data, textStatus, jqXHR) {
      console.log("Get response:");
      console.dir(data);
      console.log(textStatus);
      console.dir(jqXHR);
    });
  });

});