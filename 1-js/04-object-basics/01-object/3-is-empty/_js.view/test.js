describe("jePrázdný", function() {
  it("vrátí true pro prázdný objekt", function() {
    assert.isTrue(jePrázdný({}));
  });

  it("vrátí false, jestliže existuje nějaká vlastnost", function() {
    assert.isFalse(jePrázdný({
      cokoli: false
    }));
  });
});