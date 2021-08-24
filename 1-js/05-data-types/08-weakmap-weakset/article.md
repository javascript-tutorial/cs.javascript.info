# Slabá mapa a slabá množina

Jak víme z kapitoly <info:garbage-collection>, engine JavaScriptu si udržuje hodnotu v paměti, dokud je dosažitelná (a může tedy být použita).

Příklad:
```js
let jan = { jméno: "Jan" };

// k objektu může být přistupováno, jan je odkaz na něj

// přepíšeme odkaz
jan = null;

*!*
// objekt bude odstraněn z paměti
*/!*
```

Obvykle jsou vlastnosti objektu nebo prvky pole či jiné datové struktury považovány za dosažitelné a udržovány v paměti, dokud je v paměti tato datová struktura.

Například uložíme-li objekt do pole, pak dokud je toto pole živé, bude živý i tento objekt, i když na něj nebudou existovat žádné jiné odkazy.

Třeba takto:

```js
let jan = { jméno: "Jan" };

let pole = [ jan ];

jan = null; // přepíšeme odkaz

*!*
// objekt, na který se dříve odkazoval jan, je uložen uvnitř pole
// proto nebude odklizen garbage collectorem
// můžeme k němu přistoupit pomocí pole[0]
*/!*
```

Podobně když použijeme objekt jako klíč v běžné mapě `Map`, pak dokud tato mapa bude existovat, bude existovat i tento objekt. Bude zabírat místo v paměti a nebude moci být odstraněn garbage collectorem.

Příklad:

```js
let jan = { jméno: "Jan" };

let mapa = new Map();
mapa.set(jan, "...");

jan = null; // přepíšeme odkaz

*!*
// jan je uložen uvnitř mapy,
// můžeme k němu přistoupit pomocí mapa.keys()
*/!*
```

`WeakMap` („slabá mapa“) se v tomto ohledu zásadně liší. Nebrání odstraňování svých klíčových objektů garbage collectorem.

Na příkladech se podívejme, co to znamená.

## WeakMap

Prvním rozdílem mezi `Map` a `WeakMap` je, že klíče musejí být objekty, ne primitivní hodnoty:

```js run
let slabáMapa = new WeakMap();

let obj = {};

slabáMapa.set(obj, "ok"); // funguje správně (klíč je objekt)

*!*
// jako klíč nemůžeme použít řetězec
slabáMapa.set("test", "Hop!"); // Chyba, protože "test" není objekt
*/!*
```

Jestliže nyní použijeme objekt jako klíč a nebudou na něj existovat žádné jiné odkazy -- bude automaticky odstraněn z paměti (a z mapy).

```js
let jan = { jméno: "Jan" };

let slabáMapa = new WeakMap();
slabáMapa.set(jan, "...");

jan = null; // přepíšeme odkaz

// jan se odstraní z paměti!
```

Srovnejte si to s výše uvedeným příkladem běžné mapy `Map`. Když nyní `jan` existuje jen jako klíč `WeakMap` -- bude automaticky smazán z mapy (a z paměti).

`WeakMap` nepodporuje iteraci a metody `keys()`, `values()`, `entries()`, neexistuje tedy žádný způsob, jak z ní získat všechny klíče nebo hodnoty.

`WeakMap` má pouze následující metody:

- `slabáMapa.get(klíč)`
- `slabáMapa.set(klíč, hodnota)`
- `slabáMapa.delete(klíč)`
- `slabáMapa.has(klíč)`

Proč takové omezení? Je tomu tak z technických důvodů. Pokud objekt ztratil všechny ostatní odkazy (např. `jan` ve výše uvedeném kódu), má být automaticky odstraněn garbage collectorem. Technicky však není přesně specifikováno, *kdy k odstranění dojde*.

O tom rozhoduje JavaScriptový engine. Ten se může rozhodnout provést úklid paměti okamžitě anebo s ním počkat a provést jej až později, když dojde k dalšímu mazání. Technicky tedy není znám momentální počet prvků `WeakMap`. Engine je už mohl pročistit nebo ještě ne, nebo to mohl udělat zatím jen částečně. Z tohoto důvodu nejsou podporovány metody, které přistupují ke všem klíčům a hodnotám.

