describe("čekej", function() {
  before(function() {
    this.hodiny = sinon.useFakeTimers();
  });

  after(function() {
    this.hodiny.restore();
  });

  it("volá funkci až po specifikované době", function() {
    let začátek = Date.now();

    function f(x) {
      assert.equal(Date.now() - začátek, 1000);
    }
    f = sinon.spy(f);

    let f1000 = čekej(f, 1000);
    f1000("test");
    this.hodiny.tick(2000);
    assert(f.calledOnce, 'test calledOnce selhal');
  });

  it("předává argumenty a this", function() {
    let začátek = Date.now();
    let uživatel = {
      řekniAhoj: function(věta, kdo) {
        assert.equal(this, uživatel);
        assert.equal(věta, "Ahoj");
        assert.equal(kdo, "Jan");
        assert.equal(Date.now() - začátek, 1500);
      }
    };

    uživatel.řekniAhoj = sinon.spy(uživatel.řekniAhoj);

    let spy = uživatel.řekniAhoj;
    uživatel.řekniAhoj = čekej(uživatel.řekniAhoj, 1500);

    uživatel.řekniAhoj("Ahoj", "Jan");

    this.hodiny.tick(2000);

    assert(spy.calledOnce, 'test calledOnce selhal');
  });
});
