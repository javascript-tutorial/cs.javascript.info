# Export a import

Direktivy pro export a import mají několik syntaktických variant.

V předchozím článku jsme viděli jednoduché použití, nyní prozkoumejme další příklady.

## Export před deklaracemi

Kteroukoli deklaraci můžeme označit jako exportovanou tím, že před ní uvedeme `export`, ať už je to proměnná, funkce nebo třída.

Například zde jsou všechny exporty platné:

```js
// export pole
*!*export*/!* let měsíce = ['Led', 'Úno', 'Bře', 'Dub', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'];

// export konstanty
*!*export*/!* const ROK_VSTUPU_MODULŮ_DO_STANDARDU = 2015;

// export třídy
*!*export*/!* class Uživatel {
  constructor(jméno) {
    this.jméno = jméno;
  }
}
```

````smart header="Za exportovanou třídou nebo funkcí není středník"
Prosíme všimněte si, že `export` před třídou nebo funkcí z ní nedělá [funkční výraz](info:function-expressions). Je to stále deklarace funkce, byť exportovaná.

Většina stylových průvodců JavaScriptu nedoporučuje středníky za deklaracemi funkcí a tříd.

Z tohoto důvodu není na konci `export class` a `export function` nutný středník:

```js
export function řekniAhoj(uživatel) {
  alert(`Ahoj, ${uživatel}!`);
} *!* // na konci není ; */!*
```

````

## Export mimo deklarace

Můžeme uvést `export` i odděleně.

Zde nejprve deklarujeme a pak exportujeme:

```js  
// 📁 řekni.js
function řekniAhoj(uživatel) {
  alert(`Ahoj, ${uživatel}!`);
}

function řekniNashle(uživatel) {
  alert(`Nashle, ${uživatel}!`);
}

*!*
export {řekniAhoj, řekniNashle}; // seznam exportovaných proměnných
*/!*
```

...Nebo technicky můžeme umístit `export` i nad funkce.

## Import *

Obvykle uvádíme seznam toho, co se má importovat, ve složených závorkách `import {...}`, například:

```js
// 📁 main.js
*!*
import {řekniAhoj, řekniNashle} from './řekni.js';
*/!*

řekniAhoj('Jan'); // Ahoj, Jan!
řekniNashle('Jan'); // Nashle, Jan!
```

Pokud je toho však hodně, můžeme importovat všechno jako objekt použitím `import * as <obj>`, například:

```js
// 📁 main.js
*!*
import * as řekni from './řekni.js';
*/!*

řekni.řekniAhoj('Jan');
řekni.řekniNashle('Jan');
```

Na první pohled vypadá „import všeho“ jako bezvadná věc, krátce se zapisuje, proč bychom tedy vůbec někdy měli výslovně uvádět seznam toho, co potřebujeme importovat?

Je k tomu ovšem několik důvodů.

1. Výslovné uvedení toho, co se má importovat, nám umožňuje psát kratší názvy: `řekniAhoj()` místo `řekni.řekniAhoj()`.
2. Výslovný seznam importů nám dává lepší přehled o struktuře kódu: vidíme, co a kde je použito. Usnadňuje podporu a refaktorizaci kódu.

```smart header="Nebojte se, že importujete příliš mnoho"
Moderní sestavovací nástroje, např. [webpack](https://webpack.js.org/) a jiné, spojují moduly dohromady a optimalizují je, aby urychlily načítání. Rovněž odstraňují nepoužité importy.

Jestliže například importujete `import * as knihovna` z obrovské knihovny kódu a pak použijete jen několik metod, nepoužité metody [nebudou zahrnuty](https://github.com/webpack/webpack/tree/main/examples/harmony-unused#examplejs) do optimalizovaného svazku.
```

## Import „as“

Můžeme také importovat pod odlišnými názvy, a to pomocí `as`.

Například importujme `řekniAhoj` pro stručnost do lokální proměnné `ahoj` a importujme `řekniNashle` jako `nashle`:

