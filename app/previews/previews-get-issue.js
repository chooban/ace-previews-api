var fs = require('fs');

module.exports = function (request, response, next) {
  var issueNumber = request.params.previews_issue;
  var isANumber = /^\d+$/;
  var isTheIssue = new RegExp('ecmail' + issueNumber + '\.csv');

  if (isANumber.test(issueNumber)) {
    fs.readdir('/data/', function (err, files) {
      if (err) {
        return next(err);
      };

      var matching = files.filter(function (file) {
        return isTheIssue.test(file);
      });

      if (matching.length === 1) {
        var filename = matching[0];
        fs.readFile('/data/' + filename, 'utf8', function (err, contents) {
          if (err) {
            return next(err);
          };

          response.json({
            'file': filename.split('.')[0],
            'contents': contents
          });
        });
      } else {
        return next({
          status: 404,
          message: 'Could not find Previews issue'
        });
      }
    });
  }
};
