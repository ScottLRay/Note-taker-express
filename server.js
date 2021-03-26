//Dependenices
const http = require("http");
const uuid = require("uuid/v1");
const express = require("express");
let data = require(__dirname + "/./db/db.json")

const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;

//mid man body for the .post i will need
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes
//basic route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

//Api routes
app.get("/api/notes", function (req, res) {
  //retrieve all notes and res.json them back to the front end
  // fs.readFile("/./db/db.json", "utf8", function (err, data) {
  //   res.json(JSON.parse(data));
  // });
  res.json(data)
});

app.post("/api/notes", function (req, res) {
  //creates a note from req.body
  req.body.id = uuid();
  data.push(req.body);
  const newdata = JSON.stringify(data);
  fs.writeFile(__dirname + "/./db/db.json", newdata, function (err) {
    if (err) throw err;
  });

  //respond to user
  res.end();
});

app.delete("/api/notes/:id", function (req, res) {
  //delete a note based off id
  const { id } = req.params;
  let filterData = data.filter(function (notes) {
    return notes.id != id;
  });
  let newNote = JSON.stringify(filterData);
  data = filterData;
  fs.writeFile(__dirname, "/./db/db.json", newNote, function (err) {
    if (err) throw err;
  });
  res.end()
});

app.get("*", (req, res) => res.redirect(path.join(__dirname, "/index.html")));

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
