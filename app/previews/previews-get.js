var Previews = require('previews/previews');

module.exports = function (req, res, next) {
  return Previews.findAll().then(function(previews) {
    res.json(previews);
  })
}
