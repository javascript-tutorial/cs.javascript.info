describe("vynásobČísla", function() {
  it("vynásobí všechny číselné vlastnosti dvěma", function() {
    let menu = {
      šířka: 200,
      výška: 300,
      titulek: "Moje menu"
    };
    let výsledek = vynásobČísla(menu);
    assert.equal(menu.šířka, 400);
    assert.equal(menu.výška, 600);
    assert.equal(menu.titulek, "Moje menu");
  });

  it("nevrátí nic", function() {
    assert.isUndefined( vynásobČísla({}) );
  });

});
