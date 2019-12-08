import React, {Component} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';
import AllNotes from "./AllNotes";
import ViewNote from "./ViewNote";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: null,
      notes: {}
    };
  };

  viewNote(id) {
    this.state.notes[id] ? this.setState({view: id}): this.setState({view: null});
  }

  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <AllNotes {...props} notes={this.state.notes}/>}/>
        <Route path="/notes/:noteId" component={ViewNote}/>
        <Route path="/new" render={(props) => <ViewNote {...props} new={true}/>}/>
      </Switch>
      </BrowserRouter>
    );
  };
}

export default App;
