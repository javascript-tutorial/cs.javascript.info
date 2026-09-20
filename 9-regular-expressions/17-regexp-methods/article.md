# Metody tříd RegExp a String

V tomto článku probereme do hloubky různé metody, které pracují s regulárními výrazy.

## řetězec.match(rv)

Metoda `řetězec.match(rv)` najde shody regulárního výrazu `rv` v řetězci `řetězec`.

Pracuje ve třech režimech:

1. Jestliže `rv` neobsahuje příznak `pattern:g`, pak metoda vrátí první shodu jako pole se zachytávacími skupinami a vlastnostmi `index` (pozice shody), `input` (vstupní řetězec, je roven `řetězec`):

    ```js run
    let řetězec = "Mám rád JavaScript";

    let výsledek = řetězec.match(/Java(Script)/);

    alert( výsledek[0] );     // JavaScript (celá shoda)
    alert( výsledek[1] );     // Script (první zachytávací skupina)
    alert( výsledek.length ); // 2

    // Další informace:
    alert( výsledek.index );  // 8 (pozice shody)
    alert( výsledek.input );  // Mám rád JavaScript (zdrojový řetězec)
    ```

2. Jestliže `rv` obsahuje příznak `pattern:g`, pak metoda vrátí pole všech shod jako řetězce, bez zachytávacích skupin a dalších detailů.
    ```js run
    let řetězec = "Mám rád JavaScript";

    let výsledek = řetězec.match(/Java(Script)/g);

    alert( výsledek[0] ); // JavaScript
    alert( výsledek.length ); // 1
    ```

3. Jestliže žádné shody nejsou, metoda bez ohledu na přítomnost příznaku `pattern:g` vrátí `null`.

    To je důležitý detail. Pokud nenastanou žádné shody, neobdržíme prázdné pole, ale `null`. Je snadné na to zapomenout a udělat chybu, například:

    ```js run
    let řetězec = "Mám rád JavaScript";

    let výsledek = řetězec.match(/HTML/);

    alert(výsledek); // null
    alert(výsledek.length); // Error: Cannot read property 'length' of null
    ```

    Pokud chceme, aby výsledek byl pole, můžeme to zapsat následovně:

    ```js
    let výsledek = řetězec.match(rv) || [];
    ```

## řetězec.matchAll(rv)

[recent browser="new"]

Metoda `řetězec.matchAll(rv)` je „novější a vylepšená“ varianta metody `řetězec.match`.

Používá se převážně k hledání všech shod se všemi skupinami.

Od metody `match` se liší ve třech věcech:

1. Namísto pole vrací iterovatelný objekt se shodami. Můžeme z něj vytvořit skutečné pole pomocí `Array.from`.
2. Každá shoda se vrátí jako pole se zachytávacími skupinami (ve stejném formátu jako u `řetězec.match` bez příznaku `pattern:g`).
3. Pokud žádné výsledky nejsou, místo `null` vrátí prázdný iterovatelný objekt.

Příklad použití:

```js run
let řetězec = '<h1>Ahoj, světe!</h1>';
let rv = /<(.*?)>/g;

let matchAll = řetězec.matchAll(rv);

alert(matchAll); // [object RegExp String Iterator], ne pole, ale iterovatelný objekt

matchAll = Array.from(matchAll); // teď je to pole

let prvníShoda = matchAll[0];
alert( prvníShoda[0] );  // <h1>
alert( prvníShoda[1] );  // h1
alert( prvníShoda.index );  // 0
alert( prvníShoda.input );  // <h1>Ahoj, světe!</h1>
```

Pokud budeme procházet shody z metody `matchAll` pomocí cyklu `for..of`, nebudeme už `Array.from` potřebovat.

## řetězec.split(rv|podřetězec, limit)

Rozdělí řetězec podle regulárního výrazu (nebo podřetězce) jako oddělovače.

Můžeme použít `split` s řetězci, například:

```js run
alert('12-34-56'.split('-')) // pole ['12', '34', '56']
```

Stejným způsobem však můžeme rozdělovat i podle regulárního výrazu:

```js run
alert('12, 34, 56'.split(/,\s*/)) // pole ['12', '34', '56']
```

## řetězec.search(rv)

Metoda `řetězec.search(rv)` vrátí pozici první shody nebo `-1`, pokud shoda nebyla nalezena:

```js run
let řetězec = "A drop of ink may make a million think";

alert( řetězec.search( /ink/i ) ); // 10 (pozice první shody)
```

**Důležité omezení: `search` najde pouze první shodu.**

Jestliže potřebujeme i pozice dalších shod, měli bychom je najít jiným způsobem, například pomocí `řetězec.matchAll(rv)`.

## řetězec.replace(řetězec|rv, řetězec|funkce)

Toto je obecná metoda pro hledání a nahrazování, jedna z nejužitečnějších. Švýcarský armádní nůž pro hledání a nahrazování.

Můžeme ji použít bez regulárních výrazů k nalezení a nahrazení podřetězce:

