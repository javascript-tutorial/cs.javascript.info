describe("součet", function(){
  
  it("součet(1)(2) == 3", function(){
    assert.equal(3, součet(1)(2));
  });

  it("součet(5)(-1)(2) == 6", function(){
    assert.equal(6, součet(5)(-1)(2));
  });
  
  it("součet(6)(-1)(-2)(-3) == 0", function(){
    assert.equal(0, součet(6)(-1)(-2)(-3));
  });

  it("součet(0)(1)(2)(3)(4)(5) == 15", function(){
    assert.equal(15, součet(0)(1)(2)(3)(4)(5));
  });
});

