module.exports = (text) => {
  const lines = text.split(/\r\n|\n|\r/g);
  const stripSpace = (text) => {
    if (!text) return null;
    return text.replace(/^"\s*/, '').replace(/\s*"$/, '');
  }

  return lines.map((rawData) => rawData.split(',').map(stripSpace));
};
