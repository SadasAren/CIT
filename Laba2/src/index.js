var express = require("express");
var app = express();
var unit = [];

app.get("/list", function (req, res) {
  let sometext = " ";
  for (let i = 0; i < 5; i++) {
    sometext += unit[i] + "|";
  }
  res.send(sometext);
});

app.post("/create", function (req, res) {
  for (let i = 0; i < 5; i++) {
    unit[i] = "Exp" + i;
  }
  res.send(unit);
});

app.get("/", function (req, res) {
  res.send("Ку!");
});
app.listen(3000);
