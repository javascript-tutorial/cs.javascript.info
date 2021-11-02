importance: 2

---

# Dvě funkce – jeden objekt

Je možné vytvořit funkce `A` a `B` tak, aby `new A()==new B()`?

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Pokud ano, uveďte příklad jejich kódu.
