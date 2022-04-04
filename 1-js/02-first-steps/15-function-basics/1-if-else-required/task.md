importance: 4

---

# Je nutné „else“?

Následující funkce vrátí `true`, jestliže parametr `věk` je větší než `18`. Jinak se zeptá na povolení a vrátí výsledek dotazu:

```js
function ověřVěk(věk) {
  if (věk > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Dovolili ti to rodiče?');
  }
*/!*
}
```

Bude tato funkce fungovat jinak, bude-li odstraněno `else`?

```js
function ověřVěk(věk) {
  if (věk > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Dovolili ti to rodiče?');
*/!*
}
```

Je nějaký rozdíl mezi chováním těchto dvou variant?
