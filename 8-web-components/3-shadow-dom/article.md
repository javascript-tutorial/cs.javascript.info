# Stínový DOM

Stínový DOM slouží k zapouzdření. Umožňuje, aby komponenta měla výhradně svůj vlastní „stínový“ DOM strom, k němuž nelze neúmyslně přistupovat z hlavního dokumentu, který může mít svá lokální pravidla stylů a další věci.

## Vestavěný stínový DOM

Přemýšleli jste někdy nad tím, jak se vytvářejí složité prohlížečové ovládací prvky a jak se v nich nastavují styly?

Například `<input type="range">`:

<p>
<input type="range">
</p>

Prohlížeč k jejich vykreslení interně využívá DOM/CSS. Tato DOM struktura je před námi běžně skrytá, ale ve vývojářských nástrojích ji můžeme vidět. Například v Chrome musíme ve vývojářských nástrojích povolit možnost „Stínový model DOM user-agenta“.

Pak `<input type="range">` vypadá takto:

![](shadow-dom-range.png)

To, co vidíte pod `#shadow-root`, se nazývá „stínový DOM“.

Elementy vestavěného stínového DOMu nemůžeme získat běžnými JavaScriptovými funkcemi nebo selektory. Nejsou to obvyklé děti, ale silná technika zapouzdření.

V uvedeném příkladu vidíme užitečný atribut `pseudo`. Je nestandardní a existuje z historických důvodů. Můžeme jej použít k nastavení stylů podelementů pomocí CSS, například:

```html run autorun
<style>
/* obarvíme posuvník červeně */
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range">
```

Opakujeme, že `pseudo` je nestandardní atribut. Chronologicky prohlížeče napřed začaly experimentovat s vnitřními DOM strukturami, aby implementovaly ovládací prvky. Pak po nějaké době byl stínový DOM standardizován, aby nám vývojářům umožnil dělat něco podobného.

