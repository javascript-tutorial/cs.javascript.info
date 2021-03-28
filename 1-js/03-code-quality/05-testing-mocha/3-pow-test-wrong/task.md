importance: 5

---

# Co je na tomto testu špatně?

Co je špatně na níže uvedeném testu funkce `mocnina`?

```js
it("Umocní x na n-tou", function() {
  let x = 5;

  let výsledek = x;
  assert.equal(pow(x, 1), výsledek);

  výsledek *= x;
  assert.equal(pow(x, 2), výsledek);

  výsledek *= x;
  assert.equal(pow(x, 3), výsledek);
});
```

P.S. Syntakticky je tento test korektní a projde.
