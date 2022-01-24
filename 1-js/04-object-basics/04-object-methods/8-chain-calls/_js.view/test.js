
describe('Žebřík', function() {
  before(function() {
    window.alert = sinon.stub(window, "alert");
  });
  
  beforeEach(function() {
    žebřík.stupeň = 0;
  });

  it('nahoru() by mělo vrátit this', function() {
    assert.equal(žebřík.nahoru(), žebřík);
  });

  it('dolů() by mělo vrátit this', function() {
    assert.equal(žebřík.dolů(), žebřík);
  });

  it('zobrazStupeň() by mělo volat alert', function() {
    žebřík.zobrazStupeň();
    assert(alert.called);
  });

  it('nahoru() by mělo zvýšit stupeň', function() {
    assert.equal(žebřík.nahoru().nahoru().stupeň, 2);
  });

  it('dolů() by mělo snížit stupeň', function() {
    assert.equal(žebřík.dolů().stupeň, -1);
  });

  it('dolů().nahoru().nahoru().nahoru() ', function() {
    assert.equal(žebřík.dolů().nahoru().nahoru().nahoru().stupeň, 2);
  });

  it('showStep() should return this', function() {
    assert.equal(ladder.showStep(), ladder);
  });
 
  it('up().up().down().showStep().down().showStep()', function () {
    assert.equal(ladder.up().up().down().showStep().down().showStep().step, 0)
  });
  
  after(function() {
    žebřík.stupeň = 0;
    alert.restore();
  });
});
