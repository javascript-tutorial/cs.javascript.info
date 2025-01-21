
```js run
let platy = {
  Jan: 100,
  Anna: 160,
  Petr: 130
};

let součet = 0;
for (let klíč in platy) {
  součet += platy[klíč];
}

alert(součet); // 390
```

