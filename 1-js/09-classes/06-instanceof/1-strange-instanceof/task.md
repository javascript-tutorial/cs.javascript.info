importance: 5

---

# Podivné instanceof

Proč v následujícím kódu `instanceof` vrací `true`? Vidíme přece, že `a` není vytvořeno pomocí `B()`.

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
