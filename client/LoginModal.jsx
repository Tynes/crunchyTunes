import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import Button from 'react-toolbox/lib/button';
import Input from 'react-toolbox/lib/input';
import socket from './websockets.js';


class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: true,
      name: name,
    };
  }

  handleToggle() {
    this.setState(
      { active: false });
    const username = this.state.name;
    function setUsername() {
      if (username) {
        socket.emit('add user', username);
      }
    }
    setUsername();
  }


  changeState(name, value) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <Dialog
          active={ this.state.active }
          onEscKeyDown={ this.handleToggle }
          onOverlayClick={ this.handleToggle }
          title="Enter Music Dictator"
        >
        <Input type="text" label="Name" name="name" value={ this.state.name }
          onChange={ this.changeState.bind(this, 'name') } maxLength={ 16 }
        />
        <Button label="Join" raised primary accent onClick={ this.handleToggle.bind(this) } />
        </Dialog>
      </div>
    );
  }
}

export default LoginModal;
