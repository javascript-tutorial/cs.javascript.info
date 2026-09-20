describe("zřetěz", function() {
  let kusyDat = [
    new Uint8Array([0, 1, 2]),
    new Uint8Array([3, 4, 5]),
    new Uint8Array([6, 7, 8])
  ];

  it("výsledek má stejný typ pole", function() {

    let výsledek = zřetěz(kusyDat);

    assert.equal(výsledek.constructor, Uint8Array);
  });

  it("zřetězí pole", function() {

    let výsledek = zřetěz(kusyDat);

    assert.deepEqual(výsledek, new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8]));

  });

  it("při prázdném vstupu vrátí prázdné pole", function() {

    let výsledek = zřetěz([]);

    assert.equal(výsledek.length, 0);

  });

});
