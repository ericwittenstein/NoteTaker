// initial declarations for tools
const express = require('express');
const path = require('path');
const fs = require('fs');

const notes = require('./db/db.json');
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
    res.json(notes);
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
        res.json(notes);
    }
    else {
        console.log(`Error! Try again!`);
    }
});

// initial server creation at port
app.listen(PORT, () =>
    console.log(`Now listening at http://localhost:${PORT}`)
);