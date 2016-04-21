import React from 'react';
import Nav from './nav.js';
import SongPlayer from './songplayer.jsx';
import CardsContainer from './cardsContainer.jsx';
import AppBar from 'react-toolbox/lib/app_bar';
import queryAll from './queryAll.js';
import PlayList from './playList.jsx';
import { Layout, NavDrawer, Panel } from 'react-toolbox';
import socket from './websockets.js';
import LoginModal from './LoginModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userId: '',
      role: 'pleeb',
      mood: 1,

      tracks: [
        {
          artist: 'Yeezy',
          apiSource: 'test',
        },
      ],
      currentTrack: {
        artist: 'Yeezy',
        apiSource: 'test',
      },
      searching: false,
    };
  }

  componentDidMount() {
    socket.on('user joined', (user) => {
      this.setState(
        { username: user.username,
          userId: socket.id });
    });
    socket.on('update track', (track) => {
      this.handleCardPlay(track);
    });

    const self = this;
    queryAll({ query: 'Kanye',
      })
      .then((results) => {
        console.log(results);
        self.setState({
          tracks: results,
        });
      });
  }

  handleCardPlay(track) {
    this.setState({
      currentTrack: track,
    });
  }

  handleSearch(value) {
    const self = this;
    if (value === null) {
      this.setState({
        searching: false,
      });
    }
    this.setState({
      searching: true,
    });
    queryAll({ query: value })
      .then((results) => {
        self.setState({
          tracks: results,
          searching: false,
        });
      });
  }

  render() {
    return (
      <div>
        <Layout className='layout'>
          <NavDrawer active={true}
                    pinned={true}
                    className='navDrawer'
                    >
            <PlayList handleCardPlay = {this.handleCardPlay.bind(this)} />
          </NavDrawer>
            <Panel>
          <AppBar className="appBar" >
            <SongPlayer track = {this.state.currentTrack} />
          </AppBar>
          <Nav className="searchBar" handleSearch = { this.handleSearch.bind(this) } searching={ this.state.searching } />
            <CardsContainer tracks = {this.state.tracks}
              handleCardPlay = {this.handleCardPlay.bind(this)}
            />
          </Panel>
        </Layout>
        <LoginModal />
      </div>
    );
  }
}

export default App;
