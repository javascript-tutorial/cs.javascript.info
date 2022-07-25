class RozšířenéHodiny extends Hodiny {
  constructor(možnosti) {
    super(možnosti);
    let { přesnost = 1000 } = možnosti;
    this.přesnost = přesnost;
  }

  start() {
    this.vypiš();
    this.časovač = setInterval(() => this.vypiš(), this.přesnost);
  }
};
