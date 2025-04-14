describe("filtrujPodleRozsahu", function() {

  it("vrátí filtrované hodnoty", function() {

    let pole = [5, 3, 8, 1];

    let filtrovanéPole = filtrujPodleRozsahu(pole, 1, 4); 

    assert.deepEqual(filtrovanéPole, [3, 1]);
  });

  it("nezmění pole", function() {

    let pole = [5, 3, 8, 1];

    let filtrovanéPole = filtrujPodleRozsahu(pole, 1, 4); 

    assert.deepEqual(pole, [5,3,8,1]);
  });

});