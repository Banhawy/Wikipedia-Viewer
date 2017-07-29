import React, { Component } from 'react';
// import logo from './logo.svg';
import Wiki from './Wiki';
import Form from './Form';
import './App.css';

// <Github username="Banhawy"></Github>
// onKeyPress={query => this.submit(query)}
class App extends Component {

  // onSubmit = query => {
  //     return (
  //       <div>
  //         <Wiki query={query}></Wiki>
  //       </div>
  //     )
  // }

  render() {
    return (
      <div className="App">

        <Form></Form>

      </div>
    );
  }
}

export default App;
