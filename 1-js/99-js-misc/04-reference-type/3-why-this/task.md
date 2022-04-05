importance: 3

---

# Vysvětlete hodnotu „this“

V níže uvedeném kódu jsme zamýšleli volat metodu `obj.jdi()` čtyřikrát za sebou.

Avšak volání `(1)` a `(2)` fungují jinak než `(3)` a `(4)`. Proč?

```js run no-beautify
let obj, metoda;

obj = {
  jdi: function() { alert(this); }
};

obj.jdi();               // (1) [object Object]

(obj.jdi)();             // (2) [object Object]

(metoda = obj.jdi)();    // (3) undefined

(obj.jdi || obj.stůj)(); // (4) undefined
```

