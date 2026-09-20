
Regulární výraz pro celé číslo je `pattern:\d+`.

Záporná čísla můžeme vyloučit tak, že před něj umístíme negativní zpětné nahlédnutí: `pattern:(?<!-)\d+`.

Když to však nyní vyzkoušíme, můžeme si všimnout jednoho výsledku „navíc“:

```js run
let rv = /(?<!-)\d+/g;

let řetězec = "0 12 -5 123 -18";

console.log( řetězec.match(rv) ); // 0, 12, 123, *!*8*/!*
```

Jak vidíte, našel i `match:8` z `subject:-18`. Abychom to vyloučili, musíme zajistit, že RV nezačne hledat shodu uprostřed jiného (neodpovídajícího) čísla.

Můžeme to udělat uvedením dalšího negativního zpětného nahlédnutí: `pattern:(?<!-)(?<!\d)\d+`. Nyní `pattern:(?<!\d)` zajistí, že shoda nebude začínat po jiné číslici, což je přesně to, co potřebujeme.

Můžeme je také spojit do jediného zpětného nahlédnutí následovně:

```js run
let rv = /(?<![-\d])\d+/g;

let řetězec = "0 12 -5 123 -18";

alert( řetězec.match(rv) ); // 0, 12, 123
```
