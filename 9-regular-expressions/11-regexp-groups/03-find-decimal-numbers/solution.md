Kladné číslo s nepovinnou desetinnou částí je: `pattern:\d+(\.\d+)?`.

Přidejme na začátek nepovinnou `pattern:-`:

```js run
let rv = /-?\d+(\.\d+)?/g;

let řetězec = "-1.5 0 2 -123.4.";

alert( řetězec.match(rv) );   // -1.5, 0, 2, -123.4
```
