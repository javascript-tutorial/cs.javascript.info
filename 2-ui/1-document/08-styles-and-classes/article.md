# Styly a třídy

Než se ponoříme do způsobu, jakým JavaScript pracuje se styly a třídami, uvedeme důležité pravidlo. Doufáme, že je dostatečně známé, ale přesto je musíme uvést.

Existují v zásadě dva způsoby, jak nastavit styl elementu:

1. Vytvořit třídu v CSS a přiřadit ji elementu: `<div class="...">`
2. Zapsat vlastnosti přímo do atributu `style`: `<div style="...">`.

JavaScript umí modifikovat jak třídy, tak vlastnosti `style`.

Vždy bychom měli dávat přednost CSS třídám před atributem `style`. Ten bychom měli používat jen v případech, kdy to třídy „nezvládnou“.

Například `style` je přijatelný, pokud dynamicky spočítáme souřadnice elementu a chceme je nastavit z JavaScriptu, například takto:

```js
let shora = /* složité výpočty */;
let zleva = /* složité výpočty */;

elem.style.left = zleva; // např. '123px', vypočteno za běhu
elem.style.top = shora; // např. '456px'
```

V jiných případech, například pro obarvení textu červeně nebo přidání ikony na pozadí, popište vše v CSS a pak přidejte třídu (JavaScript to umí). Je to flexibilnější a podpora je snadnější.

## className a classList

Změna třídy je jednou z nejčastěji používaných akcí ve skriptech.

V dřívějších dobách platilo v JavaScriptu omezení: rezervované slovo, např. `"class"`, nemůže být vlastností objektu. Toto omezení již neexistuje, ale v oné době nebylo možné mít vlastnost s názvem `"class"`, např. `elem.class`.

Pro třídy tedy byla zavedena podobná vlastnost `"className"`: `elem.className` odpovídá atributu `"class"`.

Příklad:

```html run
<body class="hlavní strana">
  <script>
    alert(document.body.className); // hlavní strana
  </script>
</body>
```

Jestliže do `elem.className` něco přiřadíme, nahradíme tím celý řetězec tříd. Někdy je to právě to, co potřebujeme, ale často chceme přidat nebo odebrat jedinou třídu.

K tomu slouží jiná vlastnost: `elem.classList`.

`elem.classList` je speciální objekt s metodami `add/remove/toggle` pro přidání, odstranění a přepnutí jediné třídy.

Příklad:

```html run
<body class="hlavní strana">
  <script>
*!*
    // přidáme třídu
    document.body.classList.add('článek');
*/!*

    alert(document.body.className); // hlavní strana článek
  </script>
</body>
```

Můžeme tedy pracovat jak s celým řetězcem tříd pomocí `className`, tak s jednotlivými třídami pomocí `classList`. Záleží na našich potřebách, co si vybereme.

Metody objektu `classList`:

- `elem.classList.add/remove("třída")` -- přidá/odstraní třídu.
- `elem.classList.toggle("třída")` -- pokud třída není v seznamu, přidá ji, jinak ji odstraní.
- `elem.classList.contains("třída")` -- ověří, zda zadaná třída je v seznamu, vrátí `true/false`.

Kromě toho `classList` je iterovatelný, takže si můžeme vypsat všechny třídy cyklem `for..of`, například:

```html run
<body class="hlavní strana">
  <script>
    for (let název of document.body.classList) {
      alert(název); // hlavní, pak strana
    }
  </script>
</body>
```

## Styl elementu

Vlastnost `elem.style` je objekt, který odpovídá tomu, co je zapsáno do atributu `"style"`. Nastavení `elem.style.width="100px"` funguje stejně, jako kdybychom měli v atributu `style` řetězec `width:100px`.

U víceslovných vlastností se používá velbloudíNotace:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

Příklad:

```js run
document.body.style.backgroundColor = prompt('barva pozadí?', 'green');
```

````smart header="Vlastnosti s prefixem"
Stejné pravidlo dodržují i vlastnosti s prefixem prohlížeče, např. `-moz-border-radius`, `-webkit-border-radius`: pomlčka znamená velké písmeno.