K čemu nyní takovou datovou strukturu potřebujeme?

## Případ použití: dodatečná data

Hlavní oblastí použití `WeakMap` je *úložiště dodatečných dat*.

Jestliže pracujeme s objektem, který „patří“ do jiného kódu, třeba i do knihovny třetí strany, a chtěli bychom si uložit nějaká data s ním spojená, která by měla existovat, jen dokud je tento objekt živý -- pak `WeakMap` je přesně to, co potřebujeme.

Uložíme data do `WeakMap` a tento objekt použijeme jako klíč. Když bude objekt odklizen garbage collectorem, data automaticky zmizí s ním.

```js
slabáMapa.set(jan, "tajné dokumenty");
// jestliže jan zemře, tajné dokumenty budou automaticky zničeny
```

Podívejme se na příklad.

Máme například kód, který si udržuje počet návštěv jednotlivých uživatelů. Tato informace je uložena v mapě: objekt uživatele je klíč a počet návštěv je hodnota. Když uživatel odejde (jeho objekt bude odklizen garbage collectorem), nechceme již nadále mít počet jeho návštěv uložen.

Zde je příklad počítací funkce s `Map`.

```js
// 📁 visitsCount.js
let mapaPočetNávštěv = new Map(); // mapa: uživatel => počet návštěv

// zvýší počet návštěv
function započítejUživatele(uživatel) {
  let počet = mapaPočetNávštěv.get(uživatel) || 0;
  mapaPočetNávštěv.set(uživatel, počet + 1);
}
```

A zde je další část kódu, třeba další soubor, který ji používá:

```js
// 📁 main.js
let jan = { jméno: "Jan" };

započítejUživatele(jan); // počet jeho návštěv

// později nás jan opustí
jan = null;
```

Nyní by objekt `jan` měl být odklizen, ale zůstává v paměti, neboť je to klíč v mapě `mapaPočetNávštěv`.

Když tedy odstraňujeme uživatele, musíme `mapaPočetNávštěv` pročistit, jinak bude neustále narůstat v paměti. Ve složitých architekturách se takové pročišťování může stát nepříjemným úkolem.

Můžeme se tomu vyhnout, když použijeme `WeakMap`:

```js
// 📁 visitsCount.js
let mapaPočetNávštěv = new WeakMap(); // slabá mapa: uživatel => počet návštěv

// zvýší počet návštěv
function započítejUživatele(uživatel) {
  let počet = mapaPočetNávštěv.get(uživatel) || 0;
  mapaPočetNávštěv.set(uživatel, počet + 1);
}
```

Nyní nemusíme čistit `mapaPočetNávštěv`. Jakmile se objekt `jan` stane nedosažitelným všemi jinými způsoby než jako klíč `WeakMap`, bude odstraněn z paměti spolu s informací uloženou pod tímto klíčem ve `WeakMap`.

## Případ použití: cache

Dalším běžným příkladem je cache. Můžeme si ukládat do paměti (tato paměť se nazývá „cache“) výsledky funkce, abychom je mohli znovu použít při jejích dalších voláních na témže objektu.

Abychom toho dosáhli, můžeme použít `Map` (neoptimální scénář):

```js run
// 📁 cache.js
let cache = new Map();

// vypočítá a zapamatuje si výsledek
function proces(obj) {
  if (!cache.has(obj)) {
    let výsledek = /* výpočet výsledku pro */ obj;

    cache.set(obj, výsledek);
  }

  return cache.get(obj);
}

*!*
// Nyní použijeme proces() v jiném souboru:
*/!*

// 📁 main.js
let obj = {/* řekněme, že máme nějaký objekt */};

let výsledek1 = proces(obj); // vypočteno

// ...později z jiného místa kódu...
let výsledek2 = proces(obj); // vezmeme z cache výsledek, který si pamatujeme

// ...později, když už tento objekt nebudeme potřebovat:
obj = null;

alert(cache.size); // 1 (Ouha! Objekt je stále v cache a zabírá paměť!)
```

