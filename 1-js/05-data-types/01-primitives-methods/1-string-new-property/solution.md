
Zkuste si to spustit:

```js run
let řetězec = "Ahoj";

řetězec.test = 5; // (*)

alert(řetězec.test);
```

Podle toho, zda máte `use strict` nebo ne, výsledek může být:
1. `undefined` (nestriktní režim).
2. Chyba (striktní režim).

Proč? Přehrajme si, co se děje na řádku `(*)`:

1. Když přistoupíme k vlastnosti proměnné `řetězec`, vytvoří se „obal“.
2. Ve striktním režimu zápis do něj znamená chybu.
3. V nestriktním režimu bude operace s touto vlastností provedena, objekt získá vlastnost `test`, ale poté „obal“ zmizí, takže na posledním řádku nemá `řetězec` po této vlastnosti ani stopu.

**Tento příklad jednoznačně dokazuje, že primitivy nejsou objekty.**

Nelze do nich ukládat další data.
