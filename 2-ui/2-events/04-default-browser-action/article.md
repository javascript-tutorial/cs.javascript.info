# Standardní akce prohlížeče

Mnoho událostí automaticky vede k tomu, že prohlížeč vykoná určitou akci.

Například:

- Kliknutí na odkaz -- vyvolá navigaci na jeho URL.
- Kliknutí na tlačítko odeslání formuláře -- vyvolá jeho odeslání na server.
- Stisknutí tlačítka myši nad textem a přesun ukazatele -- vybere (označí) text.

Jestliže v JavaScriptu zpracováváme událost, můžeme chtít, aby se příslušná akce prohlížeče nevykonala, protože místo ní chceme implementovat jiné chování.

## Zákaz akcí prohlížeče

Existují dva způsoby, jak sdělit prohlížeči, že nechceme, aby konal svou akci:

- Hlavním způsobem je použití objektu `událost`, který obsahuje metodu `událost.preventDefault()`.
- Jestliže je handler přiřazen prostřednictvím `on<událost>` (ne metodou `addEventListener`), pak bude stejným způsobem fungovat i vrácení `false`.

V následujícím HTML kódu kliknutí na odkaz nevyvolá navigaci; prohlížeč neudělá nic:

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Klikněte sem</a>
nebo
<a href="/" onclick="event.preventDefault()">sem</a>
```

V dalším příkladu pomocí této techniky vytvoříme JavaScriptové menu.

```warn header="Vrácení `false` z handleru je výjimka"
Hodnota vrácená handlerem událostí je zpravidla ignorována.

Jedinou výjimkou je `return false` z handleru přiřazeného pomocí `on<událost>`.

Ve všech ostatních případech se návratová hodnota ignoruje. Nemá tedy smysl vracet například `true`.
```

### Příklad: menu

Uvažujme menu na stránce, například takto:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

Takto bude vypadat s určitým CSS:

[iframe height=70 src="menu" link edit]

Položky menu jsou implementovány jako HTML odkazy `<a>`, ne jako tlačítka `<button>`. Má to několik důvodů, například:

- Mnozí lidé rádi používají „kliknutí pravým tlačítkem“ -- „otevření v novém okně“. Pokud bychom použili `<button>` nebo `<span>`, nefungovalo by to.
- Vyhledávací stroje při indexování následují `<a href="...">`.

V tomto kódu tedy používáme `<a>`. Chceme však kliknutí zpracovávat v JavaScriptu, takže bychom měli zakázat standardní akci prohlížeče.

Například:

```js
menu.onclick = function(událost) {
  if (událost.target.nodeName != 'A') return;

  let href = událost.target.getAttribute('href');
  alert( href ); // ...může načítat ze serveru, generovat UI atd.

*!*
  return false; // zakáže akci prohlížeče (nepřejde na URL)
*/!*
};
```

Kdybychom vypustili `return false`, pak by po provedení našeho kódu prohlížeč vykonal svou „standardní akci“ -- navigaci na URL v `href`. A to tady nepotřebujeme, jelikož kliknutí zpracováváme sami.

Mimochodem, použití delegování událostí zde učiní naše menu velmi flexibilním. Můžeme přidávat vnořené seznamy a pomocí CSS je stylizovat, aby „klouzaly dolů“.

````smart header="Následné události"
Některé události plynou jedna do druhé. Pokud zakážeme první událost, nedojde ke druhé.

Například událost `mousedown` na poli `<input>` vede k zaměření vstupu na pole a k vyvolání události `focus`. Pokud událost `mousedown` zakážeme, k zaměření nedojde.

Zkuste si kliknout níže na první `<input>` -- událost `focus` nastane. Pokud však kliknete na druhý, zaměření nenastane.

```html run autorun
<input value="Zaměření funguje" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Klikni na mě">
```

Je to tím, že akce prohlížeče je v `mousedown` zrušena. Stále je možné na pole zaměřit vstup, jestliže použijeme jiný způsob, jak do něj vstoupit, například klávesou `key:Tab` se přepneme z prvního vstupu do druhého. Kliknutím myší to však už možné není.
````

## Možnost handleru „passive“

Volitelná možnost `passive: true` metody `addEventListener` oznamuje prohlížeči, že handler nebude volat `preventDefault()`.

K čemu to může být potřeba?

Existují události, např. `touchmove` na mobilních zařízeních (když se uživatel posune prstem na obrazovce), které standardně vyvolají rolování, ale v handleru lze toto rolování zakázat voláním `preventDefault()`.

Když tedy prohlížeč detekuje takovou událost, musí nejprve zpracovat všechny handlery, a teprve pokud nikde nebylo voláno `preventDefault`, může provádět rolování. To může způsobit nechtěné prodlevy a „zasekávání“ v UI.

Možnost `passive: true` říká prohlížeči, že handler nebude rolování bránit. Pak prohlížeč provede rolování okamžitě a poskytne maximálně plynulý zážitek, zatímco bude zpracována událost.

V některých prohlížečích (Firefox, Chrome) je `passive` standardně `true` pro události `touchstart` a `touchmove`.


## událost.defaultPrevented

Vlastnost `událost.defaultPrevented` je `true`, pokud byla standardní akce zakázána, v opačném případě je `false`.

Má to zajímavý případ použití.

Vzpomínáte si, jak jsme v kapitole <info:bubbling-and-capturing> hovořili o `událost.stopPropagation()` a o tom, proč je špatné zastavovat bublání?

Někdy místo toho můžeme použít `událost.defaultPrevented`, abychom oznámili ostatním handlerům událostí, že událost byla již zpracována.

Podívejme se na praktický příklad.

Standardně prohlížeč na událost `contextmenu` (kliknutí pravým tlačítkem myši) zobrazí kontextové menu se standardními možnostmi. Můžeme to zakázat a zobrazit vlastní menu, například:

```html autorun height=50 no-beautify run
<button>Pravé kliknutí zobrazí kontextové menu prohlížeče</button>

