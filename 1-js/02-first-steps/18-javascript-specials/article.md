# Speciality JavaScriptu

Tato kapitola krátce opakuje prvky JavaScriptu, které jsme se doposud naučili. Zvláštní pozornost věnuje citlivým místům.

## Struktura kódu

Příkazy jsou ukončeny středníkem:

```js run no-beautify
alert('Ahoj'); alert('světe');
```

Konec řádku se zpravidla také považuje za středník, takže fungovat bude i toto:

```js run no-beautify
alert('Ahoj')
alert('světe')
```

To se nazývá „automatické vkládání středníku“. Někdy to však nefunguje, například:

```js run
alert("Po této zprávě bude ohlášena chyba")

[1, 2].forEach(alert)
```

Většina průvodců stylem kódu se shoduje, že bychom měli uvádět středník za každým příkazem.

Středníky nejsou vyžadovány za bloky kódu `{...}` a syntaktickými konstrukcemi, které je obsahují, například cykly:

```js
function f() {
  // za deklarací funkce není středník zapotřebí
}

for(;;) {
  // za cyklem není středník zapotřebí
}
```

...Ale i když někde uvedeme středník „navíc“, není to chyba. Středník bude ignorován.

Více v kapitole: <info:structure>.

## Striktní režim

Abychom plně využili všechny vlastnosti moderního JavaScriptu, měli bychom zahajovat skripty direktivou `"use strict"`.

```js
'use strict';

...
```

Tato direktiva musí být uvedena na začátku skriptu nebo těla funkce.

Bez `"use strict"` bude všechno stále fungovat, ale některé prvky se budou chovat staromódně, „kompatibilně“. Obvykle dáváme přednost modernímu chování.

Některé moderní vlastnosti jazyka (např. třídy, které budeme probírat v budoucnu) implicitně umožňují striktní režim.

Více v kapitole: <info:strict-mode>.

## Proměnné

Lze je deklarovat pomocí:

- `let`
- `const` (konstanta, nemůže být měněna)
- `var` (ve starém stylu, uvidíme později)

Název proměnné může obsahovat:
- Písmena a číslice, ale první znak nesmí být číslice.
- Znaky `$` a `_`, které lze používat běžně jako písmena.
- Povoleny jsou i znaky nelatinských abeced a hieroglyfy, ale obvykle se nepoužívají.

Proměnné jsou dynamicky typovány. Může do nich být uložena jakákoli hodnota:

```js
let x = 5;
x = "Jan";
```

Existuje osm datových typů:

- `number` pro čísla, a to jak celá, tak s pohyblivou řádovou čárkou,
- `bigint` pro celá čísla libovolné délky,
- `string` pro řetězce,
- `boolean` pro logické hodnoty: `true/false`,
- `null` -- typ s jedinou hodnotou `null`, která znamená „prázdná“ nebo „neexistující“,
- `undefined` -- typ s jedinou hodnotou `undefined`, která znamená „nepřiřazená“,
- `object` a `symbol` -- pro komplexní datové struktury a unikátní identifikátory, zatím jsme je neprobírali.

Operátor `typeof` vrací typ hodnoty se dvěma výjimkami:
```js
typeof null == "object" // chyba v jazyce
typeof function(){} == "function" // s funkcemi se zachází odlišně
```

Více v kapitole: <info:variables> a <info:types>.

## Interakce

Jako pracovní prostředí používáme prohlížeč, takže základní funkce uživatelského rozhraní budou:

[`prompt(otázka, [default])`](mdn:api/Window/prompt)
: Položí otázku `otázka` a vrátí buď to, co návštěvník zadal, nebo `null`, jestliže stiskl „Storno“.

[`confirm(otázka)`](mdn:api/Window/confirm)
: Položí otázku `otázka` a nabídne na výběr mezi OK a Storno. Zvolená možnost je vrácena jako `true/false`.

[`alert(zpráva)`](mdn:api/Window/alert)
: Vypíše zprávu `zpráva`.

Všechny tyto funkce jsou *modální*. Pozastaví vykonávání kódu a znemožní uživateli jinou interakci se stránkou, dokud neodpoví.

Příklad:

```js run
let uživatelskéJméno = prompt("Jak se jmenujete?", "Alice");
let dáSiČaj = confirm("Dáte si čaj?");

alert( "Návštěvník: " + uživatelskéJméno ); // Alice
alert( "Dá si čaj: " + dáSiČaj ); // true
```

Více v kapitole: <info:alert-prompt-confirm>.

## Operátory

JavaScript podporuje následující operátory:

Aritmetické
: Obvyklé: `* + - /`, dále `%` pro zbytek po dělení a `**` pro mocninu.

    Binární plus `+` spojuje řetězce. Jestliže je jeden z operandů řetězec, bude na řetězec převeden i druhý operand:

    ```js run
    alert( '1' + 2 ); // '12', řetězec
    alert( 1 + '2' ); // '12', řetězec
    ```

