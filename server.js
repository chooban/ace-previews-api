var express = require("express"),
  app = express(),
  rootHandler = require("./routes/index"),
  previewsHandler = require('./routes/previews/rootHandler'),
  bodyParser = require('body-parser'),
  Parse = require("parse").Parse,
  fs = require("fs")

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/', rootHandler);
app.use('/previews', previewsHandler);

var config;
try {
  config = JSON.parse(fs.readFileSync(process.env.KEYS_FILE || "parseKeys.json"));
} catch(e) {
  console.log(e);
  process.exit();
}

Parse.initialize(config.appKey, config.apiKey)

var server = app.listen(process.env.PORT || 8100, function() {
  var port = server.address().port;
  console.log("Listening on port " + port);
});

module.exports = server;
