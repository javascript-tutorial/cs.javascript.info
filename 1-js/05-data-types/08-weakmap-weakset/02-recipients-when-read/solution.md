
K uložení data můžeme použít `WeakMap`:

```js
let zprávy = [
  {text: "Ahoj", od: "Jan"},
  {text: "Jak se máš?", od: "Jan"},
  {text: "Brzy se uvidíme", od: "Alice"}
];

let mapaPřečtení = new WeakMap();

mapaPřečtení.set(zprávy[0], new Date(2017, 1, 1));
// objekty Date prostudujeme později
```