Přiřazení
: Existuje jednoduché přiřazení `a = b` a kombinovaná přiřazení, např. `a *= 2`.

Bitové
: Bitové operátory pracují se 32-bitovými celými čísly na nejnižší, bitové úrovni: až je budete potřebovat, viz [dokumentaci](mdn:/JavaScript/Guide/Expressions_and_Operators#bitwise_operators).

Podmíněný
: Jediný operátor se třemi parametry: `podmínka ? výsledekA : výsledekB`. Je-li `podmínka` pravdivá, vrátí `výsledekA`, jinak vrátí `výsledekB`.

Logické
: Logické AND `&&` a OR `||` provádějí zkrácené vyhodnocování a pak vrátí hodnotu, na které se zastavily (nemusí to nutně být `true`/`false`). Logické NOT `!` převádí operand na typ boolean a vrací opačnou hodnotu.

Koalescence
: Operátor `??` poskytuje způsob, jak vybrat definovanou hodnotu ze seznamu proměnných. Výsledek `a ?? b` je `a`, pokud není `null/undefined`; v takovém případě je výsledek `b`.

Porovnávání
: Test rovnosti `==` pro hodnoty různých typů je převede na číslo (s výjimkou `null` a `undefined`, které se rovnají sobě navzájem a ničemu jinému), takže tyto hodnoty jsou si rovny:

    ```js run
    alert( 0 == false ); // true
    alert( 0 == '' ); // true
    ```

    Také ostatní porovnání převádějí parametry na čísla.

    Operátor striktní rovnosti `===` tuto konverzi neprovádí: různé typy pro něj vždy znamenají, že hodnoty se nerovnají.

    Hodnoty `null` a `undefined` jsou speciální: rovnají se `==` sobě navzájem a nerovnají se ničemu jinému.

    Operátory porovnání větší/menší porovnávají řetězce znak po znaku, ostatní typy se převádějí na čísla.

Ostatní
: Existuje několik dalších operátorů, např. operátor čárky.

Více v kapitolách: <info:operators>, <info:comparison>, <info:logical-operators>, <info:nullish-coalescing-operator>.

## Cykly

- Probrali jsme tři druhy cyklů:

    ```js
    // 1
    while (podmínka) {
      ...
    }

    // 2
    do {
      ...
    } while (podmínka);

    // 3
    for(let i = 0; i < 10; i++) {
      ...
    }
    ```

- Proměnná deklarovaná v cyklu `for(let...)` je viditelná jen uvnitř tohoto cyklu. Můžeme však také `let` vypustit a znovu použít již existující proměnnou.
- Direktivy `break/continue` umožňují ukončit celý cyklus/aktuální iteraci. Pro opuštění vnořených cyklů používejte návěští.

Více v kapitole: <info:while-for>.

Později prostudujeme další druhy cyklů, které pracují s objekty.

## Konstrukce „switch“

Konstrukce „switch“ dokáže nahradit několik testů `if`. K porovnávání používá `===` (striktní rovnost).

Příklad:

```js run
let věk = prompt('Kolik je vám let?', 18);

switch (věk) {
  case 18:
    alert("Tohle nefunguje"); // výsledkem dotazu prompt je řetězec, ne číslo
    break;

  case "18":
    alert("Tohle funguje!");
    break;

  default:
    alert("Jakákoli hodnota, která se nerovná žádné výše uvedené");
}
```

Více v kapitole: <info:switch>.

## Funkce

Uvedli jsme tři způsoby, jakými lze v JavaScriptu vytvořit funkci:

1. Deklarace funkce: funkce v hlavním kódu

    ```js
    function součet(a, b) {
      let výsledek = a + b;

      return výsledek;
    }
    ```

2. Funkční výraz: funkce v kontextu výrazu

    ```js
    let součet = function(a, b) {
      let výsledek = a + b;

      return výsledek;
    };
    ```

3. Šipkové funkce:

    ```js
    // výraz na pravé straně
    let součet = (a, b) => a + b;

    // nebo víceřádková syntaxe s { ... }, zde potřebujeme return:
    let součet = (a, b) => {
      // ...
      return a + b;
    }

    // bez argumentů
    let řekniAhoj = () => alert("Ahoj");

    // s jediným argumentem
    let dvojnásobek = n => n * 2;
    ```

- Funkce mohou obsahovat lokální proměnné: ty jsou deklarovány uvnitř jejich těla nebo v seznamu parametrů. Tyto proměnné jsou viditelné jen uvnitř funkce.
- Parametry mohou mít předem nastavené hodnoty: `function součet(a = 1, b = 2) {...}`.
- Funkce vždy něco vrátí. Neobsahuje-li příkaz `return`, jejím výsledkem je `undefined`.

Více v kapitolách: <info:function-basics>, <info:arrow-functions-basics>.

## Bude toho víc

Toto byl krátký seznam prvků JavaScriptu. Dosud jsme prostudovali pouze základy. Dále v tomto tutoriálu naleznete další speciální a pokročilé prvky JavaScriptu.
