# Ověřte MAC adresu

[MAC adresa](https://cs.wikipedia.org/wiki/MAC_adresa) síťového rozhraní se skládá ze 6 dvouciferných hexadecimálních čísel oddělených dvojtečkou.

Příklad: `subject:'01:32:54:67:89:AB'`.

Napište regulární výraz, který ověří, zda řetězec je MAC adresa.

Použití:
```js
let rv = /váš RV/;

alert( rv.test('01:32:54:67:89:AB') ); // true

alert( rv.test('0132546789AB') ); // false (bez dvojteček)

alert( rv.test('01:32:54:67:89') ); // false (5 čísel, musí být 6)

alert( rv.test('01:32:54:67:89:ZZ') ) // false (ZZ na konci)
```
