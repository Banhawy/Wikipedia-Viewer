import React, { Component } from 'react';

export default class Form extends Component {
    state = {
        query: undefined
    };

    render(){
        return(
            <form>
                <input placeholder="Search Wikipedia"
                        value={this.state.query}></input>
            </form>
        )
    }
}