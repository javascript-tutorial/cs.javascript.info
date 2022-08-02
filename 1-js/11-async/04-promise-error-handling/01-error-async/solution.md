Odpověď zní: **ne, nespustí**:

```js run
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Ouha!");
  }, 1000);
}).catch(alert);
```

Jak bylo řečeno v této kapitole, kolem kódu funkce je „implicitní `try..catch`“. Všechny synchronní chyby tedy budou ošetřeny.

Zde však není chyba generována při běhu exekutoru, ale později. Příslib ji tedy nemůže zpracovat.
