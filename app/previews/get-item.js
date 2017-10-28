const PreviewsStore = require('../stores/previewsStore');

module.exports = (req, res, next) => {
  const issueNumber = req.params.previews_issue;
  const itemNumber = req.params.item;

  const isANumber = /^\d+$/;

  if (!isANumber.test(issueNumber)) {
    return next({
      status: 400
    });
  }

  PreviewsStore.getItemInformation(issueNumber, itemNumber, (err, data) => {
    if (err) return next(err);

    if (data) {
      res.format({
        json: () => res.json(data)
      });
    } else {
      return next({
        status: 404,
        message: 'Could not find item info'
      });
    }
    return undefined;
  });
  return undefined;
};