```js
// 📁 main.js
*!*
import {řekniAhoj as ahoj, řekniNashle as nashle} from './řekni.js';
*/!*

ahoj('Jan'); // Ahoj, Jan!
nashle('Jan'); // Nashle, Jan!
```

## Export „as“

Podobná syntaxe existuje i pro `export`.

Exportujme funkce pod názvy `ahoj` a `nashle`:

```js
// 📁 řekni.js
...
export {řekniAhoj as ahoj, řekniNashle as nashle};
```

Nyní jsou `ahoj` a `nashle` oficiální názvy pro vnější kód, které budou použity v importech:

```js
// 📁 main.js
import * as řekni from './řekni.js';

řekni.*!*ahoj*/!*('Jan'); // Ahoj, Jan!
řekni.*!*nashle*/!*('Jan'); // Nashle, Jan!
```

## Export default

V praxi se používají převážně dva druhy modulů.

1. Moduly, které obsahují knihovnu, balíček funkcí, podobně jako `řekni.js` výše.
2. Moduly, které deklarují jedinou entitu, např. modul `uživatel.js` exportuje pouze `class Uživatel`.

Většinou se dává přednost druhému uvedenému přístupu, takže každá „věc“ sídlí ve svém vlastním modulu.

Přirozeně to vyžaduje spoustu souborů, jelikož všechno chce svůj vlastní modul, ale to vůbec není problém. Ve skutečnosti je navigace v kódu snadnější, jsou-li soubory dobře pojmenovány a strukturovány ve složkách.

Moduly poskytují speciální syntaxi `export default` („výchozí export“), aby přístup „jedna věc v jednom modulu“ vypadal lépe.

Umístěte `export default` před entitu, která se má exportovat:

```js
// 📁 uživatel.js
export *!*default*/!* class Uživatel { // jen přidáme „default“
  constructor(jméno) {
    this.jméno = jméno;
  }
}
```

V jednom souboru může být pouze jeden `export default`.

...A pak jej importujte bez složených závorek:

```js
// 📁 main.js
import *!*Uživatel*/!* from './uživatel.js'; // ne {Uživatel}, jen Uživatel

new Uživatel('Jan');
```

Importy bez složených závorek vypadají lépe. Obvyklá chyba v začátcích používání modulů je zapomínat uvádět složené závorky úplně. Proto si pamatujte, že `import` potřebuje složené závorky pro pojmenované exporty a nepotřebuje je pro výchozí.

| Pojmenovaný export | Výchozí export |
|--------------|----------------|
| `export class Uživatel {...}` | `export default class Uživatel {...}` |
| `import {Uživatel} from ...` | `import Uživatel from ...`|

Technicky můžeme mít v jednom modulu současně výchozí i pojmenované exporty, ale v praxi je lidé obvykle nesměšují. Modul obsahuje buď pojmenované exporty, nebo výchozí export.

Protože v jednom souboru může být nanejvýše jeden výchozí export, exportovaná entita nemusí mít název.

Například tohle všechno jsou zcela platné výchozí exporty:

```js
export default class { // žádný název třídy
  constructor() { ... }
}
```

```js
export default function(uživatel) { // žádný název funkce
  alert(`Ahoj, ${uživatel}!`);
}
```

```js
// exportujeme jedinou hodnotu, aniž bychom vytvořili proměnnou
export default ['Led', 'Úno', 'Bře', 'Dub', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'];
```

Neuvést název je v pořádku, protože v jednom souboru je jen jeden `export default`, takže `import` bez složených závorek ví, co má importovat.

Bez `default` by takový export ohlásil chybu:

```js
export class { // Chyba! (nevýchozí export vyžaduje název)
  constructor() {}
}
```

### „Výchozí“ název

V některých situacích se klíčové slovo `default` používá k odkazu na výchozí export.

Například k exportu funkce odděleně od její definice:

```js
function řekniAhoj(uživatel) {
  alert(`Ahoj, ${uživatel}!`);
}

// totéž, jako bychom před funkcí uvedli „export default“
export {řekniAhoj as default};
```

Nebo jiná situace: řekněme, že modul `uživatel.js` exportuje jednu hlavní „výchozí“ věc a několik pojmenovaných (vzácný případ, ale stává se to):

