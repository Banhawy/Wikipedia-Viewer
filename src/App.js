import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import FontAwesome from 'react-fontawesome';

import wiki_logo from './wiki_logo.png';
import Wiki from './Wiki';
import './App.css';

const style = {
  margin: 12,
};

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <div className="App-header">
        <RaisedButton
      href="https://github.com/callemall/material-ui"
      target="_blank"
      secondary={true}
      icon={<FontAwesome name="medium" />}
      style={style}
    />
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
