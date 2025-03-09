Vytvořme datum z následujícího měsíce, ale jako den předáme nulu:
```js run demo
function vraťPosledníDenVMěsíci(rok, měsíc) {
  let datum = new Date(rok, měsíc + 1, 0);
  return datum.getDate();
}

alert( vraťPosledníDenVMěsíci(2012, 0) ); // 31
alert( vraťPosledníDenVMěsíci(2012, 1) ); // 29
alert( vraťPosledníDenVMěsíci(2013, 1) ); // 28
```

Normálně dny začínají od 1, ale technicky můžeme předat jakékoli číslo a datum se samo přizpůsobí. Když tedy předáme 0, bude to znamenat „jeden den před 1. dnem v měsíci“, jinými slovy: „poslední den předcházejícího měsíce“.
