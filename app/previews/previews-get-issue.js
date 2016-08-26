const fs = require('fs');
const PreviewsStore = require('../stores/previewsStore');
const json2csv = require('json2csv');

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
    if (err) return next(err);

    if (fileData) {
      try {
        const fields = [
          'previewsCode',
          'title',
          'price',
          'reducedFrom',
          'publisher'
        ];
        console.log("CSV: " + json2csv({
          data: fileData.contents,
          //fields: fields,
          hasCSVColumnTitle: false
        }));
      }
      catch (err) {
        console.log(err);
      }
      response.json(fileData);
    } else {
      return next({
        status: 404,
        message: 'Could not find Previews issue ' + issueNumber,
      });
    }
  });
};
