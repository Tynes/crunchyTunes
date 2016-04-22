module.exports = (server) => {

  var io = require('socket.io')(server);
  var sessionData = require('./sessionData.js');
  var dataMethods = require('./dataMethods.js');

  io.on('connection', (socket) => {
    socket.on('add track', (track) => {
      // sessionData is a server side data store
      dataMethods.addToStore(track, sessionData.tracks);
      dataMethods.setRemovalInHalfHour(track, sessionData.tracks);

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
    });

    socket.on('add user', (username) => {
      socket.username = username;
      socket.emit('user joined', {
        username: socket.username,
      });
      dataMethods.addToStore({
        userName: username,
        userId: socket.id,
        role: 'pleeb',
        mood: 0,
      }, sessionData.userData);
    });
  });
};
