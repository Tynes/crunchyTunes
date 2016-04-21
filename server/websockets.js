module.exports = (server) => {


  var io = require('socket.io')(server);
  var sessionData = require('./sessionData.js');

  io.on('connection', (socket) => {
    socket.on('add track', (track) => {
      // sessionData is a server side data store
      sessionData.tracks.push(track);

      socket.emit('new track', sessionData.tracks);
      socket.broadcast.emit('new track', sessionData.tracks);
    });
    socket.on('track play', (playing) => {
      sessionData.currentTrack = playing;
      socket.emit('update track', sessionData.currentTrack);
      socket.broadcast.emit('update track', sessionData.currentTrack);
    });

    socket.on('add user', (username) => {
      socket.username = username;
      socket.emit('user joined', {
        username: socket.username,
      });
      sessionData.userData.push({
        userName: username,
        userId: socket.id,
        role: 'pleeb',
        mood: 0,
      });
    });
  });
};
