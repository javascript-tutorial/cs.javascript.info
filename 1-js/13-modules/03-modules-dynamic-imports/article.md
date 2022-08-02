# Dynamické importy

Příkazy exportu a importu, které jsme uvedli v předchozích kapitolách, se nazývají „statické“. Jejich syntaxe je velmi jednoduchá a striktní.

Za prvé, žádné parametry příkazu `import` nemůžeme dynamicky generovat.

Cesta k modulu musí být primitivní řetězec, ne volání funkce. Tohle nebude fungovat:

```js
import ... from *!*vraťNázevModulu()*/!*; // Chyba, povoleno je jen from "řetězec"
```

Za druhé, nemůžeme importovat podmíněně nebo za běhu skriptu:

```js
if(...) {
  import ...; // Chyba, tohle není dovoleno!
}

{
  import ...; // Chyba, nemůžeme umístit import do bloku
}
```

Je to proto, že záměrem příkazů `import`/`export` je poskytnout páteř struktury kódu. To je dobrá věc, protože strukturu kódu můžeme analyzovat, moduly můžeme speciálními nástroji shromažďovat a spojovat do jednoho souboru, nepoužité exporty můžeme odstraňovat („třesení stromem“). To je možné jen proto, že struktura importů/exportů je jednoduchá a pevná.

Jak ale můžeme importovat modul dynamicky, na požádání?

## Výraz import()

Výraz `import(modul)` načte modul a vrátí příslib, který se vyhodnotí do objektu modulu obsahujícího všechny jeho exporty. Může být volán z kteréhokoli místa v kódu.

Můžeme jej používat dynamicky na kterémkoli místě kódu, například:

```js
let cestaModulu = prompt("Který modul načíst?");

import(cestaModulu)
  .then(obj => <objekt modulu>)
  .catch(chyba => <chyba při načítání, např. takový modul neexistuje>)
```

Nebo můžeme použít `let modul = await import(cestaModulu)`, jsme-li uvnitř asynchronní funkce.

Například jestliže máme následující modul `řekni.js`:

```js
// 📁 řekni.js
export function ahoj() {
  alert(`Ahoj`);
}

export function nashle() {
  alert(`Nashle`);
}
```

...Pak dynamický import může vypadat takto:

```js
let {ahoj, nashle} = await import('./řekni.js');

ahoj();
nashle();
```

Nebo jestliže `řekni.js` má defaultní export:

```js
// 📁 řekni.js
export default function() {
  alert("Modul načten (defaultní export)!");
}
```

...Pak, abychom k němu přistoupili, můžeme použít vlastnost `default` objektu modulu:

```js
let obj = await import('./řekni.js');
let řekni = obj.default;
// nebo na jednom řádku: let {default: řekni} = await import('./řekni.js');

řekni();
```

Zde je celý příklad:

[codetabs src="say" current="index.html"]

```smart
Dynamické importy fungují v běžných skriptech, nevyžadují `script type="module"`.
```

```smart
Ačkoli `import()` vypadá jako volání funkce, je to speciální syntaxe, která prostě jen používá závorky (podobně jako `super()`).

Nemůžeme tedy kopírovat `import` do proměnné nebo s ním používat `call/apply`. Není to funkce.
```
