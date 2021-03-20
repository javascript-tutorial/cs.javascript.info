Řešení pomocí `if`:

```js
function min(a, b) {
  if (a < b) {
    return a;
  } else {
    return b;
  }
}
```

Řešení pomocí operátoru otazníku `'?'`:

```js
function min(a, b) {
  return a < b ? a : b;
}
```

P.S. V případě rovnosti `a == b` nezáleží na tom, kterou proměnnou funkce vrátí.