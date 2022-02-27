
Toto je případ, kdy nám pomáhá, že víme, jak to funguje uvnitř.

Jednoduše zacházejte s voláním `async` jako s příslibem a připojte k němu `.then`:
```js run
async function čekej() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // za 1 sekundu zobrazí 10
*!*
  čekej().then(výsledek => alert(výsledek));
*/!*
}

f();
```
