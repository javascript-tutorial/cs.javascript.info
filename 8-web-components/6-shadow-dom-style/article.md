# Nastavení stylů stínového DOMu

Stínový DOM může obsahovat značky `<style>` i `<link rel="stylesheet" href="…">`. Ve druhém případě se styly ukládají do HTTP mezipaměti, takže se pro další komponenty používající stejnou šablonu nebudou znovu stahovat.

Platí obecné pravidlo, že lokální styly fungují jedině uvnitř stínového stromu a dokumentové styly mimo něj. Existuje však několik výjimek.

## :host

Selektor `:host` nám umožňuje vybrat stínového hostitele (element obsahující stínový strom).

Například vytváříme element `<vlastni-dialog>`, který by měl být vycentrován. K tomu potřebujeme nastavit styl samotného elementu `<vlastni-dialog>`.

Přesně tohle provádí `:host`:

```html run autorun="no-epub" untrusted height=80
<template id="šablona">
  <style>
    /* tento styl bude aplikován zevnitř na element vlastni-dialog */
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('vlastni-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(šablona.content.cloneNode(true));
  }
});
</script>

<vlastni-dialog>
  Ahoj!
</vlastni-dialog>
```

## Kaskády

Stínový hostitel (samotný `<vlastni-dialog>`) přebývá ve světlém DOMu, takže na něj působí dokumentová pravidla CSS.

Pokud má nějaká vlastnost nastaven styl současně lokálně v `:host` a v dokumentu, pak má přednost dokumentový styl.

Kdybychom například v dokumentu měli:
```html
<style>
vlastni-dialog {
  padding: 0;
}
</style>
```
...Pak by `<vlastni-dialog>` neměl vnitřní okraj.

To je velmi praktické, neboť můžeme nastavit „standardní“ styly komponenty v jejím pravidle `:host` a pak je v dokumentu snadno přepsat.

Výjimkou je lokální vlastnost, která je označena jako `!important`. U takových vlastností mají přednost lokální styly.

## :host(selektor)

Totéž jako `:host`, ale aplikuje se jen tehdy, když stínový hostitel odpovídá selektoru `selektor`.

Například chceme centrovat `<vlastni-dialog>` jen tehdy, má-li atribut `centrovan`:

```html run autorun="no-epub" untrusted height=80
<template id="šablona">
  <style>
*!*
    :host([centrovan]) {
*/!*
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-color: blue;
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('vlastni-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(šablona.content.cloneNode(true));
  }
});
</script>


<vlastni-dialog centrovan>
  Centrován!
</vlastni-dialog>

<vlastni-dialog>
  Necentrován.
</vlastni-dialog>
```

Nyní se přidané centrovací styly aplikují jen na první dialog: `<vlastni-dialog centrovan   >`.

Když to shrneme, pro nastavení stylů hlavního elementu komponenty můžeme použít rodinu selektorů `:host`. Tyto styly (pokud nemají `!important`) mohou být v dokumentu přepsány.

## Nastavení stylů obsahu ve slotu

Uvažujme nyní situaci se sloty.

Elementy ve slotech pocházejí ze světlého DOMu, využívají tedy dokumentové styly. Lokální styly nemají na obsah ve slotech žádný vliv.

V následujícím příkladu má `<span>` ve slotu tučné písmo, jak je uvedeno v dokumentovém stylu, ale nepřebírá `background` z lokálního stylu:
```html run autorun="no-epub" untrusted height=80
<style>
*!*
  span { font-weight: bold }
*/!*
</style>

<karta-uzivatele>
  <div slot="uživatel">*!*<span>Jan Novák</span>*/!*</div>
</karta-uzivatele>

<script>
customElements.define('karta-uzivatele', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      span { background: red; }
*/!*
      </style>
      Jméno: <slot name="uživatel"></slot>
    `;
  }
});
</script>
```

Výsledek má tučné písmo, ale není červený.

Jestliže chceme nastavit styly elementů ve slotech v naší komponentě, máme dvě možnosti.

První je, že můžeme nastavit styly samotnému `<slot>` a spolehnout se na CSS dědičnost:

```html run autorun="no-epub" untrusted height=80
<karta-uzivatele>
  <div slot="uživatel">*!*<span>Jan Novák</span>*/!*</div>
</karta-uzivatele>

