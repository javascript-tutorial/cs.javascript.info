Řešení:

```js run demo
function čekej(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = čekej(alert, 1000);

f1000("test"); // zobrazí "test" za 1000 ms
```

Prosíme všimněte si, jak je zde použita šipková funkce. Jak víme, šipkové funkce nemají vlastní `this` ani `arguments`, takže `f.apply(this, arguments)` převezme `this` a `arguments` z wrapperu.

Předáme-li běžnou funkci, `setTimeout` ji bude volat bez argumentů a `this=window` (za předpokladu, že jsme v prohlížeči).

Stále můžeme předávat pravé `this` pomocí dočasné proměnné, ale to je trochu pracnější:

```js
function čekej(f, ms) {

  return function(...argumenty) {
    let uloženéThis = this; // uloží this do dočasné proměnné
    setTimeout(function() {
      f.apply(uloženéThis, argumenty); // zde ji použijeme
    }, ms);
  };

}
```
