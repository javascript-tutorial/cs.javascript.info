describe("filtrujPodleRozsahuNaMístě", function() {

  it("vrátí filtrované hodnoty", function() {

    let pole = [5, 3, 8, 1];

<<<<<<< HEAD
    filtrujPodleRozsahuNaMístě(pole, 1, 4); 

    assert.deepEqual(pole, [3, 1]);
=======
    filterRangeInPlace(arr, 2, 5); 

    assert.deepEqual(arr, [5, 3]);
>>>>>>> e2f9e5840737e00846bfd492192d8a3828820c60
  });

  it("nic nevrací", function() {
    assert.isUndefined(filtrujPodleRozsahuNaMístě([1,2,3], 1, 4)); 
  });

});
