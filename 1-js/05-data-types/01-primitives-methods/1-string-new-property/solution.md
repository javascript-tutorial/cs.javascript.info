
Zkuste si to spustit:

```js run
let str = "Ahoj";

str.test = 5; // (*)

alert(str.test);
```

Podle toho, zda máte `use strict` nebo ne, výsledek může být:
1. `undefined` (nestriktní režim).
2. Chyba (striktní režim).

Proč? Přehrajme si, co se děje na řádku `(*)`:

1. Když přistoupíme k vlastnosti `str`, vytvoří se „wrapper“.
2. Ve striktním režimu zápis do něj znamená chybu.
3. Jinak bude operace s touto vlastností provedena, objekt získá vlastnost `test`, ale poté „wrapper“ zmizí, takže na posledním řádku nemá `str` po této vlastnosti ani stopu.

**Tento příklad jednoznačně dokazuje, že primitivy nejsou objekty.**

Nelze do nich ukládat další data.
