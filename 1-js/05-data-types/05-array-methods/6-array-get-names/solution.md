```js run

let jan = { jméno: "Jan", věk: 25 };
let petr = { jméno: "Petr", věk: 30 };
let marie = { jméno: "Marie", věk: 28 };

let uživatelé = [ jan, petr, marie ];

let jména = uživatelé.map(prvek => prvek.jméno);

alert( jména ); // Jan, Petr, Marie
```

