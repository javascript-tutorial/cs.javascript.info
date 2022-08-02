describe("pseudoNáhodné", function() {

  it("dodržuje vzorec", function() {
    let generator = pseudoNáhodné(1);

    assert.equal(generator.next().value, 16807);
    assert.equal(generator.next().value, 282475249);
    assert.equal(generator.next().value, 1622650073);
  });


  it("pro stejné semínko vrací stejné hodnoty", function() {
    let generator1 = pseudoNáhodné(123);
    let generator2 = pseudoNáhodné(123);

    assert.deepEqual(generator1.next(), generator2.next());
    assert.deepEqual(generator1.next(), generator2.next());
    assert.deepEqual(generator1.next(), generator2.next());
  });

});
