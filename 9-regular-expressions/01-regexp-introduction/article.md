# Vzory a příznaky

Regulární výrazy jsou vzory, které poskytují mocný způsob, jak hledat a nahrazovat části textu.

V JavaScriptu jsou k dispozici pomocí objektu [RegExp](mdn:js/RegExp) a jsou také integrovány do metod řetězců.

## Regulární výrazy

Regulární výraz (RV, „regular expression“, „regexp“ nebo jen „reg“) se skládá z *vzoru* a nepovinných *příznaků* (neboli *vlajek*).

K vytvoření objektu regulárního výrazu můžeme použít dvě syntaxe.

„Dlouhá“ syntaxe:

```js
rv = new RegExp("vzor", "příznaky");
```

A „krátká“ syntaxe pomocí lomítek `"/"`:

```js
rv = /vzor/; // bez příznaků
rv = /vzor/gmi; // s příznaky g, m, i (budou vysvětleny dále)
```

Lomítka `pattern:/.../` říkají JavaScriptu, že vytváříme regulární výraz. Hrají stejnou roli jako uvozovky u řetězců.

V obou případech se `rv` stane instancí zabudované třídy `RegExp`.

Hlavní rozdíl mezi těmito dvěma syntaxemi spočívá v tom, že vzor uvnitř lomítek `/.../` neumožňuje vkládání výrazů (jako šablonové literály řetězců v `${...}`). Je zcela statický.

Lomítka používáme tehdy, když známe regulární výraz již při psaní kódu -- a to je nejběžnější situace. Naproti tomu `new RegExp` se častěji používá, když potřebujeme vytvořit regulární výraz „za běhu“ z dynamicky generovaného řetězce. Příklad:

```js
let značka = prompt("Kterou značku chcete najít?", "h2");

let rv = new RegExp(`<${značka}>`); // totéž jako /<h2>/, pokud odpověď na tuto otázku byla "h2"
```

## Příznaky

Regulární výrazy mohou obsahovat příznaky, které ovlivňují hledání.

V JavaScriptu je jich pouze 6:

`pattern:i`
: S tímto příznakem se při hledání nerozlišují malá a velká písmena: není rozdíl mezi `A` a `a` (viz příklad níže).

`pattern:g`
: S tímto příznakem se najdou všechny shody, bez něj bude vrácena jenom první shoda.

`pattern:m`
: Víceřádkový režim (bude vysvětlen v kapitole <info:regexp-multiline-mode>).

`pattern:s`
: Umožňuje „všetečkový“ („dotall“) režim, v němž tečce `pattern:.` může odpovídat znak nového řádku `\n` (bude vysvětlen v kapitole <info:regexp-character-classes>).

`pattern:u`
: Umožňuje plnou podporu Unicode. Tento příznak umožňuje správné zpracování zástupných párů. Více se o tom dozvíte v kapitole <info:regexp-unicode>.

`pattern:y`
: „Lepkavý“ („sticky“) režim: hledání na přesně dané pozici v textu (bude vysvětlen v kapitole <info:regexp-sticky>).

```smart header="Barvy"
Dále budeme používat následující barevné schéma:

- regulární výraz -- `pattern:červený`
- řetězec (v němž hledáme) -- `subject:modrý`
- výsledek -- `match:zelený`
```

## Hledání: řetězec.match

Jak jsme již zmínili, regulární výrazy jsou integrovány s řetězcovými metodami.

Metoda `řetězec.match(rv)` nalezne v řetězci `řetězec` všechny shody s `rv`.

Má tři režimy práce:

1. Pokud regulární výraz má příznak `pattern:g`, vrátí pole se všemi shodami:
    ```js run
    let řetězec = "Prší, prší, jen se leje";

    alert( řetězec.match(/prší/gi) ); // Prší,prší (pole 2 podřetězců, které se shodují)
    ```
    Prosíme všimněte si, že jsou nalezeny `match:Prší` i `match:prší`, protože příznak `pattern:i` způsobí, že regulární výraz nerozlišuje malá a velká písmena.

