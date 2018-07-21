import React, { Component } from 'react';
import './App.css';

import Chat from "./components/Chat";
import FormContainer from "./components/FormContainer";

class App extends Component {
  constructor() {
    super();
    this.state = { username: "Attii" };   // needs to be undefined
    this.isAuth = () => {
      console.log(this.state.username)
      return this.state.username ? "overlay overlay-hidden" : "overlay"
    }
  }

  componentDidMount() { console.log("") }


  render() {
    return (
      <div className="App">
        <div className={ this.isAuth() }>
          <FormContainer
            onSubmit={ (e) => {e.preventDefault();this.setState({ username: e.target[0].value });} }
            onChange={ (e) => console.log(e.target.value) } />
        </div>
        <Chat username={ this.state.username } />
      </div>
    );
  }
}

export default App;
