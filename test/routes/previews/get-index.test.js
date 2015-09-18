var sinon = require("sinon"),
    chai = require("chai"),
    expect = chai.expect,
    mockery = require("mockery")

describe("The route Previews index", function() {
  var req
    , res
    , spy
    , getIndex;

  before(function() {
    req = res = {};
    spy = res.json = sinon.spy();
    mockery.enable()
    mockery.registerMock("parse/node", {})
    getIndex = require("../../../routes/previews/get-index.js")
  })

  after(function() {
    mockery.disable()
  })

  it("should respond with a list of catalogues", function() {
    getIndex(req, res);
    expect(spy.calledOnce).to.equal(true);
  })
})
