
První volání má `this == králík`, v ostatních je `this` rovno `Králík.prototype`, protože je to ve skutečnosti objekt před tečkou.

Jedině první volání tedy zobrazí `Králík`, ostatní zobrazí `undefined`:

```js run
function Králík(jméno) {
  this.jméno = jméno;
}
Králík.prototype.řekniAhoj = function() {
  alert( this.jméno );
}

let králík = new Králík("Králík");

králík.řekniAhoj();                        // Králík
Králík.prototype.řekniAhoj();              // undefined
Object.getPrototypeOf(králík).řekniAhoj(); // undefined
králík.__proto__.řekniAhoj();              // undefined
```