Příklad:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## Resetování vlastnosti style

Někdy chceme do vlastnosti `style` něco přiřadit a později to odstranit.

Například můžeme nastavit `elem.style.display = "none"`, abychom skryli element.

Později můžeme chtít `style.display` odstranit, jako by vůbec nebyla nastavena. Místo mazání `delete elem.style.display` bychom do ní měli přiřadit prázdný řetězec: `elem.style.display = ""`.

```js run
// spustíme-li tento kód, <body> blikne
document.body.style.display = "none"; // schovat

setTimeout(() => document.body.style.display = "", 1000); // zpět do normálu
```

Jestliže nastavíme `style.display` na prázdný řetězec, prohlížeč aplikuje CSS třídy a jejich zabudované styly běžným způsobem, jako by vlastnost `style.display` vůbec neexistovala.

K tomu existuje i speciální metoda, `elem.style.removeProperty('vlastnost stylu')`. Můžeme tedy odstranit vlastnost následovně:

```js run
document.body.style.background = 'red'; // nastavíme červené pozadí

setTimeout(() => document.body.style.removeProperty('background'), 1000); // za 1 sekundu pozadí odstraníme
```

````smart header="Úplné přepsání pomocí `style.cssText`"
K nastavení jednotlivých vlastností stylu používáme běžně `style.*`. Nemůžeme nastavit celý styl způsobem `div.style="color: red; width: 100px"`, protože `div.style` je objekt a slouží pouze pro čtení.

K tomu, abychom nastavili celý styl jedním řetězcem, existuje speciální vlastnost `style.cssText`:

```html run
<div id="div">Tlačítko</div>

<script>
  // zde můžeme nastavit speciální přepínače stylu, např. "important"
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

Tato vlastnost se používá jen zřídka, neboť takové přiřazení odstraní všechny existující styly: nepřidává nové styly, ale nahrazuje existující. Občas může smazat něco, co potřebujeme. Můžeme ji však bezpečně používat pro nové elementy, u nichž víme, že jim nesmažeme existující styl.

Téhož můžeme dosáhnout nastavením atributu: `div.setAttribute('style', 'color: red...')`.
````

## Nezapomínejte na jednotky

Nezapomínejte přidávat k hodnotám CSS jednotky.

Například `elem.style.top` bychom neměli nastavovat na `10`, ale na `10px`. Jinak to nebude fungovat:

```html run height=100
<body>
  <script>
  *!*
    // nefunguje to!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (prázdný řetězec, přiřazení je ignorováno)
  */!*

    // nyní přidáme CSS jednotku (px) - a už to funguje
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

Prosíme všimněte si, že na posledních řádcích prohlížeč „rozbalí“ vlastnost `style.margin` a odvodí z ní `style.marginLeft` a `style.marginTop`.

## Vypočítané vlastnosti: getComputedStyle

Změnit styl je tedy jednoduché. Ale jak jej *načíst*?

Chceme například znát velikost, okraje nebo barvu elementu. Jak to udělat?

**Vlastnost `style` pracuje jen s hodnotou atributu `"style"` bez jakékoli CSS kaskády.**

Pomocí `elem.style` tedy nejsme schopni načíst nic, co pochází z CSS tříd.

Například zde `style` nevidí vnější okraj (margin):

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  Červený text
  <script>
*!*
    alert(document.body.style.color); // prázdný
    alert(document.body.style.marginTop); // prázdný
*/!*
  </script>
