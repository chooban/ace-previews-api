var tolf = require('./tolf');
var logger = require('../util/logger');

module.exports = function (text) {
  var lines = tolf(text).split('\n');

  var result = [];

  return lines.map(function (rawData) {
    return rawData.split(',').map(tidy);
  });

  function tidy(text) {
    if (!text) return null;

    return text.replace(/^"\s*/, '')
                .replace(/\s*"$/, '');
  }
};
