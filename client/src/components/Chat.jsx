import React, { Component } from 'react';
import io from 'socket.io-client';
import './css/Chat.css';

import MessagesContainer from "./MessagesContainer";
import FormContainer from "./FormContainer";
import { encrypt, decrypt } from "../encryption.service.js";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
        message: '',
        messages: [],
        users: false
    };

    this.socket = io("localhost:3001", { query: { variable: "variable" } });


    this.socket.on('SEND_MESSAGE_RES', (data) => {
      data.message = decrypt(data.message, this.props.secret);
      addMessage(data);
    });
    this.socket.on("TEST_RES", (data) => console.log(data));
    this.socket.on("connection_RES", (data) => {
      this.setState({ users: data.users });
      addMessage(data);
    });
    this.socket.on("disconnect_RES", (data) => {
      this.setState({ users: data.users });
      addMessage(data);
    });


    const addMessage = (data) => {
      this.setState({ messages: [ ...this.state.messages, data ] });
    }

    this.sendMessage = (e) => {
      this.socket.emit('SEND_MESSAGE_REQ', {
        message: encrypt(this.state.message, this.props.secret),
        username: this.props.username
      });
    }

    this.handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.props.username !== "")
      if (this.props.username !== "" && this.props.secret !== "") {
        this.sendMessage(e);
        this.setState({ message: '' });
      } else {
        const el = document.querySelector(".error-overlay");
        el.className += " error-overlay-active";
        setTimeout(() => el.className = "overlay error-overlay", 2000);
        return;
      }
    }

    this.handleTest = (e) => {
      e.preventDefault();
      console.log(this.state)
      console.log("handletest");
      this.socket.emit("TEST_REQ", { test: "success" });
    }

  }
  componentDidMount() {}

  render() {
    const { message, messages, users } = this.state;
    return (
      <div className="chat">
        <button onClick={ this.handleTest }>TEST</button>
        <OnlineUsers users={ users } />
        
        <MessagesContainer messages={ messages } />
        <FormContainer 
          onSubmit={ this.handleSubmit } 
          onChange={ (e) => this.setState({ message: e.target.value }) } 
          value={ message } />
      </div>
    );
  }
}

export default Chat;

const OnlineUsers = (props) => {
  const { users } = props;

  if (users && users.length === 1) { return <span>1 user online</span> }

  return (
    <span>{ users ? users.length : 0 } users online</span>
  );
}