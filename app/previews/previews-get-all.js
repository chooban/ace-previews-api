var logger = require('../util/logger');
var fs = require('fs');

module.exports = function (req, res, next) {
  logger.debug('Handling request for all files');
  fs.readdir('/data/', function filterFiles(err, files) {
    if (err) {
      return next(err);
    }
    var filteredFiles = files
                          .filter(isCsv)
                          .map(removeExtension)
                          .sort(sortByIssueNumber);

    res.json(filteredFiles);

    function isCsv(filename) {
      return /ecmail\d+\.csv/.test(filename);
    }

    function removeExtension(filename) {
      return filename.match(/\d+/)[0];
    }

    function sortByIssueNumber(a, b) {
      var issueA = +a.match(/\d+/)[0];
      var issueB = +b.match(/\d+/)[0];

      return issueB - issueA;
    }
  });
};
