# Atributy a vlastnosti

Když prohlížeč načítá stránku, „rozebere“ (jiným slovem: „parsuje“) HTML kód a vygeneruje z něj DOM objekty. U elementových uzlů se pro většinu standardních HTML atributů automaticky vytvoří vlastnosti DOM objektů.

Například jestliže značka je `<body id="stránka">`, pak DOM objekt obsahuje `body.id="stránka"`.

Avšak ne vždy se jeden atribut mapuje na jednu vlastnost a naopak! V této kapitole budeme věnovat pozornost tomu, jak tyto dva pojmy odlišit, jak s nimi pracovat, kdy jsou stejné a kdy jsou různé.

## DOM vlastnosti

Vestavěné DOM vlastnosti jsme už viděli. Je jich spousta. Technicky nás však nic neomezuje, a pokud nám tyto vlastnosti nestačí, můžeme si přidat vlastní.

DOM uzly jsou regulérní JavaScriptové objekty. Můžeme je měnit.

Vytvořme například novou vlastnost v `document.body`:

```js run
document.body.mojeData = {
  jméno: 'Caesar',
  titul: 'Imperátor'
};

alert(document.body.mojeData.titul); // Imperátor
```

Můžeme přidat i metodu:

```js run
document.body.řekniNázevZnačky = function() {
  alert(this.tagName);
};

document.body.řekniNázevZnačky(); // BODY (hodnota „this" v metodě je document.body)
```

Můžeme také měnit vestavěné prototypy, např. `Element.prototype`, a přidávat tak nové metody všem elementům:

```js run
Element.prototype.řekniAhoj = function() {
  alert(`Ahoj, já jsem ${this.tagName}`);
};

document.documentElement.řekniAhoj(); // Ahoj, já jsem HTML
document.body.řekniAhoj(); // Ahoj, já jsem BODY
```

DOM vlastnosti a metody se tedy chovají přesně jako vlastnosti a metody obvyklých JavaScriptových objektů:

- Mohou mít jakoukoli hodnotu.
- V názvech se rozlišují malá a velká písmena (píšeme `elem.nodeType`, ne `elem.NoDeTyPe`).

## HTML atributy

Značky v HTML mohou obsahovat atributy. Když prohlížeč parsuje HTML kód a vytváří ze značek DOM objekty, rozpoznává *standardní* atributy a vytváří pro ně DOM vlastnosti.

Když tedy element obsahuje `id` nebo jiný *standardní* atribut, vytvoří se odpovídající vlastnost. Pokud je však atribut nestandardní, nestane se to.

Příklad:
```html run
<body id="test" něco="nestandardní">
  <script>
    alert(document.body.id); // test
*!*
    // z nestandardních atributů nevznikne vlastnost
    alert(document.body.něco); // undefined
*/!*
  </script>
</body>
```

