var express = require('express'),
  indexHandler = require('./previews-get'),
  router = express.Router()

router.get('/', indexHandler)

module.exports = router