2. Pokud tento příznak není nastaven, vrátí se jen první shoda ve formě pole, které obsahuje celou shodu na indexu `0` a některé další podrobnosti ve svých vlastnostech:
    ```js run
    let řetězec = "Prší, prší, jen se leje";

    let výsledek = řetězec.match(/prší/i); // bez příznaku g

    alert( výsledek[0] );     // Prší (1. shoda)
    alert( výsledek.length ); // 1

    // Podrobnosti:
    alert( výsledek.index );  // 0 (pozice shody)
    alert( výsledek.input );  // Prší, prší, jen se leje (zdrojový řetězec)
    ```
    Pokud je část regulárního výrazu uzavřena do závorek, může pole obsahovat i jiné indexy než `0`. Probereme to v kapitole <info:regexp-groups>.

3. A konečně, jestliže nebyla nalezena žádná shoda, vrátí se `null` (nezáleží na tom, zda je nastaven příznak `pattern:g`).

    To je velmi důležitý detail. Pokud nejsou nalezeny žádné shody, neobdržíme prázdné pole, ale obdržíme `null`. Když na to zapomeneme, můžeme dělat chyby, například:

    ```js run
    let shody = "JavaScript".match(/HTML/); // = null

    if (!shody.length) { // Error: Cannot read property 'length' of null
      alert("Chyba na výše uvedeném řádku");
    }
    ```

    Kdybychom chtěli, aby výsledkem bylo vždy pole, můžeme to zapsat následovně:

    ```js run
    let shody = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!shody.length) {
      alert("Žádná shoda"); // teď to funguje
    }
    ```

## Nahrazování: řetězec.replace

Metoda `řetězec.replace(rv, náhrada)` nahradí v řetězci `řetězec` shody nalezené regulárním výrazem `rv` za řetězec `náhrada` (pokud je uveden příznak `pattern:g`, nahradí všechny shody, jinak pouze první).

Příklad:

```js run
// bez příznaku g
alert( "Prší, prší".replace(/prší/i, "sněží") ); // sněží, prší

// s příznakem g
alert( "Prší, prší".replace(/prší/ig, "sněží") ); // sněží, sněží
```

Druhým argumentem je řetězec `náhrada`. V něm můžeme použít kombinace speciálních znaků, abychom vložili části shody:

| Symboly | Akce v nahrazovacím řetězci |
|--------|--------|
|`$&`|vloží celou shodu|
|<code>$&#096;</code>|vloží část řetězce před shodou|
|`$'`|vloží část řetězce za shodou|
|`$n`|pokud `n` je 1-2ciferné číslo, vloží obsah n-tých závorek, podrobněji o tom v kapitole <info:regexp-groups>|
|`$<jméno>`|vloží obsah závorek se jménem `jméno`, podrobněji o tom v kapitole <info:regexp-groups>|
|`$$`|vloží znak `$` |

Příklad s `pattern:$&`:

```js run
alert( "Mám rád HTML".replace(/HTML/, "$& a JavaScript") ); // Mám rád HTML a JavaScript
```

## Testování: rv.test

Metoda `rv.test(řetězec)` hledá alespoň jednu shodu. Pokud ji najde, vrátí `true`, jinak vrátí `false`.

```js run
let řetězec = "Mám rád JavaScript";
let rv = /RÁD/i;

alert( rv.test(řetězec) ); // true
```

Později v této kapitole prostudujeme další regulární výrazy, projdeme další příklady a setkáme se i s dalšími metodami.

Všechny informace o metodách uvádíme v článku <info:regexp-methods>.

## Shrnutí

- Regulární výraz se skládá ze vzoru a nepovinných příznaků: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Bez příznaků a speciálních symbolů (které prostudujeme později) je hledání podle RV stejné jako hledání podřetězce.
- Metoda `řetězec.match(rv)` hledá shody: pokud je nastaven příznak `pattern:g`, najde všechny, jinak najde pouze první.
- Metoda `řetězec.replace(rv, náhrada)` nahradí shody nalezené podle `rv` řetězcem `náhrada`: pokud je nastaven příznak `pattern:g`, nahradí všechny, jinak nahradí pouze první.
- Metoda `rv.test(řetězec)` vrátí `true`, pokud je nalezena aspoň jedna shoda, jinak vrátí `false`.
