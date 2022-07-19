beforeEach(function() {
  sinon.stub(window, "prompt");
});

afterEach(function() {
  prompt.restore();
});

describe("načtiČíslo", function() {

  it("je-li to číslo, vrátí je", function() {
    prompt.returns("123");
    assert.strictEqual(načtiČíslo(), 123);
  });

  it("je-li to 0, vrátí ji", function() {
    prompt.returns("0");
    assert.strictEqual(načtiČíslo(), 0);
  });

  it("pokračuje ve smyčce, dokud nenajde číslo", function() {
    prompt.onCall(0).returns("to není číslo");
    prompt.onCall(1).returns("to taky není číslo");
    prompt.onCall(2).returns("1");
    assert.strictEqual(načtiČíslo(), 1);
  });

  it("je-li zadán prázdný řádek, vrátí null", function() {
    prompt.returns("");
    assert.isNull(načtiČíslo());
  });

  it("je-li stisknuto Storno, vrátí null", function() {
    prompt.returns(null);
    assert.isNull(načtiČíslo());
  });

});
