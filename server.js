const express = require('express');
const logger = require('./app/util/logger');
const previewsRoutes = require('./app/routes/previews');
const bootstrapRoutes = require('./app/routes/bootstrap');

const app = express();
app.use('/previews', previewsRoutes);
app.use('/bootstrap', bootstrapRoutes);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  logger.log('debug', 'Unhandled request for', req.url);
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
