describe("čítač", function() {

  it("zvýší se při každém volání", function() {

    let čítač = vytvořČítač();

    assert.equal( čítač(), 0 ); 
    assert.equal( čítač(), 1 ); 
    assert.equal( čítač(), 2 ); 
  });

  
  describe("čítač.nastav", function() {
    it("nastaví počet", function() {

      let čítač = vytvořČítač();

      čítač.nastav(10);

      assert.equal( čítač(), 10 ); 
      assert.equal( čítač(), 11 ); 
    });
  });
  
  describe("čítač.sniž", function() {
    it("sníží počet", function() {

      let čítač = vytvořČítač();

      čítač.nastav(10);

      assert.equal( čítač(), 10 ); 

      čítač.sniž();

      assert.equal( čítač(), 10 ); 

    });
  });

});