import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import ReactQuill from 'react-quill';

const server = "http://localhost:8080";
const axios = require("axios").default;

let axiosConfig = {
  headers: {
      "Access-Control-Allow-Origin": "*",
  }
};

class ViewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "New note",
      contents: "Start typing here!",
      readOnly: false,
      new: false,
      editNewNote: false,
      backToAllNotes: false
    };
  };

  handleContentsChange = (value, delta, source, editor) => {
    this.setState({contents: editor.getHTML()});
  }

  handleTitleChange = event => {
    this.setState({title: event.target.value});
  }

  newNote = () => {
    axios.post(`${server}/notes`, JSON.stringify({
      title: this.state.title,
      contents: this.state.contents
    }), axiosConfig)
    .then(function (response) {
      console.log(response);
    });
  }

  componentDidMount() {
    if (!this.props.new) {
      const { match: { params } } = this.props;
      axios.get(`${server}/notes/${params.noteId}`)
        .then(res => {
          if (!res.data.error) {
            this.setState({ title: res.data.note.title, contents: res.data.note.contents, readOnly: true})
          } else {
            this.setState({editNewNote: true, new: true, readOnly: false});
          }
        }).catch(error => {
          this.setState({editNewNote: true, new: true, readOnly: false});
        })
    } else {
      this.setState({new: true, readOnly: false});
    }
  };

  render() {
    return (
      <article>
        {this.state.editNewNote && <Redirect to={`/new`}/>}
        {this.state.backToAllNotes && <Redirect to={`/`}/>}
        <button onClick={() => this.setState({backToAllNotes: true})}>View all notes</button><br/>
        {this.state.new ? <input type="text" value={this.state.title} onChange={this.handleTitleChange} /> : <h3>{this.state.title}</h3>}
        <ReactQuill value={this.state.contents} readOnly={this.state.readOnly}
                  onChange={this.handleContentsChange} />
        {this.state.new && <input type="submit" value="Create new note" onClick={() => this.newNote()}/>}
      </article>
    );
  }
};

export default ViewNote;