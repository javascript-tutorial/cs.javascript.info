function Akumulátor(počátečníHodnota) {
  this.hodnota = počátečníHodnota;

  this.načti = function() {
    this.hodnota += +prompt('Kolik přičíst?', 0);
  };

}