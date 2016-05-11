var express = require('express');
var router = express.Router();
var logger = require('../util/logger');
var indexHandler = require('./previews-get-all');
var issueRequestHandler = require('./previews-get-issue');
var latestIssueHandler = require('./preview-get-latest');

/*
router.param('issue', function(req, res, next, issue) {
  console.log("ISSUE");
  logger.debug('Got a previews issue param: ' + issue); 
  req.previewsIssue = issue;
  next();
});
*/

router.get('/', indexHandler);
//router.get('/latest', latestIssueHandler);
router.get('/:issue(\d+)', issueRequestHandler);

module.exports = router;
