importance: 5

---

# Ověření prázdnoty

Napište funkci `jePrázdný(obj)`, která vrátí `true`, jestliže objekt nemá žádné vlastnosti, a `false` jinak.

Měla by fungovat takto:

```js
let rozvrh = {};

alert( jePrázdný(rozvrh) ); // true

rozvrh["8:30"] = "vstát";

alert( jePrázdný(rozvrh) ); // false
```

