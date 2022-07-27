// initial declarations for tools
const express = require('express');
const path = require('path');
const fs = require('fs');

// uuid makes a random number
const uuid = require('./helpers/uuid');

// create the port for the server
const PORT = process.env.PORT || 3001;
const app = express();

// copied from mini project, used to handle json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// basic get route to connect to the index html page when someone visits the url with no additional endings
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// basic get route to connect to the notes html page when someone visits the url with /notes on the end
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// TODO: need to make a write to file of some sort? like that makes the html for the cards themselves?

// TODO: need to make something that adds to existing notes list in the json db

// TODO: need to make a get for retrieving and parsing the notes, a post for writing, and delete for deleting

// initial server creation at port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);