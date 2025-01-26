describe("sečtiProdeje", function() {
  it("vrátí součet prodejů", function() {
    let prodeje = {
      "Jan": 100,
      "Petr": 300,
      "Marie": 250
    };

    assert.equal( sečtiProdeje(prodeje), 650 );
  });

  it("pro prázdný objekt vrátí 0", function() {
    assert.strictEqual( sečtiProdeje({}), 0);
  });
});