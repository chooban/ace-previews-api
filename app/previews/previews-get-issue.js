const fs = require('fs');
const PreviewsStore = require('../stores/previewsStore');

module.exports = function (request, response, next) {
  const issueNumber = request.params.previews_issue;
  const isANumber = /^\d+$/;

  if (!isANumber.test(issueNumber)) {
    return next({
      status: 400,
      message: 'Invalid issue number supplied',
    });
  }

  PreviewsStore.getSingleIssue(issueNumber, (err, fileData) => {
    console.log("Error from store: " + err);
    if (err) return next(err);

    if (fileData) {
      response.json(fileData);
    } else {
      return next({
        status: 404,
        message: 'Could not find Previews issue ' + issueNumber,
      });
    }
  });
};
