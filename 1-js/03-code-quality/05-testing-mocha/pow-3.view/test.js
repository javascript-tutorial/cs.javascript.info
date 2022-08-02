describe("mocnina", function() {

  function vytvořTest(x) {
    let očekáváno = x * x * x;
    it(`${x} na 3 je ${očekáváno}`, function() {
      assert.equal(mocnina(x, 3), očekáváno);
    });
  }

  for (let x = 1; x <= 5; x++) {
    vytvořTest(x);
  }

});
