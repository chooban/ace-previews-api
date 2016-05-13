module.exports = function (text) {
  var newlines = /\r\n|\n|\r/g;

  return text.replace(newlines, '\n');
};
