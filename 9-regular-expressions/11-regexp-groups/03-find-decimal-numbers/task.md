# Najděte všechna čísla

Napište RV, který hledá všechna desetinná čísla včetně celých čísel, čísel s pohyblivou řádovou tečkou a záporných čísel.

Příklad použití:

```js
let rv = /váš RV/g;

let řetězec = "-1.5 0 2 -123.4.";

alert( řetězec.match(rv) ); // -1.5, 0, 2, -123.4
```
