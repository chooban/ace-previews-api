var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;
var mockery = require("mockery");
var Q = require("q");

describe("The Previews index route", function() {
  var req, res, spy, getIndex;
  var responseDeferred = Q.defer();
  var previewsMock = {
    findAll: function() {
      return responseDeferred.promise; 
    }
  };

  before(function() {
    req = res = {};
    res.json = sinon.spy();
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });
    mockery.registerMock('previews/previews', previewsMock);

    getIndex = require("../../app/previews/previews-get-all");
  })

  after(function() {
    mockery.disable();
  })

  it("should respond with a list of catalogues", function(done) {
    responseDeferred.resolve([]);
    getIndex(req, res, function() {
      expect(res.json.calledOnce).to.equal(true);
      done();
    })
  })
})
