# Vyvolávání vlastních událostí

V JavaScriptu můžeme nejen přiřazovat handlery, ale také generovat události.

Vlastní události můžeme používat k vytváření „grafických komponent“. Například kořenový element našeho vlastního menu založeného na JS může spouštět události, které budou říkat, co se děje s menu: `otevři` (otevření menu), `vyber` (položka je vybrána) a podobně. Další kód může těmto událostem naslouchat a pozorovat, co se s menu děje.

Můžeme generovat nejenom úplně nové události, které si vymyslíme pro vlastní účely, ale také vestavěné události, např. `click`, `mousedown` atd. To může být užitečné pro automatické testování.

## Konstruktor události

Třídy vestavěných událostí tvoří hierarchii, podobně jako třídy DOM elementů. Jejím kořenem je vestavěná třída [Event](https://dom.spec.whatwg.org/#events).

Objekty třídy `Event` můžeme vytvářet následovně:

```js
let událost = new Event(typ[, možnosti]);
```

Argumenty:

- *typ* -- typ události, řetězec, např. `"click"` nebo náš vlastní, třeba `"moje-událost"`.
- *možnosti* -- objekt se dvěma nepovinnými vlastnostmi:
  - `bubbles: true/false` -- pokud je `true`, pak událost bublá.
  - `cancelable: true/false` -- pokud je  `true`, pak lze zabránit „standardní akci“. Později uvidíme, co to znamená pro vlastní události.

  Standardně jsou obě vlastnosti false: `{bubbles: false, cancelable: false}`.

## dispatchEvent

Když vytvoříme objekt události, měli bychom ji „spustit“ na nějakém elementu voláním `elem.dispatchEvent(událost)`.

Pak na ni handlery budou reagovat, jako by to byla běžná událost prohlížeče. Pokud byla událost vytvořena s příznakem `bubbles`, bude bublat.

V následujícím příkladu je v JavaScriptu spuštěna událost `click`. Handler funguje stejně, jako při kliknutí na tlačítko:

```html run no-beautify
<button id="elem" onclick="alert('Klik!');">Automatický klik</button>

<script>
  let událost = new Event("click");
  elem.dispatchEvent(událost);
</script>
```

```smart header="event.isTrusted"
Existuje způsob, jak poznat „opravdovou“ uživatelskou událost od události generované skriptem.

Vlastnost `událost.isTrusted` je `true` pro události, které pocházejí od skutečných uživatelských akcí, a `false` pro události generované skriptem.
```

## Příklad bublání

Můžeme vytvořit bublající událost s názvem `"ahoj"` a zachytávat ji v `document`.

Stačí nastavit `bubbles` na `true`:

```html run no-beautify
<h1 id="elem">Ahoj ze skriptu!</h1>

<script>
  // zachytávání v dokumentu...
  document.addEventListener("ahoj", function(událost) { // (1)
    alert("Ahoj z " + událost.target.tagName); // Ahoj z H1
  });

  // ...vyvoláme ji na elem!
  let událost = new Event("ahoj", {bubbles: true}); // (2)
  elem.dispatchEvent(událost);

  // handler na dokumentu se aktivuje a zobrazí zprávu.

</script>
```


Poznámky:

1. Naše vlastní události bychom měli přidávat pomocí `addEventListener`, jelikož `on<událost>` existuje jedině pro vestavěné události, `document.onahoj` nebude fungovat.
2. Musíme nastavit `bubbles:true`, jinak událost nebude bublat.

Mechanika bublání funguje pro vestavěné (`click`) a vlastní (`ahoj`) události stejně. I u nich probíhá fáze zachytávání a fáze bublání.

## MouseEvent, KeyboardEvent a jiné

Následuje krátký seznam UI událostí ze [specifikace UI událostí](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

Pokud chceme vytvořit takovou událost, měli bychom je používat místo `new Event`, například `new MouseEvent("click")`.

Správný konstruktor nám umožňuje specifikovat standardní vlastnosti pro příslušný typ události.

Například `clientX/clientY` pro událost myši:

```js run
let událost = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(událost.clientX); // 100
*/!*
```

Prosíme všimněte si, že generický konstruktor `Event` to neumožňuje.

Zkusme to:

```js run
let událost = new Event("click", {
  bubbles: true,    // v konstruktoru Event fungují
  cancelable: true, // pouze bubbles a cancelable
  clientX: 100,
  clientY: 100
});

*!*
alert(událost.clientX); // undefined, neznámá vlastnost je ignorována!
*/!*
```

Technicky bychom to mohli obejít tak, že po vytvoření události přímo přiřadíme `událost.clientX=100`. Je to tedy otázka konvencí a dodržování pravidel. Události generované prohlížečem mají vždy správný typ.

Úplný seznam vlastností různých UI událostí, například [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent), je uveden ve specifikaci.

## Vlastní události

Pro naše vlastní, zcela nové typy událostí, např. `"ahoj"`, bychom měli používat `new CustomEvent`. Technicky je [CustomEvent](https://dom.spec.whatwg.org/#customevent) totéž jako `Event`, ale s jednou výjimkou.

Ve druhém argumentu (v objektu) můžeme přidat další vlastnost `detail` s jakoukoli vlastní informací, kterou chceme události předat.

Příklad:

```html run refresh
<h1 id="elem">Ahoj pro Jana!</h1>

<script>
  // s událostí přijdou do handleru další detaily
  elem.addEventListener("ahoj", function(událost) {
    alert(*!*událost.detail.jméno*/!*);
  });

  elem.dispatchEvent(new CustomEvent("ahoj", {
*!*
    detail: { jméno: "Jan" }
*/!*
  }));
</script>
```

Vlastnost `detail` může obsahovat jakákoli data. Technicky se můžeme obejít i bez ní, protože běžnému objektu `new Event` můžeme po vytvoření přiřazovat jakékoli vlastnosti, ale `CustomEvent` k tomu poskytuje speciální pole `detail`, abychom se vyhnuli konfliktům s jinými vlastnostmi události.

Kromě toho třída události popisuje, o „jaký druh události“ jde, a je-li událost naše vlastní, měli bychom používat `CustomEvent` prostě proto, aby bylo zřejmé, co je zač.

## událost.preventDefault()

Mnoho událostí prohlížeče má „standardní akci“, např. navigaci na odkaz, zahájení výběru a podobně.

U nových, vlastních událostí rozhodně žádné standardní akce prohlížeče nejsou, ale kód, který takovou událost vyvolává, může mít vlastní plány, co bude po spuštění události dělat.

Voláním `událost.preventDefault()` může handler události poslat signál, že tyto akce by měly být zrušeny.

V takovém případě volání `elem.dispatchEvent(událost)` vrátí `false`. A kód, který událost vyvolal, ví, že by neměl pokračovat.

Podívejme se na praktický příklad -- skrývající se králík (ale může to být i zavírající se menu nebo cokoli jiného).

Níže vidíte `#králík` a funkci `skryj()`, která na něm vyvolává událost `"skryj"`, aby oznámila všem stranám, které o to mají zájem, že se králík hodlá skrýt.

Jakýkoli handler může této události naslouchat pomocí `králík.addEventListener('skryj',...)` a pak, je-li to nutné, zrušit akci voláním `událost.preventDefault()`. Pak králík nezmizí:

```html run refresh autorun
<pre id="králík">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="skryj()">Skryj()</button>

<script>
  function skryj() {
    let událost = new CustomEvent("skryj", {
      cancelable: true // bez tohoto přepínače preventDefault nefunguje
    });
    if (!králík.dispatchEvent(událost)) {
      alert('Akci bylo zabráněno handlerem');
    } else {
      králík.hidden = true;
    }
  }

  králík.addEventListener('skryj', function(událost) {
    if (confirm("Volat preventDefault?")) {
      událost.preventDefault();
    }
  });
</script>
```

Prosíme všimněte si, že událost musí mít přepínač `cancelable: true`, jinak bude volání `událost.preventDefault()` ignorováno.

## Události v událostech jsou synchronní

Události se obvykle zpracovávají ve frontě. To znamená, že jestliže prohlížeč zpracovává `onclick` a objeví se nová událost, např. pohyb myši, pak se její zpracování uloží do fronty a odpovídající handlery `mousemove` budou volány po skončení zpracování `onclick`.

Pozoruhodnou výjimkou je situace, kdy je událost vyvolána zevnitř jiné události, např. pomocí `dispatchEvent`. Takové události se zpracují okamžitě: volají se handlery nové události a teprve pak se obnoví zpracování aktuální události.

Například v následujícím kódu se událost `otevři-menu` spustí během události `onclick`.

Bude zpracována okamžitě bez čekání na skončení handleru `onclick`:


```html run autorun
<button id="menu">Menu (klikni na mě)</button>

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("otevři-menu", {
      bubbles: true
    }));

    alert(2);
  };

  // přepíná mezi 1 a 2
  document.addEventListener('otevři-menu', () => alert('vnořená'));
</script>
```

Pořadí výstupů je: 1 -> vnořená -> 2.

Prosíme všimněte si, že vnořená událost `otevři-menu` se zachytává v `document`. Předávání a zpracování vnořené události skončí dříve, než se proces vrátí do vnějšího kódu (`onclick`).

Neplatí to jen pro `dispatchEvent`, jsou i jiné případy. Jestliže handler události volá metody, které spouštějí jiné události, budou také zpracovány synchronně, vnořeny do sebe.

Dejme tomu, že se nám to nelíbí. Chceme, aby byla nejdříve zcela zpracována `onclick`, nezávisle na `otevři-menu` nebo jiných vnořených událostech.

Pak můžeme buď umístit `dispatchEvent` (nebo jiné volání spouštějící událost) na konec `onclick`, nebo, což je možná lepší, zabalit je do `setTimeout` s nulovou prodlevou:

```html run
<button id="menu">Menu (klikni na mě)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("otevři-menu", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('otevři-menu', () => alert('vnořená'));
</script>
```

Nyní se `dispatchEvent` spustí asynchronně po skončení výkonu aktuálního kódu, včetně `menu.onclick`, takže handlery událostí budou zcela oddělené.

Pořadí výstupů se změní na: 1 -> 2 -> vnořená.

## Shrnutí

Abychom generovali událost z kódu, musíme nejprve vytvořit objekt události.

Obecný konstruktor `Event(název, možnosti)` přijímá libovolný název události a objekt `možnosti` se dvěma vlastnostmi:
- `bubbles: true`, pokud událost má bublat.
- `cancelable: true`, pokud má fungovat `událost.preventDefault()`.

Jiné konstruktory nativních událostí, např. `MouseEvent`, `KeyboardEvent` a podobně, přijímají vlastnosti specifické pro příslušný typ události, například `clientX` pro události myši.

Pro vlastní události bychom měli používat konstruktor `CustomEvent`. Ten má další možnost nazvanou `detail`, do níž bychom měli uložit data specifická pro naši událost. K nim pak všechny handlery budou moci přistupovat pomocí `událost.detail`.

Přestože je technicky možné generovat události prohlížeče, např. `click` nebo `keydown`, měli bychom je používat s velkou obezřetností.

Neměli bychom generovat události prohlížeče jen jako trik pro spuštění handlerů. To je ve většině případů špatná architektura.

Nativní události můžeme generovat:

- Jako ošklivý způsob, jak přinutit knihovny třetích stran fungovat tak, jak potřebujeme, pokud nám neposkytují jinou možnost interakce.
- Pro automatické testování, abychom ve skriptu „klikli na tlačítko“ a viděli, zda rozhraní správně reaguje.

Vlastní události s našimi vlastními názvy se často generují z architektonických důvodů, aby signalizovaly, co se děje uvnitř našich menu, posuvníků, kolotočů a podobně.
