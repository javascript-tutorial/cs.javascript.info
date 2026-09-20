
První myšlenka může být vyjmenovat jazyky a vložit mezi ně `|`.

To však nebude fungovat správně:

```js run
let rv = /Java|JavaScript|PHP|C|C\+\+/g;

let řetězec = "Java, JavaScript, PHP, C, C++";

alert( řetězec.match(rv) ); // Java,Java,PHP,C,C
```

Motor regulárních výrazů hledá alternace jednu po druhé. To znamená, že nejprve ověří, zda máme `match:Java`, pokud ne, hledá `match:JavaScript` a tak dále.

Výsledkem bude, že `match:JavaScript` nemůže být nikdy nalezen prostě proto, že `match:Java` se ověřuje jako první.

Totéž platí pro `match:C` a `match:C++`.

Tento problém má dvě řešení:

1. Změnit pořadí, aby se delší výraz ověřoval jako první: `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. Sloučit varianty, které začínají stejně: `pattern:Java(Script)?|C(\+\+)?|PHP`.

V akci:

```js run
let rv = /Java(Script)?|C(\+\+)?|PHP/g;

let řetězec = "Java, JavaScript, PHP, C, C++";

alert( řetězec.match(rv) ); // Java,JavaScript,PHP,C,C++
```
