importance: 5

---

# Čekací dekorátor

Vytvořte dekorátor `čekej(f, ms)`, který zpozdí každé volání funkce `f` o `ms` milisekund.

Například:

```js
function f(x) {
  alert(x);
}

// vytvoření wrapperů
let f1000 = čekej(f, 1000);
let f1500 = čekej(f, 1500);

f1000("test"); // zobrazí "test" za 1000 ms
f1500("test"); // zobrazí "test" za 1500 ms
```

Jinými slovy, `čekej(f, ms)` vrátí variantu `f` „zpožděnou o `ms`“.

Ve výše uvedeném kódu je `f` funkce s jediným argumentem, ale vaše řešení by mělo předávat všechny argumenty a kontextové `this`.
