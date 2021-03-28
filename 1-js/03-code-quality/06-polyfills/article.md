
# Polyfilly a transpilery

Jazyk JavaScript se neustále vyvíjí. Pravidelně se pro tento jazyk objevují nové návrhy, ty jsou analyzovány a jsou-li shledány užitečnými, přidají se na seznam na <https://tc39.github.io/ecma262/> a pak pokračují do [specifikace](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Týmy vyvíjející JavaScriptové enginy mají své vlastní mínění o tom, co implementovat jako první. Mohou se rozhodnout implementovat návrhy, které jsou teprve načrtnuty, a odložit věci, které jsou už ve specifikaci, protože jsou méně zajímavé nebo je jen těžší je implementovat.

Je tedy poměrně běžné, že engine implementuje jen část standardu.

Dobrá stránka, na které uvidíte aktuální stav podpory vlastností jazyka, je <https://kangax.github.io/compat-table/es6/> (je to velká tabulka, máme ještě hodně co studovat).

Jako programátoři rádi používáme nejnovější vlastnosti. Čím více dobrých věcí, tím lépe!

Na druhou stranu, jak přimět náš moderní kód, aby fungoval na starších enginech, které ještě nerozumějí vlastnostem přidaným teprve nedávno?

Jsou dva druhy nástrojů, které to zajistí:

1. Transpilery.
2. Polyfilly.

V této kapitole je naším cílem získat náhled na to, jak fungují a jaké je jejich místo při vývoji webů.

## Transpilery

[Transpiler](https://cs.wikipedia.org/wiki/Transpiler) *(v češtině se někdy používá výraz „transpilátor“ -- pozn. překl.)* je zvláštní druh softwaru, který umí parsovat („přečíst a pochopit“) moderní kód a přepsat jej pomocí starších syntaktických konstrukcí tak, aby výsledek byl stejný.

Například JavaScript před rokem 2020 neměl „operátor koalescence“ `??`. Jestliže tedy návštěvník používá zastaralý prohlížeč, nemusí porozumět kódu `výška = výška ?? 100`.

Transpiler analyzuje náš kód a přepíše `výška ?? 100` na `(výška !== undefined && výška !== null) ? výška : 100`.

```js
// před spuštěním transpileru
výška = výška ?? 100;

// po spuštění transpileru
výška = (výška !== undefined && výška !== null) ? výška : 100;
```

Nyní je přepsaný kód vhodný i pro starší JavaScriptové enginy.

Vývojář si obvykle spustí transpiler na svém vlastním počítači a pak umístí transpilovaný kód na server.

Když hovoříme o názvech, jedním z nejvýznamnějších transpilerů je [Babel](https://babeljs.io).

Moderní systémy pro vytváření projektů, například [webpack](http://webpack.github.io/), poskytují způsoby, jak spouštět transpiler automaticky při každé změně kódu, takže je velmi jednoduché jej integrovat do procesu vývoje.

## Polyfilly

Mezi nové vlastnosti jazyka mohou patřit nejenom syntaktické konstrukce a operátory, ale také vestavěné funkce.

Například `Math.trunc(n)` je funkce, která „odřízne“ desetinnou část čísla, např. `Math.trunc(1.23) = 1`.

V některých (velmi zastaralých) JavaScriptových enginech není funkce `Math.trunc`, takže takový kód selže.

Hovoříme-li o nových funkcích a ne o syntaktických změnách, není tady potřeba nic transpilovat. Potřebujeme jenom deklarovat chybějící funkci.

Skript, který vylepšuje nebo přidává nové funkce, se nazývá „polyfill“. „Vyplní“ (anglicky „fill“) mezeru a přidá chybějící implementace.

V tomto konkrétním případě je polyfill pro `Math.trunc` skript, který ji implementuje, například takto:

```js
if (!Math.trunc) { // není-li taková funkce
  // implementuje ji
  Math.trunc = function(číslo) {
    // Math.ceil a Math.floor existují i v nejstarších JavaScriptových enginech
    // budou vysvětleny později v tomto tutoriálu
    return číslo < 0 ? Math.ceil(číslo) : Math.floor(číslo);
  };
}
```

JavaScript je vysoce dynamický jazyk a skripty mohou přidávat nebo modifikovat libovolné funkce, dokonce i vestavěné.

Dvě zajímavé knihovny polyfillů jsou:
- [core js](https://github.com/zloirock/core-js), která toho podporuje mnoho a umožňuje přidávat jen potřebné vlastnosti.
- [polyfill.io](http://polyfill.io) je služba, která poskytuje skript s polyfilly podle vlastností a uživatelova prohlížeče.


## Shrnutí

V této kapitole jsme vás chtěli motivovat k prostudování moderních vlastností jazyka, včetně těch „za hranou“, i když ještě nejsou příliš podporovány v enginech JavaScriptu.

Jen nezapomínejte používat transpiler (používáte-li moderní syntaxi nebo operátory) a polyfilly (abyste přidali funkce, které mohou chybět). Ty zajistí, že váš kód bude fungovat.

Například později, až budete JavaScript dobře znát, si můžete nastavit systém pro vytváření kódu založený na [webpacku](http://webpack.github.io/) s pluginem [babel-loader](https://github.com/babel/babel-loader).

Dobré zdroje, které ukazují aktuální stav podpory různých vlastností:
- <https://kangax.github.io/compat-table/es6/> - pro čistý JavaScript.
- <https://caniuse.com/> - pro funkce vztahující se k prohlížeči.

P.S. Google Chrome je obvykle co do vlastností jazyka nejaktuálnější. Pokud vám některé demo v tomto tutoriálu selže, zkuste ho. Většina dem v tutoriálu však funguje na kterémkoli moderním prohlížeči.

