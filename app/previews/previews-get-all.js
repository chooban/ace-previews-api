var fs = require('fs');
var PreviewsStore = require('../stores/previewsStore');

module.exports = function (req, res, next) {
  PreviewsStore.getAllIssues(function (err, files) {
    if (err) return next(err);

    res.json(files);
  });
};
