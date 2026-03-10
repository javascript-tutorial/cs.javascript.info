'use strict';

class Setrvání {

  constructor({
    citlivost = 0.1, // rychlost menší než 0.1px/ms znamená "popojíždění nad elementem"
    interval = 100,    // budeme měřit rychlost myši jednou za 100ms
    elem,
    over,
    out
  }) {
    this.citlivost = citlivost;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // zajistíme, aby „this“ byl objekt v handlerech událostí
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // a ve funkci pro měření času (bude volána ze setInterval)
    this.rychlostPohybu = this.rychlostPohybu.bind(this);

    elem.addEventListener("mouseover", this.onMouseOver);

    elem.addEventListener("mouseout", this.onMouseOut);

  }

  onMouseOver(událost) {

    if (this.jeNadElementem) {
      // pokud jsme nad elementem, budeme tuto událost ignorovat,
      // protože rychlost už měříme
      return;
    }

    this.jeNadElementem = true;

    // po každém pohybu myši zkontrolujeme vzdálenost
    // mezi předchozími a aktuálními souřadnicemi ukazatele
    // pokud je menší než citlivost, pak je rychlost nízká

    this.předchozíX = událost.pageX;
    this.předchozíY = událost.pageY;
    this.předchozíČas = Date.now();

    elem.addEventListener('mousemove', this.onMouseMove);
    this.intervalMěřeníRychlosti = setInterval(this.rychlostPohybu, this.interval);
  }

  onMouseOut(událost) {
    // když opustíme element
    if (!událost.relatedTarget || !elem.contains(událost.relatedTarget)) {
      this.jeNadElementem = false;
      this.elem.removeEventListener('mousemove', this.onMouseMove);
      clearInterval(this.intervalMěřeníRychlosti);
      if (this.zůstáváNadElementem) {
        // pokud byla zastávka nad elementem
        this.out.call(this.elem, událost);
        this.zůstáváNadElementem = false;
      }
    }
  }

  onMouseMove(událost) {
    this.posledníX = událost.pageX;
    this.posledníY = událost.pageY;
    this.posledníČas = Date.now();
  }

  rychlostPohybu() {

    let rychlost;

    if (!this.posledníČas || this.posledníČas == this.předchozíČas) {
      // kurzor se nepohnul
      rychlost = 0;
    } else {
      rychlost = Math.sqrt(
        Math.pow(this.předchozíX - this.posledníX, 2) +
        Math.pow(this.předchozíY - this.posledníY, 2)
      ) / (this.posledníČas - this.předchozíČas);
    }

    if (rychlost < this.citlivost) {
      clearInterval(this.intervalMěřeníRychlosti);
      this.zůstáváNadElementem = true;
      this.over.call(this.elem);
    } else {
      // rychlost je vysoká, zapamatujeme si nové souřadnice jako předchozí
      this.předchozíX = this.posledníX;
      this.předchozíY = this.posledníY;
      this.předchozíČas = this.posledníČas;
    }
  }

  destroy() {
    elem.removeEventListener('mousemove', this.onMouseMove);
    elem.removeEventListener('mouseover', this.onMouseOver);
    elem.removeEventListener('mouseout', this.onMouseOut);
  }

}
