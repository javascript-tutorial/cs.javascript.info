describe("Akumulátor", function() {

  beforeEach(function() {
    sinon.stub(window, "prompt")
  });

  afterEach(function() {
    prompt.restore();
  });

  it("úvodní hodnota je argument konstruktoru", function() {
    let akumulátor = new Akumulátor(1);

    assert.equal(akumulátor.hodnota, 1);
  });

  it("po načtení 0 je hodnota 1", function() {
    let akumulátor = new Akumulátor(1);
    prompt.returns("0");
    akumulátor.načti();
    assert.equal(akumulátor.hodnota, 1);
  });

  it("po načtení 1 je hodnota 2", function() {
    let akumulátor = new Akumulátor(1);
    prompt.returns("1");
    akumulátor.načti();
    assert.equal(akumulátor.hodnota, 2);
  });
});
