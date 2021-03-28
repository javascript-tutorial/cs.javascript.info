
```js run demo
function mocnina(x, n) {
  let výsledek = x;

  for (let i = 1; i < n; i++) {
    výsledek *= x;
  }

  return výsledek;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n < 1) {
  alert(`${n}-tá mocnina není podporována, zadejte kladné celé číslo`);
} else {
  alert( mocnina(x, n) );
}
```
