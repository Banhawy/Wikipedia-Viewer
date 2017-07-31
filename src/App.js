import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {grey500} from 'material-ui/styles/colors';

import wiki_logo from './wiki_logo.png';
import Wiki from './Wiki';
import './App.css';

const style = {
  margin: 12
};

const githubIcon = <FontIcon className="fa fa-github" />;
class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <div className="App-header">
        <RaisedButton
          backgroundColor={grey500}
          href="https://github.com/callemall/material-ui"
          target="_blank"
          icon={githubIcon}
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
