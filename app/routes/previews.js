var express = require('express');
var router = express.Router();
var indexHandler = require('../previews/previews-get-all');
var issueRequestHandler = require('../previews/previews-get-issue');

router.get('/', indexHandler);
router.get('/:previews_issue', issueRequestHandler);

//router.get('/latest', latestIssueHandler);

module.exports = router;
