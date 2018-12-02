import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {grey500} from 'material-ui/styles/colors';
import FontAwesome from 'react-fontawesome';
import Loader from 'halogen/RingLoader';
import $ from 'jquery';

const apiUrl = query =>
`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${query}&origin=*`

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
        this.setState({
          fetchingData: true
        })
        if (query) this.getData(query)
        event.preventDefault();

    }
    //Method calls API retrivies and stores data in state
    getData(){
        $.ajax(apiUrl(this.state.query), {
          dataType: "json",
          data: {
            origin: "*"
          },
          type: "GET",
          success: (data) => {
            console.log(data);
            this.setState({
                      suggestions: data[1],
                      title: data[0],
                      description: data[2],
                      links: data[3],
                      fetchingData: false
                  })
          },
          error: error => {
            console.log(error)
            this.setState({
              requestFailed: true,
              fetchingData: false
            })
          }
        });
    }
    render(){
        //Returns "Request Failed" if api fails to connect
        if(this.state.requestFailed) return <h1>Request Failed</h1>
        if(this.state.fetchingData) return <div id="loader"><Loader color="black" size="300px" margin="auto"/></div>
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
