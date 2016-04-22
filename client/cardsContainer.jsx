import React from 'react';
import Button from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import ClassNames from 'classnames';
import style from './styles/toolbox-theme';

import socket from './websockets.js';

class CardsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // socket listeners go here
  }

  handleBuildPlaylist(track) {
    socket.emit('add track', track);
  }

  render() {
    return (
      <div className="cardsContainer">
        {this.props.tracks.map((track) =>
          <Card onClick={() => this.handleBuildPlaylist(track)}
            key={track.contentId}
            className={ClassNames(style['card'])}
            style={{ width: '250px', height: '200px', margin: '15px' }}
          >
            <div className={ClassNames(style['image-container'])}>
              <CardTitle
                className={ClassNames(style['source-logo'])}
                avatar= {
                  track.apiSource === 'Spotify' ? 'http://www.iconarchive.com/download/i98446/dakirby309/simply-styled/Spotify.ico' :
                    track.apiSource === 'SoundCloud' ? 'https://c1.staticflickr.com/9/8082/8292777643_65090144e9.jpg' :
                      'https://cdn0.iconfinder.com/data/icons/social-networks-and-media-flat-icons/136/Social_Media_Socialmedia_network_share_socialnetwork_network-30-512.png'
                }
              />
              <CardMedia
                aspectRatio="wide"
                image={track.imagePath}
              />
            </div>
            <div className={ClassNames(style['card-title'])}>
            {track.songTitle}
            </div>
            <div className={ClassNames(style['card-overlay'])}>
            </div>
          </Card>
        )}
      </div>
    );
  }
}


export default CardsContainer;
