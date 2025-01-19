

```js run
Function.prototype.odlož = function(ms) {
  let f = this;
  return function(...argumenty) {
    setTimeout(() => f.apply(this, argumenty), ms);
  }
};

// zkontrolujeme to
function f(a, b) {
  alert( a + b );
}

f.odlož(1000)(1, 2); // zobrazí 3 za 1 sekundu
```

Prosíme všimněte si: ve `f.apply` používáme `this`, aby naše dekorace fungovala pro objektové metody.

Jestliže je tedy wrapper volán jako objektová metoda, pak se `this` předá původní metodě `f`.

```js run
Function.prototype.odlož = function(ms) {
  let f = this;
  return function(...argumenty) {
    setTimeout(() => f.apply(this, argumenty), ms);
  }
};

let uživatel = {
  jméno: "Jan",
  řekniAhoj() {
    alert(this.jméno);
  }
}

uživatel.řekniAhoj = uživatel.řekniAhoj.odlož(1000);

uživatel.řekniAhoj();
```
