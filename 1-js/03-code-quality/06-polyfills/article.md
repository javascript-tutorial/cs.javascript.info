# Polyfilly a transpilátory

Jazyk JavaScript se neustále vyvíjí. Pravidelně se pro tento jazyk objevují nové návrhy, ty jsou analyzovány a jsou-li shledány užitečnými, přidají se na seznam na <https://tc39.github.io/ecma262/> a pak pokračují do [specifikace](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).

Týmy vyvíjející JavaScriptové motory mají své vlastní nápady ohledně toho, co implementovat jako první. Mohou se rozhodnout implementovat návrhy, které jsou teprve načrtnuty, a odložit věci, které jsou už ve specifikaci, protože jsou méně zajímavé nebo prostě jen těžší na implementaci.

Je tedy poměrně běžné, že motor implementuje pouze část standardu.

Dobrá stránka, na které uvidíte aktuální stav podpory vlastností jazyka, je <https://compat-table.github.io/compat-table/es6/> (je to velká tabulka, máme ještě hodně co studovat).

Jako programátoři rádi používáme nejnovější vlastnosti. Čím více dobrých věcí, tím lépe!

Na druhou stranu, jak přimět náš moderní kód, aby fungoval na starších motorech, které ještě nerozumějí vlastnostem přidaným teprve nedávno?

Jsou dva druhy nástrojů, které to zajistí:

1. Transpilátory.
2. Polyfilly.

V této kapitole je naším cílem získat náhled na to, jak fungují a jaké je jejich místo při vývoji webů.

## Transpilátory

[Transpilátor](https://cs.wikipedia.org/wiki/Transpiler) neboli transpiler je zvláštní druh softwaru, který překládá zdrojový kód do jiného zdrojového kódu. Umí parsovat („přečíst a pochopit“) moderní kód a přepsat jej pomocí starších syntaktických konstrukcí tak, aby kód fungoval i na zastaralých motorech.

Například JavaScript před rokem 2020 neměl „operátor koalescence“ `??`. Jestliže tedy návštěvník používá zastaralý prohlížeč, nemusí porozumět kódu `výška = výška ?? 100`.

Transpilátor analyzuje náš kód a přepíše `výška ?? 100` na `(výška !== undefined && výška !== null) ? výška : 100`.

```js
// před spuštěním transpilátoru
výška = výška ?? 100;

// po spuštění transpilátoru
výška = (výška !== undefined && výška !== null) ? výška : 100;
```

Nyní je přepsaný kód vhodný i pro starší JavaScriptové motory.

Vývojář si obvykle spustí transpilátor na svém vlastním počítači a pak zveřejní transpilovaný kód na serveru.

Když hovoříme o názvech, jedním z nejvýznamnějších transpilátorů je [Babel](https://babeljs.io).

Moderní systémy pro vytváření projektů, například [webpack](https://webpack.js.org/), poskytují způsoby, jak spouštět transpilátor automaticky při každé změně kódu, takže je velmi jednoduché jej integrovat do procesu vývoje.

## Polyfilly

Mezi nové vlastnosti jazyka mohou patřit nejenom syntaktické konstrukce a operátory, ale také vestavěné funkce.

Například `Math.trunc(n)` je funkce, která „odřízne“ desetinnou část čísla, např. `Math.trunc(1.23)` vrátí `1`.

V některých (velmi zastaralých) JavaScriptových motorech není funkce `Math.trunc`, takže takový kód selže.

Protože hovoříme o nových funkcích a ne o syntaktických změnách, není tady potřeba nic transpilovat. Potřebujeme jenom deklarovat chybějící funkci.

Skript, který vylepšuje nebo přidává nové funkce, se nazývá „polyfill“. „Vyplní“ (anglicky „fill in“) mezeru a přidá chybějící implementace.

V tomto konkrétním případě je polyfill pro `Math.trunc` skript, který ji implementuje, například takto:

```js
if (!Math.trunc) { // není-li taková funkce
  // implementuje ji
  Math.trunc = function(číslo) {
    // Math.ceil a Math.floor existují i v nejstarších JavaScriptových motorech
    // budou vysvětleny později v tomto tutoriálu
    return číslo < 0 ? Math.ceil(číslo) : Math.floor(číslo);
  };
}
```

JavaScript je vysoce dynamický jazyk. Skripty mohou přidávat nebo modifikovat libovolné funkce, dokonce i vestavěné.

Zajímavá knihovna polyfillů je [core js](https://github.com/zloirock/core-js), která podporuje širokou škálu vlastností a umožňuje vám přidat jen ty, které potřebujete.

## Shrnutí

V této kapitole jsme vás chtěli motivovat k prostudování moderních vlastností jazyka, včetně těch „za hranou“, i když ještě nejsou příliš podporovány v motorech JavaScriptu.

Jen nezapomínejte používat transpilátor (používáte-li moderní syntaxi nebo operátory) a polyfilly (abyste přidali funkce, které mohou chybět). Ty zajistí, že váš kód bude fungovat.

Například později, až budete JavaScript dobře znát, si můžete nastavit systém pro vytváření kódu založený na [webpacku](https://webpack.js.org/) s pluginem [babel-loader](https://github.com/babel/babel-loader).

Dobré zdroje, které ukazují aktuální stav podpory různých vlastností:
- <https://kangax.github.io/compat-table/es6/> - pro čistý JavaScript.
- <https://caniuse.com/> - pro funkce vztahující se k prohlížeči.


P.S. Pokud se týká vlastností jazyka, obvykle je nejaktuálnější Google Chrome. Pokud vám některé demo v tomto tutoriálu selže, zkuste ho. Většina dem v tutoriálu však funguje na kterémkoli moderním prohlížeči.