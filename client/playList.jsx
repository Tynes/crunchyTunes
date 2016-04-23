import React from 'react';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ClassNames from 'classnames';
import style from './styles/toolbox-theme';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

import socket from './websockets.js';

class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
    };
  }

  componentDidMount() {
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
         <div className='temperature'></div>

        {this.state.tracks.map((track) =>
          <ListItem
            caption={`${track.songTitle}\n${track.creator}`}
            avatar={track.imagePath}
            onClick={() => this.handleTrackEmit(track)}
          />
        )}
      </List>
    );
  }
}

export default PlayList;
