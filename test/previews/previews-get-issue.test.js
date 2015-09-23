var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;
var mockery = require("mockery");
var Q = require("q");
var httpMocks = require("node-mocks-http");

describe("The Previews issue route", function() {
  var getIndex;
  var findSpy;
  var request;
  var response;
  var responseDeferred = Q.defer();
  var previewsMock = {
    find: function(id) {
      return responseDeferred.promise; 
    }
  };

  before(function() {
    findSpy = sinon.spy(previewsMock, "find")
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    request = httpMocks.createRequest({
      method: 'GET',
      url: "/previews/42",
      params: {
        previews_issue: 42
      }
    });
    response = httpMocks.createResponse();

    mockery.registerMock('previews/previews', previewsMock);
    getIndex = require("../../app/previews/previews-get-issue");
  });

  after(function() {
    mockery.disable();
  });

  it("should respond with a single previews issue", function(done) {
    responseDeferred.resolve("ok");
    getIndex(request, response, function() {
      done();
    });
  });

  it("should get the issue from the API", function() {
    expect(findSpy.withArgs(42).calledOnce).to.equal(true);
  });

  it("should respond with JSON", function() {
    expect(response._isJSON()).to.equal(true);
  });
})
