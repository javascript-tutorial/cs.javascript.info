describe("seskupPodleId", function() {

  it("vytvoří objekt seskupený podle id", function() {
    let uživatelé = [
      {id: 'jan', jméno: "Jan Novák", věk: 20},
      {id: 'anna', jméno: "Anna Nováková", věk: 24},
      {id: 'petr', jméno: "Petr Petřík", věk: 31},
    ];

    assert.deepEqual(seskupPodleId(uživatelé), {
      jan: {id: 'jan', jméno: "Jan Novák", věk: 20},
      anna: {id: 'anna', jméno: "Anna Nováková", věk: 24},
      petr: {id: 'petr', jméno: "Petr Petřík", věk: 31},
    });
  });

  it("funguje s prázdným polem", function() {
    uživatelé = [];
    assert.deepEqual(seskupPodleId(uživatelé), {});
  });
});
