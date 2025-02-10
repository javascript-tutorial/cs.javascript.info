importance: 5

---

# Vyhledávací algoritmus

Tato úloha má dvě části.

Máme následující objekty:

```js
let hlava = {
  brýle: 1
};

let stůl = {
  pero: 3
};

let postel = {
  peřina: 1,
  polštář: 2
};

let kapsy = {
  peníze: 2000
};
```

1. Použijte `__proto__` k přiřazení prototypů takovým způsobem, že každé hledání vlastností bude dodržovat cestu: `kapsy` -> `postel` -> `stůl` -> `hlava`. Například `kapsy.pero` by mělo být `3` (nalezeno ve `stůl`) a `postel.brýle` by mělo být `1` (nalezeno v `hlava`).
2. Odpovězte na otázku: je rychlejší získat `brýle` jako `kapsy.brýle`, nebo jako `hlava.brýle`? Proveďte benchmark, bude-li zapotřebí.
