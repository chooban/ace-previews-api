const should = require('should');
const supertest = require('supertest');

describe('Export controller', () => {
  let server = null;

  beforeEach((done) => {
    process.env.NODE_ENV = 'test';
    // eslint-disable-next-line
    const app = require('../../server');
    server = app.listen(0, done);
  });

  afterEach(() => {
    server.close();
    server = null;
  });

  it('Returns 400 for malformed requests', (done) => {
    supertest(server)
      .post('/orders/export')
      .type('form')
      .send({
        encodeddata: 'not json at all'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(400);
        done();
      });
  });

  it('Returns 400 for empty request body', (done) => {
    supertest(server)
      .post('/orders/export')
      .type('form')
      .send(null)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(400);
        done();
      });
  });

  it('Returns 422 for empty order', (done) => {
    const emptyOrder = {
      total: 600
    };
    supertest(server)
      .post('/orders/export')
      .type('form')
      .send({
        encodeddata: JSON.stringify(emptyOrder)
      })
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(422);
        done();
      });
  });

  it('formats a simple order');
});
