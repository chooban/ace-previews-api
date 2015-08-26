var Parse = require("parse").Parse;

var appKey = "crbINWFwBICYOCqivapilcNvLfFZwSSnnYiUhHIy";
var javaScriptKey = "gwAgl5YAbVd22HalR2OaX94OWpdRzkQNokmbsWLl";
var initialized = false;

module.exports = function() {
  if (!initialized) {
    console.log("init")
    Parse.initialize(appKey, javaScriptKey);
    initialized = true;
  }
  return Parse;
}
