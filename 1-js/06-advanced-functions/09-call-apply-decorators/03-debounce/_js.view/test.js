describe('vyčkej', function () {
  before(function () {
    this.hodiny = sinon.useFakeTimers();
  });

  after(function () {
    this.hodiny.restore();
  });

  it('pro jedno volání - spustí je po zadané době v ms', function () {
    const f = sinon.spy();
    const vyčkáváno = vyčkej(f, 1000);

    vyčkáváno('test');
    assert(f.notCalled, 'nevolá se okamžitě');
    this.hodiny.tick(1000);
    assert(f.calledOnceWith('test'), 'voláno po 1000 ms');
  });

  it('pro 3 volání - spustí poslední po zadané době v ms', function () {
    const f = sinon.spy();
    const vyčkáváno = vyčkej(f, 1000);

    vyčkáváno('a');
    setTimeout(() => vyčkáváno('b'), 200); // ignorováno (příliš brzy)
    setTimeout(() => vyčkáváno('c'), 500); // spustí se (1000 ms uplynulo)
    this.hodiny.tick(1000);

    assert(f.notCalled, 'nevoláno po 1000 ms');

    this.hodiny.tick(500);

    assert(f.calledOnceWith('c'), 'voláno po 1500 ms');
  });

  it('udržuje si kontext volání', function () {
    let obj = {
      f() {
        assert.equal(this, obj);
      },
    };

    obj.f = vyčkej(obj.f, 1000);
    obj.f('test');
    this.hodiny.tick(5000);
  });
  
});
