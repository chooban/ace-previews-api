const should = require('should');
const ecmail332 = require('fs').readFileSync('test/unit/data/ecmail332.csv', 'utf8');
const ecmail347 = require('fs').readFileSync('test/unit/data/ecmail347.csv', 'utf8');
const mockFs = require('mock-fs');
const previewsStore = require('../../app/stores/previewsStore');
const _ = require('lodash');

describe('Previews Store', () => {
  before(function() {
    mockFs({
      '/data/': {
        'ecmail333.csv': '',
        'ecmail332.csv': ecmail332,
        'ecmail334.csv': '',
        'ecmail347.csv': ecmail347,
        'Thumbs.db': ''
      }
    });
  });

  after(function() {
    mockFs.restore();
  });

  it('getAllIssues should return an ordered list of CSVs', function(done) {
    previewsStore.getAllIssues((err, list) => {
      if (err) return done(err);

      list.should.have.length(4);
      list.should.eql(['347', '334', '333', '332']);
      done();
    });
  });

  it('getSingleIssue should return JSON object', function(done) {
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

  it('should sort rows', function(done) {
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
});
