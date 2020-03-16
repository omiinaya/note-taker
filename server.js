// Dependencies
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// Global variables
let allNotes = [];

// HTTP routes
// Route for index
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/public", "index.html"));
});

// Route for notes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

// API routes
// Route that returns json containing notes from db.json
app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", "utf-8", function read(err, data) {
        res.json(JSON.parse(data));
    });
});

// Route that adds notes to db.json by reading it, editing it, then writing all notes back into it
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    fs.readFile(__dirname + "/db/db.json", "utf-8", function read(err, data) {
        allNotes = JSON.parse(data); //receives all notes currently in db.json
        req.body.id = allNotes.length; //assigns ids based on array index
        allNotes.push(newNote); //pushes new note to the list of notes received
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(allNotes), function read(err, data) { //writes the new list of notes to db.json
            console.log("Note added.");
        });
    });
    res.json(newNote);
});

// Route that deletes notes from db.json by reading it, removing a note by it's id, then writing remaining notes into db.json
app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    fs.readFile(__dirname + "/db/db.json", "utf-8", function read(err, data) {
        allNotes = JSON.parse(data);
        allNotes.splice(id, 1);
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(allNotes), function read(err, data) {
            console.log("Note removed.");
        });
    });
    res.json(id);
});

// Listener
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
