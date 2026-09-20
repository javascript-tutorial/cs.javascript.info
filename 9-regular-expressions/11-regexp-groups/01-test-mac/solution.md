Dvouciferné hexadecimální číslo je `pattern:[0-9a-f]{2}` (předpokládáme, že je nastaven příznak `pattern:i`).

Potřebujeme toto číslo `NN` a pak `:NN` opakované pětkrát (další čísla).

Regulární výraz je: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Nyní dosáhneme toho, aby shoda zachytávala celý text: začala na začátku a skončila na konci. To učiníme tak, že vzor obklopíme mezi `pattern:^...$`.

Nakonec:

```js run
let rv = /^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/i;

alert( rv.test('01:32:54:67:89:AB') ); // true

alert( rv.test('0132546789AB') ); // false (bez dvojteček)

alert( rv.test('01:32:54:67:89') ); // false (5 čísel, musí být 6)

alert( rv.test('01:32:54:67:89:ZZ') ) // false (ZZ na konci)
```
