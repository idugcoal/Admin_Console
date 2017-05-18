import React, { Component } from 'react';
import LoginForm from './LoginForm';
import '../styles/Main.css';

class Main extends Component {


  render() {
    return (
      <div className="Main">
        <div className="Main-header">
          <h2>Sierra Aviation Group - Web Portal</h2>
        </div>
        <LoginForm />  
      </div>
    );
  }
}

export default Main;
