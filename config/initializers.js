module.exports = function (app) {
  var logger = require('winston');
  var env = app.get('env');
  var bodyParser = require('body-parser');

  if (env === 'test') {
    logger.remove(logger.transports.Console);
  } else if (env === 'dev') {
    logger.level = 'debug';
  }

  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());
};
