var logger = require('winston');
var fs = require('fs');

module.exports = function (req, res, next) {
  fs.readdir('/data/', function filterFiles(err, files) {
    if (err) {
      return res.status(500).end();
    }

    res.json(files);
    next();
  });
};
