Podle definice můžeme faktoriál `n!` zapsat jako `n * (n-1)!`.

Jinými slovy, výsledek funkce `faktoriál(n)` můžeme vypočítat jako `n` vynásobené výsledkem volání `faktoriál(n-1)`. A volání pro `n-1` může rekurzívně klesat níž a níž až k `1`.

```js run
function faktoriál(n) {
  return (n != 1) ? n * faktoriál(n - 1) : 1;
}

alert( faktoriál(5) ); // 120
```

Základem rekurze je hodnota `1`. Zde můžeme jako základ vzít také `0`, na tom příliš nezáleží, ale to nám dá jeden rekurzívní krok navíc:

```js run
function faktoriál(n) {
  return n ? n * faktoriál(n - 1) : 1;
}

alert( faktoriál(5) ); // 120
```
