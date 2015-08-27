var sinon = require("sinon"),
    chai = require("chai"),
    expect = chai.expect;

var getIndex = require("../../../routes/previews/get-index.js")

describe.skip("The route Previews index", function() {
  var req, res, spy;

  before(function() {
    req = res = {};
    spy = res.json = sinon.spy();

    getIndex(req, res);
  })

  it("should respond with a list of catalogues", function() {
    expect(spy.calledOnce).to.equal(true);
  })
})
