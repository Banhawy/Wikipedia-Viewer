import React, { Component } from 'react';

const apiUrl = query => 
`https://crossorigin.me/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`



class Wiki extends Component {
    constructor(props){
        super(props);
      this.state = {
        wikiData: undefined,
        requestFailed: false,
        suggestions: []
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
                wikiData: data
            })
          console.log(data)
        }, ()=>{
          this.setState({
            requestFailed: true
          })
        })
    }
    getList(array){
        const descriptionList = array.map((description) => 
          <li>{description}</li> 
        )
        return(
          <ul>{descriptionList}</ul>                          
        )
    }
    render(){
        if(this.state.requestFailed) return <h1>Request Failed</h1>
        if(!this.state.wikiData) return <h2>Loading</h2>
        return (
            <div>
                <h1>Something happened</h1>
            <h2>It's {this.state.wikiData[0]}</h2>
            <description name={this.state.wikiData[1]} />
            <ul>
                {this.state.wikiData[1].map((description, index) =>
                    <ListItem key={index} 
                              value={description}/>
                )}
            </ul>
            </div>
        )
    }
}
function ListItem(props) {
  return <li>{props.value}</li>;
}

export default Wiki;