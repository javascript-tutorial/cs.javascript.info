describe("Kalkulátor", function() {
  let kalkulátor;

  before(function() {
    kalkulátor = new Kalkulátor;
  });

  it("vypočítej(12 + 34) = 46", function() {
    assert.equal(kalkulátor.vypočítej("12 + 34"), 46);
  });

  it("vypočítej(34 - 12) = 22", function() {
    assert.equal(kalkulátor.vypočítej("34 - 12"), 22);
  });

  it("přidáme násobení: vypočítej(2 * 3) = 6", function() {
    kalkulátor.přidejMetodu("*", (a, b) => a * b);
    assert.equal(kalkulátor.vypočítej("2 * 3"), 6);
  });

  it("přidáme umocňování: vypočítej(2 ** 3) = 8", function() {
    kalkulátor.přidejMetodu("**", (a, b) => a ** b);
    assert.equal(kalkulátor.vypočítej("2 ** 3"), 8);
  });
});
