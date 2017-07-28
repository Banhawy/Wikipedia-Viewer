import React, { Component } from 'react';

const apiUrl = query => 
`https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`



class Wiki extends Component {
    constructor(props){
        super(props);
      this.state = {
        wikiData: undefined,
        requestFailed: false,
        suggestions: [],
        title: null,
        description: [],
        links: []
      }
      console.log('Insiide Constructor')
    }
    componentDidMount(){
      this.getData()
    }
    getData(){
      console.log('Before fetch')
        fetch(apiUrl(this.props.query))
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
        if(this.state.requestFailed) return <h1>Request Failed</h1>
        if(!this.state.title) return <h2>Loading</h2>
        return (
            <div>
                <h1>Something happened</h1>
            <h2>It's {this.state.title}</h2>
            <description name={this.state.title} />
            <ul>
                {this.state.description.map((item, index) =>
                    <ListItem key={index}
                                title={this.state.suggestions[index]}
                                description={item}
                                url={this.state.links[index]}/>
                )}
            </ul>
            </div>
        )
    }
}
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