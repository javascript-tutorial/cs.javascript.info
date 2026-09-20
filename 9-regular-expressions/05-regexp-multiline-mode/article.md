# Víceřádkový režim kotev ^ $, příznak „m“

Víceřádkový režim se nastavuje příznakem `pattern:m`.

Má vliv pouze na chování `pattern:^` a `pattern:$`.

Ve víceřádkovém režimu jim odpovídá nejen začátek a konec řetězce, ale také začátek a konec řádku.

## Hledání na začátku řádku ^

V následujícím příkladu má text více řádků. Vzor `pattern:/^\d/gm` vezme číslici ze začátku každého řádku:

```js run
let řetězec = `1. místo: Pankrác
2. místo: Servác
3. místo: Bonifác`;

*!*
console.log( řetězec.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

Bez příznaku `pattern:m` bude nalezena jen první číslice:

```js run
let řetězec = `1. místo: Pankrác
2. místo: Servác
3. místo: Bonifác`;

*!*
console.log( řetězec.match(/^\d/g) ); // 1
*/!*
```

Je to tím, že stříšce `pattern:^` odpovídá standardně jen začátek textu, ale ve víceřádkovém režimu začátek každého řádku.

```smart
„Začátek řádku“ formálně znamená „ihned za zlomem řádku“: testu `pattern:^` ve víceřádkovém režimu odpovídají všechny pozice, kterým předchází znak nového řádku `\n`.

A začátek textu.
```

## Hledání na konci řádku $

Znak dolaru `pattern:$` se chová obdobně.

Regulární výraz `pattern:\d$` nalezne poslední číslici na každém řádku:

```js run
let řetězec = `Pankrác: 1
Servác: 2
Bonifác: 3`;

console.log( řetězec.match(/\d$/gm) ); // 1,2,3
```

Bez příznaku `pattern:m` by dolar `pattern:$` nalezl jen konec celého textu, takže by se našla jen úplně poslední číslice.

```smart
„Konec řádku“ formálně znamená „bezprostředně před zlomem řádku“: testu `pattern:$` ve víceřádkovém režimu odpovídají všechny pozice následované znakem nového řádku `\n`.

A konec textu.
```

## Hledání \n místo ^ $

Abychom našli nový řádek, můžeme použít nejenom kotvy `pattern:^` a `pattern:$`, ale i znak nového řádku `\n`.

Jaký je v tom rozdíl? Podívejme se na příklad.

Zde budeme hledat `pattern:\d\n` namísto `pattern:\d$`:

```js run
let řetězec = `Pankrác: 1
Servác: 2
Bonifác: 3`;

console.log( řetězec.match(/\d\n/g) ); // 1\n,2\n
```

Jak vidíme, našly se jen 2 shody namísto tří.

Je to tím, že za `subject:3` nenásleduje nový řádek (ale je tam konec textu, takže odpovídá `pattern:$`).

Další rozdíl: každá shoda nyní obsahuje znak nového řádku `match:\n`. Na rozdíl od kotev `pattern:^` `pattern:$`, které testují jen podmínku (začátek/konec řádku), je `\n` znak, takže se stane součástí výsledku.

Znak `\n` tedy ve vzoru používáme, když potřebujeme ve výsledku znaky nového řádku, zatímco kotvy používáme, když chceme najít něco na začátku nebo konci řádku.
