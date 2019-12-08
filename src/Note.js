import React, {Component} from "react";
import {Redirect} from 'react-router-dom';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
  }

  viewNote = id => {
    this.setState({redirect: id});
  };

  render(){
  return (
    <article>
    <button onClick={() => this.viewNote(this.props.id)}>
      <h4>{this.props.title}</h4>
    </button>
    {this.state.redirect && <Redirect to={`/notes/${this.state.redirect}`}/>}
    </article>
  );
  }
};

export default Note;
