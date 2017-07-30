import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import wiki_logo from './wiki_logo.png';
import Wiki from './Wiki';
import './App.css';


class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <div className="App-header">
          <img src={wiki_logo} className="App-logo" alt="logo" />
          <h2>Welcome to Wiki Viewer</h2>
        </div>
        <Wiki></Wiki>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
