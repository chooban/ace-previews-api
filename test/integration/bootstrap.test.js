const should = require('should');
const supertest = require('supertest');
const mockFs = require('mock-fs');

describe('Bootstrap controller', () => {
  let server = null;

  before((done) => {
    // eslint-disable-next-line
    const app = require('../../server');
    server = app.listen(3000, done);
  });

  after(() => {
    server.close();
    server = null;
    mockFs.restore()
  });

  it('gives empty values if no config is present', (done) => {
    supertest(server)
      .get('/bootstrap')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, {
        domain: '',
        clientId: ''
      }, done);
  });
});

describe('Bootstrap controller with secrets', () => {
  let server = null;

  before((done) => {
    mockFs({
      '/run/secrets/auth0_client_id': 'client_id',
      '/run/secrets/auth0_domain': 'domain'
    });
    // eslint-disable-next-line
    const app = require('../../server');
    server = app.listen(3000, done);
  });

  after(() => {
    server.close();
    server = null;
    mockFs.restore();
  });

  it('returns those secrets', (done) => {
    supertest(server)
      .get('/bootstrap')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, {
        domain: 'domain',
        clientId: 'client_id'
      }, done);
  });

});
