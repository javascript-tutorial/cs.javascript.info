describe("vraťUživatele", function() {

  it("vrátí uživatele z GitHubu", async function() {
    let uživatelé = await vraťUživatele(['iliakan', 'remy', 'no.such.users']);
    assert.equal(uživatelé[0].login, 'iliakan');
    assert.equal(uživatelé[1].login, 'remy');
    assert.equal(uživatelé[2], null);
  });

});
