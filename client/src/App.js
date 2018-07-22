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

        <ErrorOverlay />
        <StartOverlay />
        
        <NavBar value={{ username: this.state.username, secret: this.state.secret }} onChange={{ username: this.onChangeUsername, secret: this.onChangeSecret }}/>
        <Chat username={ username } secret={ secret } />

      </div>
    );
  }
}

export default App;


const NavBar = (props) => {
  const { value, onChange } = props;
  return (
    <nav>
      <span className="logo">chatter.</span>
      <div className="inputs">
        <input value={ value.username } onChange={ onChange.username } placeholder="Enter a username" />
        <input value={ value.secret } onChange={ onChange.secret } placeholder="Enter your secret key" />
      </div>
    </nav>
  );
}
const ErrorOverlay = () => {
  return (
    <div className="overlay error-overlay">
      <div>
        <h4>You have to provide a username and a secret. Just enter one above.</h4>
      </div>
    </div>
    );
}
const StartOverlay = () => {
  return (
    <div className="overlay start-overlay">
      <div>
        <h1>chatter</h1>
        <h2>Message secretly with anyone.</h2>
        <h4>You have to provide a username and a secret. Just enter one above.</h4>
      </div>
    </div>
    );
}
