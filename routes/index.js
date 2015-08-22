var express = require("express"),
  indexHandler = require("./get-index")
  router = express.Router();

router.get('/', indexHandler)

module.exports = router;
