importance: 5

---

# Součet vlastností

Máme objekt `prodeje` s určitým počtem prodejů.

Napište funkci `sečtiProdeje(prodeje)`, která vrátí součet všech prodejů, přičemž bude využívat `Object.values` a cyklus `for..of`.

Je-li objekt `prodeje` prázdný, výsledek musí být `0`.

Příklad:

```js
let prodeje = {
  "Jan": 100,
  "Petr": 300,
  "Marie": 250
};

alert( sečtiProdeje(prodeje) ); // 650
```