Prosíme všimněte si, že standardní atribut jednoho elementu může být neznámý v jiném. Například `"type"` je standardní atribut pro `<input>` ([HTMLInputElement](https://html.spec.whatwg.org/#htmlinputelement)), ale ne pro `<body>` ([HTMLBodyElement](https://html.spec.whatwg.org/#htmlbodyelement)). Standardní atributy jsou popsány ve specifikaci příslušné třídy elementu.

Zde to vidíme:
```html run
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
*!*
    alert(body.type); // undefined: DOM vlastnost nevznikla, protože atribut je nestandardní
*/!*
  </script>
</body>
```

Pokud je tedy atribut nestandardní, nebude pro něj vytvořena DOM vlastnost. Je nějaký způsob, jak k takovým atributům přistupovat?

Jistě. Všechny atributy jsou dostupné pomocí následujících metod:

- `elem.hasAttribute(název)` -- ověří existenci atributu.
- `elem.getAttribute(název)` -- vrátí jeho hodnotu.
- `elem.setAttribute(název, hodnota)` -- nastaví jeho hodnotu.
- `elem.removeAttribute(název)` -- odstraní atribut.

Tyto metody pracují přesně s tím, co je uvedeno v HTML kódu.

Můžeme také načíst všechny atributy pomocí `elem.attributes`: kolekce objektů, které patří do vestavěné třídy [Attr](https://dom.spec.whatwg.org/#attr) s vlastnostmi `name` (název) a `value` (hodnota).

Následuje ukázka načtení nestandardní vlastnosti:

```html run
<body něco="nestandardní">
  <script>
*!*
    alert(document.body.getAttribute('něco')); // nestandardní
*/!*
  </script>
</body>
```

HTML atributy mají následující vlastnosti:

- V jejich názvech se nerozlišují malá a velká písmena (`id` je totéž jako `ID`).
- Jejich hodnoty jsou vždy řetězce.

Následuje rozsáhlejší ukázka práce s atributy:

```html run
<body>
  <div id="elem" téma="Slon"></div>

  <script>
    alert( elem.getAttribute('Téma') ); // (1) 'Slon', čtení

    elem.setAttribute('Test', 123); // (2), zápis

    alert( elem.outerHTML ); // (3), podíváme se, zda je atribut v HTML kódu (je)

    for (let atribut of elem.attributes) { // (4) výpis všech atributů
      alert( `${atribut.name} = ${atribut.value}` );
    }
  </script>
</body>
```

Prosíme všimněte si:

1. `getAttribute('Téma')` -- zde je první písmeno velké, zatímco v HTML kódu jsou všechna písmena malá. Na tom však nezáleží: v názvech atributů se velká a malá písmena nerozlišují.
2. Do atributu můžeme přiřadit cokoli, ale stane se z toho řetězec. Zde tedy máme hodnotu `"123"`.
3. Všechny atributy včetně těch, které jsme nastavili my, jsou vidět v `outerHTML`.
4. Kolekce `attributes` je iterovatelná a obsahuje všechny atributy elementu (standardní i nestandardní) jako objekty s vlastnostmi `name` (název) a `value` (hodnota).

## Synchronizace vlastností s atributy

Když se změní standardní atribut, automaticky se aktualizuje příslušná vlastnost a naopak (s určitými výjimkami).

V následujícím příkladu změníme `id` jako atribut a uvidíme, že se změnila i vlastnost. A pak totéž obráceně:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // atribut => vlastnost
  input.setAttribute('id', 'id');
  alert(input.id); // id (aktualizováno)

  // vlastnost => atribut
  input.id = 'novéId';
  alert(input.getAttribute('id')); // novéId (aktualizováno)
</script>
```

Existují však výjimky, například `input.value` se synchronizuje jen z atributu do vlastnosti, ale ne obráceně:

```html run
<input>

<script>
  let input = document.querySelector('input');

  // atribut => vlastnost
  input.setAttribute('value', 'text');
  alert(input.value); // text

*!*
  // NIKOLI vlastnost => atribut
  input.value = 'nováHodnota';
  alert(input.getAttribute('value')); // text (neaktualizováno!)
*/!*
</script>
```

V uvedeném příkladu:
- Po změně atributu `value` se aktualizovala vlastnost.
- Ale po změně vlastnosti se atribut nezměnil.

Tato „vlastnost“ se ve skutečnosti může hodit, protože akce uživatele mohou vést ke změně `value`, a pokud následovně chceme obnovit „původní“ hodnotu z HTML, je stále v atributu.

## DOM vlastnosti jsou různých typů

DOM vlastnosti nejsou vždy řetězce. Například vlastnost `input.checked` (pro checkboxy) je booleovská:

```html run
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // hodnota atributu je: prázdný řetězec
  alert(input.checked); // hodnota vlastnosti je: true
</script>
```

Jsou i jiné příklady. Atribut `style` je řetězec, ale vlastnost `style` je objekt:

```html run
<div id="div" style="color:red;font-size:120%">Ahoj</div>

<script>
  // řetězec
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // objekt
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

Většina vlastností však jsou řetězce.

Poměrně vzácně se stává, že i když je DOM vlastnost typu řetězec, může se od atributu lišit. Například DOM vlastnost `href` je vždy *úplné* URL, i když atribut obsahuje relativní URL nebo jen `#hash`.

Zde je příklad:

```html height=30 run
<a id="a" href="#ahoj">odkaz</a>
<script>
  // atribut
  alert(a.getAttribute('href')); // #ahoj

  // vlastnost
  alert(a.href ); // úplné URL ve tvaru http://site.com/stránka#ahoj
</script>
```

Jestliže potřebujeme hodnotu `href` nebo kteréhokoli jiného atributu přesně takovou, jaká je uvedena v HTML, můžeme použít `getAttribute`.


## Nestandardní atributy, vlastnost dataset

Když píšeme HTML kód, používáme spoustu standardních atributů. Ale co ty nestandardní, naše vlastní? Nejprve se podíváme, zda jsou vůbec užitečné. K čemu jsou?

Nestandardní atributy se někdy používají k předávání vlastních dat z HTML do JavaScriptu nebo k „označení“ HTML elementů pro JavaScript.

Třeba takto:

```html run
<!-- označíme si div, aby zde zobrazil "jméno" -->
<div *!*zobraz-info="jméno"*/!*></div>
<!-- a zde věk -->
<div *!*zobraz-info="věk"*/!*></div>

<script>
  // kód najde označený element a zobrazí to, co je požadováno
  let uživatel = {
    jméno: "Petr",
    věk: 25
  };

  for(let div of document.querySelectorAll('[zobraz-info]')) {
    // vložíme odpovídající informaci do pole
    let pole = div.getAttribute('zobraz-info');
    div.innerHTML = uživatel[pole]; // nejprve Petr do "jméno", pak 25 do "věk"
  }
</script>
```

Můžeme je použít i k nastavení stylu elementu.

Například zde použijeme pro stav objednávky atribut `stav-objednávky`:

```html run
<style>
  /* styly závisejí na našem atributu "stav-objednávky" */
  .objednávka[stav-objednávky="nová"] {
    color: green;
  }

  .objednávka[stav-objednávky="vyřízená"] {
    color: blue;
  }

  .objednávka[stav-objednávky="zrušená"] {
    color: red;
  }
</style>

<div class="objednávka" stav-objednávky="nová">
  Nová objednávka.
</div>

<div class="objednávka" stav-objednávky="vyřízená">
  Vyřízená objednávka.
</div>

<div class="objednávka" stav-objednávky="zrušená">
  Zrušená objednávka.
</div>
```

Proč bychom měli raději použít atribut než třídy jako `.stav-objednávky-nová`, `.stav-objednávky-vyřízená`, `.stav-objednávky-zrušená`?

Protože s atributem se pohodlněji manipuluje. Takhle snadno můžeme změnit stav:

```js
// trochu jednodušší než odstranit starou/přidat novou třídu
div.setAttribute('stav-objednávky', 'zrušená');
```

S vlastními atributy však může nastat problém. Co když použijeme pro naše účely nestandardní atribut, který bude později zařazen do standardu a bude něco dělat? Jazyk HTML je živý, neustále se rozrůstá a objevují se další atributy, aby uspokojily potřeby vývojářů. V takovém případě může dojít k neočekávaným efektům.

K tomu, abychom se vyhnuli konfliktům, slouží atributy [data-*](https://html.spec.whatwg.org/#embedding-custom-non-visible-data-with-the-data-*-attributes).

**Všechny atributy začínající „data-“ jsou rezervovány pro použití programátory a jsou dostupné ve vlastnosti `dataset`.**

Například jestliže `elem` obsahuje atribut s názvem `"data-téma"`, bude tento atribut k dispozici jako `elem.dataset.téma`.

Příklad:

```html run
<body data-téma="Sloni">
<script>
  alert(document.body.dataset.téma); // Sloni
</script>
```

Víceslovné atributy jako `data-stav-objednávky` budou zapsány velbloudí notací: `dataset.stavObjednávky`.

Následuje přepsaný příklad se „stavem objednávky“:

```html run
<style>
  .objednávka[data-stav-objednávky="nová"] {
    color: green;
  }

  .objednávka[data-stav-objednávky="vyřízená"] {
    color: blue;
  }

  .objednávka[data-stav-objednávky="zrušená"] {
    color: red;
  }
</style>

<div id="objednávka" class="objednávka" data-stav-objednávky="nová">
  Nová objednávka.
</div>

<script>
  // načtení
  alert(objednávka.dataset.stavObjednávky); // nová

  // změna
  objednávka.dataset.stavObjednávky = "vyřízená"; // (*)
</script>
```

Používání atributů s názvem `data-*` je platný a bezpečný způsob, jak předávat vlastní data.

Prosíme všimněte si, že datové atributy můžeme nejen číst, ale i měnit. Pak CSS příslušným způsobem aktualizuje zobrazení: v uvedeném příkladu poslední řádek `(*)` změní barvu na modrou.

## Shrnutí

- Atributy -- to, co je uvedeno v HTML.
- Vlastnosti -- to, co je v DOM objektech.

Malé srovnání:

|            | Vlastnosti | Atributy |
|------------|------------|------------|
|Typ|Libovolná hodnota, standardní vlastnosti mají typ popsaný ve specifikaci|Řetězec|
|Název|Rozlišují se malá a velká písmena|Nerozlišují se malá a velká písmena|

Metody pro práci s atributy jsou:

- `elem.hasAttribute(název)` -- ověření existence.
- `elem.getAttribute(název)` -- získání hodnoty.
- `elem.setAttribute(název, hodnota)` -- nastavení hodnoty.
- `elem.removeAttribute(název)` -- odstranění atributu.
- `elem.attributes` je kolekce všech atributů.

Ve většině situací se dává přednost používání DOM vlastností. Na atributy bychom se měli odkazovat jen tehdy, když nám DOM vlastnosti nestačí a potřebujeme přesné hodnoty atributů, například:

- Potřebujeme nestandardní atribut. Pokud však jeho název začíná `data-`, měli bychom použít `dataset`.
- Chceme načíst hodnotu „tak, jak je uvedena“ v HTML kódu. Hodnota DOM vlastnosti se může lišit, například vlastnost `href` je vždy úplné URL, ale my můžeme chtít získat „původní“ hodnotu.
