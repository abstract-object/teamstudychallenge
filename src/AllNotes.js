import React, {Component} from "react";

import Note from "./Note";
import axios from "axios";

const server = "http://localhost:8080";

class AllNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {}
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
      <h3>All notes</h3>
      {Object.keys(this.state.notes).map(id => {
        return (
          <Note key={id} id={id} title={this.state.notes[id]}/>
        );
      })}
    </div>)
  }
};

export default AllNotes;