```js run
// nahradí pomlčku dvojtečkou
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

Je tady však jedna záludnost.

**Pokud je prvním argumentem `replace` řetězec, metoda nahradí jen první shodu.**

Můžete to vidět v uvedeném příkladu: za `":"` byla nahrazena jedině první `"-"`.

Abychom našli všechny pomlčky, nesmíme použít řetězec `"-"`, ale regulární výraz `pattern:/-/g` s povinným příznakem `pattern:g`:

```js run
// nahradí všechny pomlčky dvojtečkou
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

Druhým argumentem je nahrazovací řetězec. Můžeme v něm používat speciální znaky:

| Symboly | Akce v nahrazovacím řetězci |
|--------|--------|
|`$&`|vloží celou shodu|
|<code>$&#096;</code>|vloží část řetězce před shodou|
|`$'`|vloží část řetězce za shodou|
|`$n`|pokud `n` je 1-2ciferné číslo, vloží obsah n-té zachytávací skupiny, podrobnosti viz [](info:regexp-groups)|
|`$<jméno>`|vloží obsah závorek se jménem `jméno`, podrobnosti viz [](info:regexp-groups)|
|`$$`|vloží znak `$` |

Příklad:

```js run
let řetězec = "Jan Novák";

// přehodí jméno a příjmení
alert(řetězec.replace(/(jan) (novák)/i, '$2, $1')) // Novák, Jan
```

**V situacích, které vyžadují „chytré“ nahrazení, může být druhým argumentem funkce.**

Tato funkce bude volána pro každou shodu a jako nahrazovací řetězec pak bude vložena její návratová hodnota.

Funkce bude volána s argumenty `funkce(shoda, p1, p2, ..., pn, pozice, vstup, skupiny)`:

1. `shoda` -- shoda,
2. `p1, p2, ..., pn` -- obsahy zachytávacích skupin (pokud nějaké jsou),
3. `pozice` -- pozice shody,
4. `vstup` -- zdrojový řetězec,
5. `skupiny` -- objekt s pojmenovanými skupinami.

Pokud regulární výraz neobsahuje závorky, pak jsou argumenty pouze tři: `funkce(řetězec, pozice, vstup)`.

Například převeďme všechny shody na velká písmena:

```js run
let řetězec = "html a css";

let výsledek = řetězec.replace(/html|css/gi, řetězec => řetězec.toUpperCase());

alert(výsledek); // HTML a CSS
```

Každou shodu nahraďme její pozicí v řetězci:

```js run
alert("Ha-Ha-ha".replace(/ha/gi, (shoda, pozice) => pozice)); // 0-3-6
```

V následujícím příkladu jsou dvoje závorky, takže nahrazovací funkce je volána s 5 argumenty: první je celá shoda, pak jsou 2 závorky a po nich (v příkladu nepoužité) pozice shody a zdrojový řetězec:

```js run
let řetězec = "Jan Novak";

let výsledek = řetězec.replace(/(\w+) (\w+)/, (shoda, jméno, příjmení) => `${příjmení}, ${jméno}`);

alert(výsledek); // Novak, Jan
```

Pokud je skupin mnoho, je vhodné přistupovat k nim pomocí zbytkových parametrů:

```js run
let řetězec = "Jan Novak";

let výsledek = řetězec.replace(/(\w+) (\w+)/, (...shoda) => `${shoda[2]}, ${shoda[1]}`);

alert(výsledek); // Novak, Jan
```

Nebo jestliže používáme pojmenované skupiny, objekt `skupiny` s nimi je vždy poslední, takže jej můžeme získat následovně:

```js run
let řetězec = "Jan Novak";

let výsledek = řetězec.replace(/(?<jméno>\w+) (?<příjmení>\w+)/, (...shoda) => {
  let skupiny = shoda.pop();

  return `${skupiny.příjmení}, ${skupiny.jméno}`;
});

alert(výsledek); // Novak, Jan
```

Použití funkce nám dává mocnou nahrazovací sílu, jelikož funkce obdrží všechny informace o shodě, má přístup k vnějším proměnným a může udělat cokoli.

## řetězec.replaceAll(řetězec|rv, řetězec|funkce)

Tato metoda je v zásadě stejná jako `řetězec.replace`, ale má dva hlavní rozdíly:

1. Pokud je první argument řetězec, nahradí *všechny výskyty* tohoto řetězce, zatímco `replace` nahrazuje jedině *první výskyt*.
2. Pokud je první argument regulární výraz bez příznaku `g`, nastane chyba. S příznakem `g` funguje stejně jako `replace`.

Hlavní využití metody `replaceAll` je nahrazení všech výskytů řetězce.

Například:

```js run
// nahradí všechny pomlčky dvojtečkou
alert('12-34-56'.replaceAll("-", ":")) // 12:34:56
```


## rv.exec(řetězec)

Metoda `rv.exec(řetězec)` vrátí shodu s regulárním výrazem `rv` v řetězci `řetězec`. Na rozdíl od předchozích metod se nevolá na řetězci, ale na regulárním výrazu.

