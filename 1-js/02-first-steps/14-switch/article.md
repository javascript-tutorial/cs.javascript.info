# Příkaz „switch“

Příkaz `switch` dokáže nahradit několik podmíněných příkazů `if`. 

Poskytuje přehlednější způsob, jak porovnat hodnotu s několika variantami.

## Syntaxe

Příkaz `switch` obsahuje jeden nebo více bloků `case` a nepovinný blok `default`.

Vypadá to takto:

```js no-beautify
switch(x) {
  case 'hodnota1':  // if (x === 'hodnota1')
    ...
    [break]

  case 'hodnota2':  // if (x === 'hodnota2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- Je ověřena striktní rovnost hodnoty `x` s hodnotou z prvního `case` (tj. `hodnota1`), pak s druhou `hodnota2`, a tak dále.
- Pokud je rovnost nalezena, `switch` začne vykonávat kód od odpovídajícího `case` až do nejbližšího `break` (nebo do konce bloku `switch`).
- Není-li nalezena žádná rovnost, je vykonán kód `default` (pokud je uveden).

## Příklad

Příklad příkazu `switch` (vykonaný kód je zvýrazněn):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Příliš málo' );
    break;
*!*
  case 4:
    alert( 'Přesně!' );
    break;
*/!*
  case 5:
    alert( 'Příliš mnoho' );
    break;
  default:
    alert( "Takové hodnoty neznám" );
}
```

Zde `switch` začne porovnávat `a` od první varianty, kterou je `3`. Porovnání neuspěje.

Pak `4`. Tady je nalezena shoda, takže se začne vykonávat kód obsažený v `case 4` a skončí na nejbližším `break`.

**Není-li přítomen příkaz `break`, spustí se kód v dalších `case` bez jakéhokoliv porovnání.**

Příklad bez `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Příliš málo' );
*!*
  case 4:
    alert( 'Přesně!' );
  case 5:
    alert( 'Příliš mnoho' );
  default:
    alert( "Takové hodnoty neznám" );
*/!*
}
```

V uvedeném příkladu vidíme sekvenční vykonání tří `alert`ů:

```js
alert( 'Přesně!' );
alert( 'Příliš mnoho' );
alert( "Takové hodnoty neznám" );
```

````smart header="Argumentem `switch/case` může být jakýkoli výraz"
Jak `switch`, tak `case` dovolují libovolné výrazy.

Příklad:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("toto se vykoná, protože +a je 1, což se rovná b+1");
    break;
*/!*

  default:
    alert("toto se nevykoná");
}
```
Zde `+a` dává `1`, to se v `case` porovná s `b + 1` a spustí se příslušný kód.
````

## Seskupování „case“

Je možné seskupit několik variant větví `case`, které mají mít stejný kód.

Například když chceme, aby se stejný kód spustil pro `case 3` a `case 5`:

```js run no-beautify
let a = 3;

switch (a) {
  case 4:
    alert('Správně!');
    break;

*!*
  case 3: // (*) dvě seskupené větve case
  case 5:
    alert('Špatně!');
    alert("Proč nenavštěvujete kurz matematiky?");
    break;
*/!*

  default:
    alert('Tento výsledek je divný. Opravdu.');
}
```

Nyní `3` a `5` zobrazí stejnou zprávu.

Schopnost „seskupovat“ větve je vedlejší efekt toho, jak `switch/case` funguje bez `break`. Zde provádění `case 3` začne od řádku `(*)` a projde přes `case 5`, protože tam není žádný `break`.

## Na typu záleží

Zdůrazňujeme, že ověření rovnosti je vždy striktní. Aby se hodnoty rovnaly, musejí být stejného typu.

Uvažujme například tento kód:

```js run
let arg = prompt("Zadejte hodnotu");
switch (arg) {
  case '0':
  case '1':
    alert( 'Jedna nebo nula' );
    break;

  case '2':
    alert( 'Dvě' );
    break;

  case 3:
    alert( 'Toto se nikdy nevykoná!' );
    break;
  default:
    alert( 'Neznámá hodnota' );
}
```

1. Pro `0` a `1` se spustí první `alert`.
2. Pro `2` se spustí druhý `alert`.
3. Avšak pro `3` je výsledkem příkazu `prompt` řetězec `"3"`, který není striktně roven `===` číslu `3`. Proto jsme pro `case 3` získali mrtvý kód! Spustí se varianta `default`.
