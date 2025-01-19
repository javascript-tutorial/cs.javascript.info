
describe("kalkulátor", function() {
  
  context("když zadáme 2 a 3", function() {
    beforeEach(function() {
      sinon.stub(window, "prompt");

      prompt.onCall(0).returns("2");
      prompt.onCall(1).returns("3");

      kalkulátor.načti();
    });

    afterEach(function() {
      prompt.restore();
    });
    
    it('funkce načti načte dvě hodnoty a uloží je jako vlastnosti objektu', function () {
      assert.equal(kalkulátor.a, 2);
      assert.equal(kalkulátor.b, 3);
    });

    it("součet je 5", function() {
      assert.equal(kalkulátor.součet(), 5);
    });

    it("součin je 6", function() {
      assert.equal(kalkulátor.součin(), 6);
    });
  });

});