Při více voláních `proces(obj)` nad stejným objektem funkce vypočítá výsledek jen poprvé a pak ho bude jednoduše brát z `cache`. Nevýhodou je, že když už objekt nebudeme potřebovat, musíme `cache` vyčistit.

Když nahradíme `Map` za `WeakMap`, tento problém zmizí. Výsledek v cache bude z paměti odstraněn automaticky poté, co bude objekt odklizen garbage collectorem.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// vypočítá a zapamatuje si výsledek
function proces(obj) {
  if (!cache.has(obj)) {
    let výsledek = /* výpočet výsledku pro */ obj;

    cache.set(obj, výsledek);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* nějaký objekt */};

let výsledek1 = proces(obj);
let výsledek2 = proces(obj);

// ...později, když už tento objekt nebudeme potřebovat:
obj = null;

// Nemůžeme získat cache.size, protože to je WeakMap,
// ale je nebo zanedlouho bude 0
// Když bude obj odklizen, budou odstraněna i data z cache
```

## WeakSet

`WeakSet` („slabá množina“) se chová obdobně:

- Je analogická k `Set`, ale do `WeakSet` můžeme přidávat jedině objekty (ne primitivy).
- Objekt v této množině existuje, dokud je dosažitelný odjinud.
- Stejně jako `Set` podporuje `add`, `has` a `delete`, ale ne `size`, `keys()` ani žádné iterace.

Přestože je „slabá“, může sloužit i jako dodatečné úložiště. Ne však pro libovolná data, ale jen pro skutečnost „ano/ne“. Členství ve `WeakSet` může o objektu něco znamenat.

Například můžeme do `WeakSet` přidávat uživatele, abychom si pamatovali ty, kteří navštívili naše stránky:

```js run
let množinaNávštěvníků = new WeakSet();

let jan = { jméno: "Jan" };
let petr = { jméno: "Petr" };
let marie = { jméno: "Marie" };

množinaNávštěvníků.add(jan); // navštívil nás Jan
množinaNávštěvníků.add(petr); // pak Petr
množinaNávštěvníků.add(jan); // znovu Jan 

// množinaNávštěvníků má nyní 2 uživatele

// ověříme, zda nás navštívil Jan
alert(množinaNávštěvníků.has(jan)); // true

// ověříme, zda nás navštívila Marie
alert(množinaNávštěvníků.has(marie)); // false

jan = null;

// množinaNávštěvníků bude automaticky pročištěna
```

Nejvýznamnějším omezením `WeakMap` a `WeakSet` je absence iterací a nemožnost získat celý jejich momentální obsah. To se může zdát nešikovné, ale nebrání to `WeakMap/WeakSet` v tom, aby odváděly svou hlavní práci -- být úložištěm „dodatečných“ dat pro objekty, které jsou uloženy nebo spravovány na jiném místě.

## Shrnutí

`WeakMap` je kolekce podobná `Map`, která dovoluje používat jako klíče jen objekty a odstraňuje je i s připojenou hodnotou, jakmile se stanou nedosažitelnými jiným způsobem.

`WeakSet` je kolekce podobná `Set`, která ukládá jen objekty a odstraňuje je, jakmile se stanou nedosažitelnými jiným způsobem.

Jejich hlavní výhodou je, že obsahují slabé odkazy na objekty, takže ty mohou být snadno odklizeny garbage collectorem.

Cenou za to je, že nejsou podporovány `clear`, `size`, `keys`, `values`...

`WeakMap` a `WeakSet` se používají jako „sekundární“ datové struktury navíc k „primárním“ úložištím objektů. Když je objekt odstraněn z primárního úložiště, pak pokud se dá najít jen jako klíč `WeakMap` nebo prvek `WeakSet`, bude automaticky odklizen.
