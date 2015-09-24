var request = require("supertest")
var mockery = require("mockery")
var Q = require("q")

describe("Loading express", function() {
  var server
  var previewsMock = {
    findAll: function() {
      return Q.when([])
    },
    find: function() {
      return Q.when({})
    }
  }

  before(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    })
    mockery.enable()
    mockery.registerMock('previews/previews', previewsMock)
  })

  after(function() {
    mockery.disable()
  })

  beforeEach(function() {
    server = require("../server")
  })

  afterEach(function() {
    server.close()
  })

  it("responds to a request to the root", function testRoot(done) {
    request(server)
      .get('/')
      .expect(200, done)
  })

  it('responds to a request for previews list', function previewList(done) {
    request(server)
      .get('/previews')
      .expect(200, done)
  })

  it('responds to a request for an issue of previews', function previewsIssue(done) {
    request(server)
      .get('/previews/123')
      .expect(200, done)
  })

  it('rejects bad previews issue numbers', function badPreviewsIssue(done) {
    request(server)
      .get('/previews/abc')
      .expect(400, done)
  })

  it("responds with 404 for everything else", function testMissing(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done)
  })
})
