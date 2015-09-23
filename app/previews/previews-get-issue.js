module.exports = function(request, response, next) {
  var Previews = require("previews/previews");
  var issueNumber = request.params.previews_issue
  var regex = /\d+/

  if (regex.test(issueNumber)) {
    Previews.find(issueNumber).then(function(data) {
      response.json(data);
      next();
    })
  } else {
    response.status(400).end()
  }
}
