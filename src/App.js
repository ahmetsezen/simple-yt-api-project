import React, { Component } from 'react';
import Youtube from './Components/Youtube';


class App extends Component {
  render() {
    return (
      <div>
        <header style={{backgroundColor:'red', height:"75px", textAlign:"center", color:"white", padding:"20px"}}>
          <h2>Get From YouTube</h2>
        </header>
        <Youtube />
      </div>
    );
  }
}

export default App;
