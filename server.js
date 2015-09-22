var express = require("express"),
  app = express(),
  bodyParser = require('body-parser'),
  Parse = require("parse/node").Parse,
  fs = require("fs"),
  logger = require("winston"),
  config = require("./config/initializers")(app);

require("./app/routes")(app);

var config;
try {
  config = JSON.parse(fs.readFileSync(process.env.KEYS_FILE || "parseKeys.json"));
} catch(e) {
  logger.error(e);
  process.exit();
}

Parse.initialize(config.appKey, config.apiKey)

var server = app.listen(process.env.PORT || 8100, function() {
  var port = server.address().port;
  logger.info("Listening on port " + port);
});

module.exports = server;
