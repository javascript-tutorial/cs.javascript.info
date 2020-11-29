
```js run demo
let číslo;

do {
  číslo = prompt("Zadejte číslo větší než 100", 0);
} while (číslo <= 100 && číslo);
```

Cyklus `do..while` se opakuje, dokud jsou obě podmínky splněny:

1. Podmínka `číslo <= 100` -- tedy že zadaná hodnota stále není větší než `100`.
2. Podmínka `&& číslo` je nepravdivá, když `číslo` je `null` nebo prázdný řetězec. Pak se cyklus `while` zastaví.

P.S. Jestliže `číslo` je `null`, pak `číslo <= 100` vydá `true`, takže bez druhé podmínky by se cyklus nezastavil, kdyby uživatel stiskl Storno. Obě podmínky jsou zapotřebí.