<script>
customElements.define('karta-uzivatele', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      slot[name="uživatel"] { font-weight: bold; }
*/!*
      </style>
      Jméno: <slot name="uživatel"></slot>
    `;
  }
});
</script>
```

Zde `<p>Jan Novák</p>` bude tučné, protože mezi `<slot>` a jeho obsahem působí CSS dědičnost. Ale v samotném CSS se nedědí všechny vlastnosti.

Druhá možnost je použít pseudotřídu `::slotted(selektor)`, která vybírá elementy podle dvou podmínek:

1. Je to element ve slotu, který pochází ze světlého DOMu. Na názvu slotu nezáleží. Bere se každý element ve slotu, ale jen samotný element, ne jeho děti.
2. Element odpovídá selektoru `selektor`.

V našem příkladu `::slotted(div)` vybere přímo `<div slot="uživatel">`, ale ne jeho děti:

```html run autorun="no-epub" untrusted height=80
<karta-uzivatele>
  <div slot="uživatel">
    <div>Jan Novák</div>
  </div>
</karta-uzivatele>

<script>
customElements.define('karta-uzivatele', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      ::slotted(div) { border: 1px solid red; }
*/!*
      </style>
      Jméno: <slot name="uživatel"></slot>
    `;
  }
});
</script>
```

Prosíme všimněte si, že selektor `::slotted` nemůže klesat hlouběji do slotu. Tyto selektory jsou nesprávné:

```css
::slotted(div span) {
  /* náš <div> ve slotu tomu nebude odpovídat */
}

::slotted(div) p {
  /* nemůže jít dovnitř světlého DOMu */
}
```

Navíc `::slotted` můžeme použít jedině v CSS. Nemůžeme ji použít v `querySelector`.

## Spojení CSS s volitelnými vlastnostmi

Jak můžeme nastavit styl vnitřních elementů komponenty z hlavního dokumentu?

Selektory jako `:host` aplikují pravidla na element `<vlastni-dialog>` nebo `<karta-uzivatele>`, ale jak nastavit styly elementů stínového DOMu uvnitř nich?

Neexistuje žádný selektor, který by působil z dokumentu přímo na styly stínového DOMu. Avšak stejně jako zveřejňujeme metody, pomocí nichž lze interagovat s naší komponentou, můžeme zveřejnit CSS proměnné (volitelné CSS vlastnosti), aby jí bylo možné nastavit styly.

**Volitelné CSS vlastnosti existují na všech úrovních, ve světlém i ve stínovém DOMu.**

Například ve stínovém DOMu můžeme k nastavení stylů polí použít CSS proměnnou `--barva-pole-karty-uzivatele` a vnější dokument může nastavit její hodnotu:

```html
<style>
  .pole {
    color: var(--barva-pole-karty-uzivatele, black);
    /* pokud není --barva-pole-karty-uzivatele definována, použijeme černou barvu */
  }
</style>
<div class="pole">Jméno: <slot name="uživatel"></slot></div>
<div class="pole">Datum narození: <slot name="narození"></slot></div>
```

Pak můžeme tuto vlastnost deklarovat ve vnějším dokumentu pro `<karta-uzivatele>`:

```css
karta-uzivatele {
  --barva-pole-karty-uzivatele: green;
}
```

Volitelné CSS vlastnosti pronikají až do stínového DOMu a jsou viditelné všude, takže vnitřní pravidlo `.pole` je bude využívat.

Zde je celý příklad:

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  karta-uzivatele {
    --barva-pole-karty-uzivatele: green;
  }
*/!*
</style>

<template id="šablona">
  <style>
*!*
    .pole {
      color: var(--barva-pole-karty-uzivatele, black);
    }
*/!*
  </style>
  <div class="pole">Jméno: <slot name="uživatel"></slot></div>
  <div class="pole">Datum narození: <slot name="narození"></slot></div>
</template>

<script>
customElements.define('karta-uzivatele', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('šablona').content.cloneNode(true));
  }
});
</script>

<karta-uzivatele>
  <span slot="uživatel">Jan Novák</span>
  <span slot="narození">01.01.2001</span>
</karta-uzivatele>
```



## Shrnutí

Stínový DOM může obsahovat styly, například `<style>` nebo `<link rel="stylesheet">`.

Lokální styly mohou ovlivňovat:
- stínový strom,
- stínového hostitele pomocí pseudotříd `:host` a `:host()`,
- elementy ve slotech (pocházející ze světlého DOMu), `::slotted(selektor)` umožňuje vybrat samotné elementy ve slotech, ale ne jejich děti.

Dokumentové styly mohou ovlivňovat:
- stínového hostitele (protože přebývá ve vnějším dokumentu),
- elementy ve slotech a jejich obsah (protože ten je také ve vnějším dokumentu).

Když se CSS vlastnosti dostanou do konfliktu, mají přednost styly z dokumentu, pokud vlastnost není označena jako `!important`. Pak mají přednost lokální styly.

Volitelné CSS vlastnosti pronikají do stínového DOMu. Používají se jako „háky“, kterými lze nastavit styly komponenty:

1. Komponenta používá volitelnou CSS vlastnost k nastavení stylů klíčových elementů, například `var(--titulek-nazvu-komponenty, <standardní hodnota>)`.
2. Autor komponenty publikuje tyto vlastnosti pro vývojáře. Jsou stejně důležité jako ostatní veřejné metody komponenty.
3. Když chce vývojář nastavit styl titulku, přiřadí hodnotu do CSS vlastnosti `--titulek-nazvu-komponenty` stínového hostitele nebo výše.
4. Spokojenost na obou stranách!
