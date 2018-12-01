import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {grey500} from 'material-ui/styles/colors';
import FontAwesome from 'react-fontawesome';

const apiUrl = query =>
`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}`

const style = {
  margin: 12,
  floatingLabelStyle: {
    color: grey500
  },
  underlineStyle: {
    borderColor: grey500,
  },
};

const wikiIcon = <FontAwesome  name="wikipedia-w"/>;
const submitButton = <RaisedButton
                      label="Search"
                      labelPosition="before"
                      icon={wikiIcon}
                      style={style}
                      value="Submit"
                      type="Submit"
                      />


class Wiki extends Component {
    constructor(props){
        super(props);
      this.state = {
        query: '',
        wikiData: undefined,
        requestFailed: false,
        fetchingData: false,
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
        let state = this.state;
        this.setState({
          fetchingData: true
        })
        query ? this.getData(query) : false;
        event.preventDefault();

    }
    //Method calls API retrivies and stores data in state
    getData(){
      console.log('Before fetch')
        fetch(apiUrl(this.state.query))
        // .then(console.log('fetch successful'))
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
                links: data[3],
                fetchingData: false
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
        if(this.state.fetchingData) return <h2>Loading...</h2>
        return (
          <div>
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <TextField
                    className="ui-form"
                    floatingLabelText="Search Wikipedia"
                    value={this.state.query}
                    onChange={this.handleChange}
                    loatingLabelStyle={style.floatingLabelStyle}
                    underlineFocusStyle={style.underlineStyle}
                    />
                            {submitButton}
                  <p>
                    <a href="https://en.wikipedia.org/wiki/Special:Random" rel="noopener noreferrer" target="_blank">
                    Get random article
                    </a>
                  </p>
                </form>
            </div>
            <div className="listings">
                <ul>
                    {
                    (this.state.title) ? this.state.description.map((item, index) =>
                        {return (
                                <ListItem key={index}
                                        title={this.state.suggestions[index]}
                                        description={item}
                                        url={this.state.links[index]}/>)}
                    ) : null
                }
                </ul>
                </div>
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
