describe("nejvyššíPlat", function() {
  it("vrátí nejlépe placenou osobu", function() {
    let platy = {
      "Jan": 100,
      "Petr": 300,
      "Marie": 250
    };

    assert.equal( nejvyššíPlat(platy), "Petr" );
  });

  it("pro prázdný objekt vrátí null", function() {
    assert.isNull( nejvyššíPlat({}) );
  });
});