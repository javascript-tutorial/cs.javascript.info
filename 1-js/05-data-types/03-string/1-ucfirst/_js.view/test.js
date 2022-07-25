describe("velkéPrvníPísmeno", function() {
  it('První symbol převede na velké písmeno', function() {
    assert.strictEqual(velkéPrvníPísmeno("jan"), "Jan");
  });

  it("Nespadne na prázdném řetězci", function() {
    assert.strictEqual(velkéPrvníPísmeno(""), "");
  });
});