import React, {Component} from "react";
import {Redirect} from 'react-router-dom';

import Note from "./Note";
import axios from "axios";

const server = "http://localhost:8080";

class AllNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      new: false
    };
  };

  componentDidMount() {
    axios.get(`${server}/notes`)
    .then(res => {
      this.setState({notes: res.data.notes});
    })
  };

  render() {
    return (<div>
      {this.state.new && <Redirect to={`/new`}/>}
      <button onClick={() => this.setState({new: true})}>New note</button>
      <h3>All notes</h3>
      {Object.keys(this.state.notes).length ? <hr/> : <p>There are currently no notes to display</p>}
      {Object.keys(this.state.notes).reverse().map(id => {
        return (
          <Note key={id} id={id} title={this.state.notes[id]}/>
        );
      })}
    </div>)
  }
};

export default AllNotes;
