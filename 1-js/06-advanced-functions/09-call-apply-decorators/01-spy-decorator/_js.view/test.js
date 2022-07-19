describe("špión", function() {
  it("zapisuje volání do své vlastnosti", function() {
    function práce() {}

    práce = špión(práce);
    assert.deepEqual(práce.volání, []);

    práce(1, 2);
    assert.deepEqual(práce.volání, [
      [1, 2]
    ]);

    práce(3, 4);
    assert.deepEqual(práce.volání, [
      [1, 2],
      [3, 4]
    ]);
  });

  it("transparentně obaluje funkce", function() {

    let sečti = sinon.spy((a, b) => a + b);

    let obalenéSečti = spy(sečti);

    assert.equal(obalenéSečti(1, 2), 3);
    assert(sečti.calledWith(1, 2));
  });


  it("transparentně obaluje metody", function() {

    let kalk = {
      sečti: sinon.spy((a, b) => a + b)
    };

    kalk.obalenéSečti = spy(kalk.sečti);

    assert.equal(kalk.obalenéSečti(1, 2), 3);
    assert(kalk.sečti.calledWith(1, 2));
    assert(kalk.sečti.calledOn(kalk));
  });

});
