function getAllIssues(done) {
  done(null, [332,331,330]);
}

function getSingleIssue(issue, done) {
  done(null, {
    file: 'ecmail' + issue,
    contents: [ {
      previewsCode : 'ABC123',
      title: 'Spider-man',
      price: '2.99',
      reducedFrom: '',
      publisher: 'Marvel'
    } ]
  });
}

module.exports = {
  getAllIssues: getAllIssues,
  getSingleIssue: getSingleIssue,
};
