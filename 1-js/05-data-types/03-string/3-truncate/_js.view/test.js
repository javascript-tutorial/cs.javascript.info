describe("zkrať", function() {
  it("zkrátí dlouhý řetězec na zadanou délku (včetně výpustky)", function() {
    assert.equal(
      truncate("To, co bych k tomuto tématu rád řekl, je:", 20),
      "To, co bych k tomut…"
    );
  });

  it("nezmění krátké řetězce", function() {
    assert.equal(
      truncate("Ahoj všichni!", 20),
      "Ahoj všichni!"
    );
  });

});
