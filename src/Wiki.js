import React, { Component } from 'react';

const apiUrl = query => 
`https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`



class Wiki extends Component {
    constructor(props){
        super(props);
      this.state = {
        query: '',
        wikiData: undefined,
        requestFailed: false,
        suggestions: [],
        title: null,
        description: [],
        links: []
      }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      console.log('Insiide Constructor')
    }
    handleChange(event){
        event.preventDefault();
        this.setState({
            query: event.target.value
        });
    }
    handleSubmit(event){
        console.log('hi');
        let query =  this.state.query;
        query ? this.getData(query) : false;
        event.preventDefault();

    } 
    //Method calls API retrivies and stores data in state
    getData(){
      console.log('Before fetch')
        fetch(apiUrl(this.state.query))
        .then(console.log('fetch successful'))
        .then(response => {
            if(!response.ok){
                throw Error("msh sha3'ala!")
            }
            return response
        })
        .then(data => data.json())
        .then(data => {
            this.setState({
                suggestions: data[1],
                title: data[0],
                description: data[2],
                links: data[3]
            })
          console.log(data)
        }, ()=>{
          this.setState({
            requestFailed: true
          })
        })
    }
    render(){
        //Returns "Request Failed" if api fails to connect 
        if(this.state.requestFailed) return <h1>Request Failed</h1>
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Search Wikipedia"
                            value={this.state.query}
                            onChange={this.handleChange}
                            ></input>
                            <input type="submit" value="Submit" />
                </form>
                <ul>
                    {
                    (this.state.query == this.state.title) ? this.state.description.map((item, index) =>
                        {return (
                                <ListItem key={index}
                                        title={this.state.suggestions[index]}
                                        description={item}
                                        url={this.state.links[index]}/>)}
                    ) : null
                }
                </ul>
            </div>
        )
    }
}

// A single listing view
function ListItem(props) {
  return(
      <li>
          <a href={props.url} target="_blank">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          </a>
      </li>
  ) 
}

export default Wiki;