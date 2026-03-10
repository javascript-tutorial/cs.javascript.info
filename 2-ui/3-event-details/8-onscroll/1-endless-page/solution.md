Jádrem řešení je funkce, která přidá na stránku další data (nebo v reálném životě načte další obsah), když jsme na konci stránky.

Můžeme ji okamžitě zavolat a přidat jako handler `window.onscroll`.

Nejdůležitější otázka zní: „Jak zjistíme, že stránka je odrolována na konec?“

Použijeme souřadnice relativní vzhledem k oknu.

Dokument je reprezentován (a obsažen) uvnitř značky `<html>`, což je `document.documentElement`.

Souřadnice celého dokumentu vzhledem k oknu můžeme získat voláním `document.documentElement.getBoundingClientRect()`, vlastnost `bottom` pak bude souřadnice dolního konce dokumentu vzhledem k oknu.

Pokud je například výška celého HTML dokumentu `2000px`, pak:

```js
// když jsme na vrchu stránky
// top vzhledem k oknu = 0
document.documentElement.getBoundingClientRect().top = 0

// bottom vzhledem k oknu = 2000
// dokument je dlouhý, takže to bude pravděpodobně daleko za dolním okrajem okna
document.documentElement.getBoundingClientRect().bottom = 2000
```

Pokud odrolujeme o `500px` dolů, pak:

```js
// vrch dokumentu je 500px nad oknem
document.documentElement.getBoundingClientRect().top = -500
// spodek dokumentu je o 500px blíž
document.documentElement.getBoundingClientRect().bottom = 1500
```

Když dorolujeme až na konec za předpokladu, že výška okna je `600px`:


```js
// vrch dokumentu je 1400px nad oknem
document.documentElement.getBoundingClientRect().top = -1400
// spodek dokumentu je 600px pod oknem
document.documentElement.getBoundingClientRect().bottom = 600
```

Prosíme všimněte si, že `bottom` nemůže být `0`, protože spodek nikdy nedosáhne vrchu okna. Nejnižší možná hodnota souřadnice `bottom` je výška okna (předpokládáme, že je to `600`), výš už rolovat nemůžeme.

Výšku okna můžeme získat jako `document.documentElement.clientHeight`.

V naší úloze potřebujeme vědět, kdy od ní není spodek dokumentu vzdálen více než `100px` (tedy `600-700px`, je-li výška `600`).

Funkce je tedy následující:

```js
function přidejDatum() {
  while(true) {
    // spodek dokumentu
    let spodekVzhledemKOknu = document.documentElement.getBoundingClientRect().bottom;

    // pokud uživatel nedoroloval dost daleko (>100px do konce)
    if (spodekVzhledemKOknu > document.documentElement.clientHeight + 100) break;
    
    // přidáme další data
    document.body.insertAdjacentHTML("beforeend", `<p>Date: ${new Date()}</p>`);
  }
}
```
