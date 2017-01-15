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
          const fields = [
            'previewsCode',
            'title',
            'price',
            {
              value: (row) => row.reducedFrom !== null
                  ? 'reduced from'
                  : '',
            },
            'reducedFrom',
            'publisher',
          ];
          try {
            res.setHeader('Content-type', 'text/csv');
            res.setHeader('Content-disposition',
              `attachment; filename=${issue.file}.csv`);
            res.send(json2csv({
              data: issue.contents,
              defaultValue: '',
              fields: fields,
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
  });
};
