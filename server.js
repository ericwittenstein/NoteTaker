// initial declarations for tools
const express = require('express');
const path = require('path');
const fs = require('fs');

const notesList = require('./db/db.json');
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');

// uuid makes a random number; this line of text showed up after i autocompleted a portion of my post api route text, looks like its part of TypeScript?
const uuid = require('./helpers/uuid');

// create the port for the server
const PORT = process.env.PORT || 3001;
const app = express();

// copied from mini project, used to handle json parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// basic get route to connect to the index html page when someone visits the url with no additional endings
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// basic get route to connect to the notes html page when someone visits the url with /notes on the end
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// get method for retrieving notes and parsing through json
app.get('/api/notes', (req, res) => {
    res.json(notesList);
});

// post method for writing notes
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const noteToAdd = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(noteToAdd, './db/db.json');
        res.json('id generated');
    } else {
        console.log(`Error! Try again!`);
    }
});

// delete method re-writes the json file to include everything except the note at the specified id
// app.delete('/api/notes/:id', (req, res) => {
//     // reads the notes list as it stands
//     let notes = fs.readFileSync('./db/db.json');
//     // parses it
//     notes = JSON.parse(notes);
//     // returns the parsed notes
//     res.json(notes);
//     // creates a variable of the note at the specified id
//     const { id } = req.params;

//     // re-writes the notes variable to exclude the chosen note
//     notes = notes.filter(noteToDelete => noteToDelete.id !== id);
//     fs.writeFile('./db/db.json', JSON.stringify(notes));
// });

// initial server creation at port
app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT}`)
);