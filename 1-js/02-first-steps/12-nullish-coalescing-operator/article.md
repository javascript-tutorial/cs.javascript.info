# Operátor koalescence „??“

[recent browser="new"]

Operátor koalescence `??` poskytuje zkrácenou syntaxi pro výběr první „definované“ proměnné ze seznamu.

Výsledkem `a ?? b` je:
- `a`, pokud není `null` nebo `undefined`,
- jinak `b`.

Takže `x = a ?? b` je ekvivalentní s:

```js
x = (a !== null && a !== undefined) ? a : b;
```

Uvedeme delší příklad.

Představme si, že máme uživatele a máme proměnné `jméno`, `příjmení` a `přezdívka`, které obsahují jeho křestní jméno, příjmení a přezdívku. Všechny mohou být nedefinované, jestliže se uživatel rozhodl nezadat žádnou hodnotu.

Rádi bychom zobrazili uživatelovo jméno: jednu z těchto tří proměnných, nebo „Anonym“, pokud nebylo nic zadáno.

Použijeme operátor `??`, abychom vybrali první definované jméno:

```js run
let jméno = null;
let příjmení = null;
let přezdívka = "Supercoder";

// zobrazíme první hodnotu, která není null ani undefined
*!*
alert(jméno ?? příjmení ?? přezdívka ?? "Anonym"); // Supercoder
*/!*
```

## Srovnání s ||

Operátor OR `||` můžeme používat stejným způsobem jako `??`. V zásadě můžeme ve výše uvedeném kódu operátor `??` nahradit operátorem `||` a získat stejný výsledek, jak bylo popsáno v [předchozí kapitole](info:logical-operators#or-finds-the-first-truthy-value).

Důležitý rozdíl je:
- `||` vrací první *pravdivou* hodnotu.
- `??` vrací první *definovanou* hodnotu.

To má velký význam, když chceme zacházet s `null/undefined` jinak než s `0`.

Například uvažujme tento kód:

```js
výška = výška ?? 100;
```

Tím se `výška` nastaví na `100`, jestliže není definována.

Porovnejme si to s `||`:

```js run
let výška = 0;

alert(výška || 100); // 100
alert(výška ?? 100); // 0
```

Zde `výška || 100` zachází s nulovou výškou jako s nenastavenou, stejně jako s `null`, `undefined` nebo jakoukoli jinou nepravdivou hodnotou. Výsledkem je tedy `100`.

Naproti tomu `výška ?? 100` vrátí `100` jen tehdy, když je `výška` přesně `null` nebo `undefined`. Proto `alert` zobrazí hodnotu výšky `0` „takovou, jaká je“.

To, které chování je lepší, záleží na konkrétním případu. Je-li nulová výška platnou hodnotou, dáme přednost `??`.

## Priorita

Priorita operátoru `??` je poměrně nízká: `7` v [tabulce MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).
Proto se `??` vyhodnocuje až po většině ostatních operací, ale před `=` a `?`.

Jestliže potřebujete vybrat hodnotu pomocí `??` ve složitém výrazu, zvažte použití závorek:

```js run
let výška = null;
let šířka = null;

// důležité: použijte závorky
let plocha = (výška ?? 100) * (šířka ?? 50);

alert(plocha); // 5000
```

Kdybychom závorky nepoužili, `*` by se spustilo jako první, neboť má vyšší prioritu než `??`. Bylo by to stejné jako:

```js
// pravděpodobně špatně
let plocha = výška ?? (100 * šířka) ?? 50;
```

K tomu se také vztahuje jedno omezení na jazykové úrovni.

**Z bezpečnostních důvodů je zakázáno používat `??` společně s operátory `&&` a `||`.**

Následující kód vydá syntaktickou chybu:

```js run
let x = 1 && 2 ?? 3; // Syntaktická chyba
```

Toto omezení je bezpochyby diskutabilní, ale do specifikace jazyka bylo přidáno za účelem vyvarovat se programátorských chyb, až lidé začnou z `||` přecházet na `??`.

Dá se obejít pomocí závorek:

```js run
*!*
let x = (1 && 2) ?? 3; // funguje
*/!*

alert(x); // 2
```

## Shrnutí

- Operátor koalescence `??` poskytuje zkratku, jak vybrat „definovanou“ hodnotu ze seznamu.

    Používá se k přiřazení defaultních hodnot do proměnných:

    ```js
    // nastavíme výška=100, je-li výška null nebo undefined
    výška = výška ?? 100;
    ```

- Operátor `??` má velmi nízkou prioritu, ale o něco vyšší než `?` a `=`.
- Je zakázáno používat jej spolu s operátory `||` nebo `&&` bez uvedení závorek.
