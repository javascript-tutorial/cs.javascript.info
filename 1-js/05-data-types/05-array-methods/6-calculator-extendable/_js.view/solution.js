function Kalkulátor() {

  this.metody = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b
  };

  this.vypočítej = function(řetězec) {

    let split = řetězec.split(' '),
      a = +split[0],
      op = split[1],
      b = +split[2];

    if (!this.metody[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.metody[op](a, b);
  };

  this.přidejMetodu = function(jméno, funkce) {
    this.metody[jméno] = funkce;
  };
}
