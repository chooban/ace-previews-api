const express = require('express');
const compression = require('compression');
const logger = require('./app/util/logger');
const previewsRoutes = require('./app/routes/previews');

const app = express();
app.use(compression());
app.use('/previews', previewsRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    logger.error(err);
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function (err, req, res, next) {
  logger.error(err);
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {},
  });
});

module.exports = app;
