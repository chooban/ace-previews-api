var express = require("express"),
  app = express(),
  rootHandler = require("./routes/index"),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/', rootHandler);

var server = app.listen(process.env.PORT || 8100, function() {
  var port = server.address().port;
});

module.exports = server;
