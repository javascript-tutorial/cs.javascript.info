```js demo
function debounce(funkce, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => funkce.apply(this, arguments), ms);
  };
}

```

Volání `debounce` vrátí wrapper. Když je zavolán, načasuje volání původní funkce po zadané době `ms` a zruší předchozí takový timeout.

