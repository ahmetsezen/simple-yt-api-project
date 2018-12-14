import React, { Component } from 'react';
import './App.css';
import Youtube from './Youtube';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Get From YouTube</h2>
        </div>
        <Youtube />
      </div>
    );
  }
}

export default App;
