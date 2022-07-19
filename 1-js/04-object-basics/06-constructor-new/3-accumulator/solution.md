

```js run demo
function Akumulátor(počátečníHodnota) {
  this.hodnota = počátečníHodnota;

  this.načti = function() {
    this.hodnota += +prompt('Kolik přičíst?', 0);
  };

}

let akumulátor = new Akumulátor(1);
akumulátor.načti();
akumulátor.načti();
alert(akumulátor.hodnota);
```
