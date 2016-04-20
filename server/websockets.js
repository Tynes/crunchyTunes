module.exports = (server) => {
  var io = require('socket.io')(server);

  io.on('connection', (socket) => {
    socket.on('add track', (track) => {
      console.log(track);
      // emit to everybody-new track
      socket.emit('new track', track);
    });
  });
};

// socket.on('new track', (track) => {
// var updatedState = this.state.tracks.slice();
// updatedState.push(track);
// this.setState({tracks: updatedState})
// })

// { imagePath: 'https://i.scdn.co/image/443372cd2c6d4245833fb46ac1c5dabca00c78a9',
//   contentId: '2UdgNYFA4Q7TQXil8zjVqn',
//   creator: 'Kanye West',
//   songTitle: 'I Love Kanye',
//   apiSource: 'Spotify' }

// onclick for ListItems - handleCardPlay function
// pass handleCardPlay as a prop to the List component
