Volání `pole[2]()` je syntakticky stará dobrá `obj[metoda]()`, v roli `obj` máme `pole` a v roli `metoda` máme `2`.

Zavolali jsme tedy funkci `pole[2]` jako objektovou metodu. Ta přirozeně obdrží `this` odkazující se na objekt `pole` a vypíše toto pole:

```js run
let pole = ["a", "b"];

pole.push(function() {
  alert( this );
})

pole[2](); // a,b,function(){...}
```

Toto pole má 3 hodnoty: na začátku mělo dvě, plus funkce.
