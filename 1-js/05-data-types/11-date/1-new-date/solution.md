Konstruktor `new Date` používá místní časové pásmo, takže jediná důležitá věc, kterou si musíme pamatovat, je, že měsíce se počítají od nuly.

Únor má tedy číslo 1.

Zde je příklad s čísly jako složkami data:

```js run
//new Date(rok, měsíc, den, hodiny, minuty, sekundy, milisekundy)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
Můžeme vytvořit datum i z řetězce, např. takto:

```js run
//new Date(řetězecSDatem)
let d2 = new Date("2012-02-20T03:12");
alert( d2 );
```
