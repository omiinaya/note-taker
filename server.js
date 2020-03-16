// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

//global vars
let allNotes = [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/public", "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", "utf-8", function read(err, data) {
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    fs.readFile(__dirname + "/db/db.json", "utf-8", function read(err, data) {
        allNotes = JSON.parse(data); //receives all notes currently in db.json
        allNotes.push(newNote); //pushes new note to the list of notes received
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(allNotes), function read(err, data) { //writes the new list of notes to the db.json file.
            console.log("Updated db.json");
        });
    });
});

app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id;
    fs.readFile(__dirname + "/db/db.json", "utf-8", function read(err, data) {
        allNotes = JSON.parse(data);
        allNotes.splice(id, 1);
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(allNotes), function read(err, data) {
            console.log("Updated db.json");
        });
    });
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
