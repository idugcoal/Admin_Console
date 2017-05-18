import React, { Component } from 'react';
import LoginForm from './LoginForm';
import './Main.css';

class Main extends Component {
  
  componentDidMount() {

  }

  render() {
    return (
      <div className="Main">
        <div className="Main-header">
          <h2>Sierra Aviation Group - Admin Console</h2>
        </div>
        <LoginForm />  
      </div>
    );
  }
}

export default Main;
