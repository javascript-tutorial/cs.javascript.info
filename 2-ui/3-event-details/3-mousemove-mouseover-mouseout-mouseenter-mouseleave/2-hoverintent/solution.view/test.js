'use strict';

describe("setrvání", function() {

  function myš(typUdálosti, x, y, možnosti) {
    let možnostiUdálosti = Object.assign({
      bubbles: true,
      clientX: x,
      clientY: y,
      pageX: x,
      pageY: y,
      target: elem
    }, možnosti || {});

    elem.dispatchEvent(new MouseEvent(typUdálosti, možnostiUdálosti));
  }


  let jeNadElementem;
  let setrvání;


  before(function() {
    this.hodiny = sinon.useFakeTimers();
  });

  after(function() {
    this.hodiny.restore();
  });


  beforeEach(function() {
    jeNadElementem = false;

    setrvání = new Setrvání({
      elem: elem,
      over: function() {
        jeNadElementem = true;
      },
      out: function() {
        jeNadElementem = false;
      }
    });
  })

  afterEach(function() {
    if (setrvání) {
      setrvání.destroy();
    }
  })

  it("mouseover -> když ukazatel právě dorazil, nezobrazí se tooltip", function() {
    myš('mouseover', 10, 10);
    assert.isFalse(jeNadElementem);
  });

  it("mouseover -> po prodlevě se tooltip zobrazí", function() {
    myš('mouseover', 10, 10);
    this.hodiny.tick(100);
    assert.isTrue(jeNadElementem);
  });

  it("mouseover -> následované rychlými pohyby myši nezobrazí tooltip", function() {
    myš('mouseover', 10, 10);
    setTimeout(
      () => myš('mouseout', 300, 300, { relatedTarget: document.body}),
      30
    );
    this.hodiny.tick(100);
    assert.isFalse(jeNadElementem);
  });


  it("mouseover -> pomalý pohyb -> zobrazí se tooltip", function() {
    myš('mouseover', 10, 10);
    for(let i=10; i<200; i+= 10) {
      setTimeout(
        () => myš('mousemove', i/5, 10),
        i
      );
    }
    this.hodiny.tick(200);
    assert.isTrue(jeNadElementem);
  });

  it("mouseover -> rychlý pohyb -> nezobrazí se tooltip", function() {
    myš('mouseover', 10, 10);
    for(let i=10; i<200; i+= 10) {
      setTimeout(
        () => myš('mousemove', i, 10),
        i
      );
    }
    this.hodiny.tick(200);
    assert.isFalse(jeNadElementem);
  });

});
