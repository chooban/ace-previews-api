module.exports = function (app) {

  var express = require('express');
  var router = express.Router();
  var indexHandler = require('./previews-get-all');
  var issueRequestHandler = require('./previews-get-issue');

  router.get('/', indexHandler);
  router.get('/:previews_issue', issueRequestHandler);

  //router.get('/latest', latestIssueHandler);

  return router;
};
