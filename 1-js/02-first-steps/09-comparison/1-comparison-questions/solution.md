

```js no-beautify
5 > 4 → true
"ananas" > "jablko" → false
"2" > "12" → true
undefined == null → true
undefined === null → false
null == "\n0\n" → false
null === +"\n0\n" → false
```

Některé z důvodů:

1. Samozřejmě true.
2. Slovníkové porovnání, proto false. `"j"` je menší než `"r"`.
3. Opět slovníkové porovnání, první znak `"2"` je větší než první znak `"1"`.
4. Hodnoty `null` a `undefined` se rovnají jedině sobě navzájem.
5. Striktní rovnost je striktní. Různé typy na obou stranách vedou k výsledku false.
6. Obdobně jako ve `(4)` se `null` rovná jedině `undefined`.
7. Striktní rovnost s různými typy vrací false.
