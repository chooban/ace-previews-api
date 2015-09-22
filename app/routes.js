module.exports = function(app) {
  var rootHandler = require("./index");
  var previewsHandler = require("./previews/rootHandler");

  app.use('/', rootHandler);
  app.use('/previews', previewsHandler);
}
