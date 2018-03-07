/* eslint-disable consistent-return, no-console */
const should = require('should');
const ecmail330 = require('fs').readFileSync('test/unit/data/ecmail330.csv', 'utf8');
const ecmail332 = require('fs').readFileSync('test/unit/data/ecmail332.csv', 'utf8');
const ecmail347 = require('fs').readFileSync('test/unit/data/ecmail347.csv', 'utf8');
const mockFs = require('mock-fs');
const previewsStore = require('../../app/stores/previewsStore');
const _ = require('lodash');

describe('Previews Store', () => {
  beforeEach(() => {
    mockFs({
      '/data/': {
        'ecmail330.csv': ecmail330,
        'ecmail333.csv': '',
        'ecmail332.csv': ecmail332,
        'ecmail334.csv': '',
        'ecmail347.csv': ecmail347,
        'ecmail999.csv': 'not a valid\nfile:545',
        'Thumbs.db': ''
      }
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  afterEach(function logIfFailed() {
    if (this.currentTest.state === 'failed') {
      // eslint-disable-next-line
      const logger = require('../../app/util/logger');
      console.log(`Logger output: ${logger.transports.memory.errorOutput}`);
      logger.transports.memory.clearLogs();
    }
  });

  it('getAllIssues should return an ordered list of CSVs', (done) => {
    previewsStore.getAllIssues((err, list) => {
      if (err) return done(err);

      list.should.eql(['999', '347', '334', '333', '332', '330']);
      done();
    });
  });

  it('getSingleIssue should return JSON object', (done) => {
    const expectedKeys = [
      'previewsCode',
      'title',
      'price',
      'reducedFrom',
      'publisher'
    ];
    previewsStore.getSingleIssue(332, (err, response) => {
      if (err) return done(err);

      response.file.should.equal('ecmail332');
      response.contents.should.have.length(2680);

      response.contents.forEach((d) => _.keys(d).should.eql(expectedKeys));

      response.contents[0].should.deepEqual({
        previewsCode: '332/0001',
        title: 'PREVIEWS #334 JULY 2016',
        price: '2.00',
        reducedFrom: null,
        publisher: 'DIAMOND'
      });
      done();
    });
  });

  it('should sort rows', (done) => {
    previewsStore.getSingleIssue(347, (err, response) => {
      if (err) return done(err);

      response.file.should.equal('ecmail347');
      response.contents.should.have.length(2715);

      response.contents[0].should.deepEqual({
        previewsCode: '347/0001',
        title: 'PREVIEWS #349 ONLY OCT',
        price: '2.50',
        reducedFrom: null,
        publisher: 'DIAMOND PUBLICATIONS'
      });
      done();
    });
  });

  it('should throw an error on unparseable files', (done) => {
    previewsStore.getSingleIssue(999, (err, response) => {
      if (!err) return done('No error thrown');

      should.exist(err);
      should.not.exist(response);
      done();
    });
  });

  it('should cope with empty price fields and pound symbols', (done) => {
    previewsStore.getSingleIssue(330, (err, response) => {
      if (err) return done(err);

      should.not.exist(err);
      response.contents.should.have.length(2);
      done();
    });
  });
});
