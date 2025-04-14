```js run
function vraťPrůměrnýVěk(uživatelé) {
  return uživatelé.reduce((předchozí, uživatel) => předchozí + uživatel.věk, 0) / uživatelé.length;
}

let jan = { jméno: "Jan", věk: 25 };
let petr = { jméno: "Petr", věk: 30 };
let marie = { jméno: "Marie", věk: 29 };

let pole = [ jan, petr, marie ];

alert( vraťPrůměrnýVěk(pole) ); // 28
```

