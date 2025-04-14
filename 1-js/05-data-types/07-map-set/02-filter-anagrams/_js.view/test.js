function průnik(arr1, arr2) {
  return arr1.filter(prvek => arr2.includes(prvek));
}

describe("odstraňAnagramy", function() {

  it("z každé sady anagramů vrátí právě 1 slovo", function() {
    let pole = ["rak", "reklama", "makrela", "KRA", "kostel", "stolek", "karamel"];

    let výsledek = odstraňAnagramy(pole);
    assert.equal(výsledek.length, 3);

    assert.equal(intersection(výsledek, ["rak", "KRA"]).length, 1);
    assert.equal(intersection(výsledek, ["reklama", "makrela", "karamel"]).length, 1);
    assert.equal(intersection(výsledek, ["kostel", "stolek"]).length, 1);

  });

  it("nerozlišuje malá a velká písmena", function() {
    let pole = ["rak", "KRA"];
    assert.equal(odstraňAnagramy(pole).length, 1);
  });

});