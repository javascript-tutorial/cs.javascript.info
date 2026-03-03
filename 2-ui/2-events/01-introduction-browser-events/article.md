# Úvod do událostí prohlížeče

*Událost* je signál, že se něco stalo. Takové signály generují všechny DOM uzly (ačkoli události se neomezují jen na DOM).

Následuje seznam nejužitečnějších DOM událostí, jen abyste si udělali představu:

**Události myši:**
- `click` -- když uživatel klikne myší na element (doteková zařízení ji generují při doteku).
- `contextmenu` -- když uživatel klikne pravým tlačítkem myši na element.
- `mouseover` / `mouseout` -- když uživatel najede na / opustí element ukazatelem myši.
- `mousedown` / `mouseup` -- když uživatel stiskne / uvolní tlačítko myši nad elementem.
- `mousemove` -- když uživatel pohne myší.

**Události klávesnice:**
- `keydown` a `keyup` -- když uživatel stiskne nebo uvolní klávesu na klávesnici.

**Události formulářových elementů:**
- `submit` -- když uživatel odešle `<form>`.
- `focus` -- když uživatel vstoupí na element, např. na `<input>`.

**Události dokumentu:**
- `DOMContentLoaded` -- když je HTML kód načten a zpracován a je vytvořen celý DOM.

**Události CSS:**
- `transitionend` -- když skončí CSS animace.

Existuje mnoho dalších událostí. K detailům některých událostí se dostaneme v příštích kapitolách.

## Handlery událostí

Abychom na události mohli reagovat, můžeme jim přiřadit *handler* -- funkci, která se spustí, když událost nastane.

Handlery jsou způsobem, jak při uživatelských akcích spouštět JavaScriptový kód.

Způsobů, jak přiřadit handler, je několik. Podíváme se na ně od nejjednoduššího.

### HTML atribut

Handler můžeme nastavit v HTML kódu atributem nazvaným `on<událost>`.

Když například chceme přiřadit handler události `click` elementu `input`, můžeme použít `onclick`, například:

```html run
<input value="Klikni na mě" *!*onclick="alert('Klik!')"*/!* type="button">
```

Při kliknutí myší se spustí kód uvnitř `onclick`.

Prosíme všimněte si, že uvnitř `onclick` používáme jednoduché uvozovky, jelikož atribut sám je uzavřen ve dvojitých. Pokud zapomeneme, že kód je v atributu, a uvnitř použijeme dvojité uvozovky, např. `onclick="alert("Klikni!")"`, nebude to správně fungovat.

HTML atribut není místem, na které by bylo vhodné psát velké množství kódu, takže raději vytvoříme JavaScriptovou funkci a budeme ji odtamtud volat.

Zde kliknutí vyvolá funkci `počítejOvečky()`:

```html autorun height=50
<script>
  function počítejOvečky() {
    for(let i=1; i<=3; i++) {
      alert("Ovečka číslo " + i);
    }
  }
</script>

<input type="button" *!*onclick="počítejOvečky()"*/!* value="Počítej ovečky!">
```

Jak víme, v názvech HTML atributů se nerozlišují malá a velká písmena, takže `ONCLICK` bude fungovat stejně jako `onClick` a `onCLICK`... Obvykle se však atributy píší malými písmeny: `onclick`.

### DOM vlastnost

Můžeme přiřadit handler pomocí DOM vlastnosti `on<událost>`.

Například `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Klikni na mě">
<script>
*!*
  elem.onclick = function() {
    alert('Děkuji');
  };
*/!*
</script>
```

Jestliže je handler přiřazen pomocí HTML atributu, prohlížeč jej načte, vytvoří z obsahu atributu novou funkci a zapíše ji do DOM vlastnosti.

Tento způsob je tedy ve skutečnosti stejný jako předchozí.

Tyto dvě části kódu fungují stejně:

1. Pouze HTML:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Klik!')"*/!* value="Tlačítko">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="tlačítko" value="Tlačítko">
    <script>
    *!*
      tlačítko.onclick = function() {
        alert('Klik!');
      };
    */!*
    </script>
    ```

V prvním příkladu je k inicializaci `tlačítko.onclick` použit HTML atribut, zatímco ve druhém skript. To je celý rozdíl.

**Protože vlastnost `onclick` je pouze jedna, nemůžeme přiřadit více než jeden handler.**

V následujícím příkladu se přidáním handleru v JavaScriptu přepíše existující handler:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Předtím')" value="Klikni na mě">
<script>
*!*
  elem.onclick = function() { // přepíše existující handler
    alert('Potom'); // zobrazí se jen toto
  };
*/!*
</script>
```

Chceme-li handler odstranit, přiřadíme `elem.onclick = null`.

## Přístup k elementu: this

Hodnota `this` uvnitř handleru je element. Ten, ke kterému byl handler přiřazen.

V následujícím kódu tlačítko `button` zobrazí svůj obsah pomocí `this.innerHTML`:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Klikni na mě</button>
```

## Možné chyby

Jestliže pracovat s událostmi teprve začínáte, prosíme všimněte si některých drobností.

Můžeme jako handler přiřadit existující funkci:

```js
function poděkuj() {
  alert('Díky!');
}

