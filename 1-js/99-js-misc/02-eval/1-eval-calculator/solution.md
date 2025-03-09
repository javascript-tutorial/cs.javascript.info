K výpočtu matematického výrazu použijme `eval`:

```js demo run
let výraz = prompt("Zadejte aritmetický výraz:", '2*3+2');

alert( eval(výraz) );
```

Uživatel však může zadat libovolný text nebo kód.

Abychom všechno zabezpečili a omezili se jen na aritmetiku, můžeme zkontrolovat `výraz` pomocí [regulárního výrazu](info:regular-expressions), aby směl obsahovat jen číslice a operátory.
