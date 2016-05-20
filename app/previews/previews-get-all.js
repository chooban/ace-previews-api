const fs = require('fs');
const PreviewsStore = require('../stores/previewsStore');

module.exports = (req, res, next) => {
  PreviewsStore.getAllIssues((err, files) => {
    if (err) return next(err);

    res.json(files);
  });
};
