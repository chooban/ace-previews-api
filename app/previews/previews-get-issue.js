const fs = require('fs');
const PreviewsStore = require('../stores/previewsStore');
const json2csv = require('json2csv');

module.exports = function (req, res, next) {
  const issueNumber = req.params.previews_issue;
  const isANumber = /^\d+$/;

  if (!isANumber.test(issueNumber)) {
    return next({
      status: 400,
      message: 'Invalid issue number supplied',
    });
  }

  PreviewsStore.getSingleIssue(issueNumber, (err, fileData) => {
    if (err) return next(err);

    if (!fileData) {
      return next({
        status: 404,
        message: 'Could not find Previews issue ' + issueNumber,
      });
    }

    res.format({
      json: () => res.json(fileData),
      csv: () => {
        const fields = [
          'previewsCode',
          'title',
          'price',
          {
            value: (row) => row.reducedFrom !== null
                ? 'reduced from'
                : null,
          },
          'reducedFrom',
          'publisher',
        ];
        try {
          res.setHeader('Content-type', 'text/csv');
          res.setHeader('Content-disposition',
            `attachment; filename=${fileData.file}.csv`);
          res.send(json2csv({
            data: fileData.contents,
            fields: fields,
            defaultValue: '',
            hasCSVColumnTitle: false,
          }));
        }
        catch (err) {
          console.log(err);
          next(err);
        }
      },
    });
  });
};
