var Previews = require('previews/previews')
var logger = require('winston')

module.exports = function(req, res, next) {
  Previews.findAll().then(
    function(previews) {
      var list = previews.map(function(e) {
        return { issue: e.get('issue') }
      })
      res.json(list)
      next()
    }
    , function(error) {
      res.status(500).end()
    }
  )
}
