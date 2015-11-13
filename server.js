var express = require("express"),
  app = express(),
  previews = require("previews"),
  fs = require("fs"),
  logger = require("winston"),
  config = require("./config/initializers")(app)

require("./app/routes")(app)

var config
try {
  previews.initialize({
    appKey: process.env.APP_KEY,
    apiKey: process.env.API_KEY
  })
} catch(e) {
  logger.error(e)
  process.exit()
}

var server = app.listen(process.env.PORT || 8100, function() {
  var port = server.address().port
  logger.info("Listening on port " + port)
})

module.exports = server
