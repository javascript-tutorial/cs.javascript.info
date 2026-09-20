# Najděte barvu ve formátu #abc nebo #abcdef

Napište RV, který najde barvy ve formátu `#abc` nebo `#abcdef`. To znamená: `#` následované 3 nebo 6 hexadecimálními číslicemi.

Příklad použití:
```js
let rv = /váš RV/g;

let řetězec = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( řetězec.match(rv) ); // #3f3 #AA00ef
```

P.S. Počet hexadecimálních číslic by měl být přesně 3 nebo 6. Hodnoty se 4 číslicemi, např. `#abcd`, by se neměly shodovat.
