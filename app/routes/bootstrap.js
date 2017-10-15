const express = require('express');

//eslint-disable-next-line
const logger = require('../util/logger');
const config = require('../util/config');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(config.config);
});

module.exports = router;
