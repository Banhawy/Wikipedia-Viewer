import React, { Component } from 'react';
import logo from './logo.svg';
import Wiki from './Wiki';
import './App.css';

// <Github username="Banhawy"></Github>
class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Wiki query="trump"></Wiki>

      </div>
    );
  }
}

export default App;
