import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {grey500, grey50, grey300} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

import wiki_logo from './wiki_logo.png';
import Wiki from './Wiki';
import './App.css';

const style = {
  margin: 12,
  float: 'right'
};

const githubIcon = <FontIcon className="fa fa-github" />;
const githubButton = <FlatButton
                      backgroundColor={grey300}
                      hoverColor={grey500}
                      href="https://github.com/callemall/material-ui"
                      target="_blank"
                      icon={githubIcon}
                      style={style}
                      />
class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
      <div className="App">
        <div className="App-header">
          <img src={wiki_logo} className="App-logo" alt="logo" />
          {githubButton}
          <h2>Wikipedia Viewer in ReactJs</h2>
        </div>
        <Wiki></Wiki>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
