const express = require('express');

const config = require('../util/config');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(config.config());
});

module.exports = router;
