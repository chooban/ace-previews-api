module.exports = function(app) {
  var previewsHandler = require('./previews/previewsHandler')(app)

  app.use('/', previewsHandler)
}
