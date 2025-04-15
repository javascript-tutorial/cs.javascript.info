describe("vraťDenVTýdnu", function() {
  it("3. leden 2014 - pátek", function() {
    assert.equal(vraťDenVTýdnu(new Date(2014, 0, 3)), 'PÁ');
  });

  it("4. leden 2014 - sobota", function() {
    assert.equal(vraťDenVTýdnu(new Date(2014, 0, 4)), 'SO');
  });

  it("5. leden 2014 - neděle", function() {
    assert.equal(vraťDenVTýdnu(new Date(2014, 0, 5)), 'NE');
  });

  it("6. leden 2014 - pondělí", function() {
    assert.equal(vraťDenVTýdnu(new Date(2014, 0, 6)), 'PO');
  });

  it("7. leden 2014 - úterý", function() {
    assert.equal(vraťDenVTýdnu(new Date(2014, 0, 7)), 'ÚT');
  });

  it("8. leden 2014 - středa", function() {
    assert.equal(vraťDenVTýdnu(new Date(2014, 0, 8)), 'ST');
  });

  it("9. leden 2014 - čtvrtek", function() {
    assert.equal(vraťDenVTýdnu(new Date(2014, 0, 9)), 'ČT');
  });
});
