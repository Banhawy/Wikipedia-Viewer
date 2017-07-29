import React, { Component } from 'react';
import Wiki from './Wiki';

export default class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: '',
            submittedQuery: undefined
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        event.preventDefault();
        this.setState({
            query: event.target.value
        });
    }
    handleSubmit(event){
        console.log('hi');
        this.setState({
            submittedQuery: event.target.value
        })

    } 
    render(){
        if(this.state.submittedQuery !== undefined) return <h1>BOO</h1>
        return(
            <form onSubmit={this.handleSubmit}>
                <input placeholder="Search Wikipedia"
                        value={this.state.query}
                        onChange={this.handleChange}
                        ></input>
                        <input type="submit" value="Submit" />
            </form>
        )
    }
}