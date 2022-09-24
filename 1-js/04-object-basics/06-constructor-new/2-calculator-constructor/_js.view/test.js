
describe("kalkulátor", function() {
  let kalkulátor;
  before(function() {
    sinon.stub(window, "prompt")

    prompt.onCall(0).returns("2");
    prompt.onCall(1).returns("3");

    kalkulátor = new Kalkulátor();
    kalkulátor.read();
  });
  
  it("funkce načti se zeptá na dvě hodnoty pomocí prompt a zapamatuje si je jako vlastnosti objektu", function() {
    assert.equal(kalkulátor.a, 2);
    assert.equal(kalkulátor.b, 3);
  });

  it("když zadáme 2 a 3, součet je 5", function() {
    assert.equal(kalkulátor.součet(), 5);
  });

  it("když zadáme 2 a 3, součin je 6", function() {
    assert.equal(kalkulátor.součin(), 6);
  });

  after(function() {
    prompt.restore();
  });
});