Dále budeme používat moderní standard stínového DOMu, uvedený ve [specifikaci DOMu](https://dom.spec.whatwg.org/#shadow-trees) a jiných souvisejících specifikacích.

## Stínový strom

DOM element může obsahovat dva druhy DOM podstromů:

1. Světlý (light) strom -- obvyklý DOM podstrom, tvořený HTML dětmi. Všechny podstromy, které jsme viděli v předchozích kapitolách, byly „světlé“.
2. Stínový (shadow) strom -- ukrytý DOM podstrom, nereflektovaný v HTML, ukrytý před zvědavýma očima.

Pokud element obsahuje oba, prohlížeč vykreslí pouze stínový strom. Můžeme však také nastavit určitou kompozici mezi stínovým a světlým stromem. Podrobnosti uvidíme později v kapitole <info:slots-composition>.

Stínový strom můžeme používat ve vlastních elementech, abychom ukryli vnitřní prvky komponent a aplikovali jejich lokální styly.

Například tento element `<zobraz-ahoj>` ukrývá svůj vnitřní DOM ve stínovém stromu:

```html run autorun height=60
<script>
customElements.define('zobraz-ahoj', class extends HTMLElement {
  connectedCallback() {
    const stín = this.attachShadow({mode: 'open'});
    stín.innerHTML = `<p>
      Ahoj, ${this.getAttribute('jmeno')}
    </p>`;
  }  
});
</script>

<zobraz-ahoj jmeno="Jan"></zobraz-ahoj>
```

Takto vypadá výsledný DOM ve vývojářských nástrojích Chromu, veškerý obsah je pod `#shadow-root`:

![](shadow-dom-say-hello.png)

Nejprve volání `elem.attachShadow({mode: …})` vytvoří stínový strom.

Jsou tady dvě omezení:
1. Pro každý element můžeme vytvořit jen jeden stínový kořen.
2. `elem` musí být buď vlastní element, nebo jeden z následujících: `article`, `aside`, `blockquote`, `body`, `div`, `footer`, `h1..h6`, `header`, `main`, `nav`, `p`, `section` nebo `span`. Ostatní elementy, např. `<img>`, nemohou obsahovat stínový strom.

Volba `mode` nastavuje úroveň zapouzdření. Musí mít jednu z těchto dvou hodnot:
- `"open"` (otevřený) -- stínový strom je dostupný ve vlastnosti `elem.shadowRoot`.

    Ke stínovému stromu elementu `elem` může přistupovat jakýkoli kód.
- `"closed"` (uzavřený) -- `elem.shadowRoot` je vždy `null`.

    Ke stínovému stromu můžeme přistupovat jen přes odkaz, který vrací `attachShadow` (a který je pravděpodobně skryt uvnitř třídy). Stínové stromy vytvářené prohlížečem, např. `<input type="range">`, jsou uzavřené. Nemůžeme k nim nijak přistupovat.

[Stínový kořen](https://dom.spec.whatwg.org/#shadowroot), vrácený metodou `attachShadow`, se podobá elementu: k jeho naplnění můžeme používat `innerHTML` nebo metody DOMu, např. `append`.

Element se stínovým kořenem se nazývá „hostitel stínového stromu“ a je k dispozici ve vlastnosti stínového kořene `host`:

```js
// předpokládáme {mode: "open"}, jinak elem.shadowRoot je null
alert(elem.shadowRoot.host === elem); // true
```

## Zapouzdření

Stínový DOM je přísně oddělen od hlavního dokumentu:

1. Elementy stínového DOMu nejsou viditelné pro `querySelector` ze světlého DOMu. Konkrétně elementy stínového DOMu mohou mít identifikátory, které jsou v konfliktu s těmi ze světlého DOMu. Musejí být unikátní jen v rámci stínového stromu.
2. Stínový DOM má své vlastní styly. Neaplikují se na něj pravidla stylů z vnějšího DOMu.

Příklad:

```html run untrusted height=40
<style>
*!*
  /* styl dokumentu se neaplikuje na stínový strom uvnitř #elem (1) */
*/!*
  p { color: red; }
</style>

<div id="elem"></div>

<script>
  elem.attachShadow({mode: 'open'});
*!*
    // stínový strom má svůj vlastní styl (2)
*/!*
  elem.shadowRoot.innerHTML = `
    <style> p { font-weight: bold; } </style>
    <p>Ahoj, Jane!</p>
  `;

*!*
  // <p> je vidět jen z dotazů zevnitř stínového stromu (3)
*/!*
  alert(document.querySelectorAll('p').length); // 0
  alert(elem.shadowRoot.querySelectorAll('p').length); // 1
</script>  
```

1. Styl z dokumentu nemá vliv na stínový strom.
2. ...Ale styl zevnitř funguje.
3. Abychom získali elementy ve stínovém stromu, musíme se dotazovat zevnitř tohoto stromu.

## Odkazy

- DOM: <https://dom.spec.whatwg.org/#shadow-trees>
- Kompatibilita: <https://caniuse.com/#feat=shadowdomv1>
- Stínový DOM je zmíněn v mnoha dalších specifikacích, např. [DOM Parsing](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) specifikuje, že stínový kořen má `innerHTML`.


## Shrnutí

Stínový DOM je způsob, jak vytvořit lokální DOM pro komponentu.

1. `shadowRoot = elem.attachShadow({mode: open|closed})` -- vytvoří stínový DOM pro `elem`. Pokud je `mode="open"`, pak je dostupný ve vlastnosti `elem.shadowRoot`.
2. Můžeme naplnit `shadowRoot` pomocí `innerHTML` nebo jiných metod DOMu.

Elementy stínového DOMu:
- Mají svůj vlastní prostor identifikátorů.
- Nejsou viditelné pro selektory JavaScriptu z hlavního dokumentu, např. `querySelector`.
- Používají styly jen ze stínového stromu, ne z hlavního dokumentu.

Pokud stínový DOM existuje, je prohlížečem vykreslen namísto tzv. „světlého DOMu“ (běžné děti). V kapitole <info:slots-composition> uvidíme, jak tyto dva stromy složit dohromady.
