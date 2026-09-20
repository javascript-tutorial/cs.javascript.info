
# Vlastní elementy

Můžeme si vytvářet vlastní HTML elementy, popsané naší třídou, které budou mít své vlastní metody, vlastnosti, události a podobně.

Jakmile je vlastní element definován, můžeme jej používat spolu s vestavěnými HTML elementy.

To je vynikající, neboť HTML slovník je bohatý, ale není nekonečný. Neexistují v něm `<snadna-zalozka>`, `<otacivy-kolotoc>`, `<nadherne-nahravani>`... Můžete si vymyslet jakoukoli jinou značku, kterou bychom mohli potřebovat.

Můžeme je definovat speciální třídou a pak je používat tak, jako by byly odjakživa součástí HTML.

Vlastní elementy se dělí na dva druhy:

1. **Autonomní vlastní elementy** -- „úplně nové“ elementy, rozšiřující abstraktní třídu `HTMLElement`.
2. **Přizpůsobené vestavěné elementy** -- rozšiřují vestavěné elementy, např. přizpůsobené tlačítko, založené na třídě `HTMLButtonElement`, atd.

Nejprve probereme autonomní elementy a pak se přesuneme k přizpůsobeným vestavěným.

Když chceme vytvořit vlastní element, musíme o něm prohlížeči sdělit některé detaily: jak ho má zobrazit, co má dělat, když je element přidán na stránku nebo z ní odstraněn, atd.

Provedeme to vytvořením třídy se speciálními metodami. Je to jednoduché, neboť těchto metod je jen několik a žádná z nich není povinná.

Následuje náčrt s úplným seznamem:

```js
class MůjElement extends HTMLElement {
  constructor() {
    super();
    // element je vytvořen
  }

  connectedCallback() {
    // tuto metodu prohlížeč volá, když je element přidán do dokumentu
    // (může ji volat mnohokrát, je-li element opakovaně přidán/odstraněn)
  }

  disconnectedCallback() {
    // tuto metodu prohlížeč volá, když je element odstraněn z dokumentu
    // (může ji volat mnohokrát, je-li element opakovaně přidán/odstraněn)
  }

  static get observedAttributes() {
    return [/* pole názvů atributů, jejichž změny mají být sledovány */];
  }

  attributeChangedCallback(název, původníHodnota, nováHodnota) {
    // volá se, když je jeden z výše uvedených atributů změněn
  }

  adoptedCallback() {
    // volá se, když je element přesunut do nového dokumentu
    // (stává se to v document.adoptNode, používá se velmi vzácně)
  }

  // zde mohou být další metody a vlastnosti elementu
}
```

Poté musíme element registrovat:

```js
// oznámíme prohlížeči, že <muj-element> obsluhuje naše nová třída
customElements.define("muj-element", MůjElement);
```

Nyní bude pro všechny HTML elementy se značkou `<muj-element>` vytvořena instance třídy `MůjElement` a budou volány uvedené metody. V JavaScriptu také můžeme volat `document.createElement('muj-element')`.

```smart header="Názvy vlastních elementů musejí obsahovat pomlčku `-`"
Názvy vlastních elementů musejí obsahovat pomlčku `-`, např. `muj-element` nebo `super-tlacitko` jsou platné názvy, ale `mujelement` ne.

Tím se zajišťuje, že mezi vestavěnými a vlastními HTML elementy nedojde ke konfliktu názvů.
```

## Příklad: „formatovany-cas“

Například v HTML již existuje element `<time>` pro datum a čas. Ten však sám o sobě neprovádí žádné formátování.

Vytvořme element `<formatovany-cas>`, který zobrazuje čas v pěkném formátu, který bere v úvahu jazyk:

```html run height=50 autorun="no-epub"
<script>
*!*
class FormátovanýČas extends HTMLElement { // (1)
*/!*

  connectedCallback() {
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

}

*!*
customElements.define("formatovany-cas", FormátovanýČas); // (2)
*/!*
</script>

<!-- (3) -->
*!*
<formatovany-cas datumčas="2019-12-01"
*/!*
  rok="numeric" měsíc="long" den="numeric"
  hodiny="numeric" minuty="numeric" sekundy="numeric"
  časové-pásmo="short"
></formatovany-cas>
```

1. Třída obsahuje jen jednu metodu, `connectedCallback()` -- prohlížeč ji zavolá, až bude element `<formatovany-cas>` přidán na stránku (nebo když ho detekuje HTML parser). Metoda zobrazí pěkně formátováný čas pomocí zabudovaného formátovače data [Intl.DateTimeFormat](mdn:/JavaScript/Reference/Global_Objects/DateTimeFormat), který prohlížeče zhusta podporují.
2. Náš nový element musíme zaregistrovat voláním `customElements.define(značka, třída)`.
3. A pak jej můžeme všude používat.


