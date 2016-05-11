var fs = require('fs');
var PreviewsStore = require('../stores/previewsStore');

module.exports = function (request, response, next) {
  var issueNumber = request.params.previews_issue;
  var isANumber = /^\d+$/;

  if (isANumber.test(issueNumber)) {
    PreviewsStore.getSingleIssue(issueNumber, function(err, fileData) {
      if (err) return next(err);
     
      if (fileData) {
        response.json(fileData);
      } else {
        return next({
          status: 404,
          message: 'Could not find Previews issue ' + issueNumber
        });
      }
    });
  } else {
    return next({
      status: 400,
      message: 'Invalid issue number supplied'
    });
  }
};
