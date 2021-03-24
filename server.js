//Dependenices
const http = require("http");
const express = require("express");
const path = require("path");

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
app.get("/api/notes",function(req, res){
//retrieve all notes and res.json them back to the front end
})
app.post("/api/notes",function(req, res){
    //creates a note from req.body
})
app.delete("/api/notes/:id", function(req, res){
    //delete a note based off id
    const{ id } = req.params;


})




app.get("*", (req, res) => res.redirect(path.join(__dirname, "/index.html")));

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});
