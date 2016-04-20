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
      <List selectable ripple className="list">
        <ListItem caption="Songs" />
        {this.state.tracks.map((track) =>
          <ListItem
            caption={`${track.songTitle}\n${track.creator}`}
            avatar={track.imagePath}
            onClick={() => this.props.handleCardPlay(track)}
          />
        )}
      </List>
    );
  }
}

export default PlayList;
