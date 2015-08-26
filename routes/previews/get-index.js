var Parse = require("../../lib/parse")();

module.exports = function(req, res, next) {
  var Previews = Parse.Object.extend("Previews");

  var query = new Parse.Query(Previews);
  query.find({
    success: function(previews) {
      res.json(previews.map(
        function(e) {
          return {
            issue: e.get("issue"),
            list: e.get("listNumber")
          }
        }
      ));
    }
  })
}
