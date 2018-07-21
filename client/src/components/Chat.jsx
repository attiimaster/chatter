import React, { Component } from 'react';
import io from 'socket.io-client';
import CryptoJS from "crypto-js";
import './css/Chat.css';

import MessagesContainer from "./MessagesContainer";
import FormContainer from "./FormContainer";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
        message: '',
        messages: []
    };

    this.socket = io("localhost:3001", { query: { variable: "variable" } });

    this.socket.on('SEND_MESSAGE_RES', (data) => addMessage(data));
    this.socket.on("TEST_RES", (data) => console.log(data));

    const addMessage = (data) => {
      this.setState({ messages: [ ...this.state.messages, data ] });
    }

    this.sendMessage = (e) => {
      e.preventDefault();
      this.socket.emit('SEND_MESSAGE_REQ', {
        message: this.state.message,
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
  componentDidMount() {
    const text = "Secret Message!";
    const key = "secretKey";

    const encrypted = CryptoJS.AES.encrypt(text, key);
    console.log(encrypted)

    const bytes = CryptoJS.AES.decrypt(encrypted.toString(), key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decrypted)
  }

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