module.exports = function(request, response, next) {
  var issueNumber = request.params.previews_issue
  var regex = /\d+/
  
  if (regex.test(issueNumber)) {
    response.json(issueNumber)
    return next() 
  }
  response.status(400).end()
}	
