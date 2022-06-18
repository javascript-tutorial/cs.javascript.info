# Podmíněné větvení: if, „?“

Někdy potřebujeme provést různé akce v závislosti na platnosti různých podmínek. 

K tomu můžeme použít příkaz `if` a podmíněný operátor `?`, který se také nazývá operátor „otazníku“.

## Příkaz „if“

Příkaz `if(...)` vyhodnotí podmínku v závorkách a je-li výsledek `true`, vykoná blok kódu.

Příklad:

```js run
let rok = prompt('Ve kterém roce byla publikována specifikace ECMAScript-2015?', '');

*!*
if (rok == 2015) alert( 'Máte pravdu!' );
*/!*
```

V uvedeném příkladu je podmínkou jednoduchý test rovnosti (`rok == 2015`), ale může být i mnohem složitější.

Jestliže chceme vykonat více než jeden příkaz, musíme náš blok kódu uzavřít do složených závorek:

```js
if (rok == 2015) {
  alert( "Správně!" );
  alert( "Vy jste tak chytrý!" );
}
```

Doporučujeme uzavírat blok kódu do složených závorek `{}` vždy, když použijete příkaz `if`, i když má vykonat pouze jeden příkaz. Zlepšuje to čitelnost.

## Konverze na boolean

Příkaz `if (…)` vyhodnotí výraz v závorkách a převede výsledek na typ boolean.

Zopakujme si pravidla konverze z kapitoly <info:type-conversions>:

- Číslo `0`, prázdný řetězec `""`, `null`, `undefined` a `NaN` se převedou na `false`. Proto se jim také říká „nepravdivé“ hodnoty.
- Ostatní hodnoty se převedou na `true`, proto se jim říká „pravdivé“.

Kód pod touto podmínkou se tedy nikdy nevykoná:

```js
if (0) { // 0 je nepravdivá
  ...
}
```

...a pod touto podmínkou se naopak vykoná vždy:

```js
if (1) { // 1 je pravdivá
  ...
}
```

Můžeme také do `if` předat předem vypočtenou hodnotu, například takto:

```js
let podmínka = (rok == 2015); // rovnost se vyhodnotí jako true nebo false

if (podmínka) {
  ...
}
```

## Klauzule „else“

Příkaz `if` může obsahovat nepovinný blok „else“, který se vykoná, když podmínka je nepravdivá.

Příklad:
```js run
let rok = prompt('Ve kterém roce byla publikována specifikace ECMAScript-2015?', '');

if (rok == 2015) {
  alert( 'Uhádl jste!' );
} else {
  alert( 'Jak se můžete takhle zmýlit?' ); // jakákoli jiná hodnota než 2015
}
```

## Více podmínek za sebou: „else if“

Někdy bychom chtěli otestovat několik variant podmínky. To nám umožní klauzule `else if`.

Příklad:

```js run
let rok = prompt('Ve kterém roce byla publikována specifikace ECMAScript-2015?', '');

if (rok < 2015) {
  alert( 'Příliš brzy...' );
} else if (rok > 2015) {
  alert( 'Příliš pozdě...' );
} else {
  alert( 'Přesně!' );
}
```

Ve výše uvedeném kódu JavaScript napřed ověří podmínku `rok < 2015`. Není-li splněna, pokračuje k další podmínce `rok > 2015`. Není-li splněna ani ta, zobrazí poslední `alert`.

Bloků `else if` může být více. Závěrečné `else` není povinné.

## Podmíněný operátor „?“

Někdy potřebujeme přiřadit do proměnné různou hodnotu v závislosti na splnění určité podmínky.

Příklad:

```js run no-beautify
let přístupPovolen;
let věk = prompt('Kolik je vám let?', '');

*!*
if (věk > 18) {
  přístupPovolen = true;
} else {
  přístupPovolen = false;
}
*/!*

alert(přístupPovolen);
```

Provést to kratším a jednodušším způsobem nám umožní tzv. „podmíněný“ operátor neboli operátor „otazníku“.

Tento operátor je reprezentován otazníkem `?`. Někdy se nazývá „ternární“, protože má tři operandy. Je to v současnosti jediný operátor v JavaScriptu, který jich má tolik.

