var Previews = require('previews/previews')
var logger = require('winston')

module.exports = function(req, res, next) {
  Previews.findAll().then(
    function(previews) {
      res.json(previews)
      next()
    }
    , function(error) {
      res.status(500).end()
    }
  )
}
