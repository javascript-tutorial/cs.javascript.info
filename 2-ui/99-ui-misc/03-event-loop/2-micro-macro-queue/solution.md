Výstup na konzoli bude: 1 7 3 5 2 6 4.

Tato úloha je poměrně jednoduchá. Stačí jen vědět, jak fungují fronty mikroúloh a makroúloh.

Podívejme se krok za krokem, co se děje.

```js
console.log(1);
// První řádek se spustí okamžitě a vypíše `1`.
// Fronta makroúloh i fronta mikroúloh jsou zatím prázdné.

setTimeout(() => console.log(2));
// `setTimeout` přidá callback do fronty makroúloh.
// - obsah fronty makroúloh:
//   `console.log(2)`

Promise.resolve().then(() => console.log(3));
// Callback se přidá do fronty mikroúloh.
// - obsah fronty mikroúloh:
//   `console.log(3)`

Promise.resolve().then(() => setTimeout(() => console.log(4)));
// Callback se `setTimeout(...4)` se přidá do fronty mikroúloh.
// - obsah fronty mikroúloh:
//   `console.log(3); setTimeout(...4)`

Promise.resolve().then(() => console.log(5));
// Callback se přidá do fronty mikroúloh.
// - obsah fronty mikroúloh:
//   `console.log(3); setTimeout(...4); console.log(5)`

setTimeout(() => console.log(6));
// `setTimeout` přidá callback do fronty makroúloh.
// - obsah fronty makroúloh:
//   `console.log(2); console.log(6)`

console.log(7);
// Okamžitě vypíše 7.
```

Když to shrneme:

1. Čísla `1` a `7` se zobrazí okamžitě, neboť jednoduchá volání `console.log` nepoužívají žádnou frontu.
2. Pak po dokončení běhu hlavního kódu se spustí fronta mikroúloh.
    - Obsahuje tyto příkazy: `console.log(3); setTimeout(...4); console.log(5)`.
    - Zobrazí se čísla `3` a `5`, zatímco `setTimeout(() => console.log(4))` přidá volání `console.log(4)` na konec fronty makroúloh.
    - Fronta makroúloh je nyní: `console.log(2); console.log(6); console.log(4)`.
3. Po vyprázdnění fronty mikroúloh se spustí fronta makroúloh a vypíše `2`, `6`, `4`.

Nakonec tedy máme výstup: `1 7 3 5 2 6 4`.