var express = require('express');
var app = express();
var previews = require('previews');
var fs = require('fs');
var logger = require('winston');
var config = require('./config/initializers')(app);
var server = undefined;

require('./app/routes')(app);

try {
  previews.initialize({
    appKey: process.env.APP_KEY,
    apiKey: process.env.API_KEY,
  });
} catch (e) {
  logger.error(e);
  process.exit();
}

server = app.listen(process.env.PORT || 8100, function () {
  var port = server.address().port;
  logger.info('Listening on port ' + port);
});

module.exports = server;