```js
// 📁 uživatel.js
export default class Uživatel {
  constructor(jméno) {
    this.jméno = jméno;
  }
}

export function řekniAhoj(uživatel) {
  alert(`Ahoj, ${uživatel}!`);
}
```

Tímto způsobem importujeme výchozí export společně s pojmenovaným:

```js
// 📁 main.js
import {*!*default as Uživatel*/!*, řekniAhoj} from './uživatel.js';

new Uživatel('Jan');
```

A nakonec, jestliže importujeme všechno `*` jako objekt, pak vlastnost `default` je přesně výchozí export:

```js
// 📁 main.js
import * as uživatel from './uživatel.js';

let Uživatel = uživatel.default; // výchozí export
new Uživatel('Jan');
```

### Pár slov proti výchozím exportům

Pojmenované exporty jsou explicitní. To, co exportují, mají přesně pojmenováno, takže od nich tuto informaci dostaneme; to je dobrá věc.

Pojmenované exporty nás nutí při importu používat přesně ten správný název:

```js
import {Uživatel} from './uživatel.js';
// import {MůjUživatel} nefunguje, název musí být {Uživatel}
```

...Zatímco u výchozího exportu si při importu název vždy volíme:

```js
import Uživatel from './uživatel.js'; // funguje
import MůjUživatel from './uživatel.js'; // funguje také
// může být import Cokoli... a pořád to bude fungovat
```

Členové týmu tedy mohou používat různé názvy při importu stejné věci, a to není dobré.

Abychom se tomu vyhnuli a udrželi kód konzistentní, obvykle platí pravidlo, že importované proměnné by měly odpovídat názvům souborů, například:

```js
import Uživatel from './uživatel.js';
import PřihlašovacíFormulář from './přihlašovacíFormulář.js';
import funkce from '/cesta/do/funkce.js';
...
```

I tak to ovšem některé týmy považují za vážnou nevýhodu výchozích exportů. Dávají tedy přednost používání výhradně pojmenovaných exportů. I když je exportována pouze jediná věc, je stále exportována pod svým názvem, bez `default`.

To také trochu usnadňuje reexport (viz dále).

## Reexport

Syntaxe „reexportu“ `export ... from ...` nám umožňuje importovat věci a okamžitě je exportovat (třeba i pod jiným názvem), například:

```js
export {řekniAhoj} from './řekni.js'; // reexport řekniAhoj

export {default as Uživatel} from './uživatel.js'; // reexport výchozího exportu
```

K čemu by to bylo potřeba? Podívejme se na praktický případ použití.

Představme si, že píšeme „balíček“: složku s mnoha moduly, některá funkcionalita z nich bude exportována ven (publikování a distribuci takových balíčků nám umožňují nástroje jako NPM, ale nemusíme je používat) a mnoho modulů je jen „pomocných“ pro vnitřní použití v jiných modulech balíčku.

Struktura souborů by mohla být takováto:
```
auth/
    index.js  
    uživatel.js
    pomocné.js
    testy/
        login.js
    poskytovatelé/
        github.js
        facebook.js
        ...
```

Rádi bychom vystavili funkcionalitu celého balíčku v jediném vstupním bodu. 

Jinými slovy, člověk, který by chtěl náš balíček používat, by měl importovat jen z „hlavního souboru“ `auth/index.js`.

Například takto:

```js
import {login, logout} from 'auth/index.js'
```

„Hlavní soubor“ `auth/index.js` exportuje veškerou funkcionalitu, kterou bychom v našem balíčku chtěli poskytnout.

Myšlenkou je, že lidé zvnějšku, jiní programátoři používající náš balíček, by se neměli zabývat jeho vnitřní strukturou a hledat soubory uvnitř složky s naším balíčkem. V `auth/index.js` exportujeme jen to, co je nutné, a zbytek je před zvědavýma očima ukryt.

Protože naše skutečná exportovaná funkcionalita je roztroušena po celém balíčku, můžeme ji importovat do `auth/index.js` a exportovat z něj:

