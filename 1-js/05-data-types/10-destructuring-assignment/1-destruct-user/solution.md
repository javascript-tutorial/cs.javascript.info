
```js run
let uživatel = {
  jméno: "Jan",
  roky: 30
};

let {jméno, roky: věk, jeAdmin = false} = uživatel;

alert( jméno ); // Jan
alert( věk ); // 30
alert( jeAdmin ); // false
```