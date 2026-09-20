class FormátovanýČas extends HTMLElement {

  vykresli() {
    let datum = new Date(this.getAttribute('datumčas') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('rok') || undefined,
      month: this.getAttribute('měsíc') || undefined,
      day: this.getAttribute('den') || undefined,
      hour: this.getAttribute('hodiny') || undefined,
      minute: this.getAttribute('minuty') || undefined,
      second: this.getAttribute('sekundy') || undefined,
      timeZoneName: this.getAttribute('časové-pásmo') || undefined,
    }).format(datum);
  }

  connectedCallback() {
    if (!this.vykreslen) {
      this.vykresli();
      this.vykreslen = true;
    }
  }

  static get observedAttributes() {
    return ['datumčas', 'rok', 'měsíc', 'den', 'hodiny', 'minuty', 'sekundy', 'časové-pásmo'];
  }

  attributeChangedCallback(název, původníHodnota, nováHodnota) { 
    this.vykresli();
  }

}

customElements.define("formatovany-cas", FormátovanýČas);
