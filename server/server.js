const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8080;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json())

const notes = {1: {
  title: "Example note",
  contents: "Lorem ipsum"
}};

const addNote = (title, contents) => {
  notes[Object.keys(notes).length + 1] = {
    title: title,
    contents: contents
  }
};

app.get("/notes", (req, res) => {
  let listOfNotes = {};
  for (let note of Object.keys(notes)) {
    listOfNotes[note] = notes[note].title;
  }
  res.json({notes: listOfNotes});
});

app.get("/notes/:noteId", (req, res) => {
  if (notes[req.params.noteId]) return res.json({note: notes[req.params.noteId]});
  res.json({error: true});
});

app.post("/notes", (req, res) => {
  let newNote = JSON.parse(Object.keys(req.body)[0])
  addNote(newNote.title, newNote.contents);
  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
