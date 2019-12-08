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
      id: null,
      title: "New note",
      contents: "Start typing here!",
      readOnly: false,
      new: false,
      editTitle: false,
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
    .then(res => {
      console.log(res);
      this.setState({backToAllNotes: true});
    });
  };

  editNote = () => {
    axios.put(`${server}/notes/${this.state.id}`, JSON.stringify({
      title: this.state.title,
      contents: this.state.contents
    }), axiosConfig)
    .then(res => {
      console.log(res);
      this.setState({backToAllNotes: true});
    });
  };

  deleteNote = () => {
    axios.delete(`${server}/notes/${this.state.id}`)
    .then(res => {
      console.log(res);
      this.setState({backToAllNotes: true});
    });
  };

  componentDidMount() {
    if (!this.props.new) {
      const {match: {params}} = this.props;
      axios.get(`${server}/notes/${params.noteId}`)
        .then(res => {
          if (!res.data.error) {
            this.setState({id: params.noteId, title: res.data.note.title, contents: res.data.note.contents, readOnly: true})
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
      <section className="main-container">
        {this.state.editNewNote && <Redirect to={`/new`}/>}
        {this.state.backToAllNotes && <Redirect to={`/`}/>}
        <button onClick={() => this.setState({backToAllNotes: true})}>View all notes</button><br/>
        <h3>{(this.state.new || this.state.editTitle) ? <input type="text" value={this.state.title} onChange={this.handleTitleChange} /> : <>{this.state.title} <span onClick={() => this.setState({editTitle: true})}>✍</span></>}</h3>
        <ReactQuill value={this.state.contents} onChange={this.handleContentsChange} /><br/>
        {this.state.new ? <input type="submit" value="Create new note" onClick={() => this.newNote()}/> : <><input type="submit" value="Edit note" onClick={() => this.editNote()}/> <input type="submit" value="Delete note" onClick={() => this.deleteNote(this.state.id)}/></>}
      </section>
    );
  }
};

export default ViewNote;
