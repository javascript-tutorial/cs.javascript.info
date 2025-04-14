describe("spočítej", function() {
  it("spočítá počet vlastností", function() {
    assert.equal( spočítej({a: 1, b: 2}), 2 );
  });

  it("pro prázdný objekt vrátí 0", function() {
    assert.equal( spočítej({}), 0 );
  });

  it("ignoruje symbolické vlastnosti", function() {
    assert.equal( spočítej({ [Symbol('id')]: 1 }), 0 );
  });
});