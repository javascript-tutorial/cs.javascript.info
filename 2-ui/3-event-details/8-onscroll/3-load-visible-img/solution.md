Handler `onscroll` by si měl zkontrolovat, které obrázky jsou vidět, a zobrazit je.

Chceme ho spustit i ve chvíli, kdy se stránka načte, abychom detekovali okamžitě viditelné obrázky a načetli je.

Kód by se měl spustit, až bude dokument načten, aby měl přístup k celému jeho obsahu.

Nebo jej umístíme na konec `<body>`:

```js
// ...obsah stránky je výše...

function jeVidět(elem) {

  let souřadnice = elem.getBoundingClientRect();

  let výškaOkna = document.documentElement.clientHeight;

  // je vidět vrch elementu?
  let jeVidětVrch = souřadnice.top > 0 && souřadnice.top < výškaOkna;

  // je vidět spodek elementu?
  let jeVidětSpodek = souřadnice.bottom < výškaOkna && souřadnice.bottom > 0;

  return jeVidětVrch || jeVidětSpodek;
}
```

Funkce `zobrazViditelné()` použije kontrolu viditelnosti, implementovanou ve funkci `jeVidět()`, a načte viditelné obrázky:

```js
function zobrazViditelné() {
  for (let obrázek of document.querySelectorAll('img')) {
    let skutečnýZdroj = obrázek.dataset.src;
    if (!skutečnýZdroj) continue;

    if (jeVidět(obrázek)) {
      obrázek.src = skutečnýZdroj;
      obrázek.dataset.src = '';
    }
  }
}

*!*
zobrazViditelné();
window.onscroll = zobrazViditelné;
*/!*
```

P.S. Řešení obsahuje i variantu funkce `jeVidět`, která „přednahraje“ obrázky, které jsou o jednu stránku nad nebo pod aktuálním rolováním dokumentu.
