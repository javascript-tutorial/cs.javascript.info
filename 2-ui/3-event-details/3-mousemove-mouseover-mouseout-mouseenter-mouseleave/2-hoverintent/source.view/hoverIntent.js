'use strict';

// Zde je krátký náčrt třídy
// s věcmi, které budete zaručeně potřebovat
class Setrvání {

  constructor({
    citlivost = 0.1, // rychlost menší než 0.1px/ms znamená "popojíždění nad elementem"
    interval = 100, // budeme měřit rychlost myši jednou za 100ms: spočítáme vzdálenost mezi předchozími a nynějšími body
    elem,
    over,
    out
  }) {
    this.citlivost = citlivost;
    this.interval = interval;
    this.elem = elem;
    this.over = over;
    this.out = out;

    // zajistíme, aby „this“ byl objekt v handlerech událostí.
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    // přiřadíme handlery
    elem.addEventListener("mouseover", this.onMouseOver);
    elem.addEventListener("mouseout", this.onMouseOut);

    // od tohoto bodu pokračujte

  }

  onMouseOver(událost) {
    /* ... */
  }

  onMouseOut(událost) {
    /* ... */
  }

  onMouseMove(událost) {
    /* ... */
  }


  destroy() {
    /* váš kód pro „zakázání“ této funkcionality, odstraní všechny handlery */
    /* je nezbytný, aby fungovaly testy */
  }

}
