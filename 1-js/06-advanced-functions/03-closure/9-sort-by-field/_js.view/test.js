describe("podleVlastnosti", function(){

  let uživatelé = [
    { jméno: "Jan", věk: 20, příjmení: "Janík" },
    { jméno: "Petr", věk: 18, příjmení: "Petřík" },
    { jméno: "Anna", věk: 19, příjmení: "Hadrabová" },
  ];

  it("seřadíme uživatele podle jména", function(){
    let seřazeníPodleJménaKlíč = [
      { jméno: "Anna", věk: 19, příjmení: "Hadrabová" },
      { jméno: "Jan", věk: 20, příjmení: "Janík"},
      { jméno: "Petr", věk: 18, příjmení: "Petřík" },
    ];
    let seřazeníPodleJménaOdpověď = uživatelé.sort(podleVlastnosti("jméno"));
    assert.deepEqual(seřazeníPodleJménaKlíč, seřazeníPodleJménaOdpověď);
  });

  it("seřadíme uživatele podle věku", function(){
    let seřazeníPodleVěkuKlíč = [
      { jméno: "Petr", věk: 18, příjmení: "Petřík" },
      { jméno: "Anna", věk: 19, příjmení: "Hadrabová" },
      { jméno: "Jan", věk: 20, příjmení: "Janík"},
    ];
    let seřazeníPodleVěkuOdpověď = uživatelé.sort(podleVlastnosti("věk"));
    assert.deepEqual(seřazeníPodleVěkuKlíč, seřazeníPodleVěkuKlíč);
  });

  it("seřadíme uživatele podle příjmení", function(){
    let seřazeníPodlePříjmeníKlíč = [
      { jméno: "Anna", věk: 19, příjmení: "Hadrabová" },
      { jméno: "Jan", věk: 20, příjmení: "Janík"},
      { jméno: "Petr", věk: 18, příjmení: "Petřík" },
    ];
    let seřazeníPodlePříjmeníOdpověď = uživatelé.sort(podleVlastnosti("příjmení"));
    assert.deepEqual(seřazeníPodlePříjmeníOdpověď, seřazeníPodlePříjmeníKlíč);
  });

});
