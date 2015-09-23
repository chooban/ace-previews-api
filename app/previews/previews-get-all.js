
module.exports = function(req, res, next) {
  var Previews = require('previews/previews');

  Previews.findAll().then(function(previews) {
    res.json(previews);
    next();
  })
}
