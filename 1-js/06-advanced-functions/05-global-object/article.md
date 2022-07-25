
# Globální objekt

Globální objekt poskytuje proměnné a funkce, které jsou dostupné všude. Standardně jsou to ty, které jsou vestavěny do jazyka nebo prostředí.

V prohlížeči se jmenuje `window`, v Node.js je to `global`, v jiných prostředích může mít jiný název.

Nedávno bylo do jazyka přidáno `globalThis` jako standardizovaný název globálního objektu, který by měla podporovat všechna prostředí. Je podporováno ve všech významných prohlížečích.

Zde budeme používat `window`, jelikož předpokládáme, že naše prostředí je prohlížeč. Pokud váš skript má běžet v jiných prostředích, je lepší místo toho používat `globalThis`.

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

Stejný efekt mají deklarace funkcí (příkazy s klíčovým slovem `function` v hlavním kódu, ne funkční výrazy).

Prosíme, nespoléhejte se na to! Toto chování existuje z důvodů kompatibility. Moderní skripty používají [moduly JavaScriptu](info:modules), v nichž se takové věci nedějí.

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
// načteme jej přímo z objektu window (bezpečně!)
alert(window.aktuálníUživatel.jméno); // Jan
```

Tím chceme říci, že používání globálních proměnných se obecně nedoporučuje. Mělo by jich být co nejméně. Návrh kódu, kdy funkce přijímá „vstupní“ proměnné a produkuje určitý „výstup“, je čistší, méně náchylný k chybám a snadnější na otestování, než když funkce používá vnější či globální proměnné.

## Využití pro polyfilly

Globální objekt používáme k testování podpory moderních vlastností jazyka.

Například otestujeme, zda existuje vestavěný objekt `Promise` (neexistuje v opravdu starých prohlížečích):
```js run
if (!window.Promise) {
  alert("Máte opravdu starý prohlížeč!");
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

    Patří sem vestavěné prvky JavaScriptu, např. `Array`, a proměnné specifické pro prostředí, např. `window.innerHeight` -- výška okna v prohlížeči.
- Globální objekt má univerzální název `globalThis`.

    ...Častěji se na něj však odkazují názvy „ze staré školy“ specifické pro prostředí, např. `window` (prohlížeč) nebo `global` (Node.js).
- Do globálního objektu bychom měli ukládat hodnoty jen tehdy, pokud jsou v našem projektu doopravdy globální. A udržovat jejich počet na minimu.
- V prohlížeči, pokud nepoužíváme [moduly](info:modules), se globální funkce a proměnné deklarované pomocí `var` stávají vlastnostmi globálního objektu.
- Abychom učinili kód připravený na budoucnost a lépe srozumitelný, měli bychom přistupovat k vlastnostem globálního objektu přímo, např. `window.x`.