```smart header="Aktualizace vlastních elementů"
Jestliže prohlížeč narazí na element `<formatovany-cas>` před `customElements.define`, nenastane chyba. Element však bude neznámý, tak jako každá nestandardní značka.

Takovým „nedefinovaným“ elementům lze nastavit styl CSS selektorem `:not(:defined)`.

Když je volána metoda `customElement.define`, budou „aktualizovány“: pro každý z nich se vytvoří nová instance třídy `FormátovanýČas` a bude volána metoda `connectedCallback`. Stanou se z nich `:defined`.

K získání informací o vlastních elementech slouží tyto metody:
- `customElements.get(název)` -- vrátí třídu vlastního elementu s názvem `název`,
- `customElements.whenDefined(název)` -- vrátí příslib, který se splní (bez hodnoty), když bude definován vlastní element s názvem `název`.
```

```smart header="Vykreslujeme v `connectedCallback`, ne v `constructor`"
V uvedeném příkladu je obsah elementu vykreslen (vytvořen) v `connectedCallback`.

Proč ne v `constructor`?

Důvod je jednoduchý: když je volán `constructor`, je ještě příliš brzy. Element je již vytvořen, ale prohlížeč v této chvíli dosud nezpracoval a nepřiřadil atributy: volání `getAttribute` by vrátilo `null`. Zde tedy nemůžeme skutečně vykreslovat.

Kromě toho, když se nad tím zamyslíte, poznáte, že to zlepšuje výkonnost -- práce se odloží, dokud nebude opravdu zapotřebí.

Metoda `connectedCallback` se volá, když je element přidán do dokumentu. Ne když je jen přidán jako dítě k jinému elementu, ale když se skutečně stane součástí stránky. Můžeme tedy vytvářet samostatný DOM, vytvářet elementy a připravovat je na budoucí použití. Skutečně vykresleny budou až ve chvíli, kdy se opravdu dostanou na stránku.
```

## Pozorování atributů

Poté, co je v aktuální implementaci `<formatovany-cas>` element vykreslen, nemají další změny atributů žádný efekt. To je u HTML elementu zvláštní. Když změníme atribut, například `a.href`, obvykle očekáváme, že změna bude ihned viditelná. Opravme to.

Můžeme sledovat atributy, jejichž seznam poskytneme ve statickém getteru `observedAttributes()`. Když se pak tyto atributy změní, volá se `attributeChangedCallback`. U ostatních, neuvedených atributů se nespouští (z výkonnostních důvodů). 

Zde je nový `<formatovany-cas>`, který se po změně atributů automaticky aktualizuje:

```html run autorun="no-epub" height=50
<script>
class FormátovanýČas extends HTMLElement {

*!*
  vykresli() { // (1)
*/!*
    let datum = new Date(this.getAttribute('datetime') || Date.now());

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

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.vykreslen) {
      this.vykresli();
      this.vykreslen = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datumčas', 'rok', 'měsíc', 'den', 'hodiny', 'minuty', 'sekundy', 'časové-pásmo'];
  }

*!*
  attributeChangedCallback(název, původníHodnota, nováHodnota) { // (4)
*/!*
    this.vykresli();
  }

}

customElements.define("formatovany-cas", FormátovanýČas);
</script>

<formatovany-cas id="elem" hodiny="numeric" minuty="numeric" sekundy="numeric"></formatovany-cas>

<script>
*!*
setInterval(() => elem.setAttribute('datumčas', new Date()), 1000); // (5)
*/!*
</script>
```

1. Logika vykreslování je přesunuta do pomocné metody `vykresli()`.
2. Tuto metodu zavoláme jednou, když bude element vložen na stránku.
3. Při změně atributu, který je uveden v `observedAttributes()`, se spustí `attributeChangedCallback`.
4. ...a překreslí element.
5. Nakonec můžeme snadno vytvořit živé hodiny.

## Pořadí vykreslování

Když HTML parser buduje DOM, zpracovává elementy jeden po druhém, rodiče před dětmi. Například když máme `<vnejsi><vnitrni></vnitrni></vnejsi>`, pak se nejprve vytvoří a připojí k DOMu element `<vnejsi>` a až poté `<vnitrni>`.

To vede k důležitým důsledkům u vlastních elementů.

Například jestliže se vlastní element pokusí přistoupit k `innerHTML` v `connectedCallback`, nic nezíská:

```html run height=40
<script>
customElements.define('info-uzivatel', class extends HTMLElement {

  connectedCallback() {
*!*
    alert(this.innerHTML); // prázdný (*)
*/!*
  }

});
</script>

*!*
<info-uzivatel>Jan</info-uzivatel>
*/!*
```

Pokud si tento příklad spustíte, bude `alert` prázdný.

Je to proto, že v této chvíli ještě neexistují žádné děti, DOM není ještě dokončen. HTML parser připojí vlastní element `<info-uzivatel>` a chystá se zpracovat jeho děti, ale zatím to neudělal.

Pokud chceme předat vlastnímu elementu nějakou informaci, můžeme použít atributy. Ty jsou k dispozici okamžitě.

Nebo, jestliže děti opravdu potřebujeme, můžeme přístup k nim odložit pomocí `setTimeout` s nulovou prodlevou.

Tohle funguje:

