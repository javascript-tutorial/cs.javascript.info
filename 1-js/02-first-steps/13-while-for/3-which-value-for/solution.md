**Odpověď: od `0` do `4` v obou případech.**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Lze to snadno odvodit z algoritmu pro `for`:

1. Nejdříve se jedenkrát vykoná `i = 0` (začátek).
2. Ověří se podmínka `i < 5`.
3. Je-li `true`, vykoná se tělo cyklu `alert(i)` a pak `i++`.

Zvýšení `i++` je odděleno od testu podmínky (2). Je to jen další příkaz.

Hodnota vrácená zvýšením se tady nepoužívá, takže mezi `i++` a `++i` zde není žádný rozdíl.
