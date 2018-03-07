const PreviewsStore = require('../stores/previewsStore');
const json2csv = require('json2csv');
const logger = require('../util/logger');

module.exports = (req, res, next) => {
  const issueNumber = req.params.previews_issue;
  const isANumber = /^\d+$/;

  if (!isANumber.test(issueNumber)) {
    return next({
      status: 400,
      message: 'Invalid issue number supplied'
    });
  }

  PreviewsStore.getSingleIssue(issueNumber, (err, fileData) => {
    if (err) return next(err);

    if (!fileData) {
      logger.log('error', `Request for unknown issue: ${issueNumber}`);
      res.sendStatus(404);
      return next();
    }

    res.format({
      json: () => res.json(fileData),
      csv: () => {
        const fields = [
          'previewsCode',
          'title',
          'price',
          { value: (row) => (row.reducedFrom !== null ? 'reduced from' : null) },
          'reducedFrom',
          'publisher'
        ];
        try {
          res.setHeader('Content-type', 'text/csv');
          res.setHeader(
            'Content-disposition',
            `attachment; filename=${fileData.file}.csv`
          );
          res.send(json2csv.parse(
            fileData.contents,
            {
              fields,
              defaultValue: '',
              hasCSVColumnTitle: false
            }
          ));
        } catch (e) {
          next(e);
        }
      }
    });
    return undefined;
  });
  return undefined;
};
