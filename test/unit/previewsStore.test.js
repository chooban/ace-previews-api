const should = require('should');
const ecmail332 = require('fs').readFileSync('test/unit/data/ecmail332.csv', 'utf8');
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

      list.should.have.length(3);
      list.should.eql(['334', '333', '332']);
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
      done();
    });
  });
});
