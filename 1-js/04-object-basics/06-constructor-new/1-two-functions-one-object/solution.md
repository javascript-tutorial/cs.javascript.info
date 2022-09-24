Ano, je to možné.

Jestliže funkce vrací objekt, pak jej `new` vrátí místo `this`.

Mohou tedy například vrátit stejný externě definovaný objekt `obj`:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
