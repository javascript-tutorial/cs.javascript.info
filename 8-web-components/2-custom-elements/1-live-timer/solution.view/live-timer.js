class ŽivéHodiny extends HTMLElement {

  vykresli() {
    this.innerHTML = `
    <formatovany-cas hodiny="numeric" minuty="numeric" sekundy="numeric">
    </formatovany-cas>
    `;

    this.elemČasovače = this.firstElementChild;
  }

  connectedCallback() { // (2)
    if (!this.vykreslen) {
      this.vykresli();
      this.vykreslen = true;
    }
    this.časovač = setInterval(() => this.update(), 1000);
  }

  update() {
    this.datum = new Date();
    this.elemČasovače.setAttribute('datumčas', this.datum);
    this.dispatchEvent(new CustomEvent('tik', { detail: this.datum }));
  }

  disconnectedCallback() {
    clearInterval(this.časovač); // důležité, aby element mohl být odstraněn sběračem odpadků
  }

}

customElements.define("zive-hodiny", ŽivéHodiny);
