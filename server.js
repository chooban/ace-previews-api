var express = require('express');
var logger = require('./util/logger');
var previewsRoutes = require('./routes/previews');

var app = express();
app.use('/', previewsRoutes);

module.exports = app;
