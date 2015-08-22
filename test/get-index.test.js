var sinon = require("sinon"),
  chai = require("chai"),
  expect = chai.expect;

var getIndex = require("../routes/get-index.js")

describe("The route index", function() {
  var req, res, spy;

  before(function() {
    req = res = {};
    spy = res.json = sinon.spy()

    getIndex(req, res)
  })

  it("should respond", function() {
    expect(spy.calledOnce).to.equal(true);
  })
})