```html run height=40
<script>
customElements.define('info-uzivatel', class extends HTMLElement {

  connectedCallback() {
*!*
    setTimeout(() => alert(this.innerHTML)); // Jan (*)
*/!*
  }

});
</script>

*!*
<info-uzivatel>Jan</info-uzivatel>
*/!*
```

Nyní `alert` na řádku `(*)` zobrazí „Jan“, protože ho spouštíme asynchronně, až po dokončení parsování HTML. Pokud je třeba, můžeme zpracovat děti a dokončit inicializaci.

Na druhou stranu, ani toto řešení není dokonalé. Pokud i vnořené vlastní elementy používají ke své inicializaci `setTimeout`, vloží se do fronty: jako první se spustí vnější `setTimeout` a pak vnitřní.

Inicializace vnějšího elementu tedy skončí před vnitřním.

Předveďme si to na příkladu:

```html run height=0
<script>
customElements.define('info-uzivatel', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} připojen.`);
    setTimeout(() => alert(`${this.id} inicializován.`));
  }
});
</script>

*!*
<info-uzivatel id="vnější">
  <info-uzivatel id="vnitřní"></info-uzivatel>
</info-uzivatel>
*/!*
```

Pořadí výstupu:

1. vnější připojen.
2. vnitřní připojen.
3. vnější inicializován.
4. vnitřní inicializován.

Jasně vidíme, že inicializace vnějšího elementu `(3)` skončila před vnitřním `(4)`.

Neexistuje žádný zabudovaný callback, který by se spustil, až budou vnořené elementy připraveny. Pokud něco takového potřebujeme, můžeme si to implementovat sami. Například vnitřní elementy mohou vyvolávat události, třeba `inicializován`, a vnější jim mohou naslouchat a reagovat na ně.

## Přizpůsobené vestavěné elementy

Nové elementy, které vytvoříme, například `<formatovany-cas>`, nemají připojenou žádnou sémantiku. Vyhledávací stroje je neznají a přístupová zařízení je nedokáží zpracovat.

Takové věci však mohou být důležité. Například vyhledávací stroj by zajímalo, že opravdu zobrazujeme čas. A pokud vytváříme zvláštní druh tlačítka, proč nevyužít stávající funkcionalitu `<button>`?

Vestavěné HTML elementy si můžeme přizpůsobit a rozšířit tak, že budeme dědit z jejich tříd.

Například tlačítka jsou instancemi třídy `HTMLButtonElement`. Stavme tedy na ní.

1. Rozšíříme `HTMLButtonElement` naší třídou:

    ```js
    class TlačítkoAhoj extends HTMLButtonElement { /* metody vlastního elementu */ }
    ```

2. Poskytneme metodě `customElements.define` třetí argument, který specifikuje značku:
    ```js
    customElements.define('tlacitko-ahoj', TlačítkoAhoj, *!*{extends: 'button'}*/!*);
    ```    

    Stejnou DOM třídu mohou sdílet různé značky, proto je specifikace `extends` nutná.

3. Nakonec, abychom využili náš vlastní element, vložíme obvyklou značku `<button>`, ale přidáme do ní `is="tlacitko-ahoj"`:
    ```html
    <button is="tlacitko-ahoj">...</button>
    ```

Zde je celý příklad:

```html run autorun="no-epub"
<script>
// Tlačítko, které po kliknutí zobrazí „ahoj“
class TlačítkoAhoj extends HTMLButtonElement {
*!*
  constructor() {
*/!*
    super();
    this.addEventListener('click', () => alert("Ahoj!"));
  }
}

*!*
customElements.define('tlacitko-ahoj', TlačítkoAhoj, {extends: 'button'});
*/!*
</script>

*!*
<button is="tlacitko-ahoj">Klikněte na mě</button>
*/!*

*!*
<button is="tlacitko-ahoj" disabled>Zakázané</button>
*/!*
```

Naše nové tlačítko rozšiřuje zabudované, takže si ponechává stejné styly a standardní vlastnosti, například atribut `disabled`.

## Odkazy

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- Kompatibilita: <https://caniuse.com/#feat=custom-elementsv1>.

## Shrnutí

Vlastní elementy se dělí do dvou druhů:

1. „Autonomní“ -- nové značky, které rozšiřují `HTMLElement`.

    Definiční schéma:

    ```js
    class MůjElement extends HTMLElement {
      constructor() { super(); /* ... */ }
      connectedCallback() { /* ... */ }
      disconnectedCallback() { /* ... */  }
      static get observedAttributes() { return [/* ... */]; }
      attributeChangedCallback(název, původníHodnota, nováHodnota) { /* ... */ }
      adoptedCallback() { /* ... */ }
     }
    customElements.define('muj-element', MůjElement);
    /* <muj-element> */
    ```

2. „Přizpůsobené vestavěné elementy“ -- rozšíření existujících elementů.

    Vyžadují další argument v `.define` a `is="..."` v HTML:
    ```js
    class MojeTlačítko extends HTMLButtonElement { /*...*/ }
    customElements.define('moje-tlacitko', MojeTlačítko, {extends: 'button'});
    /* <button is="moje-tlacitko"> */
    ```

Vlastní elementy jsou v prohlížečích široce podporovány. Existuje polyfill <https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.
