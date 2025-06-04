describe("tlum(f, 1000)", function() {
  let f1000;
  let log = "";

  function f(a) {
    log += a;
  }

  before(function() {
    this.hodiny = sinon.useFakeTimers();
    f1000 = tlum(f, 1000);
  });

  it("první volání se spustí hned", function() {
    f1000(1); // spustí se hned
    assert.equal(log, "1");
  });

  it("další volání jsou ignorována 1000 ms, po nichž se spustí poslední volání", function() {
    f1000(2); // (tlumeno - méně než 1000 ms od posledního spuštění)
    f1000(3); // (tlumeno - méně než 1000 ms od posledního spuštění)
    // po 1000 ms se načasuje volání f(3)

    assert.equal(log, "1"); // právě teď bylo provedeno jen 1. volání

    this.hodiny.tick(1000); // po 1000 ms...
    assert.equal(log, "13"); // log==13, provede se volání f1000(3)
  });

  it("třetí volání čeká 1000 ms po druhém", function() {
    this.hodiny.tick(100);
    f1000(4); // (tlumeno - méně než 1000 ms od posledního spuštění)
    this.hodiny.tick(100);
    f1000(5); // (tlumeno - méně než 1000 ms od posledního spuštění)
    this.hodiny.tick(700);
    f1000(6); // (tlumeno - méně než 1000 ms od posledního spuštění)

    this.hodiny.tick(100); // nyní uplynulo 100 + 100 + 700 + 100 = 1000 ms

    assert.equal(log, "136"); // poslední volání bylo f(6)
  });

  after(function() {
    this.hodiny.restore();
  });

});

describe('tlum', () => {

  it('spustí předané volání jednou', hotovo => {
    let log = '';
    const f = řetězec => log += řetězec;
    const f10 = tlum(f, 10);
    f10('jednou');

    setTimeout(() => {
      assert.equal(log, 'jednou');
      hotovo();
    }, 20);
  });

});
