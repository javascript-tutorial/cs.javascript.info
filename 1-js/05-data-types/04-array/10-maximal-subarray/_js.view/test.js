describe("vraťMaxSoučetPod", function() {
  it("maximální podsoučet [1, 2, 3] se rovná 6", function() {
    assert.equal(vraťMaxSoučetPod([1, 2, 3]), 6);
  });

  it("maximální podsoučet [-1, 2, 3, -9] se rovná 5", function() {
    assert.equal(vraťMaxSoučetPod([-1, 2, 3, -9]), 5);
  });

  it("maximální podsoučet [-1, 2, 3, -9, 11] se rovná 11", function() {
    assert.equal(vraťMaxSoučetPod([-1, 2, 3, -9, 11]), 11);
  });

  it("maximální podsoučet [-2, -1, 1, 2] se rovná 3", function() {
    assert.equal(vraťMaxSoučetPod([-2, -1, 1, 2]), 3);
  });

  it("maximální podsoučet [100, -9, 2, -3, 5] se rovná 100", function() {
    assert.equal(vraťMaxSoučetPod([100, -9, 2, -3, 5]), 100);
  });

  it("maximální podsoučet [] se rovná 0", function() {
    assert.equal(vraťMaxSoučetPod([]), 0);
  });

  it("maximální podsoučet [-1] se rovná 0", function() {
    assert.equal(vraťMaxSoučetPod([-1]), 0);
  });

  it("maximální podsoučet [-1, -2] se rovná 0", function() {
    assert.equal(vraťMaxSoučetPod([-1, -2]), 0);
  });

  it("maximální podsoučet [2, -8, 5, -1, 2, -3, 2] se rovná 6", function() {
    assert.equal(vraťMaxSoučetPod([2, -8, 5, -1, 2, -3, 2]), 6);
  });
});
