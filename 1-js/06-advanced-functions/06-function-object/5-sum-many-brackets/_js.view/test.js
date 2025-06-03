describe("sečti", function(){
  
  it("sečti(1)(2) == 3", function(){
    assert.equal(3, sečti(1)(2));
  });

  it("sečti(5)(-1)(2) == 6", function(){
    assert.equal(6, sečti(5)(-1)(2));
  });
  
  it("sečti(6)(-1)(-2)(-3) == 0", function(){
    assert.equal(0, sečti(6)(-1)(-2)(-3));
  });

  it("sečti(0)(1)(2)(3)(4)(5) == 15", function(){
    assert.equal(15, sečti(0)(1)(2)(3)(4)(5));
  });
});

