const router = require('express').Router();
const indexHandler = require('../previews/previews-get-all');
const issueRequestHandler = require('../previews/previews-get-issue');
const latestIssueHandler = require('../previews/previews-get-latest');

router.use((req, res, next) => {
  if (!req.headers.accept) {
    req.headers.accept = 'text/csv';
  }
  next();
});

router.get('/', indexHandler);
router.get('/latest', latestIssueHandler);
router.get('/:previews_issue', issueRequestHandler);
module.exports = router;
