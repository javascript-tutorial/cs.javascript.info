
Řešením je `pattern:<[^<>]+>`.

```js run
let rv = /<[^<>]+>/g;

let řetězec = '<> <a href="/"> <input type="radio" checked> <b>';

alert( řetězec.match(rv) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```
