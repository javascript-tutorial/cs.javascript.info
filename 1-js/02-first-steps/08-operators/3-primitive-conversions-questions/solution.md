
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

1. Sčítání s řetězcem `"" + 1` převede `1` na řetězec: `"" + 1 = "1"` a pak budeme mít `"1" + 0`, použije se stejné pravidlo.
2. Odčítání `-` (stejně jako většina matematických operací) pracuje jen s čísly, takže převede prázdný řetězec `""` na `0`.
3. Sčítání s řetězcem připojí k řetězci číslo `5`.
4. Odčítání vždy převádí operandy na čísla, takže vyrobí z `"  -9  "` číslo `-9` (mezery okolo něj se ignorují).
5. Z `null` se po konverzi na číslo stane `0`.
6. Z `undefined` se po konverzi na číslo stane `NaN`.
7. Když se řetězec převádí na číslo, mezerové znaky se z jeho začátku a konce odříznou. V tomto případě se celý řetězec skládá z mezerových znaků, konkrétně `\t`, `\n` a „obyčejné“ mezery mezi nimi. Stejně jako prázdný řetězec se tedy převede na `0`.
