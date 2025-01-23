importance: 3

---

# Míchání pole

Napište funkci `zamíchej(pole)`, která zamíchá (náhodně seřadí) prvky pole.

Vícenásobná volání `zamíchej` mohou vést k různým pořadím prvků. Například:

```js
let pole = [1, 2, 3];

zamíchej(pole);
// pole = [3, 2, 1]

zamíchej(pole);
// pole = [2, 1, 3]

zamíchej(pole);
// pole = [3, 1, 2]
// ...
```

Všechna pořadí prvků by měla mít stejnou pravděpodobnost. Například `[1,2,3]` lze seřadit jako `[1,2,3]` nebo `[1,3,2]` nebo `[3,1,2]` atd., přičemž všechny možnosti mají mít stejnou pravděpodobnost.
