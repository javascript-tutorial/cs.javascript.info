importance: 5

---

# Filtrace pomocí funkce

Máme vestavěnou metodu `pole.filter(f)` pro pole, která filtruje všechny prvky pomocí funkce `f`. Jestliže `f` vrátí `true`, bude prvek vrácen ve výsledném poli.

Vytvořte sadu filtrů „připravených k použití“:

- `mezi(a, b)` -- mezi `a` a `b` nebo rovno jim (inkluzívně).
- `vPoli([...])` -- v zadaném poli.

Použití musí být takovéto:

- `pole.filter(mezi(3,6))` -- vybere jen hodnoty mezi 3 a 6.
- `pole.filter(vPoli([1,2,3]))` -- vybere jen prvky, které se rovnají některému z prvků pole `[1,2,3]`.

Například:

```js
/* .. váš kód funkcí mezi a vPoli */
let pole = [1, 2, 3, 4, 5, 6, 7];

alert( pole.filter(mezi(3, 6)) ); // 3,4,5,6

alert( pole.filter(vPoli([1, 2, 10])) ); // 1,2
```

