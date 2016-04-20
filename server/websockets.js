module.exports = (server) => {
  var io = require('socket.io')(server);
  var appData = require('./playListData.js');

  io.on('connection', (socket) => {
    socket.on('add track', (track) => {
      // appData is a server side data store
      appData.tracks.push(track);
      console.log(appData);
      // send appData
      socket.emit('new track', track);
    });
  });
};