elem.onclick = poděkuj;
```

Dávejte však pozor: funkci byste měli přiřadit jako `poděkuj`, ne `poděkuj()`.

```js
// správně
button.onclick = poděkuj;

// špatně
button.onclick = poděkuj();
```

Jestliže přidáme závorky, `poděkuj()` bude voláním funkce. Poslední řádek tedy ve skutečnosti vezme *výsledek* spuštění funkce, kterým je `undefined` (protože funkce nic nevrací), a přiřadí jej do `onclick`. To nebude fungovat.

...Naproti tomu v následující značce závorky potřebujeme:

```html
<input type="button" id="button" onclick="poděkuj()">
```

Je snadné vysvětlit rozdíl. Když prohlížeč načte atribut, vytvoří funkci handleru, jejíž tělo převezme z obsahu atributu.

Uvedený kód tedy vygeneruje tuto vlastnost:
```js
button.onclick = function() {
*!*
  poděkuj(); // <-- sem přijde obsah atributu
*/!*
};
```

**Pro handlery nepoužívejte `setAttribute`.**

Takové volání nebude fungovat:

```js run no-beautify
// kliknutí na <body> vyvolá chyby,
// protože atributy jsou vždy řetězce a z funkce se tedy stane řetězec
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOM vlastnosti rozlišují velká a malá písmena.**

Přiřazujte handler vlastnosti `elem.onclick`, ne `elem.ONCLICK`, protože v názvech DOM vlastností se rozlišují malá a velká písmena.

## addEventListener

Zásadním problémem výše uvedených způsobů přiřazení handlerů je, že *nemůžeme přiřadit více handlerů jedné události*.

Řekněme, že jedna část našeho kódu chce zvýraznit tlačítko po kliknutí a jiná chce po stejném kliknutí zobrazit zprávu.

