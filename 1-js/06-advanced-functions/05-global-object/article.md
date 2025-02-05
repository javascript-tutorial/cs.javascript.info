
# Globální objekt

Globální objekt poskytuje proměnné a funkce, které jsou dostupné všude. Standardně jsou to ty, které jsou vestavěny do jazyka nebo prostředí.

V prohlížeči se jmenuje `window`, v Node.js je to `global`, v jiných prostředích může mít jiný název.

Nedávno byl do jazyka přidán standardizovaný název globálního objektu `globalThis`, který by měla podporovat všechna prostředí. Všechny významné prohlížeče jej podporují.

Zde budeme používat `window`, jelikož předpokládáme, že naším prostředím je prohlížeč. Pokud váš skript má běžet v jiných prostředích, je lepší místo něj používat `globalThis`.

Ke všem vlastnostem globálního objektu lze přistupovat přímo:

```js run
alert("Ahoj");
// je totéž jako
window.alert("Ahoj");
```

V prohlížeči se globální funkce a proměnné deklarované pomocí `var` (ne `let/const`!) stávají vlastnostmi globálního objektu:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (stala se vlastností globálního objektu)
```

Stejný efekt mají deklarace funkcí (příkazy s klíčovým slovem `function` v běhu hlavního kódu, ne funkční výrazy).

Prosíme, nespoléhejte se na to! Toto chování existuje z důvodů kompatibility. Moderní skripty používají [JavaScriptové moduly](info:modules), v nichž se takové věci nedějí.

Kdybychom místo toho použili `let`, toto by se nestalo:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (nestala se vlastností globálního objektu)
```

Je-li hodnota tak důležitá, že byste ji chtěli učinit globálně dostupnou, uveďte ji rovnou jako vlastnost:

```js run
*!*
// učiní informaci o aktuálním uživateli globální, aby k ní mohly přistupovat všechny skripty
window.aktuálníUživatel = {
  jméno: "Jan"
};
*/!*

// někde jinde v kódu
alert(aktuálníUživatel.jméno);  // Jan

// nebo, máme-li lokální proměnnou s názvem „aktuálníUživatel“,
// načteme ji přímo z objektu window (bezpečně!)
alert(window.aktuálníUživatel.jméno); // Jan
```

Tím chceme říci, že používání globálních proměnných se obecně nedoporučuje. Mělo by jich být co nejméně. Návrh kódu, v němž funkce přijímá „vstupní“ proměnné a produkuje určitý „výstup“, je čistší, méně náchylný k chybám a snadnější na otestování, než když funkce používá vnější či globální proměnné.

## Využití pro polyfilly

Globální objekt používáme k testování, zda jsou podporovány moderní vlastnosti jazyka.

Například otestujeme, zda existuje vestavěný objekt `Promise` (neexistuje v zastaralých prohlížečích):
```js run
if (!window.Promise) {
  alert("Máte zastaralý prohlížeč!");
}
```

Pokud neexistuje (řekněme, že jsme ve starém prohlížeči), můžeme vytvořit „polyfilly“: přidáme funkce, které toto prostředí nepodporuje, ale v moderním standardu existují.

```js run
if (!window.Promise) {
  window.Promise = ... // vlastní implementace moderní vlastnosti jazyka
}
```

## Shrnutí

- Globální objekt obsahuje proměnné, které by měly být dostupné odkudkoli.

    Patří sem vestavěné prvky JavaScriptu, např. `Array`, a proměnné specifické pro určitá prostředí, např. `window.innerHeight` -- výška okna v prohlížeči.
- Globální objekt má univerzální název `globalThis`.

    ...Častěji se na něj však odkazují názvy „ze staré školy“ specifické pro jednotlivá prostředí, např. `window` (prohlížeč) nebo `global` (Node.js).
- Do globálního objektu bychom měli ukládat hodnoty jen tehdy, pokud jsou v našem projektu doopravdy globální, a udržovat jejich počet na minimu.
- V prohlížeči, pokud nepoužíváme [moduly](info:modules), se globální funkce a proměnné deklarované pomocí `var` stávají vlastnostmi globálního objektu.
- Aby náš kód zůstal do budoucna odolný a lépe srozumitelný, měli bychom přistupovat k vlastnostem globálního objektu přímo, např. `window.x`.
