import React, { Component } from 'react';
import io from 'socket.io-client';
import './css/Chat.css';

import MessagesContainer from "./MessagesContainer";
import FormContainer from "./FormContainer";
import { encrypt, decrypt } from "../crypto.js";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
        message: '',
        messages: []
    };

    this.socket = io("localhost:3001", { query: { variable: "variable" } });

    this.socket.on('SEND_MESSAGE_RES', (data) => {
      data.message = decrypt(data.message, this.props.secret);
      addMessage(data);
    });
    this.socket.on("TEST_RES", (data) => console.log(data));

    const addMessage = (data) => {
      this.setState({ messages: [ ...this.state.messages, data ] });
    }

    this.sendMessage = (e) => {
      e.preventDefault();
      const encMsg = encrypt(this.state.message, this.props.secret);
      this.socket.emit('SEND_MESSAGE_REQ', {
        message: encMsg,
        username: this.props.username
      });
      this.setState({ message: '' });
    }

    this.handleTest = (e) => {
      e.preventDefault();
      console.log("handletest");
      this.socket.emit("TEST_REQ", { test: "success" });
    }

  }
  componentDidMount() {}

  render() {
    return (
      <div className="chat">
      <button onClick={ this.handleTest }>TEST</button>
        <MessagesContainer messages={ this.state.messages } />

        <FormContainer 
          onSubmit={ this.sendMessage } 
          onChange={ (e) => this.setState({ message: e.target.value }) } 
          value={ this.state.message } />
      </div>
    );
  }
}

export default Chat;