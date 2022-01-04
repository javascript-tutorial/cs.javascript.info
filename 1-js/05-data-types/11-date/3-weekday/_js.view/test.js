describe("vraťMístníDenVTýdnu vrací \"evropský\" den v týdnu", function() {
  it("3. leden 2014 - pátek", function() {
    assert.equal(vraťMístníDenVTýdnu(new Date(2014, 0, 3)), 5);
  });

  it("4. leden 2014 - sobota", function() {
    assert.equal(vraťMístníDenVTýdnu(new Date(2014, 0, 4)), 6);
  });

  it("5. leden 2014 - neděle", function() {
    assert.equal(vraťMístníDenVTýdnu(new Date(2014, 0, 5)), 7);
  });

  it("6. leden 2014 - pondělí", function() {
    assert.equal(vraťMístníDenVTýdnu(new Date(2014, 0, 6)), 1);
  });

  it("7. leden 2014 - úterý", function() {
    assert.equal(vraťMístníDenVTýdnu(new Date(2014, 0, 7)), 2);
  });

  it("8. leden 2014 - středa", function() {
    assert.equal(vraťMístníDenVTýdnu(new Date(2014, 0, 8)), 3);
  });

  it("9. leden 2014 - čtvrtek", function() {
    assert.equal(vraťMístníDenVTýdnu(new Date(2014, 0, 9)), 4);
  });
});
