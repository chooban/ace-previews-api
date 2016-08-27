const PreviewsStore = require('../stores/previewsStore');
const json2csv = require('json2csv');

module.exports = (req, res, next) => {
  PreviewsStore.getAllIssues((err, allIssues) => {
    if (err) return next(err);

    PreviewsStore.getSingleIssue(allIssues.shift(), (err, issue) => {
      if (err) return next(err);

      res.format({
        json: () => res.json(issue),
        csv: () => {
          try {
            res.setHeader('Content-type', 'text/csv');
            res.setHeader('Content-disposition',
              `attachment; filename=${issue.file}`);
            res.send(json2csv({
              data: issue.contents,
              hasCSVColumnTitle: false
            }));
          }
          catch (err) {
            console.log(err);
            next(err);
          }
        }
      });
    });
  });
};
