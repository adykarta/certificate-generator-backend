const certificate = require("./src/services/certificate");
var express = require("express");
var app = express();

app.get("/", function (req, res) {
  certificate.generateCertificate();
  res.status(200).send("Hello World!");
});

var port = process.env.PORT || 8080;

var server = app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