Rádi bychom na to přiřadili dva handlery, ale nová DOM vlastnost přepíše existující:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // nahradí předchozí handler
```

Vývojáři webových standardů to pochopili už před dlouhou dobou a navrhli alternativní způsob, jak pracovat s handlery, a to pomocí speciálních metod `addEventListener` a `removeEventListener`, pro které takové omezení neplatí.

Syntaxe přidání handleru:

```js
element.addEventListener(událost, handler, [možnosti]);
```

`událost`
: Název události, např. `"click"`.

`handler`
: Funkce handleru.

`možnosti`
: Další nepovinný objekt s těmito vlastnostmi:
    - `once`: pokud je `true`, pak se handler po spuštění automaticky odstraní.
    - `capture`: fáze, v níž se má událost zpracovat. Bude vysvětlena později v kapitole <info:bubbling-and-capturing>. Z historických důvodů mohou `možnosti` být i `false/true`, což je totéž jako `{capture: false/true}`.
    - `passive`: pokud je `true`, pak handler nebude volat `preventDefault()`. Vysvětlíme to později v kapitole <info:default-browser-action>.

K odstranění handleru použijte metodu `removeEventListener`:

```js
element.removeEventListener(událost, handler, [možnosti]);
```

````warn header="Odstranění vyžaduje tutéž funkci"
Abychom odstranili handler, měli bychom předat přesně tutéž funkci, která byla přiřazena.

Tohle nebude fungovat:

```js no-beautify
elem.addEventListener( "click" , () => alert('Díky!'));
// ....
elem.removeEventListener( "click", () => alert('Díky!'));
```

Handler nebude odstraněn, protože `removeEventListener` obdrží jinou funkci -- sice se stejným kódem, ale na tom nezáleží, neboť je to jiný objekt funkce.

Správný způsob je tento:

```js
function handler() {
  alert( 'Díky!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

Prosíme všimněte si, že jestliže funkci neuložíme do proměnné, nemůžeme ji odstranit. Není žádný způsob, jak „zpětně načíst“ handlery, které byly přiřazeny pomocí `addEventListener`.
````

Vícenásobná volání `addEventListener` umožňují přidat více handlerů, například:

```html run no-beautify
<input id="elem" type="button" value="Klikni na mě"/>

<script>
  function handler1() {
    alert('Díky!');
  };

  function handler2() {
    alert('Opět díky!');
  }

*!*
  elem.onclick = () => alert("Ahoj");
  elem.addEventListener("click", handler1); // Díky!
  elem.addEventListener("click", handler2); // Opět díky!
*/!*
</script>
```

Jak vidíme v uvedeném příkladu, můžeme handlery nastavovat pomocí DOM vlastnosti *i* pomocí `addEventListener`. Obvykle však používáme jen jeden z těchto způsobů.

````warn header="Handlery některých událostí fungují jen s použitím `addEventListener`"
Existují události, kterým nelze přiřadit handler pomocí DOM vlastnosti, jedině použitím `addEventListener`.

Je to například událost `DOMContentLoaded`, která se spustí, když je dokument načten a DOM vytvořen.

```js
// nikdy se nespustí
document.onDOMContentLoaded = function() {
  alert("DOM vytvořen");
};
```

```js
// tímto způsobem to funguje
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM vytvořen");
});
```
Metoda `addEventListener` je tedy univerzálnější. Takové události jsou však spíše výjimkou než pravidlem.
````

## Objekt události

Abychom mohli událost patřičně zpracovat, chtěli bychom vědět více o tom, co se stalo. Nestačí jen „kliknutí“ nebo „stisk klávesy“, ale jaké jsou souřadnice ukazatele? Která klávesa byla stisknuta? A podobně.

Když se událost stane, prohlížeč vytvoří *objekt události*, vloží do něj detaily a předá ho handleru jako argument.

Následující příklad zjistí souřadnice ukazatele myši z objektu události:

```html run
<input type="button" value="Klikni na mě" id="elem">

<script>
  elem.onclick = function(*!*událost*/!*) {
    // zobrazí druh události, element a souřadnice kliknutí
    alert(událost.type + " na " + událost.currentTarget);
    alert("Souřadnice: " + událost.clientX + ":" + událost.clientY);
  };
</script>
```

Některé vlastnosti objektu `událost`:

`událost.type`
: Druh události, v tomto případě `"click"`.

`událost.currentTarget`
: Element, který událost zpracoval. Je to totéž jako `this`, pokud handler není šipková funkce nebo jeho `this` není navázáno na něco jiného. V takovém případě můžeme element získat z `událost.currentTarget`.

`událost.clientX` / `událost.clientY`
: Okenní souřadnice ukazatele u událostí myši.

Existují i další vlastnosti. Mnoho z nich závisí na druhu události: události klávesnice mají jednu sadu vlastností, události myši jinou. Prostudujeme je později, až se dostaneme k detailům různých událostí.

````smart header="Objekt události je dostupný i v HTML handlerech"
Objekt události můžeme pod názvem `event` použít i v handlerech, které přiřadíme v HTML kódu, například:

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Druh události">
```

Je to možné proto, že když prohlížeč načte atribut, vytvoří následující handler: `function(event) { alert(event.type) }`. Jeho první argument se tedy nazývá `"event"` a jeho tělo je převzato z atributu.
````


## Objektové handlery: handleEvent

Jako handler události můžeme metodou `addEventListener` přiřadit nejen funkci, ale i objekt. Když pak událost nastane, volá se metoda `handleEvent` tohoto objektu.

Příklad:

```html run
<button id="elem">Klikni na mě</button>

<script>
  let obj = {
    handleEvent(událost) {
      alert(událost.type + " na " + událost.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

Jak vidíme, když `addEventListener` obdrží jako handler objekt, volá při události jeho metodu `obj.handleEvent(událost)`.

Můžeme použít i objekty naší vlastní třídy, například:

```html run
<button id="elem">Klikni na mě</button>

<script>
  class Menu {
    handleEvent(událost) {
      switch(událost.type) {
        case 'mousedown':
          elem.innerHTML = "Tlačítko myši stisknuto";
          break;
        case 'mouseup':
          elem.innerHTML += "...a uvolněno.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

Obě události zde zpracovává stejný objekt. Prosíme všimněte si, že při použití `addEventListener` musíme výslovně uvést, kterým událostem se má naslouchat. Objekt `menu` zde reaguje jen na události `mousedown` a `mouseup`, nereaguje na události žádných jiných druhů.

Metoda `handleEvent` nemusí odvádět celou práci sama. Může volat jiné metody specifické pro určitou událost, například:

```html run
<button id="elem">Klikni na mě</button>

<script>
  class Menu {
    handleEvent(událost) {
      // mousedown -> onMousedown
      let metoda = 'on' + událost.type[0].toUpperCase() + událost.type.slice(1);
      this[metoda](událost);
    }

    onMousedown() {
      elem.innerHTML = "Tlačítko myši stisknuto";
    }

    onMouseup() {
      elem.innerHTML += "...a uvolněno.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

Když jsou nyní handlery událostí jednoznačně odděleny, může být snadnější je udržovat.

## Shrnutí

Existují tři způsoby, jak přiřadit handlery událostí:

1. HTML atributem: `onclick="..."`.
2. DOM vlastností: `elem.onclick = function`.
3. Metodami: `elem.addEventListener(událost, handler[, fáze])` přidává, `removeEventListener` odstraňuje.

HTML atributy se používají jen zřídka, neboť JavaScript uprostřed HTML značky vypadá poněkud divně a nepatřičně. Navíc tam nemůžeme napsat větší část kódu.

Použití DOM vlastností je v pořádku, ale takto nemůžeme přiřadit jedné události více než jeden handler. V mnoha případech nás však toto omezení netlačí.

Poslední způsob je nejflexibilnější, ale také nejdelší na napsání. Existuje několik událostí, které fungují pouze s ním, například `transitionend` a `DOMContentLoaded` (budou dále vysvětleny). Metoda `addEventListener` podporuje jako handlery událostí i objekty. V takovém případě se při události volá jejich metoda `handleEvent`.

Ať přiřadíte handler jakkoli, obdrží jako první argument objekt události. Tento objekt obsahuje podrobnosti o tom, co se stalo.

O událostech obecně a o různých druzích událostí se dozvíme víc v dalších kapitolách.
