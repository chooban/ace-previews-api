const supertest = require('supertest');
const should = require('should');
const mockery = require('mockery');
const mockPreviewsStore = require('../mocks/previewsStore');

describe('Previews controller', () => {
  let server = undefined;
  let agent = undefined;

  before(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });
    mockery.registerMock('../stores/previewsStore', mockPreviewsStore);
  });

  after(() => mockery.disable());

  beforeEach((done) => {
    process.env.NODE_ENV = 'test';
    let app = require('../../server');
    server = app.listen(3000, done);
  });

  afterEach(() => {
    server.close();
    server = null;
  });

  it('Returns a list from the root', (done) => {
    supertest(server)
      .get('/previews/')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.length(3);
        res.body.should.eql([332,331,330]);
        done();
      });
  });

  it('Returns the latest', (done) => {
    supertest(server)
      .get('/previews/latest')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.headers['content-type'].should.match(/application\/json/);
        res.body.file.should.eql('ecmail332');
        res.body.contents.should.have.length(1);
        done();
      });
  });

  it('Defaults to CSV format if no accept header set', (done) => {
    supertest(server)
      .get('/previews/latest')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.headers['content-type'].should.match(/text\/csv/);
        res.text.should.equal('"ABC123","Spider-man","2.99","","Marvel"');
        done();
      });
  });

  it('Allows retrieving by issue number', (done) => {
    supertest(server)
      .get('/previews/330')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.headers['content-type'].should.match(/application\/json/);
        res.body.file.should.eql('ecmail330');
        res.body.contents.should.have.length(1);
        done();
      });
  });

  it('Allows retrieving by issue number as CSV', (done) => {
    supertest(server)
      .get('/previews/330')
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.headers['content-type'].should.match(/text\/csv/);
        res.text.should.equal('"ABC123","Spider-man","2.99","","Marvel"');
        done();
      });
  });

  it('Does not allow POST requests to root', (done) => {
    // Should be a 405
    supertest(server)
      .post('/previews')
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        done();
      });
  });

  it('Does not allow POST requests to issue handler', (done) => {
    // Should be a 405
    supertest(server)
      .post('/previews/332')
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});
