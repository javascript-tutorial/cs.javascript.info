
# Filtr mezi

```js run
function mezi(a, b) {
  return function(x) {
    return x >= a && x <= b;
  };
}

let pole = [1, 2, 3, 4, 5, 6, 7];
alert( pole.filter(mezi(3, 6)) ); // 3,4,5,6
```

# Filtr vPoli

```js run demo
function vPoli(pole) {
  return function(x) {
    return pole.includes(x);
  };
}

let pole = [1, 2, 3, 4, 5, 6, 7];
alert( pole.filter(vPoli([1, 2, 10])) ); // 1,2
```
