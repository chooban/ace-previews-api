var Parse = require("parse").Parse;

var appKey = "APP_KEY";
var javaScriptKey = "JS_KEY";
var initialized = false;

module.exports = function() {
  if (!initialized) {
    console.log("init")
    Parse.initialize(appKey, javaScriptKey);
    initialized = true;
  }
  return Parse;
}
