describe("armáda", function() {

  let armáda;
  
  before(function() {
    armáda = vytvořArmádu();
    window.alert = sinon.stub(window, "alert");
  });

  it("armáda[0] zobrazí 0", function() {
    armáda[0]();
    assert(alert.calledWith(0));
  });


  it("armáda[5] zobrazí 5", function() {
    armáda[5]();
    assert(alert.calledWith(5));
  });

  after(function() {
    window.alert.restore();
  });

});
