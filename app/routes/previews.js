const router = require('express').Router();
const indexHandler = require('../previews/previews-get-all');
const issueRequestHandler = require('../previews/previews-get-issue');
const latestIssueHandler = require('../previews/previews-get-latest');

router.use((req, res, next) => {
  if (req.url.includes('.csv')) {
    req.headers.accept = 'text/csv';
    req.url = req.url.replace(/\.csv/, '');
  } else if (req.url.includes('.json')) {
    req.headers.accept = 'application/json';
    req.url = req.url.replace(/\.json/, '');
  }
  next();
});

router.get('/', indexHandler);
router.get('/latest', latestIssueHandler);
router.get('/:previews_issue', issueRequestHandler);
module.exports = router;
