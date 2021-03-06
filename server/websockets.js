module.exports = (server) => {

  var io = require('socket.io')(server);
  var sessionData = require('./sessionData.js');
  var dataMethods = require('./dataMethods.js');

  io.on('connection', (socket) => {
    var user;
    socket.on('add track', (track) => {
<<<<<<< HEAD
      console.log(track);
      // emit to everybody-new track
      socket.emit('new track', track);
=======
      // sessionData is a server side data store
      dataMethods.addToStore(track, sessionData.tracks);
      dataMethods.setRemovalInHalfHour(track, sessionData.tracks, function () {
        socket.emit('remove from playlist', sessionData.tracks);
      });

      socket.emit('new track', sessionData.tracks);
      socket.broadcast.emit('new track', sessionData.tracks);
    });
    socket.on('track play', (playing) => {
      sessionData.currentTrack = playing;
      socket.emit('update track', sessionData.currentTrack);
      socket.broadcast.emit('update track', sessionData.currentTrack);
      // then delete track from playlist
      dataMethods.removeFromStore(playing, sessionData.tracks);
      socket.emit('remove from playlist', sessionData.tracks);
      socket.broadcast.emit('remove from playlist', sessionData.tracks);
>>>>>>> c395082bcc774aeb308988f097b6399e8bfbcafd
    });

    socket.on('add user', (username) => {
      socket.username = username;
      socket.emit('user joined', {
        username: socket.username,
      });
      user = {
        userName: username,
        userId: socket.id,
        role: 'pleeb',
        mood: 0,
      };
      dataMethods.addToStore(user, sessionData.userData);
    });

    socket.on('disconnect', () => {
      dataMethods.removeFromStore(user, sessionData.userData);
    });

    // handle messages to send from one to all
    socket.on('new message', (message) => {
      socket.emit('new message', message);
      socket.broadcast.emit('new message', message);
    });
  });
};

