# Typová konverze

Operátory a funkce většinou automaticky převedou hodnoty, které jim byly zadány, na správný typ.

Například `alert` automaticky převede libovolnou hodnotu na řetězec a ten zobrazí. Matematické operace převádějí hodnoty na čísla.

Existují však případy, v nichž musíme konverzi hodnoty na potřebný typ explicitně uvést.

```smart header="Zatím nehovoříme o objektech"
V této kapitole se ještě nebudeme zabývat objekty. Prozatím budeme hovořit jen o primitivních typech.

Až se později dozvíme něco o objektech, v kapitole <info:object-toprimitive> uvidíme, jak do toho zapadají.
```

## Konverze na řetězec

Konverze na řetězec se odehraje tehdy, když potřebujeme hodnotu ve formě řetězce.

Provádí ji například `alert(hodnota)`, aby mohla zobrazit hodnotu.

Můžeme také volat funkci `String(hodnota)`, která převede zadanou hodnotu na řetězec:

```js run
let hodnota = true;
alert(typeof hodnota); // boolean

*!*
hodnota = String(hodnota); // hodnota je nyní řetězec "true"
alert(typeof hodnota); // string (řetězec)
*/!*
```

Konverze na řetězec je většinou zřejmá: `false` se převede na `"false"`, `null` se převede na `"null"`, atd.

## Konverze na číslo

Konverze na číslo se automaticky odehrává v matematických funkcích a výrazech.

Například když použijeme dělení `/` na něco jiného než čísla:

```js run
alert( "6" / "2" ); // 3, řetězce se konvertují na čísla
```

Pro explicitní konverzi hodnoty `hodnota` na číslo můžeme použít funkci `Number(hodnota)`:

```js run
let řtzc = "123";
alert(typeof řtzc); // string (řetězec)

let čslo = Number(řtzc); // stane se z něj číslo 123

alert(typeof čslo); // number (číslo)
```

Explicitní konverze je obvykle potřebná, když načítáme hodnotu z řetězcového zdroje, například z textového formuláře, ale očekáváme zadání čísla.

Není-li v řetězci platné číslo, výsledkem konverze bude `NaN`. Například:

```js run
let věk = Number("nějaký řetězec místo čísla");

alert(věk); // NaN, konverze neuspěla
```

Pravidla pro konverzi na číslo:

| Hodnota |  Převede se na... |
|---------|-------------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true</code>&nbsp;a&nbsp;<code>false</code> | `1` a `0` |
| `řetězec` | Odstraní se bílé znaky (mezery, tabulátory `\t`, konce řádku `\n` atd.) ze začátku a konce. Je-li výsledný řetězec prázdný, výsledkem je `0`. Jinak se číslo „přečte“ z řetězce. Při chybě je vydáno `NaN`. |

Příklady:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (chyba při čtení čísla u znaku "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Všimněte si, že `null` a `undefined` se tady chovají rozdílně: `null` se převede na nulu, zatímco `undefined` se převede na `NaN`.

Tuto konverzi provádí i většina matematických operátorů. Uvidíme to v následující kapitole.

## Konverze na boolean

Konverze na boolean je nejjednodušší.

Odehrává se v logických operátorech (později se setkáme s testy platnosti podmínky a podobnými věcmi), ale můžeme ji provést i explicitně voláním `Boolean(hodnota)`.

Pravidla konverze:

- Hodnoty, které jsou intuitivně „prázdné“, tj. `0`, prázdný řetězec, `null`, `undefined` a `NaN`, se převedou na `false`.
- Ostatní hodnoty se převedou na `true`.

Příklad:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("ahoj") ); // true
alert( Boolean("") ); // false
```

````warn header="Všimněte si: řetězec s nulou `\"0\"` se převede na `true`"
Některé jazyky (konkrétně PHP) zacházejí s řetězcem `"0"` jako s `false`, avšak v JavaScriptu je neprázdný řetězec vždy `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // mezery, také true (každý neprázdný řetězec je true)
```
````

## Shrnutí

Tři nejčastěji používané typové konverze jsou na řetězec, na číslo a na boolean.

**`Konverze na řetězec`** -- Nastává, když něco vypisujeme. Můžeme ji provést pomocí `String(hodnota)`. Konverze na řetězec je u primitivních typů obvykle zřejmá.

**`Konverze na číslo`** -- Nastává při matematických operacích. Můžeme ji provést pomocí `Number(hodnota)`.

Konverze se řídí těmito pravidly:

| Hodnota |  Převede se na... |
|---------|-------------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `řetězec` | Načte se „doslovně“, bílé znaky (mezery, tabulátory `\t`, konce řádku `\n` atd.) na obou stranách se ignorují. Z prázdného řetězce se stane `0`. Při chybě je vydáno `NaN`. |

**`Konverze na boolean`** -- Nastává při logických operacích. Můžeme ji provést pomocí `Boolean(hodnota)`.

Řídí se těmito pravidly:

| Hodnota |  Převede se na... |
|---------|-------------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|jakákoli jiná hodnota| `true` |

Většinu těchto pravidel je snadné pochopit a zapamatovat si. Významné výjimky, v nichž lidé obvykle chybují, jsou:

- `undefined` převedené na číslo je `NaN`, ne `0`.
- `"0"` a řetězce obsahující jen mezery, např. `"   "`, jsou po převodu na boolean vyhodnoceny jako true.

O objektech se zde nezmiňujeme. Později, až se v JavaScriptu naučíme všechny potřebné základy, se k nim vrátíme v kapitole <info:object-toprimitive>, která je věnována výlučně objektům.