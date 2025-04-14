```js run demo
function sečtiProdeje(prodeje) {

  let součet = 0;
  for (let prodej of Object.values(prodeje)) {
    součet += prodej;
  }

  return součet; // 650
}

let prodeje = {
  "Jan": 100,
  "Petr": 300,
  "Marie": 250
};

alert( sečtiProdeje(prodeje) ); // 650
```
Nebo volitelně můžeme také získat součet použitím `Object.values` a `reduce`:

```js
// reduce cykluje nad polem prodejů,
// sečte je
// a vrátí výsledek
function sečtiProdeje(prodeje) {
  return Object.values(prodeje).reduce((a, b) => a + b, 0) // 650
}
```
