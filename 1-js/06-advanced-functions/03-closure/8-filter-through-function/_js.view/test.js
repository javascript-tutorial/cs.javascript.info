
describe("vPoli", function() {
  let pole = [1, 2, 3, 4, 5, 6, 7];

  it("vrátí filtr pro hodnoty v poli", function() {

    let filtr = vPoli(pole);
    assert.isTrue(filtr(5));
    assert.isFalse(filtr(0));
  });
});


describe("mezi", function() {

  it("vrátí filtr pro hodnoty mezi", function() {
    let filtr = mezi(3, 6);
    assert.isTrue(filtr(5));
    assert.isFalse(filtr(0));
  });
});