</body>
```

...Ale co když chceme třeba zvětšit vnější okraj o `20px`? Chtěli bychom znát jeho aktuální hodnotu.

K tomu slouží jiná metoda: `getComputedStyle`.

Její syntaxe je:

```js
getComputedStyle(element, [pseudo])
```

element
: Element, jehož hodnota má být načtena.

pseudo
: Pseudoelement, pokud je vyžadován, například `::before`. Prázdný řetězec nebo žádný argument znamená samotný element.

Výsledkem je objekt obsahující styly, podobný `elem.style`, ale tentokrát s ohledem na všechny CSS třídy.

Například:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let vypočítanýStyl = getComputedStyle(document.body);

    // nyní z něj můžeme načíst vnější okraj a barvu

    alert( vypočítanýStyl.marginTop ); // 5px
    alert( vypočítanýStyl.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="Vypočítané a vyhodnocené hodnoty"
V [CSS](https://drafts.csswg.org/cssom/#resolved-values) jsou dva koncepty:

1. *Vypočítaná* (computed) hodnota stylu je hodnota získaná po aplikaci všech CSS pravidel a CSS dědičnosti, tedy výsledek CSS kaskády. Může vypadat jako `height:1em` nebo `font-size:125%`.
2. *Vyhodnocená* (resolved) hodnota stylu je ta, která se nakonec aplikuje na element. Hodnoty jako `1em` nebo `125%` jsou relativní. Prohlížeč vezme vypočítanou hodnotu a změní všechny jednotky na pevné a absolutní, například  `height:20px` nebo `font-size:16px`. Vyhodnocené hodnoty geometrických vlastností mohou mít pohyblivou čárku, například `width:50.5px`.

Metoda `getComputedStyle` vznikla před dlouhou dobou, aby vracela vypočítané hodnoty, ale ukázalo se, že vyhodnocené hodnoty jsou mnohem vhodnější, a tak se standard změnil.

V současnosti tedy `getComputedStyle` ve skutečnosti vrací vyhodnocenou hodnotu vlastnosti, pro geometrii obvykle v `px`.
```

````warn header="`getComputedStyle` vyžaduje celý název vlastnosti"
Vždy bychom se měli ptát na přesnou vlastnost, kterou chceme znát, například `paddingLeft`, `marginTop` nebo `borderTopWidth`. Jinak nemáme zaručen správný výsledek.

Například pokud existují vlastnosti `paddingLeft/paddingTop`, co bychom pak měli obdržet pro `getComputedStyle(elem).padding`? Nic, nebo snad „vygenerovanou“ hodnotu ze známých vnitřních okrajů (paddingů)? Žádné standardní pravidlo zde neexistuje.
````

```smart header="Styly aplikované na odkazy `:visited` jsou skryté!"
Navštívené odkazy mohou být obarveny pomocí CSS pseudotřídy `:visited`.

Ale `getComputedStyle` přístup k této barvě neposkytuje, neboť jinak by libovolná stránka mohla zjistit, zda uživatel navštívil nějaký odkaz, tak, že si ho vytvoří a zjistí jeho styly.

JavaScript nesmí vidět styly aplikované pomocí `:visited`. Rovněž CSS obsahuje omezení, které zakazuje ve `:visited` aplikovat styly měnící geometrii. Tím je zaručeno, že neexistuje žádný vedlejší způsob, jak by zlá stránka mohla zjistit, zda byl nějaký odkaz navštíven, a tím porušit soukromí.
```

## Shrnutí

Ke správě tříd slouží dvě vlastnosti DOMu:

- `className` -- řetězcová hodnota, hodí se pro správu celé sady tříd.
- `classList` -- objekt s metodami `add/remove/toggle/contains`, hodí se pro jednotlivé třídy.

Ke změně stylu:

- Vlastnost `style` je objekt, který obsahuje styly zapsané velbloudíNotací. Čtení a zápis do něj má stejný význam jako modifikace jednotlivých vlastností v atributu `"style"`. Chcete-li vidět, jak se aplikuje `important` a jiné vzácně používané vlastnosti, [MDN](mdn:api/CSSStyleDeclaration) obsahuje seznam metod.

- Vlastnost `style.cssText` odpovídá celému atributu `"style"`, úplnému řetězci stylů.

K načtení vyhodnocených stylů (s ohledem na všechny třídy po aplikaci všech CSS a výpočtu finálních hodnot):

- Metoda `getComputedStyle(elem, [pseudo])` vrací objekt podobný stylu, který je obsahuje. Je pouze pro čtení.
