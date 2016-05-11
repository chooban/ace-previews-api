var fs = require('fs');

function getAllFiles(done) {
  fs.readdir('/data/', function(err, allFiles) {
    if(err) return done(err);

    done(null, allFiles.filter(isCsv));

    function isCsv(filename) {
      return /ecmail\d+\.csv/.test(filename);
    }
  });
}

function getAllIssues(done) {
  getAllFiles(function(err, files) {
    if(err) return done(err);

    var filteredFiles = files
                          .map(removeExtension)
                          .sort(sortByIssueNumber);
    
    done(null, filteredFiles);
  });

  function removeExtension(filename) {
    return filename.match(/\d+/)[0];
  }

  function sortByIssueNumber(a, b) {
    var issueA = +a.match(/\d+/)[0];
    var issueB = +b.match(/\d+/)[0];

    return issueB - issueA;
  }
}

function getSingleIssue(issueNumber, done) {
  var isTheIssue = new RegExp('ecmail' + issueNumber + '\.csv');

  getAllFiles(function(err, allFiles) {
    if(err) return done(err);
  
    var matching = allFiles.filter(function (file) {
      return isTheIssue.test(file);
    });

    if (matching.length === 1) {
      var filename = matching[0];
      fs.readFile('/data/' + filename, 'utf8', function (err, contents) {
        if (err) {
          return next(err);
        };

        done(null, {
          'file': filename.split('.')[0],
          'contents': contents
        });
      });
    } else {
      done(null, null);
    }
  });
}

module.exports = {
  getAllIssues: getAllIssues,
  getSingleIssue: getSingleIssue
}
