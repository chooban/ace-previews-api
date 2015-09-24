var sinon = require("sinon")
var chai = require("chai")
var expect = chai.expect
var mockery = require("mockery")
var Q = require("q")
var httpMocks = require("node-mocks-http")

describe("The Previews index route", function() {
  var request, response, getIndex, apiSpy
  var previewsMock = {
    findAll: function() {
      return Q.when([]); 
    }
  }

  before(function() {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    })
    mockery.registerMock('previews/previews', previewsMock)

    request = httpMocks.createRequest({
      method: 'GET',
      url: "/previews/",
    })
    response = httpMocks.createResponse()
    apiSpy = sinon.spy(previewsMock, "findAll")
    getIndex = require("../../app/previews/previews-get-all")
  })

  after(function() {
    mockery.disable()
  })

  it("should respond with a list of catalogues", function(done) {
    getIndex(request, response, function() {
      done()
    })
  })

  it("should get the list from the API", function() {
    expect(apiSpy.calledOnce).to.equal(true)
  })

  it("should respond with JSON", function() {
    expect(response._isJSON()).to.equal(true)
  })
})
