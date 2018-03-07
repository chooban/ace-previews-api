const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./app/util/logger');
const previewsRoutes = require('./app/routes/previews');
const bootstrapRoutes = require('./app/routes/bootstrap');
const ordersRoutes = require('./app/routes/orders');
const profilesRoutes = require('./app/routes/profiles');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/previews', previewsRoutes);
app.use('/bootstrap', bootstrapRoutes);
app.use('/orders', ordersRoutes);
app.use('/profiles', profilesRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  logger.log('debug', 'Unhandled request for', req.url);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
