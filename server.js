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
let notes = [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/public", "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname + "/db/db.json", "utf-8", function read(err, data) {
        res.json(data);
        //return res.json(data);
    });
});

app.post("/api/notes", function (req, res) {
    var newNote = req.body;

    notes.push(newNote);

    res.json(newNote);

    var jsonObj = JSON.parse(JSON.stringify(newNote));

    console.log(jsonObj);

    fs.appendFile(__dirname+"/db/db.json", newNote, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    });
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
