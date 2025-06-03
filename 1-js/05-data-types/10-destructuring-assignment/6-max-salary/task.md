importance: 5

---

# Nejvyšší plat

Máme objekt `platy`:

```js
let platy = {
  "Jan": 100,
  "Petr": 300,
  "Marie": 250
};
```

Vytvořte funkci `nejvyššíPlat(platy)`, která vrátí jméno nejlépe placené osoby.

- Je-li objekt `platy` prázdný, měla by vrátit `null`.
- Jestliže je nejlépe placených osob více, může vrátit libovolnou z nich.

P.S. K iteraci nad dvojicemi klíč/hodnota použijte `Object.entries` a destrukturaci.
