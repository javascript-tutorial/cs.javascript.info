// Posílání zpráv, jednoduchý POST
function OdešliFormulář(form, url) {

  function odešliZprávu(zpráva) {
    fetch(url, {
      method: 'POST',
      body: zpráva
    });
  }

  form.onsubmit = function() {
    let zpráva = form.zpráva.value;
    if (zpráva) {
      form.zpráva.value = '';
      odešliZprávu(zpráva);
    }
    return false;
  };
}

// Přijímání zpráv dlouhým dotazováním
function ZapišZáložku(elem, url) {

  function zobrazZprávu(zpráva) {
    let elemZprávy = document.createElement('div');
    elemZprávy.append(zpráva);
    elem.append(elemZprávy);
  }

  async function podpis() {
    let odpověď = await fetch(url);

    if (odpověď.status == 502) {
      // Vypršel čas spojení
      // nastává, když spojení čeká příliš dlouho
      // spojíme se znovu
      await podpis();
    } else if (odpověď.status != 200) {
      // Zobrazíme chybu
      zobrazZprávu(odpověď.statusText);
      // Za jednu sekundu se spojíme znovu
      await new Promise(splň => setTimeout(splň, 1000));
      await podpis();
    } else {
      // Přijali jsme zprávu
      let zpráva = await odpověď.text();
      zobrazZprávu(zpráva);
      await podpis();
    }
  }

  podpis();

}
