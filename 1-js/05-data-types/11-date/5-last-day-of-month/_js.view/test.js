describe("vraťPosledníDenVMěsíci", function() {
  it("poslední den 01.01.2012 - 31", function() {
    assert.equal(vraťPosledníDenVMěsíci(2012, 0), 31);
  });

  it("poslední den 01.02.2012 - 29 (přestupný rok)", function() {
    assert.equal(vraťPosledníDenVMěsíci(2012, 1), 29);
  });

  it("poslední den 01.02.2013 - 28", function() {
    assert.equal(vraťPosledníDenVMěsíci(2013, 1), 28);
  });
});
