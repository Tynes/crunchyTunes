import React from 'react';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ClassNames from 'classnames';
import style from './styles/toolbox-theme';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

<<<<<<< HEAD
import playListItem from './playListItem.jsx';
=======
>>>>>>> c395082bcc774aeb308988f097b6399e8bfbcafd
import socket from './websockets.js';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    console.log('mounted inside playlist');
    socket.on('new track', (track) => {
      this.handleNewTrack(track);
    });
  }

  handleNewTrack(track) {
    let updatedState = this.state.tracks.slice();
    updatedState.push(track);
    this.setState({ tracks: updatedState });
    console.log(this.state);
  }

  render() {
    return (
      <div className="playlist">
        <List>
          <ListItem caption="Songs" />

          {this.state.tracks.map((track) =>
            <ListItem
              caption={`${track.songTitle}\n${track.creator}`}
              avatar={track.imagePath}
              onClick={() => this.props.handleCardPlay(track)}
            />
          )}

        </List>
      </div>
=======
    socket.on('new track', (tracks) => {
      this.handleNewTrack(tracks);
    });
    socket.on('remove from playlist', (tracks) => {
      this.setState({ tracks: tracks });
    });
  }

  handleNewTrack(tracks) {
    this.setState({ tracks: tracks });
  }

  handleTrackEmit(track) {
    socket.emit('track play', track);
  }


  render() {
    return (
      <List selectable ripple className="list">
        <ListSubHeader caption="Dictator's Playlist" />
        {this.state.tracks.map((track) =>
          <ListItem
            caption={`${track.songTitle}\n${track.creator}`}
            avatar={track.imagePath}
            onClick={() => this.handleTrackEmit(track)}
          />
        )}
      </List>
>>>>>>> c395082bcc774aeb308988f097b6399e8bfbcafd
    );
  }
}

export default PlayList;
