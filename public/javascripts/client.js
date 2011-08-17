var socket = io.connect('localhost');

socket.on('connect', function() {
  socket.on('audience', function (data) {
    $('#audience').text(data.count);
  });

  socket.on('push message', function (data) {
    console.log('push message is ' + data);
    $('#list').prepend($('<div>' + time() + ' ' + data + '</div><hr>'));
  });
});

function send() {
  var message = $('#message').val();
  socket.emit('send message', message);
  $('#message').val('');
}

function time() {
  var date = new Date();
  hours = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();

  if (hours < 10) { hours = '0' + hours; }
  if (minutes < 10) { minutes = '0' + minutes; }
  if (seconds < 10) { seconds = '0' + seconds; }

  return hours + ':' + minutes + ':' + seconds;
}
