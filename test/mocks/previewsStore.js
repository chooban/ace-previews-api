function getAllIssues(done) {
  done(null, [332,331,330]);
}

function getSingleIssue(issue, done) {
  done(null, {
    file: 'ecmail' + issue,
    contents: [ { previewsCode : 'ABC123' } ]
  });
}

module.exports = {
  getAllIssues: getAllIssues,
  getSingleIssue: getSingleIssue,
};
