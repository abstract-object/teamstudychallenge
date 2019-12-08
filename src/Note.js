import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
  }

  viewNote = id => {
    this.setState({ redirect: id });
  };

  render() {
    return (
      <article className="note-list-item">
        <h4>{this.props.title}</h4>
        <span className="link" onClick={() => this.viewNote(this.props.id)}>View</span>
        {this.state.redirect && <Redirect to={`/notes/${this.state.redirect}`} />}
      </article>
    );
  }
};

export default Note;
