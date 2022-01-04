describe("filtrujPodleRozsahuNaMístě", function() {

  it("vrátí filtrované hodnoty", function() {

    let pole = [5, 3, 8, 1];

    filtrujPodleRozsahuNaMístě(pole, 1, 4); 

    assert.deepEqual(pole, [3, 1]);
  });

  it("nic nevrací", function() {
    assert.isUndefined(filtrujPodleRozsahuNaMístě([1,2,3], 1, 4)); 
  });

});