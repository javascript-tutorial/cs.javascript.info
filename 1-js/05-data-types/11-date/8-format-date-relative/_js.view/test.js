describe("formátujDatum", function() {
  it("zobrazí čas před 1ms jako \"právě teď\"", function() {
    assert.equal(formátujDatum(new Date(new Date - 1)), 'právě teď');
  });

  it('"před 30 sekundami"', function() {
    assert.equal(formátujDatum(new Date(new Date - 30 * 1000)), "před 30 s");
  });

  it('"před 5 minutami"', function() {
    assert.equal(formátujDatum(new Date(new Date - 5 * 60 * 1000)), "před 5 min.");
  });

  it("starší data jako DD.MM.YY HH:mm", function() {
    assert.equal(formátujDatum(new Date(2014, 2, 1, 11, 22, 33)), "01.03.14 11:22");
  });

});
