describe("unikát", function() {
  it("odstraní neunikátní prvky", function() {
    let řetězce = ["Haré", "Kršna", "Haré", "Kršna",
      "Kršna", "Kršna", "Haré", "Haré", ":-O"
    ];

    assert.deepEqual(unikát(řetězce), ["Haré", "Kršna", ":-O"]);
  });

  it("nemění zdrojové pole", function() {
    let řetězce = ["Kršna", "Kršna", "Haré", "Haré"];
    unikát(řetězce);
    assert.deepEqual(řetězce, ["Kršna", "Kršna", "Haré", "Haré"]);
  });
});
