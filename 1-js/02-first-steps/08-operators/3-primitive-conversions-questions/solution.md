
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

<<<<<<< HEAD
1. Sčítání s řetězcem `"" + 1` převede `1` na řetězec: `"" + 1 = "1"`, pak tedy budeme mít `"1" + 0` a použije se stejné pravidlo.
2. Odčítání `-` (stejně jako většina matematických operací) pracuje jen s čísly, takže převede prázdný řetězec `""` na `0`.
3. Sčítání s řetězcem připojí k řetězci číslo `5`.
4. Odčítání vždy převádí operandy na čísla, takže vyrobí z `"  -9  "` číslo `-9` (mezery okolo něj se ignorují).
5. `null` se převede na číslo `0`.
6. `undefined` se převede na číslo `NaN`.
7. Když se řetězec převádí na číslo, mezerové znaky se z jeho začátku a konce odříznou. V tomto případě se celý řetězec skládá z mezerových znaků, konkrétně `\t`, `\n` a „obyčejné“ mezery mezi nimi. Stejně jako prázdný řetězec se tedy převede na `0`.
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
