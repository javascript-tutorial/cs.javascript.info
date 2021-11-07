
# Atributy a deskriptory vlastností

Jak víme, do objektů můžeme ukládat vlastnosti.

Až dosud pro nás vlastnost byla pouhou dvojicí „klíč-hodnota“. Ale vlastnost objektu je ve skutečnosti něco flexibilnějšího a silnějšího.

V této kapitole prostudujeme další možnosti konfigurace a v další se podíváme, jak je neviditelně proměnit na funkce getterů a setterů.

## Atributy vlastností

Vlastnosti objektů mají kromě hodnoty **`value`** tři speciální atributy (tzv. „vlajky“ nebo „přepínače“):

- **`writable`** *(zapisovatelná)* -- je-li `true`, může být hodnota vlastnosti změněna, jinak je jen pro čtení.
- **`enumerable`** *(enumerovatelná)* -- je-li `true`, vlastnost se objevuje v cyklech, jinak se v nich neobjeví.
- **`configurable`** *(konfigurovatelná)* -- je-li `true`, vlastnost může být smazána a tyto atributy mohou být měněny, jinak ne.

Prozatím jsme je neviděli, protože se obecně neukazují. Když vytvoříme vlastnost „obvyklým způsobem“, všechny jsou `true`. Můžeme je však kdykoli změnit.

Nejprve se podíváme, jak tyto přepínače zjistit.

Metoda [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) nám umožňuje získat *úplnou* informaci o vlastnosti.

Syntaxe je:
```js
let deskriptor = Object.getOwnPropertyDescriptor(obj, názevVlastnosti);
```

`obj`
: Objekt, z něhož chceme informaci získat.

`názevVlastnosti`
: Název vlastnosti.

Návratová hodnota je tzv. „deskriptor vlastnosti“: objekt, který obsahuje hodnotu a všechny přepínače.

Například:

```js run
let uživatel = {
  jméno: "Jan"
};

let deskriptor = Object.getOwnPropertyDescriptor(uživatel, 'jméno');

alert( JSON.stringify(deskriptor, null, 2 ) );
/* deskriptor vlastnosti:
{
  "value": "Jan",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

Chceme-li přepínače změnit, můžeme použít metodu [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

Syntaxe je:

```js
Object.defineProperty(obj, názevVlastnosti, deskriptor)
```

`obj`, `názevVlastnosti`
: Objekt a jeho vlastnost, pro které se použije deskriptor.

`deskriptor`
: Deskriptor vlastnosti, který se použije.

Jestliže vlastnost existuje, `defineProperty` změní její přepínače. V opačném případě tuto vlastnost vytvoří se zadanou hodnotou a přepínači; není-li v takovém případě některý přepínač uveden, předpokládá se, že je `false`.

Například zde vytvoříme vlastnost `jméno` se všemi přepínači nepravdivými:

```js run
let uživatel = {};

*!*
Object.defineProperty(uživatel, "jméno", {
  value: "Jan"
});
*/!*

let deskriptor = Object.getOwnPropertyDescriptor(uživatel, 'jméno');

alert( JSON.stringify(deskriptor, null, 2 ) );
/*
{
  "value": "Jan",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

Porovnejte si ji s výše uvedenou vlastností `uživatel.jméno` „vytvořenou normálně“: nyní jsou všechny přepínače nepravdivé. Pokud to není to, co chceme, můžeme je v objektu `deskriptor` nastavit na `true`.

Nyní se v příkladu podívejme na efekty přepínačů.

## Nezapisovatelná

Učiňme vlastnost `uživatel.jméno` nezapisovatelnou (nebude moci být změněna) změnou přepínače `writable`:

```js run
let uživatel = {
  jméno: "Jan"
};

Object.defineProperty(uživatel, "jméno", {
*!*
  writable: false
*/!*
});

*!*
uživatel.jméno = "Petr"; // Chyba: Nelze přiřazovat do vlastnosti 'jméno', která je jen pro čtení
*/!*
```

Nyní nikdo nemůže změnit jméno našeho uživatele, pokud sám nezavolá metodu `defineProperty`, která přebije tu naši.

```smart header="Chyby nastávají jen ve striktním režimu"
V nestriktním režimu nenastane žádná chyba, když se pokusíme zapsat do nezapisovatelné vlastnosti a podobně. Operace se však stále neprovede. Akce porušující nastavení přepínačů se v nestriktním režimu prostě tiše ignorují.
```

Zde je stejný příklad, ale vlastnost je vytvořena zcela nově:

```js run
let uživatel = { };

Object.defineProperty(uživatel, "jméno", {
*!*
  value: "Jan",
  // u nových vlastností musíme výslovně uvést, co je true
  enumerable: true,
  configurable: true
*/!*
});

alert(uživatel.jméno); // Jan
uživatel.jméno = "Petr"; // Chyba
```

## Neenumerovatelná

Přidejme nyní do objektu `uživatel` vlastní `toString`.

Normálně je vestavěná metoda `toString` v objektech neenumerovatelná, v cyklu `for..in` se neukazuje. Jestliže však přidáme náš vlastní `toString`, defaultně se ve `for..in` ukáže, například takto:

```js run
let uživatel = {
  jméno: "Jan",
  toString() {
    return this.jméno;
  }
};

