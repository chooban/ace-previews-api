var request = require("supertest");

describe("Loading express", function() {
  var server;

  beforeEach(function() {
    server = require("../server");
  })

  afterEach(function() {
    server.close();
  });

  it("responds to a request to the root", function testRoot(done) {
    request(server)
      .get('/')
      .expect(200, done);
  })

  it('responds to a request for previews list', function previewList(done) {
    request(server)
      .get('/previews')
      .expect(200, done)
  })

  it('responds to a request for an issue of previews', function previewsIssue (done) {
    request(server)
      .get('/previews/123')
      .expect(200, done)
  })

  it('rejects bad previews issue numbers', function previewsIssue (done) {
    request(server)
      .get('/previews/abc')
      .expect(400, done)
  })

  it("responds with 404 for everything else", function testMissing(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  })
});
