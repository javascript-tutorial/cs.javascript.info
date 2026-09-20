# Kotvy: začátek řetězce ^ a konec řetězce $

Znaky stříšky `pattern:^` a dolaru `pattern:$` mají v regulárních výrazech speciální význam. Nazývají se „kotvy“.

Znak stříšky `pattern:^` má shodu na začátku textu a znak dolaru `pattern:$` na konci.

Například otestujme, zda text začíná slovem `Marie`:

```js run
let řetězec1 = "Marie měla malé jehňátko";
alert( /^Marie/.test(řetězec1) ); // true
```

Vzor `pattern:^Marie` znamená: „začátek řetězce a pak Marie“.

Obdobně můžeme pomocí `pattern:sníh$` testovat, zda řetězec končí slovem `sníh`:

```js run
let řetězec1 = "jeho vlna byla bílá jako sníh";
alert( /sníh$/.test(řetězec1) ); // true
```

V těchto konkrétních případech bychom místo RV mohli použít řetězcové metody `startsWith/endsWith`. Regulární výrazy bychom měli používat pro složitější případy.

## Testování úplné shody

Obě kotvy dohromady `pattern:^...$` se často používají k otestování, zda vzoru odpovídá celý řetězec. Například pro zjištění, zda uživatelský vstup je ve správném formátu.

Prověřme, zda řetězcem je čas ve formátu `12:34`. Tedy: dvě číslice, pak dvojtečka a pak další dvě číslice.

V jazyce regulárních výrazů to je `pattern:\d\d:\d\d`:

```js run
let správnýVstup = "12:34";
let špatnýVstup = "12:345";

let rv = /^\d\d:\d\d$/;
alert( rv.test(správnýVstup) ); // true
alert( rv.test(špatnýVstup) ); // false
```

Zde musí shoda s `pattern:\d\d:\d\d` začínat hned na začátku textu `pattern:^` a pak musí okamžitě následovat jeho konec `pattern:$`.

Celý řetězec musí být přesně v tomto formátu. Pokud obsahuje nějakou odchylku nebo znak navíc, výsledkem je `false`.

Pokud je uveden příznak `pattern:m`, kotvy se chovají odlišně. Uvidíme to v příštím článku.

```smart header="Kotvy mají „nulovou šířku“"
Kotvy `pattern:^` a `pattern:$` jsou testy. Mají nulovou šířku.

Jinými slovy, neodpovídají žádnému znaku, ale přimějí motor regulárních výrazů prověřit podmínku (začátek/konec textu).
```
