# Zpětné odkazy ve vzoru: \N a \k<jméno>

Obsah zachytávacích skupin `pattern:(...)` můžeme používat nejen ve výsledku nebo v nahrazovacím řetězci, ale i v samotném vzoru.

## Zpětný odkaz podle čísla: \N

Na skupinu se ve vzoru můžeme odkazovat pomocí `pattern:\N`, kde `N` je číslo skupiny.

Abychom ujasnili, k čemu je to užitečné, uvažujme úlohu.

Potřebujeme najít řetězce v uvozovkách: buď v jednoduchých `subject:'...'`, nebo ve dvojitých `subject:"..."` -- obě varianty by měly vykázat shodu.

Jak je najdeme?

Můžeme vložit oba druhy uvozovek do hranatých závorek: `pattern:['"](.*?)['"]`, ale to by našlo řetězce se smíšenými uvozovkami, např. `match:"...'` a `match:'..."`. To by vedlo k nesprávným shodám, když se jedny uvozovky ocitnou uvnitř druhých, například v řetězci `subject:"První mušketýr je d'Artagnan!"`:

```js run
let řetězec = `Řekl: "První mušketýr je d'Artagnan!"`;

let rv = /['"](.*?)['"]/g;

// Výsledkem není to, co bychom chtěli
alert( řetězec.match(rv) ); // "První mušketýr je d'
```

Jak vidíme, vzor našel otevírací uvozovky `match:"` a pak spotřeboval text až do dalších uvozovek `match:'`, které shodu uzavírají.

Abychom zajistili, že vzor bude hledat přesně stejné uzavírací uvozovky jako otevírací, můžeme jej vložit do zachytávací skupiny a zpětně se na ni odkázat: `pattern:(['"])(.*?)\1`.

Zde je správný kód:

```js run
let řetězec = `Řekl: "První mušketýr je d'Artagnan!"`;

*!*
let rv = /(['"])(.*?)\1/g;
*/!*

alert( řetězec.match(rv) ); // "První mušketýr je d'Artagnan!"
```

Teď to funguje! Motor regulárních výrazů našel první uvozovky `pattern:(['"])` a zapamatoval si jejich obsah. To je první zachytávací skupina.

Dále ve vzoru `pattern:\1` znamená „najít stejný text jako v první skupině“, v našem případě přesně stejné uvozovky.

Podobně by `pattern:\2` znamenalo obsah druhé skupiny, `pattern:\3` obsah třetí skupiny a tak dále.

```smart
Pokud ve skupině použijeme `?:`, nemůžeme se na ni odkazovat. Skupiny, které jsou vyloučeny ze zachytávání `(?:...)`, si motor nepamatuje.
```

```warn header="Nepleťte si to: ve vzoru `pattern:\1`, v nahrazovacím řetězci `pattern:$1`"
V nahrazovacím řetězci používáme znak dolaru: `pattern:$1`, ale ve vzoru zpětné lomítko: `pattern:\1`.
```

## Zpětný odkaz podle jména: `\k<jméno>`

Jestliže regulární výraz obsahuje mnoho závorek, je vhodné je pojmenovat.

K odkazu na pojmenovanou skupinu můžeme použít `pattern:\k<jméno>`.

V následujícím příkladu se skupina s uvozovkami jmenuje `pattern:?<citát>`, takže zpětný odkaz je `pattern:\k<citát>`:

```js run
let řetězec = `Řekl: "První mušketýr je d'Artagnan!"`;

*!*
let rv = /(?<citát>['"])(.*?)\k<citát>/g;
*/!*

alert( řetězec.match(rv) ); // "První mušketýr je d'Artagnan!"
```
