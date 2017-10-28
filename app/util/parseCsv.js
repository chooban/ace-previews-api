module.exports = (text) => {
  const lines = text.split(/\r\n|\n|\r/g);
  const stripSpace = (textToStrip) => {
    if (!textToStrip) return null;
    return textToStrip.replace(/^"\s*/, '').replace(/\s*"$/, '');
  };

  return lines.map((rawData) => rawData.split(',').map(stripSpace));
};
