import React from 'react';
import ReactDOM from 'react-dom';
import socket from './websockets.js'

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    }
  }

  updateMessages(message) {
    //get new message from user and update it on their page
    var msgsCopy = this.state.messages.slice();
    msgsCopy.push(message);
    this.setState({'messages': msgsCopy});

    //automatic scroll to bottom so user sees new message
    var domnode = ReactDOM.findDOMNode(this.refs.chats);
    ReactDOM.findDOMNode(this.refs.chats).scrollTop = domnode.scrollHeight;
  }

  componentDidMount () {

    //getting messages emmited from any users
    socket.on('new message', (message) => { 
       
      this.updateMessages(message);
    });
  }


  //message from user to all other users
  handleUserInputMessage (e) {
    e.preventDefault();
    var message = {message: this.refs.newMessage.value, username: this.props.username};
    //reset field so user doesn't have to manually fix erase what they just wrote
    this.refs.newMessage.value = '';

    //emit new message to self and all
    socket.emit('new message', message);
    socket.broadcast.emit('new message', message);


  }



  render() {
    return ( 
      <div ref='chats' className='chats'>
        <h1>Chat:</h1>
        {this.state.messages.map((message) => 
          <p>{message.username}: {message.message}</p>
        )}
        <form className="commentForm" onSubmit={this.handleUserInputMessage.bind(this)}>
          <input ref='newMessage'/>
        </form>
      </div>
    );
  }
}

export default ChatBox;