<button *!*oncontextmenu="alert('Zobrazíme své menu'); return false"*/!*>
  Pravé kliknutí zobrazí naše kontextové menu
</button>
```

Nyní navíc k tomuto kontextovému menu chceme implementovat kontextové menu pro celý dokument.

Po kliknutí pravým tlačítkem by se mělo zobrazit nejbližší kontextové menu.

```html autorun height=80 no-beautify run
<p>Pravé kliknutí sem zobrazí kontextové menu dokumentu</p>
<button id="elem">Pravé kliknutí sem zobrazí kontextové menu tlačítka</button>

<script>
  elem.oncontextmenu = function(událost) {
    událost.preventDefault();
    alert("Kontextové menu tlačítka");
  };

  document.oncontextmenu = function(událost) {
    událost.preventDefault();
    alert("Kontextové menu dokumentu");
  };
</script>
```

Problém je v tom, že když klikneme na `elem`, obdržíme dvě menu: pro tlačítko a (událost probublá výše) pro dokument.

Jak to opravit? Jedno z řešení je pomyslet si: „Když zpracujeme pravé kliknutí v handleru tlačítka, zastavíme bublání“ a použít `událost.stopPropagation()`:

```html autorun height=80 no-beautify run
<p>Pravým kliknutím zobrazíte menu dokumentu</p>
<button id="elem">Pravým kliknutím zobrazíte menu tlačítka (ošetřeno pomocí událost.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(událost) {
    událost.preventDefault();
*!*
    událost.stopPropagation();
*/!*
    alert("Kontextové menu tlačítka");
  };

  document.oncontextmenu = function(událost) {
    událost.preventDefault();
    alert("Kontextové menu dokumentu");
  };
</script>
```

Nyní menu pro tlačítko funguje tak, jak jsme zamýšleli, ale cena za to je vysoká. Navždy se vzdáváme přístupu k informaci o pravém kliknutí v celém vnějším kódu, včetně počítadel, která shromažďují statistiku a podobně. To není příliš moudré.

Alternativním řešením by bylo v handleru v `document` prověřovat, zda byla standardní akce zakázána. Pokud ano, událost byla zpracována a my na ni nemusíme reagovat.


```html autorun height=80 no-beautify run
<p>Pravým kliknutím zobrazíte menu dokumentu (přidána kontrola na událost.defaultPrevented)</p>
<button id="elem">Pravým kliknutím zobrazíte menu tlačítka</button>

<script>
  elem.oncontextmenu = function(událost) {
    událost.preventDefault();
    alert("Kontextové menu tlačítka");
  };

  document.oncontextmenu = function(událost) {
*!*
    if (událost.defaultPrevented) return;
*/!*

    událost.preventDefault();
    alert("Kontextové menu dokumentu");
  };
</script>
```

I nyní všechno funguje správně. Fungovalo by to i tehdy, kdybychom měli vnořené elementy a každý z nich obsahoval vlastní kontextové menu. Jenom je třeba kontrolovat `událost.defaultPrevented` v každém handleru `contextmenu`.

```smart header="událost.stopPropagation() a událost.preventDefault()"
Jak jasně vidíme, `událost.stopPropagation()` a `událost.preventDefault()` (známá také jako `return false`) jsou dvě různé věci a nemají k sobě navzájem žádný vztah.
```

```smart header="Architektura vnořených kontextových menu"
Jsou i jiné způsoby, jak implementovat vnořená kontextová menu. Jedním z nich je mít jednoduchý globální objekt s handlerem pro `document.oncontextmenu` a také metodami, které nám umožňují uložit do něj jiné handlery.

Objekt bude zachytávat všechna kliknutí pravým tlačítkem, procházet uloženými handlery a spouštět ten správný.

Potom by však každá část kódu, která chce kontextové menu, měla tento objekt znát a místo vlastního handleru `contextmenu` používat jeho pomoc.
```

## Shrnutí

Existuje mnoho standardních akcí prohlížeče:

- `mousedown` -- zahájení výběru textu (pohybem myší).
- `click` na `<input type="checkbox">` -- zaškrtne/odškrtne tento `input`.
- `submit` -- tuto událost vyvolá kliknutí na `<input type="submit">` nebo stisknutí `key:Enter` uvnitř formulářového pole, prohlížeč pak formulář odešle.
- `keydown` -- stisknutí klávesy může vést k přidání znaku do pole nebo jiným akcím.
- `contextmenu` -- událost se stane při kliknutí pravým tlačítkem, akcí je zobrazení kontextového menu prohlížeče.
- ...jsou i další...

Všechny standardní akce je možné zakázat, pokud chceme událost zpracovávat výlučně v JavaScriptu.

Abychom zakázali standardní akci, použijeme buď `událost.preventDefault()`, nebo `return false`. Druhý způsob funguje jen pro handlery přiřazené pomocí `on<událost>`.

Možnost `passive: true` metody `addEventListener` oznamuje prohlížeči, že akce nebude zakázána. To je užitečné pro některé mobilní události, např. `touchstart` a `touchmove`, abychom sdělili prohlížeči, že před rolováním nemusí čekat na skončení všech handlerů.

Pokud byla standardní akce zakázána, hodnota `událost.defaultPrevented` se nastaví na `true`, v opačném případě je `false`.

```warn header="Zachovejte sémantiku"
Zákazem standardních akcí a přidáním JavaScriptu si technicky můžeme přizpůsobit chování kteréhokoli elementu. Můžeme například způsobit, že odkaz `<a>` bude fungovat jako tlačítko a tlačítko `<button>` se bude chovat jako odkaz (přesměruje na jiné URL a podobně).

Obecně bychom však měli zachovávat sémantický význam HTML elementů. Například navigaci by mělo provádět `<a>`, ne tlačítko.

Kromě toho, že je to „prostě pěkné“, to zlepší náš HTML kód co do přístupnosti.

Navíc když uvážíme příklad s `<a>`, pak si prosíme všimněte, že prohlížeč nám umožňuje otevírat takové odkazy v novém okně (kliknutím pravým tlačítkem a jinými způsoby). A lidem se to líbí. Ale i když pomocí JavaScriptu přimějeme tlačítko chovat se jako odkaz a dokonce pomocí CSS vypadat jako odkaz, stále na něm nebudou fungovat prvky prohlížeče specifické pro `<a>`.
```