```js
// 📁 auth/index.js

// importujeme přihlas/odhlas a ihned je exportujeme
import {přihlas, odhlas} from './pomocníci.js';
export {přihlas, odhlas};

// importujeme výchozí export jako Uživatel a exportujeme ho
import Uživatel from './uživatel.js';
export {Uživatel};
...
```

Nyní mohou uživatelé našeho balíčku použít `import {přihlas} from "auth/index.js"`.

Syntaxe `export ... from ...` je jen kratší notace takového importu-exportu:

```js
// 📁 auth/index.js
// reexport přihlas/odhlas 
export {přihlas, odhlas} from './pomocníci.js';

// reexport výchozího exportu jako Uživatel
export {default as Uživatel} from './uživatel.js';
...
```

Významný rozdíl `export ... from` ve srovnání s `import/export` spočívá v tom, že reexportované moduly nejsou v aktuálním souboru dostupné. Uvnitř uvedeného příkladu `auth/index.js` tedy nemůžeme používat reexportované funkce `přihlas/odhlas`.

### Reexportování výchozího exportu

Výchozí export musí být při reexportu zpracován odděleně.

Řekněme, že máme soubor `uživatel.js` obsahující `export default class Uživatel` a chtěli bychom ji reexportovat:

```js
// 📁 uživatel.js
export default class Uživatel {
  // ...
}
```

Můžeme s tím narazit na dva problémy:

1. `export Uživatel from './uživatel.js'` nefunguje. Povede k syntaktické chybě.

    Abychom reexportovali výchozí export, musíme napsat `export {default as Uživatel}`, jako v uvedeném příkladu.

2. `export * from './uživatel.js'` reexportuje pouze pojmenované exporty, ale ignoruje výchozí.

    Pokud chceme reexportovat jak pojmenované, tak výchozí exporty, potřebujeme dva příkazy:
    ```js
    export * from './uživatel.js'; // reexport pojmenovaných exportů
    export {default} from './uživatel.js'; // reexport výchozího exportu
    ```

Tyto zvláštnosti reexportu výchozího exportu jsou jedním z důvodů, proč někteří vývojáři nemají rádi výchozí exporty a dávají přednost pojmenovaným.

## Shrnutí

Zde jsou všechny druhy `export`, které jsme uvedli v této a v předchozí kapitole.

Můžete vyzkoušet sami sebe, když si je přečtete a pokusíte se vzpomenout si, co znamenají:

- Před deklarací třídy/funkce/..:
  - `export [default] class/function/variable ...`
- Samostatný export:
  - `export {x [as y], ...}`.
- Reexport:
  - `export {x [as y], ...} from "modul"`
  - `export * from "modul"` (nereexportuje výchozí export).
  - `export {default [as y]} from "modul"` (reexportuje výchozí export).

Import:

- Import pojmenovaných exportů:
  - `import {x [as y], ...} from "modul"`
- Import výchozího exportu:
  - `import x from "modul"`
  - `import {default as x} from "modul"`
- Import všeho:
  - `import * as obj from "modul"`
- Import modulu (spustí se jeho kód), ale bez přiřazení jeho exportů do proměnných:
  - `import "modul"`

Příkazy `import/export` můžeme uvést na začátku nebo na konci skriptu, na tom nezáleží.

Technicky je tedy tento kód v pořádku:
```js
řekniAhoj();

// ...

import {řekniAhoj} from './řekni.js'; // import na konci souboru
```

V praxi se importy obvykle uvádějí na začátku souboru, ale to je jen pro větší přehlednost.

**Prosíme všimněte si, že příkazy import/export nefungují, jsou-li uvnitř `{...}`.**

Podmíněný import, například tento, nefunguje:
```js
if (něco) {
  import {řekniAhoj} from "./řekni.js"; // Chyba: import musí být na nejvyšší úrovni
}
```

...Co když však opravdu potřebujeme něco importovat podmíněně? Nebo ve správnou dobu? Například načíst modul na požádání až tehdy, když je opravdu zapotřebí?

Dynamické importy uvidíme v dalším článku.