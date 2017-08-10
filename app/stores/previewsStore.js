const fs = require('fs');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const parseCsv = require('../util/parseCsv');
const logger = require('../util/logger');

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
  };

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

      contents = toJson(parseCsv(contents));
      done(null, {
        file: filename.split('.')[0],
        contents: contents,
      });
    });
  });

  function toJson(csvData) {
    return csvData
      .map(toLineItem)
      .filter(nonEmpty)
      .sort((a, b) => {
        const firstCode = +a.previewsCode.split('/')[1];
        const secondCode = +b.previewsCode.split('/')[1];

        return firstCode < secondCode ? -1 : 1;
      });

    function toLineItem(rowData) {
      if (!rowData[0]) return null;

      const price = rowData[3].replace('£','');
      let reducedFrom = rowData[5] ? rowData[5].replace('£', '') : null;
      return {
        previewsCode: rowData[0],
        title: rowData[1],
        price,
        reducedFrom,
        publisher: rowData[6] ? rowData[6] : 'UNKNOWN',
      };
    }
  }

  function nonEmpty(f) {
    return f !== null;
  }
}

function getItemInformation(issueNumber, itemNumber, done) {
  const urlPrefix = 'https://www.previewsworld.com';
  const MonthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
  ];

  const codeToUrl = (issue, item) => {
    const epoch = new Date(1988, 8, 1);
    epoch.setMonth(epoch.getMonth() + parseInt(issue));

    const slug = MonthNames[epoch.getMonth()] + (epoch.getFullYear() - 2000) + item;
    const url = `${urlPrefix}/Catalog/${slug}`;
    logger.log('debug', 'Retrieving from', url);
    return url;
  };

  fetch(codeToUrl(issueNumber, itemNumber))
    .then((response) => response.text())
    .then((text) => {
      const $ = cheerio.load(text);

      const coverImage = urlPrefix + $('img#MainContentImage').attr('src');

      const node = $('.CatalogFullDetail .Text');
      const children = node.contents().filter((i, el) => {
        return (el.type === 'text'
          || (el.type === 'tag' && el.tagName === 'br'));
      });
      const description = children.toString().trim();
      const creators = node.children('.Creators')
        .text()
        .trim()
        .replace(/\s\s+/g, ' ');

      return {
        description,
        creators,
        coverImage
      };
    })
    .then((info) => done(null, info))
    .catch((err) => {
      throw new Error(err);
    });
}

module.exports = {
  getAllIssues,
  getSingleIssue,
  getItemInformation,
};
