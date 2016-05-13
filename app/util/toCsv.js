var tolf = require('./tolf');

module.exports = function (text) {
  var lines = tolf(text).split('\n');

  var result = [];
  var headers = lines[0].split(',');

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(',');

    for (var j = 0; j < headers.length; j++) {
      obj[j] = currentline[j]
                  ? tidy(currentline[j])
                  : null;
    }

    result.push(obj);
  }

  return result;

  function tidy(text) {
    return text.replace(/^"\s*/, '')
                .replace(/\s*"$/, '');
  }
};
