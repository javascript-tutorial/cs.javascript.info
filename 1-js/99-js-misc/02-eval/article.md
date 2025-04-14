# Eval: spuštění řetězce kódu

Zabudovaná funkce `eval` nám umožňuje spustit řetězec kódu.

Syntaxe je:

```js
let výsledek = eval(kód);
```

Například:

```js run
let kód = 'alert("Ahoj")';
eval(kód); // Ahoj
```

Řetězec kódu může být dlouhý, může obsahovat konce řádku, deklarace funkcí, proměnné a podobně.

Výsledkem funkce `eval` je výsledek posledního příkazu.

Příklad:
```js run
let hodnota = eval('1+1');
alert(hodnota); // 2
```

```js run
let hodnota = eval('let i = 0; ++i');
alert(hodnota); // 1
```

Vyhodnocovaný kód je spouštěn v aktuálním lexikálním prostředí, takže vidí vnější proměnné:

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

Může vnější proměnné také měnit:

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, hodnota změněna
```

Ve striktním režimu má `eval` své vlastní lexikální prostředí, takže funkce a proměnné deklarované uvnitř `eval` nejsou viditelné zvenčí:

```js untrusted refresh run
// pamatujte: 'use strict' je ve spustitelných příkladech standardně zapnuté

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (taková proměnná neexistuje)
// funkce f rovněž není viditelná
```

Bez `use strict` nemá `eval` své vlastní lexikální prostředí, takže bychom `x` a `f` venku viděli.

## Použití „eval“

V moderním programování se `eval` používá velmi vzácně. Často se říká, že „eval je zlo“ (anglicky „eval is evil“).

Důvod je jednoduchý: před dávnými, dávnými časy byl JavaScript mnohem slabší jazyk a mnoho věcí bylo možné provést jedině pomocí `eval`. Ale tahle doba pominula už před deseti lety.

V současnosti není téměř žádný důvod, proč `eval` používat. Pokud ho někdo používá, je velká šance, že ho lze nahradit nějakým moderním jazykovým konstruktem nebo [JavaScriptovým modulem](info:modules).

Prosíme všimněte si, že jeho schopnost přistupovat k vnějším proměnným má vedlejší efekty.

Minifikátory kódu (nástroje používané před odesláním JS do produkce, aby jej zkomprimovaly) přejmenovávají lokální proměnné na kratší (např. `a`, `b` atd.), aby kód zkrátily. To je obvykle bezpečné, ale při použití `eval` ne, protože vyhodnocovaný řetězec kódu může k lokálním proměnným přistupovat. Minifikátory tedy u proměnných, které mohou být viditelné z `eval`, toto přejmenování neprovádějí. To negativně ovlivňuje poměr komprese kódu.

Rovněž používání vnějších lokálních proměnných uvnitř `eval` se považuje za špatnou programátorskou praktiku, protože ztěžuje údržbu kódu.

Existují dva způsoby, jak být před takovými problémy zcela v bezpečí.

**Jestliže vyhodnocovaný kód nepoužívá vnější proměnné, prosíme volejte `eval` jako `window.eval(...)`:**

Tímto způsobem bude kód spuštěn v globálním rozsahu platnosti:

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (globální proměnná)
}
```

**Jestliže vyhodnocovaný kód potřebuje lokální proměnné, změňte `eval` na `new Function` a předejte je jako argumenty:**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

Konstrukt `new Function` je vysvětlen v kapitole <info:new-function>. Vytvoří funkci z řetězce, rovněž v globálním rozsahu platnosti. Funkce tedy neuvidí lokální proměnné. Je však mnohem čistší předat je explicitně jako argumenty, tak jako v uvedeném příkladu.

## Shrnutí

Volání `eval(kód)` spustí řetězec kódu a vrátí výsledek posledního příkazu.
- V moderním JavaScriptu se používá málokdy, jelikož obvykle není zapotřebí.
- Může přistupovat k vnějším lokálním proměnným. To se považuje za špatnou praktiku.
- K vyhodnocení kódu v globálním rozsahu platnosti místo něj použijte `window.eval(kód)`.
- Nebo, jestliže váš kód potřebuje data z vnějšího rozsahu, použijte `new Function` a předejte je jako argumenty.