const PreviewsStore = require('../stores/previewsStore');

module.exports = (req, res, next) => {

  PreviewsStore.getAllIssues((err, allIssues) => {
    if (err) return next(err);

    PreviewsStore.getSingleIssue(allIssues.shift(), (err, issue) => {
      if (err) return next(err);

      res.json(issue);
    });
  });
};
