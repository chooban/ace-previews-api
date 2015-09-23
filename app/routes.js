module.exports = function(app) {
  var rootHandler = require('./index');
  var previewsHandler = require('./previews/previewsHandler')(app);

  app.use('/', rootHandler);
  app.use('/previews', previewsHandler);
}
