var PreviewsStore = require('../stores/previewsStore');

module.exports = function(req, res, next) {

  PreviewsStore.getAllIssues(function(err, allIssues) {
    if (err) return next(err);

    PreviewsStore.getSingleIssue(allIssues.shift(), function(err, issue) {
      if (err) return next(err);

      res.json(issue);
    });
  });
};
