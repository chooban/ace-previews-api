const should = require('should');
const mockFs = require('mock-fs');
const previewsStore = require('../../app/stores/previewsStore');

describe('Getting all files', () => {
  before(function() {
    mockFs({
      '/data/': {
        'ecmail333.csv': '',
        'ecmail331.csv': '',
        'ecmail334.csv': '',
        'Thumbs.db': ''
      }
    });
  });

  after(function() {
    mockFs.restore();
  });

  it('should return an ordered list of CSVs', function(done) {
    previewsStore.getAllIssues((err, list) => {
      if (err) return done(err);

      list.should.have.length(3);
      list.should.eql(['334', '333', '331']);
      done();
    });
  });
});
