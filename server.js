var express = require('express');
var app = express();
var fs = require('fs');
var logger = require('winston');
var config = require('./config/initializers')(app);
var server = undefined;

require('./app/routes')(app);

server = app.listen(process.env.PORT || 8100, function () {
  var port = server.address().port;
  logger.info('Listening on port ' + port);
});

module.exports = server;
