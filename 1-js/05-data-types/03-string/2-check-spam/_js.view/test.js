describe("ověřSpam", function() {
  it('najde spam ve "levná ViAgRA zde"', function() {
    assert.isTrue(ověřSpam('levná ViAgRA zde'));
  });

  it('najde spam ve "zdarma xxxxx"', function() {
    assert.isTrue(ověřSpam('zdarma xxxxx'));
  });

  it('není spam v "nevinný králíček"', function() {
    assert.isFalse(ověřSpam('nevinný králíček'));
  });
});