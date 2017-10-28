const express = require('express');

const router = express.Router();
const exportHandler = require('../orders/export-order');

router.post('/export', exportHandler);

module.exports = router;

