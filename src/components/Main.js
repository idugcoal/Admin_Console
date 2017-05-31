import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { auth } from '../utils/FirebaseService';
import { fetchDepartures } from '../actions';
import '../styles/Main.css';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  handleClick(email, password) {
    // auth.signInWithEmailAndPassword(email, password)
    //   .then((user) => console.log(user))
    //   .then(() => fetchDepartures())
  }

  render() {
    return (
      <div className="Main">
        <div className="Main-header">
          <h2>Sierra Aviation Group - Web Portal</h2>
        </div>
        <LoginForm handleClick={this.handleClick.bind(this)}/>  
      </div>
    );
  }
}

export default Main;
