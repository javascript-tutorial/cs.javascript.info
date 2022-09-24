```js run demo
function Kalkulátor() {

  this.načti = function() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  };

  this.součet = function() {
    return this.a + this.b;
  };

  this.součin = function() {
    return this.a * this.b;
  };
}

let kalkulátor = new Kalkulátor();
kalkulátor.načti();

alert( "Součet=" + kalkulátor.součet() );
alert( "Součin=" + kalkulátor.součin() );
```
