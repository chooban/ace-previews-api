const fs = require('fs');
const parseCsv = require('../util/parseCsv');

function getAllFiles(done) {
  const isCsv = (filename) => /ecmail\d+\.csv/.test(filename);

  fs.readdir('/data/', (err, allFiles) => {
    if (err) return done(err);

    done(null, allFiles.filter(isCsv));
  });
}

function getAllIssues(done) {
  const removeExtension = (filename) => filename.match(/\d+/)[0];

  const sortByIssueNumber = (a, b) => {
    const issueA = +a.match(/\d+/)[0];
    const issueB = +b.match(/\d+/)[0];

    return issueB - issueA;
  }

  getAllFiles((err, files) => {
    if (err) return done(err);

    done(null, files.map(removeExtension).sort(sortByIssueNumber));
  });
}

function getSingleIssue(issueNumber, done) {
  const isTheIssue = new RegExp('ecmail' + issueNumber + '\.csv');

  getAllFiles((err, allFiles) => {
    if (err) return done(err);

    const matching = allFiles.filter((file) => isTheIssue.test(file));

    if (matching.length != 1) return done();

    const filename = matching[0];
    fs.readFile('/data/' + filename, 'utf8', (err, contents) => {
      if (err) return next(err);

      contents = toJson(parseCsv(contents)).filter(nonEmpty);
      done(null, {
        file: filename.split('.')[0],
        contents: contents,
      });
    });
  });

  function toJson(csvData) {
    return csvData.map(toLineItem);

    function toLineItem(rowData) {
      if (!rowData[0]) return null;

      return {
        previewsCode: rowData[0],
        title: rowData[1],
        price: rowData[3],
        reducedFrom: rowData[5],
        publisher: rowData[6] ? rowData[6] : 'UNKNOWN',
      };
    }
  }

  function nonEmpty(f) {
    return f !== null;
  }
}

module.exports = {
  getAllIssues: getAllIssues,
  getSingleIssue: getSingleIssue,
};
