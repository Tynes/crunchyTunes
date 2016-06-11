import React from 'react';
import Nav from './nav.js';
import SongPlayer from './songplayer.jsx';
import CardsContainer from './cardsContainer.jsx';
import AppBar from 'react-toolbox/lib/app_bar';
import queryAll from './queryAll.js';
import Button from 'react-toolbox/lib/button';
import ChatBox from './chatBox.jsx'
import io from 'socket.io-client';
import PlayList from './playList.jsx';
import { Layout, NavDrawer, Panel, Sidebar, IconButton} from 'react-toolbox';
import socket from './websockets.js';
import LoginModal from './LoginModal.jsx';
import ChangeRoom from './changeRoom.jsx';
import artists from './artists.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 0,
      username: '',
      userId: '',
      dictator: '',
      isDictator: false,
      room: 'HR41',
      mood: 0,

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
      sidebarPinned: false,
    };
  }

  // add something that alters role in state

  componentDidMount() {
    socket.on('user joined', (username) => {
      this.setState(
        { username: username,
          userId: socket.id });
    });
    socket.on('you are dictator', (dictator) => {
      // toggle a dictator symbol on the screen
      this.setState({
        isDictator: true,
        dictator: dictator,
      });
    });

    socket.on('new dictator', (dictator) => {
      this.setState({ dictator: dictator});
    });

    socket.on('update track', (track) => {
      this.handleCardPlay(track);
    });

    socket.on('update temperature', (temperature) => {
      console.log('temp in client', temperature);
      this.setState({ temperature: temperature });
    });

    const self = this;
    var randomArtist = artists[Math.floor(Math.random() * artists.length)];
    queryAll({ query: randomArtist,
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

  toggleSidebar() {
    this.setState({ sidebarPinned: !this.state.sidebarPinned});
  }

    handleRoomChange (room) {
    let oldRoom = this.state.room;
    this.setState({
      room: room
    });
    socket.emit('change room', {oldRoom:oldRoom, newRoom:room})
  }

  moodHandler(sentiment) {
    console.log('sentiment', sentiment);
    var mood = this.state.mood; // 0 or 1
    if (mood !== sentiment) {
      console.log('before set state', this.state);
      this.setState({ mood: sentiment }, function(){
        socket.emit('mood change', this.state.mood);    
      });
      // console.log('after set state', this.state);

      console.log('mood state', this.state.mood);
    }
    
  }

  render() {
    {console.log('dictator', this.state.dictator.username)}
    return (
      <div>
        <Layout className='layout'>
          <AppBar className="appBar" >
            <div>
              <div className='dictatorIs'>The ruling music dictator is {this.state.dictator.username}</div>
              <Button label="Like"  icon='favorite' accent onClick={ () => this.moodHandler(0) } />
              <Button label="Overthrow" onClick={ () => this.moodHandler(1) } />
            </div>
            <SongPlayer track = {this.state.currentTrack} />
            <span>Room: {this.state.room}</span>
            <span className='chatButton'><Button icon={this.state.sidebarPinned ? 'close' : 'inbox'} label='Chat' onClick={ this.toggleSidebar.bind(this) }/></span>
          </AppBar>
          <NavDrawer active={true}
                    pinned={true}
                    className='navDrawer'
                    >
            <PlayList temperature={this.state.temperature} handleCardPlay = {this.handleCardPlay.bind(this)} isDictator={ this.state.isDictator }/>
          </NavDrawer>
          <Panel>
            <div>
            <span className='navSpan'><Nav className="searchBar" handleSearch = { this.handleSearch.bind(this) } searching={ this.state.searching } /></span>
            <span className='room'><ChangeRoom userId = {this.state.userId} 
              handleRoomChange={this.handleRoomChange.bind(this)} 
              room = {this.state.room}/></span>
            </div>
              <CardsContainer tracks = {this.state.tracks}
                handleCardPlay = {this.handleCardPlay.bind(this)}
                room = {this.state.room}
                isDictator = {this.state.isDictator}
            />
          </Panel>
          <Sidebar className='sideBar' pinned={ this.state.sidebarPinned } width={ 5 }>
            <ChatBox toggleSidebar={this.toggleSidebar.bind(this)} username={this.state.username } />
          </Sidebar>
          <div><Button icon={this.state.sidebarPinned ? 'close' : 'inbox'} label='Chat' onClick={ this.toggleSidebar.bind(this) }/></div>
        </Layout>
        <LoginModal />
    </div>
    );
  }
}

export default App;
