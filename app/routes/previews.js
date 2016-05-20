const router = require('express').Router();
const indexHandler = require('../previews/previews-get-all');
const issueRequestHandler = require('../previews/previews-get-issue');
const latestIssueHandler = require('../previews/previews-get-latest');

router.get('/', indexHandler);
router.get('/latest', latestIssueHandler);
router.get('/:previews_issue', issueRequestHandler);

module.exports = router;
