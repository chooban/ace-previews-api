var express = require('express');
var indexHandler = require('./get-index');
var router = express.Router();

router.get('/', indexHandler);

module.exports = router;
