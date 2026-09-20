# Parsujte výraz

Aritmetický výraz se skládá ze 2 čísel a operátoru mezi nimi, například:

- `1 + 2`
- `1.2 * 3.4`
- `-3 / -6`
- `-2 - 2`

Operátor je jeden z následujících: `"+"`, `"-"`, `"*"` nebo `"/"`.

Na začátku, na konci i mezi jednotlivými částmi mohou být dodatečné mezery.

Vytvořte funkci `parsuj(výraz)`, která vezme výraz a vrátí pole 3 prvků:

1. První číslo.
2. Operátor.
3. Druhé číslo.

Příklad:

```js
let [a, op, b] = parsuj("1.2 * 3.4");

alert(a); // 1.2
alert(op); // *
alert(b); // 3.4
```
