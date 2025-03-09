describe("camelizace", function() {

  it("prázdný řádek nechá tak, jak je", function() {
    assert.equal(camelizace(""), "");
  });

  it("změní background-color na backgroundColor", function() {
    assert.equal(camelizace("background-color"), "backgroundColor");
  });

  it("změní list-style-image na listStyleImage", function() {
    assert.equal(camelizace("list-style-image"), "listStyleImage");
  });

  it("změní -webkit-transition na WebkitTransition", function() {
    assert.equal(camelizace("-webkit-transition"), "WebkitTransition");
  });

});