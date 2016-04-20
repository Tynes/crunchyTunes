module.exports = (server) => {
  var sessionData = {
    mood: 100,
    userData: [],
  };


  var io = require('socket.io')(server);
  var sessionData = require('./playListData.js');

  io.on('connection', (socket) => {
    socket.on('add track', (track) => {
      // emit to everybody-new track
      // sessionData is a server side data store
      sessionData.tracks.push(track);
      console.log(sessionData);
      // send sessionData
      socket.emit('new track', track);
    });

    socket.on('add user', (username) => {
      socket.username = username;
      socket.emit('user joined', {
        username: socket.username,
      });
      sessionData.userData.push({ userName: username, userId: socket.id, role: 'pleeb', mood: 1 });
      console.log(sessionData);
    });
  });
};
