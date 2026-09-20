# Stínový DOM a události

Myšlenkou stínového stromu je zapouzdřit vnitřní implementaci detailů komponenty.

Řekněme, že uvnitř stínového DOMu komponenty `<karta-uzivatele>` nastane událost kliknutí. Skripty v hlavním dokumentu však nemají ponětí o vnitřku stínového DOMu, zvláště pokud komponenta pochází z knihovny třetí strany.

Aby tedy detaily zůstaly zapouzdřeny, prohlížeč tuto událost *přesměruje*.

**Když jsou události, které se stanou ve stínovém DOMu, zachyceny mimo komponentu, jejich cílem je hostitelský element.**

Jednoduchý příklad:

```html run autorun="no-epub" untrusted height=60
<karta-uzivatele></karta-uzivatele>

<script>
customElements.define('karta-uzivatele', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Klikněte na mě</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Vnitřní cíl: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Vnější cíl: " + e.target.tagName);
</script>
```

Jestliže na tlačítko kliknete, zobrazí se zprávy:

1. Vnitřní cíl: `BUTTON` -- vnitřní handler události obdrží správný cíl, element uvnitř stínového DOMu.
2. Vnější cíl: `KARTA-UZIVATELE` -- dokumentový handler události obdrží jako cíl stínového hostitele.

Přesměrování událostí je skvělá věc, protože vnější dokument nemusí vědět nic o vnitřku komponenty. Z jeho pohledu se událost stala na elementu `<karta-uzivatele>`.

**K přesměrování nedojde, pokud se událost stala na elementu ve slotu, který fyzicky přebývá ve světlém DOMu.**

Například když v následujícím příkladu uživatel klikne na `<span slot="uživatel">`, cílem události bude ve stínovém i ve světlém handleru právě tento element `span`:

```html run autorun="no-epub" untrusted height=60
<karta-uzivatele id="kartaUživatele">
*!*
  <span slot="uživatel">Jan Novák</span>
*/!*
</karta-uzivatele>

<script>
customElements.define('karta-uzivatele', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>
      <b>Jméno:</b> <slot name="uživatel"></slot>
    </div>`;

    this.shadowRoot.firstElementChild.onclick =
      e => alert("Vnitřní cíl: " + e.target.tagName);
  }
});

kartaUživatele.onclick = e => alert(`Vnější cíl: ${e.target.tagName}`);
</script>
```

Jestliže nastane kliknutí na `"Jan Novák"`, ve vnitřním i vnějším handleru bude cíl `<span slot="uživatel">`. To je element ze světlého DOMu, takže nedojde k přesměrování.

Naproti tomu jestliže nastane kliknutí na element pocházející ze stínového DOMu, např. `<b>Jméno:</b>`, pak když probublá ven ze stínového DOMu, jeho `událost.target` se nastaví na `<karta-uzivatele>`.

## Bublání, událost.composedPath()

Pro účely bublání událostí se používá zploštělý DOM.

Máme-li tedy element ve slotu a někde uvnitř něj nastane událost, tato událost probublá do `<slot>` a výš.

Celou cestu k původnímu cíli události se všemi stínovými elementy je možné získat voláním `událost.composedPath()`. Jak vidíme z názvu metody, je vrácena cesta po kompozici.

V uvedeném příkladu vypadá zploštělý DOM následovně:

```html
<karta-uzivatele id="kartaUživatele">
  #shadow-root
    <div>
      <b>Jméno:</b>
      <slot name="uživatel">
        <span slot="uživatel">Jan Novák</span>
      </slot>
    </div>
</karta-uzivatele>
```

Při kliknutí na `<span slot="uživatel">` tedy volání `událost.composedPath()` vrátí toto pole: [`span`, `slot`, `div`, `shadow-root`, `karta-uzivatele`, `body`, `html`, `document`, `window`]. To je přesně řetězec rodičů od cílového elementu ve zploštělém DOMu po kompozici.

```warn header="Detaily stínového stromu jsou vráceny jen u stromů s `{mode:'open'}`"
Pokud byl stínový strom vytvořen s `{mode: 'closed'}`, pak složená cesta začne od hostitele `karta-uzivatele` a pokračuje výš.

Je to podobný princip jako u jiných metod, které pracují se stínovým DOMem. Vnitřní části uzavřených stromů jsou zcela ukryty.
```


## událost.composed

Většina událostí úspěšně probublá skrz hranici stínového DOMu, ale některé události to neudělají.

Ovládá to vlastnost objektu události `composed`. Pokud je `true`, událost překročí hranici. Jinak může být zachycena jen uvnitř stínového DOMu.

Když se podíváte na [specifikaci událostí UI](https://www.w3.org/TR/uievents), uvidíte, že většina událostí má `composed: true`:

- `blur`, `focus`, `focusin`, `focusout`,
- `click`, `dblclick`,
- `mousedown`, `mouseup` `mousemove`, `mouseout`, `mouseover`,
- `wheel`,
- `beforeinput`, `input`, `keydown`, `keyup`.

Rovněž všechny dotekové a ukazatelové události mají `composed: true`.

Existují však události, které mají `composed: false`:

- `mouseenter`, `mouseleave` (ty vůbec nebublají),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Tyto události je možné zachytit jedině na elementech uvnitř stejného DOMu, v němž sídlí cíl události.

## Vlastní události

Když vytváříme vlastní události a chceme, aby vybublaly výš a ven z komponenty, musíme jim nastavit obě vlastnosti `bubbles` a `composed` na `true`.

Například zde vytvoříme `div#vnitřní` ve stínovém DOMu elementu `div#vnější` a spustíme na něm dvě události. Ven z dokumentu se dostane pouze ta, která má `composed: true`:

```html run untrusted height=0
<div id="vnější"></div>

<script>
vnější.attachShadow({mode: 'open'});

let vnitřní = document.createElement('div');
vnější.shadowRoot.append(vnitřní);

/*
div(id=vnější)
  #shadow-dom
    div(id=vnitřní)
*/

document.addEventListener('test', událost => alert(událost.detail));

vnitřní.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: true,
*/!*
  detail: "má composed"
}));

vnitřní.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: false,
*/!*
  detail: "nemá composed"
}));
</script>
```

## Shrnutí

Události překročí hranici stínového DOMu jedině tehdy, mají-li přepínač `composed` nastaven na `true`.

Vestavěné události mají převážně `composed: true`, jak je popsáno v příslušných specifikacích:

- události UI: <https://www.w3.org/TR/uievents>.
- dotekové události: <https://w3c.github.io/touch-events>.
- ukazatelové události: <https://www.w3.org/TR/pointerevents>.
- ...a tak dále.

Některé vestavěné události, které mají `composed: false`:

- `mouseenter`, `mouseleave` (ty ani nebublají),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

Tyto události můžeme zachytit jedině na elementech uvnitř stejného DOMu.

Pokud vytváříme `CustomEvent`, měli bychom výslovně nastavit `composed: true`.

Prosíme všimněte si, že v případě vnořených komponent může být jeden stínový DOM vnořen do druhého. V tom případě události s nastaveným `composed` bublají skrz hranice všech stínových DOMů. Pokud tedy je událost určena jen pro bezprostředně uzavírající komponentu, můžeme ji ve stínovém hostiteli ošetřit a nastavit `composed: false`. Pak se dostane ven ze stínového DOMu komponenty, ale neprobublá do DOMu vyšší úrovně.
