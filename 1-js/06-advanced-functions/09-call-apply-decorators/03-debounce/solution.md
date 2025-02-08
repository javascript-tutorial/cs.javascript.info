```js demo
function vyčkej(funkce, ms) {
  let časovač;
  return function() {
    clearTimeout(časovač);
    časovač = setTimeout(() => funkce.apply(this, arguments), ms);
  };
}

```

Volání `vyčkej` vrátí obal. Když je zavolán, načasuje volání původní funkce po zadané době `ms` a zruší předchozí časovač.

