class Hodiny {
  constructor({ šablona }) {
    this.šablona = šablona;
  }

  vypiš() {
    let datum = new Date();

    let hodiny = datum.getHours();
    if (hodiny < 10) hodiny = '0' + hodiny;

    let minuty = datum.getMinutes();
    if (minuty < 10) minuty = '0' + minuty;

    let sekundy = datum.getSeconds();
    if (sekundy < 10) sekundy = '0' + sekundy;

    let výstup = this.šablona
      .replace('h', hodiny)
      .replace('m', minuty)
      .replace('s', sekundy);

    console.log(výstup);
  }

  stop() {
    clearInterval(this.časovač);
  }

  start() {
    this.vypiš();
    this.časovač = setInterval(() => this.vypiš(), 1000);
  }
}


let hodiny = new Hodiny({šablona: 'h:m:s'});
hodiny.start();
