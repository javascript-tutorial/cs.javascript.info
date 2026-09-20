# Najděte nezáporná čísla

Máme řetězec celých čísel.

Vytvořte regulární výraz, který mezi nimi najde jen nezáporná čísla (včetně nuly).

Příklad použití:
```js
let rv = /váš RV/g;

let řetězec = "0 12 -5 123 -18";

alert( řetězec.match(rv) ); // 0, 12, 123
```
