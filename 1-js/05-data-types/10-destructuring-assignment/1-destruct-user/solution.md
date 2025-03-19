
```js run
let uživatel = {
  jméno: "Jan",
  roky: 30
};

let {jméno, roky: věk, jeSprávce = false} = uživatel;

alert( jméno ); // Jan
alert( věk ); // 30
alert( jeSprávce ); // false
```