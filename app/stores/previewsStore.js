const fs = require('fs');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const parseCsv = require('../util/parseCsv');
const logger = require('../util/logger');
const config = require('../util/config');

function getAllFiles(done) {
  const isCsv = (filename) => /ecmail\d+\.csv/.test(filename);

  fs.readdir(config.dataDirectory(), (err, allFiles) => {
    if (err) {
      logger.log('error', `Could not read directory, ${config.dataDirectory()}: ${err}`);
      done(err);
    } else {
      done(null, allFiles.filter(isCsv));
    }
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
    if (err) {
      done(err);
    } else {
      done(null, files.map(removeExtension).sort(sortByIssueNumber));
    }
  });
}

function getSingleIssue(issueNumber, done) {
  const isTheIssue = new RegExp(`ecmail${issueNumber}.csv`);

  getAllFiles((err, allFiles) => {
    if (err) {
      done(err);
    } else {
      const matching = allFiles.filter((file) => isTheIssue.test(file));

      if (matching.length !== 1) {
        logger.log('warning', `No file for ${issueNumber}`);
        done();
      } else {
        const filename = matching[0];
        fs.readFile(config.dataDirectory() + filename, 'utf8', (fileErr, contents) => {
          if (fileErr) {
            logger.log('error', `Error attempting to read ${filename}: ${fileErr}`);
            done(fileErr);
          }

          try {
            const parsedContents = toJson(parseCsv(contents));
            done(null, {
              file: filename.split('.')[0],
              contents: parsedContents
            });
          } catch (e) {
            logger.log('error', `Could not parse CSV: ${e}`);
            done(e);
          }
        });
      }
    }
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
      // Sometimes we get empty rows at the end of a file
      if (!rowData[0]) return null;

      // Need at least a code, price and title
      const requiredFields = [0, 1, 3];

      requiredFields.forEach((idx) => {
        if (!rowData[idx]) {
          logger.log('error', `Could not read: ${rowData}`);
          throw new Error('Incomplete data');
        }
      });

      const price = rowData[3].replace('£', '');
      const reducedFrom = rowData[5] ? rowData[5].replace('£', '') : null;
      return {
        previewsCode: rowData[0],
        title: rowData[1],
        price,
        reducedFrom,
        publisher: rowData[6] ? rowData[6] : 'UNKNOWN'
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
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const codeToUrl = (issue, item) => {
    const epoch = new Date(1988, 8, 1);
    epoch.setMonth(epoch.getMonth() + parseInt(issue, 10));

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
      const children = node.contents().filter((i, el) => (
        el.type === 'text' || (el.type === 'tag' && el.tagName === 'br')
      ));
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
  getItemInformation
};
