importance: 5

---

# Zpožďovací dekorátor

Vytvořte dekorátor `zpozdi(f, ms)`, který zpozdí každé volání funkce `f` o `ms` milisekund.

Například:

```js
function f(x) {
  alert(x);
}

// vytvoření obalů
let f1000 = zpozdi(f, 1000);
let f1500 = zpozdi(f, 1500);

f1000("test"); // zobrazí "test" za 1000 ms
f1500("test"); // zobrazí "test" za 1500 ms
```

Jinými slovy, `zpozdi(f, ms)` vrátí variantu `f` „zpožděnou o `ms`“.

V uvedeném kódu je `f` funkce s jediným argumentem, ale vaše řešení by mělo předávat všechny argumenty a kontextové `this`.
