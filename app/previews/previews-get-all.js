var logger = require('../util/logger');
var fs = require('fs');

module.exports = function (req, res, next) {
  logger.debug('Handling request for all files');
  fs.readdir('/data/', function filterFiles(err, files) {
    if (err) {
      return next(err);
    }

    res.json(files);
  });
};