// Defaultně budou zobrazeny obě naše vlastnosti:
for (let klíč in uživatel) alert(klíč); // jméno, toString
```

Pokud se nám to nelíbí, můžeme nastavit `enumerable:false`. Vlastnost se pak neobjeví v cyklu `for..in`, stejně jako vestavěná:

```js run
let uživatel = {
  jméno: "Jan",
  toString() {
    return this.jméno;
  }
};

Object.defineProperty(uživatel, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// Nyní náš toString zmizí:
*/!*
for (let klíč in uživatel) alert(klíč); // jméno
```

Neenumerovatelné vlastnosti jsou také vyřazeny z metody `Object.keys`:

```js
alert(Object.keys(uživatel)); // jméno
```

## Nekonfigurovatelná

Přepínač nekonfigurovatelnosti (`configurable:false`) je někdy přednastaven v zabudovaných objektech a vlastnostech.

Nekonfigurovatelná vlastnost nemůže být smazána a její atributy nemohou být měněny.

Například `Math.PI` je nezapisovatelná, neenumerovatelná a nekonfigurovatelná:

```js run
let deskriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(deskriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
Programátor tedy nemůže změnit hodnotu `Math.PI` nebo tuto vlastnost přepsat.

```js run
Math.PI = 3; // Chyba, protože má writable: false

// delete Math.PI by rovněž nefungovalo
```

Nemůžeme ani změnit `Math.PI` tak, aby byla znovu `writable` (zapisovatelná):

```js run
// Chyba kvůli configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```

Neexistuje naprosto nic, co bychom mohli s `Math.PI` dělat.

Nastavit vlastnost nekonfigurovatelnou je jednosměrná cesta. Nemůžeme ji pomocí `defineProperty` změnit zpět.

**Prosíme všimněte si: `configurable: false` brání ve změnách přepínačů vlastnosti a jejím smazání, ale umožňuje měnit její hodnotu.**

Zde je `uživatel.jméno` nekonfigurovatelná, ale stále ji můžeme měnit (je zapisovatelná):

```js run
let uživatel = {
  jméno: "Jan"
};

Object.defineProperty(uživatel, "jméno", {
  configurable: false
});

uživatel.jméno = "Petr"; // funguje správně
delete uživatel.jméno; // Chyba
```

A zde učiníme `uživatel.jméno` „navěky zapečetěnou“ konstantou, právě jako zabudované `Math.PI`:

```js run
let uživatel = {
  jméno: "Jan"
};

Object.defineProperty(uživatel, "jméno", {
  writable: false,
  configurable: false
});

// nebudeme moci změnit uživatel.jméno ani její přepínače
// nic z tohoto nebude fungovat:
uživatel.jméno = "Petr";
delete uživatel.jméno;
Object.defineProperty(uživatel, "jméno", { value: "Petr" });
```

```smart header="Jediná možná změna atributu: writable true -> false"
Ve změně přepínačů je jedna drobná výjimka.

U nekonfigurovatelné vlastnosti můžeme změnit `writable: true` na `false`, abychom zabránili modifikaci její hodnoty (abychom přidali další ochrannou vrstvu). Obráceně to však nejde.
```

## Object.defineProperties

Existuje metoda [Object.defineProperties(obj, deskriptory)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties), která nám umožňuje definovat mnoho vlastností najednou.

Syntaxe je:

```js
Object.defineProperties(obj, {
  vlastnost1: deskriptor1,
  vlastnost2: deskriptor2
  // ...
});
```

Například:

```js
Object.defineProperties(uživatel, {
  jméno: { value: "Jan", writable: false },
  příjmení: { value: "Novák", writable: false },
  // ...
});
```

Můžeme tedy nastavit mnoho vlastností najednou.

## Object.getOwnPropertyDescriptors

Chceme-li získat deskriptory všech vlastností najednou, můžeme použít metodu [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).

Společně s metodou `Object.defineProperties` ji můžeme použít jako způsob klonování objektu, který zachovává přepínače:

```js
let klon = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Když běžně klonujeme objekt, kopírujeme vlastnosti pomocí přiřazení, například takto:

```js
for (let klíč in uživatel) {
  klon[klíč] = uživatel[klíč]
}
```

...To však nekopíruje přepínače. Chceme-li tedy „lepší“ klon, dáme přednost metodě `Object.defineProperties`.

Další rozdíl je v tom, že `for..in` ignoruje symbolické vlastnosti, ale `Object.getOwnPropertyDescriptors` vrací deskriptory *všech* vlastností včetně symbolických.

## Globální zapečetění objektu

Deskriptory vlastností fungují na úrovni jednotlivých vlastností.

Existují však i metody, které omezují přístup k *celému* objektu:

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: Zakazuje přidávání nových vlastností do objektu.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: Zakazuje přidávání/odstraňování vlastností. Nastaví `configurable: false` pro všechny existující vlastnosti.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: Zakazuje přidávání/odstraňování/měnění vlastností. Nastaví `configurable: false, writable: false` pro všechny existující vlastnosti.

A existují i testy na ně:

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: Vrátí `false`, je-li zakázáno přidávání vlastností, jinak vrátí `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: Vrátí `true`, je-li zakázáno přidávání/odstraňování vlastností a všechny existující vlastnosti mají `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: Vrátí `true`, je-li zakázáno přidávání/odstraňování/měnění vlastností a všechny existující vlastnosti mají `configurable: false, writable: false`.

V praxi se však tyto metody používají jen zřídka.