import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Sierra Aviation Group - Admin Console</h2>
        </div>
        <p className="App-intro">
          Log in to get started
        </p>
        <form>
          <input type="text" />
          <input type="password" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default App;
