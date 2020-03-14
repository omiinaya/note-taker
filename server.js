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

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/public", "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname + "/public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile(__dirname+"/db/db.json", "utf-8", function read(err, data) {
        res.json(data);
    });
});

app.get("/api/test", (req, res) => res.json({ answer: 42 }));

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
