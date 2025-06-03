describe("vraťDenPřed", function() {

  it("1 den před 02.01.2015 -> den 1", function() {
    assert.equal(vraťDenPřed(new Date(2015, 0, 2), 1), 1);
  });


  it("2 dny před 02.01.2015 -> den 31", function() {
    assert.equal(vraťDenPřed(new Date(2015, 0, 2), 2), 31);
  });

  it("100 dní před 02.01.2015 -> den 24", function() {
    assert.equal(vraťDenPřed(new Date(2015, 0, 2), 100), 24);
  });

  it("365 dní před 02.01.2015 -> den 2", function() {
    assert.equal(vraťDenPřed(new Date(2015, 0, 2), 365), 2);
  });

  it("nemění zadané datum", function() {
    let datum = new Date(2015, 0, 2);
    let kopieData = new Date(datum);
    vraťDenPřed(kopieData, 100);
    assert.equal(datum.getTime(), kopieData.getTime());
  });

});
