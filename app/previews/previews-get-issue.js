var fs = require('fs');

module.exports = function (request, response, next) {
  var issueNumber = request.params.previews_issue;
  var isANumber = /^\d+$/;
  var isTheIssue = new RegExp('ecmail' + issueNumber + '\.csv');

  if (isANumber.test(issueNumber)) {
    fs.readdir('/data/', function (err, files) {
      if (err) {
        return response.status(500).end();
      };

      var matching = files.filter(function (file) {
        return isTheIssue.test(file);
      });

      if (matching.length === 1) {
        fs.readFile('/data/' + matching[0], 'utf8', function (err, contents) {
          if (err) {
            return response.status(500).end();
          };

          response.send(contents);
          next();
        });
      } else {
        return response.status(404).end();
      }
    });
  }
};