Jeho syntaxe je:
```js
let výsledek = podmínka ? hodnota1 : hodnota2;
```

Vyhodnotí se `podmínka`: je-li splněna, vrátí se `hodnota1`, jinak se vrátí `hodnota2`.

Příklad:

```js
let přístupPovolen = (věk > 18) ? true : false;
```

Technicky můžeme závorky kolem `věk > 18` vynechat. Operátor otazníku má nízkou prioritu, a proto se vykoná až po porovnání `>`.

Tento příklad provede totéž jako předchozí:

```js
// porovnávací operátor „věk > 18“ se vykoná jako první
// (není třeba jej uzavírat do závorek)
let přístupPovolen = věk > 18 ? true : false;
```

Závorky však zlepšují čitelnost kódu, a proto je doporučujeme používat.

````smart
Ve výše uvedeném příkladu se můžeme operátoru otazníku úplně vyhnout, protože samo porovnání vrací `true/false`:

```js
// totéž
let přístupPovolen = věk > 18;
```
````

## Více „?“ za sebou

Sekvence několika operátorů otazníku `?` může vrátit hodnotu, která závisí na více než jedné podmínce.

Příklad:
```js run
let věk = prompt('Věk?', 18);

let zpráva = (věk < 3) ? 'Nazdar, mimino!' :
  (věk < 18) ? 'Ahoj!' :
  (věk < 100) ? 'Dobrý den!' :
  'To je ale vysoký věk!';

alert( zpráva );
```

Na první pohled může být obtížné pochopit, o co tady jde. Po bližším prozkoumání však vidíme, že to je jen obyčejná posloupnost testů:

1. První otazník ověří, zda `věk < 3`.
2. Pokud ano, vrátí `'Nazdar, mimino!'`. Jinak pokračuje výrazem za dvojtečkou `:` a ověří `věk < 18`.
3. Pokud to platí, vrátí `'Ahoj!'`. Jinak pokračuje výrazem za další dvojtečkou `:` a ověří `věk < 100`.
4. Pokud to platí, vrátí `'Dobrý den!'`. Jinak pokračuje výrazem za poslední dvojtečkou `:` a vrátí `'To je ale vysoký věk!'`.

Při použití `if..else` by to vypadalo následovně:

```js
if (věk < 3) {
  zpráva = 'Nazdar, mimino!';
} else if (věk < 18) {
  zpráva = 'Ahoj!';
} else if (věk < 100) {
  zpráva = 'Dobrý den!';
} else {
  zpráva = 'To je ale vysoký věk!';
}
```

## Netradiční použití „?“

Někdy se otazník `?` používá jako náhrada za `if`:

```js run no-beautify
let firma = prompt('Která firma vytvořila JavaScript?', '');

*!*
(firma == 'Netscape') ?
   alert('Správně!') : alert('Špatně.');
*/!*
```

Podle platnosti podmínky `firma == 'Netscape'` se buď první, nebo druhý výraz za `?` vykoná a zobrazí zprávu.

Zde nepřiřazujeme výsledek žádné proměnné. Místo toho v závislosti na podmínce spouštíme různý kód.

**Nedoporučuje se používat operátor otazníku tímto způsobem.**

Zápis je sice kratší než odpovídající příkaz `if`, což může na některé programátory zapůsobit, ale je také méně čitelný.

Zde je stejný kód, který pro porovnání používá `if`:

```js run no-beautify
let firma = prompt('Která firma vytvořila JavaScript?', '');

*!*
if (firma == 'Netscape') {
  alert('Správně!');
} else {
  alert('Špatně.');
}
*/!*
```

Naše oči projíždějí kód shora dolů. Bloky kódu, které jsou roztaženy přes několik řádků, pochopíme snadněji než dlouhou vodorovnou řadu instrukcí.

Účelem operátoru otazníku `?` je vrátit jednu nebo druhou hodnotu podle platnosti jeho podmínky. Prosíme, používejte jej přesně takto. Když budete potřebovat vykonat různé větve kódu, použijte `if`.