Chová se odlišně podle toho, zda regulární výraz obsahuje příznak `pattern:g`.

Pokud neobsahuje `pattern:g`, pak `rv.exec(řetězec)` vrátí první shodu stejně, jako `řetězec.match(rv)`. Toto chování nepřináší nic nového.

Avšak pokud je příznak `pattern:g` uveden, pak:
- Volání `rv.exec(řetězec)` vrátí první shodu a uloží pozici bezprostředně za ní do vlastnosti `rv.lastIndex`.
- Další takové volání začne hledat od pozice `rv.lastIndex`, vrátí další shodu a uloží pozici bezprostředně za ní do `rv.lastIndex`.
- ...A tak dále.
- Pokud nejsou žádné shody, `rv.exec` vrátí `null` a vyresetuje `rv.lastIndex` na `0`.

Opakovaná volání tedy vracejí všechny shody jednu po druhé a ve vlastnosti `rv.lastIndex` si pamatují aktuální pozici hledání.

V minulosti, než byla do JavaScriptu přidána metoda `řetězec.matchAll`, se volání `rv.exec` používala v cyklu k získání všech shod ve skupinách:

```js run
let řetězec = 'Více se o JavaScriptu dozvíte na https://javascript.info';
let rv = /javascript/ig;

let výsledek;

while (výsledek = rv.exec(řetězec)) {
  alert( `Nalezeno ${výsledek[0]} na pozici ${výsledek.index}` );
  // Nalezeno JavaScript na pozici 10, pak
  // Nalezeno javascript na pozici 40
}
```

To funguje dosud, ačkoli u nových prohlížečů je `řetězec.matchAll` zpravidla vhodnější.

**Můžeme použít `rv.exec` pro hledání od zadané pozice, když nastavíme `lastIndex` ručně.**

Například:

```js run
let řetězec = 'Ahoj, svete!';

let rv = /\w+/g; // bez příznaku "g" je vlastnost lastIndex ignorována
rv.lastIndex = 5; // hledá od 5. pozice (od čárky)

alert( rv.exec(řetězec) ); // svete
```

Pokud RV obsahuje příznak `pattern:y`, pak bude hledání provedeno výhradně na pozici `rv.lastIndex` a nikde dál.

Nahraďme v uvedeném příkladu příznak `pattern:g` příznakem `pattern:y`. Nenajde se žádná shoda, protože na pozici `5` není žádné slovo:

```js run
let řetězec = 'Ahoj, svete!';

let rv = /\w+/y;
rv.lastIndex = 5; // hledá výhradně na pozici 5

alert( rv.exec(řetězec) ); // null
```

To se hodí v situacích, kdy potřebujeme z řetězce něco „načíst“ regulárním výrazem z přesně dané pozice, ale ne odnikud dál.

## rv.test(řetězec)

Metoda `rv.test(řetězec)` se pokusí najít shodu a vrátí `true/false` podle toho, zda existuje.

Například:

```js run
let řetězec = "Mám rád JavaScript";

// tyto dva testy udělají totéž
alert( *!*/rád/i*/!*.test(řetězec) ); // true
alert( řetězec.search(*!*/rád/i*/!*) != -1 ); // true
```

Příklad se zápornou odpovědí:

```js run
let řetězec = "Bla-bla-bla";

alert( *!*/rád/i*/!*.test(řetězec) ); // false
alert( řetězec.search(*!*/rád/i*/!*) != -1 ); // false
```

Jestliže RV obsahuje příznak `pattern:g`, pak `rv.test` hledá od vlastnosti `rv.lastIndex` a aktualizuje ji, stejně jako `rv.exec`.

Můžeme ji tedy použít pro hledání od určité pozice:

```js run
let rv = /rád/gi;

let řetězec = "Mám rád JavaScript";

// začneme hledat na pozici 10:
rv.lastIndex = 10;
alert( rv.test(řetězec) ); // false (žádná shoda)
```

````warn header="Stejný globální RV testovaný opakovaně na různých zdrojích může selhat"
Jestliže aplikujeme stejný globální RV na různé vstupy, může vést k nesprávnému výsledku, protože volání `rv.test` posune vlastnost `rv.lastIndex`, takže hledání v jiném řetězci může začít od nenulové pozice.

Například zde voláme `rv.test` dvakrát na stejném textu a druhé volání selže:

```js run
let rv = /javascript/g;  // (rv právě vytvořen: rv.lastIndex=0)

alert( rv.test("javascript") ); // true (teď je rv.lastIndex=10)
alert( rv.test("javascript") ); // false
```

Je to právě proto, že ve druhém testu je `rv.lastIndex` nenulová.

Abychom se tomu vyhnuli, můžeme před každým hledáním nastavit `rv.lastIndex = 0`. Anebo místo volání metod na regulárním výrazu použijeme řetězcové metody `řetězec.match/search/...`, které `lastIndex` nepoužívají.
````
