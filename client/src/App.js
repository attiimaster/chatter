import React, { Component } from 'react';
import './App.css';

import Chat from "./components/Chat";
import FormContainer from "./components/FormContainer";

class App extends Component {
  constructor() {
    super();
    this.state = { username: "", secret: "" };   // needs to be undefined
    this.isAuth = () => {
      console.log(this.state.username)
      return !this.state.username ? "overlay overlay-hidden" : "overlay"  // remove !
    }
    this.onChangeUsername = (e) => this.setState({ username: e.target.value });
    this.onChangeSecret = (e) => this.setState({ secret: e.target.value });
  }

  componentDidMount() { 
    const el = document.querySelector(".start-overlay");
    el.className += " start-overlay-active";
    setTimeout(() => el.className = "overlay start-overlay", 1000);
  }


  render() {
    const { username, secret } = this.state;
    return (
      <div className="App">

        <div className="overlay error-overlay">
        <div>
          <h4>You have to provide a username and a secret. Just enter one above.</h4>
        </div>
        </div>

        <div className="overlay start-overlay">
        <div>
          <h1>chatter</h1>
          <h2>Message secretly with anyone.</h2>
          <h4>You have to provide a username and a secret. Just enter one above.</h4>
        </div>
        </div>

        <nav>
          <span className="logo">chatter.</span>
          <input value={ this.state.username } onChange={ this.onChangeUsername } placeholder="Enter a username" />
          <input value={ this.state.secret } onChange={ this.onChangeSecret } placeholder="Enter your secret key" />
        </nav>

        <Chat username={ username } secret={ secret } />

      </div>
    );
  }
}

export default App;
