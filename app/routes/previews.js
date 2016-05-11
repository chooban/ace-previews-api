var express = require('express');
var router = express.Router();
var indexHandler = require('../previews/previews-get-all');
var issueRequestHandler = require('../previews/previews-get-issue');
var latestIssueHandler = require('../previews/previews-get-latest');

router.get('/', indexHandler);
router.get('/latest', latestIssueHandler);
router.get('/:previews_issue', issueRequestHandler);

module.exports = router;
