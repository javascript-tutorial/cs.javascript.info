# Řetězce

Textová data se v JavaScriptu ukládají jako řetězce. Neexistuje zvláštní typ pro jediný znak.

Interní formát řetězce je vždy [UTF-16](https://cs.wikipedia.org/wiki/UTF-16), nezávisle na kódování stránky.

## Uvozovky

Připomeňme si druhy uvozovek.

Řetězce mohou být uzavřeny do jednoduchých, dvojitých nebo zpětných uvozovek:

```js
let jednoduché = 'jednoduché uvozovky';
let dvojité = "dvojité uvozovky";

let zpětné = `zpětné uvozovky`;
```

Jednoduché a dvojité uvozovky fungují v zásadě stejně. Zpětné uvozovky nám však umožňují vložit do řetězce jakýkoli výraz, když jej uzavřeme do `${…}`:

```js run
function součet(a, b) {
  return a + b;
}

alert(`1 + 2 = ${součet(1, 2)}.`); // 1 + 2 = 3.
```

Další výhodou používání zpětných uvozovek je, že umožňují rozdělit řetězec na více řádků:

```js run
let seznamHostů = `Hosté:
 * Jan
 * Petr
 * Marie
`;

alert(seznamHostů); // seznam hostů, více řádků
```

Vypadá to přirozeně, že? Ale jednoduché nebo dvojité uvozovky takto nefungují.

Jestliže je použijeme a pokusíme se rozdělit text na více řádků, nastane chyba:

```js run
let seznamHostů = "Hosté: // Error: Unexpected token ILLEGAL
  * Jan";
```

Jednoduché a dvojité uvozovky pocházejí ze starých časů vzniku jazyka, kdy nebyla brána v úvahu potřeba víceřádkových řetězců. Zpětné uvozovky se objevily mnohem později, a tak jsou univerzálnější.

Zpětné uvozovky nám také umožňují specifikovat „šablonovou funkci“ před levými uvozovkami. Syntaxe je: <code>funkce&#96;řetězec&#96;</code>. Funkce `funkce` je volána automaticky, obdrží řetězec a vnořené výrazy a může je zpracovat. Tato vlastnost se nazývá „značkované šablony“ (anglicky „tagged templates“). Je k vidění jen zřídka, ale můžete si o ní přečíst v MDN: [Šablonové literály](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).

## Speciální znaky

Je ovšem možné vytvořit víceřádkové řetězce uzavřené do jednoduchých nebo dvojitých uvozovek pomocí tzv. „znaku nového řádku“, který se zapisuje `\n` a stanovuje konec řádku:

```js run
let seznamHostů = "Hosté:\n * Jan\n * Petr\n * Marie";

alert(seznamHostů); // víceřádkový seznam hostů, stejný jako výše
```

Jednodušší příklad: tyto dva řádky mají stejný význam, jen jsou různě zapsané:

```js run
let řetězec1 = "Ahoj\nsvěte"; // dva řádky pomocí „symbolu konce řádku“

// dva řádky pomocí obyčejného nového řádku a zpětných uvozovek
let řetězec2 = `Ahoj
světe`;

alert(řetězec1 == řetězec2); // true
```

Existují i jiné, méně běžné speciální znaky:

| Znak | Popis |
|------|-------|
|`\n`|Nový řádek|
|`\r`|V textových souborech ve Windows reprezentuje konec řádku kombinace dvou znaků `\r\n`, zatímco v jiných OS je to pouze `\n`. Je to z historických důvodů, většina softwaru pod Windows rozumí i `\n`.|
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Uvozovky|
|`\\`|Zpětné lomítko|
|`\t`|Tabulátor|
|`\b`, `\f`, `\v`| Backspace, Form Feed, vertikální tabulátor -- uvedeny jen pro úplnost, pocházejí z dřívější doby, v současnosti se nepoužívají (můžete na ně rovnou zapomenout). |

Jak vidíte, všechny speciální znaky začínají zpětným lomítkem `\`, které se také nazývá „únikový znak“.

Protože je tak speciální, musíme je zdvojit, jestliže chceme v řetězci zobrazit skutečné zpětné lomítko `\`:

```js run
alert( `Zpětné lomítko: \\` ); // Zpětné lomítko: \
```

 K vložení uvozovek do řetězce, který je ohraničen stejným druhem uvozovek, se používají tzv. „únikované“ uvozovky `\'`, `\"`, <code>\\`</code>.

Například:

```js run
alert( 'To*!*\'*/!*s přehnal!' ); // *!*To's*/!* přehnal!
```

Jak vidíme, museli jsme před vnitřními jednoduchými uvozovkami uvést zpětné lomítko `\'`, jinak by tyto uvozovky znamenaly konec řetězce.

Samozřejmě musíme předznamenat únikovým znakem jen stejný druh uvozovek jako ty, které obklopují řetězec. Jako elegantnější řešení bychom tedy mohli použít dvojité nebo zpětné uvozovky:

```js run
alert( `To's přehnal!` ); // To's přehnal!
```

Kromě těchto speciálních znaků existuje i speciální zápis pro kódy Unicode `\u…`. Používá se jen málokdy a je vysvětlen v pokročilejší kapitole o [Unicode](info:unicode).

## Délka řetězce

Délku řetězce obsahuje vlastnost `length`:

```js run
alert( `Já\n`.length ); // 3
```

Všimněte si, že `\n` je jediný „speciální“ znak, takže délka bude opravdu `3`.

```warn header="`length` je vlastnost"
Lidé zvyklí na některé jiné jazyky někdy nesprávně píší volání funkce `řetězec.length()` místo `řetězec.length`. To nefunguje.

Prosíme všimněte si, že `řetězec.length` je číselná vlastnost, ne funkce. Není důvod za ní uvádět závorky. Nepíše se `.length()`, ale `.length`.
```

## Přístup ke znakům

Abyste získali znak na pozici `poz`, použijte hranaté závorky `[poz]` nebo zavolejte metodu [řetězec.at(poz)](mdn:js/String/at). První znak se nachází na pozici nula:

```js run
let řetězec = `Ahoj`;

// první znak
alert( řetězec[0] ); // A
alert( řetězec.at(0) ); // A

// poslední znak
alert( řetězec[řetězec.length - 1] ); // j
alert( řetězec.at(-1) );
```

Jak vidíte, metoda `.at(poz)` má výhodu v tom, že umožňuje zadat zápornou pozici. Je-li `poz` záporná, počítá se od konce řetězce.

Takže `.at(-1)` znamená poslední znak, `.at(-2)` je znak před ním atd.

Hranaté závorky se záporným indexem vrátí vždy `undefined`, například:

```js run
let řetězec = `Ahoj`;

alert( řetězec[-2] ); // undefined
alert( řetězec.at(-2) ); // o
```

Můžeme také procházet jednotlivé znaky pomocí `for..of`:

```js run
for (let znak of "Ahoj") {
  alert(znak); // A,h,o,j (znak bude "A", pak "h", pak "o" atd.)
}
```

## Řetězce jsou neměnné

Řetězce v JavaScriptu nelze měnit. Není možné v nich změnit některý znak.

Zkusme to, abychom viděli, že to nefunguje:

```js run
let řetězec = 'Ahoj';

řetězec[0] = 'a'; // chyba
alert( řetězec[0] ); // nefunguje to
```

Obvyklý způsob, jak to obejít, je vytvořit úplně nový řetězec a přiřadit jej do proměnné `řetězec` namísto starého.

Například:

```js run
let řetězec = 'Pa';

řetězec = 'p' + řetězec[1]; // nahradí řetězec

alert( řetězec ); // pa
```

V následujících podkapitolách uvidíme další příklady.

## Změna písmen na malá nebo velká

Metoda [toLowerCase()](mdn:js/string/toLowerCase) mění písmena řetězce na malá a metoda [toUpperCase()](mdn:js/string/toUpperCase) na velká:

```js run
alert( 'Rozhraní'.toUpperCase() ); // ROZHRANÍ
alert( 'Rozhraní'.toLowerCase() ); // rozhraní
```

Nebo pokud chceme jediný znak, změněný na malé písmeno:

```js run
alert( 'Rozhraní'[0].toLowerCase() ); // 'r'
```

## Hledání podřetězce

Je mnoho způsobů, jak v řetězci najít podřetězec.

### řetězec.indexOf

První metoda je [řetězec.indexOf(podřetězec, pozice)](mdn:js/string/indexOf).

Hledá `podřetězec` v `řetězec`, počínajíc zadanou pozicí `pozice`, a vrátí pozici, na níž byla nalezena shoda. Jestliže podřetězec nebyl nalezen, vrátí `-1`.

Například:

```js run
let řetězec = 'Prorokovo oko';

alert( řetězec.indexOf('Prorokovo') ); // 0, protože 'Prorokovo' je nalezen na začátku
alert( řetězec.indexOf('prorokovo') ); // -1, nenalezeno, hledání rozlišuje malá a velká písmena

alert( řetězec.indexOf("oko") ); // 4, "oko" nalezeno na pozici 4 (..okovo oko)
```

Nepovinný druhý parametr nám umožňuje zahájit hledání na zadané pozici.

Například první výskyt `"oko"` je na pozici `4`. Chceme-li hledat další výskyt, začněme hledání od pozice `5`:

```js run
let řetězec = 'Prorokovo oko';

alert( řetězec.indexOf('oko', 5) ) // 10
```

Pokud nás zajímají všechny výskyty, můžeme spustit `indexOf` v cyklu. Každé nové volání bude začínat na pozici za předchozím nálezem:

```js run
let řetězec = 'Kdyby byly v řece ryby, nebylo by třeba rybníka';

let cíl = 'by'; // hledejme

let poz = 0;
while (true) {
  let nalezenáPozice = řetězec.indexOf(cíl, poz);
  if (nalezenáPozice == -1) break;

  alert( `Nalezeno na ${nalezenáPozice}` );
  poz = nalezenáPozice + 1; // pokračujeme v hledání od další pozice
}
```

Stejný algoritmus lze napsat kratším způsobem:

```js run
let řetězec = "Kdyby byly v řece ryby, nebylo by třeba rybníka";
let cíl = "by";

*!*
let poz = -1;
while ((poz = řetězec.indexOf(cíl, poz + 1)) != -1) {
  alert( poz );
}
*/!*
```

```smart header="`řetězec.lastIndexOf(podřetězec, pozice)`"
Existuje i podobná metoda [řetězec.lastIndexOf(podřetězec, pozice)](mdn:js/string/lastIndexOf), která hledá od konce řetězce směrem k jeho začátku.

Ta by vypsala výskyty v opačném pořadí.
```

Metoda `indexOf` vnáší do podmínky v `if` drobnou nepříjemnost. Nemůžeme ji umístit do `if` takto:

```js run
let řetězec = "Prorokovo oko";

if (řetězec.indexOf("Prorokovo")) {
    alert("Našli jsme"); // to nefunguje!
}
```

V uvedeném příkladu se `alert` nezobrazí, protože metoda `řetězec.indexOf("Prorokovo")` vrátila `0` (což znamená, že našla shodu na počáteční pozici). To je správně, ale `if` považuje `0` za `false`.

Správně bychom tedy měli porovnávat s `-1`, např. takto:

```js run
let řetězec = "Prorokovo oko";

*!*
if (řetězec.indexOf("Prorokovo") != -1) {
*/!*
    alert("Našli jsme"); // teď to funguje!
}
```

### includes, startsWith, endsWith

Modernější metoda [řetězec.includes(podřetězec, poz)](mdn:js/string/includes) vrátí `true/false` podle toho, zda `řetězec` v sobě obsahuje `podřetězec`.

Je to ta pravá možnost, když potřebujeme testovat výskyt, ale nezajímá nás jeho pozice:

```js run
alert( "Prorokovo oko".includes("Prorok") ); // true

alert( "Ahoj".includes("Sbohem") ); // false
```

Nepovinný druhý argument `řetězec.includes` je pozice, od níž se má začít hledat:

```js run
alert( "Prorokovo".includes("oko") ); // true
alert( "Prorokovo".includes("oko", 5) ); // false, od pozice 5 není žádné "oko"
```

Metody [řetězec.startsWith](mdn:js/string/startsWith) a [řetězec.endsWith](mdn:js/string/endsWith) dělají přesně to, co je jejich názvem *(zjistí, zda řetězec začíná „startsWith“ nebo končí „endsWith“ zadaným podřetězcem -- pozn. překl.)*:

```js run
alert( "*!*Pro*/!*rok".startsWith("Pro") ); // true, "Prorok" začíná na "Pro"
alert( "Pro*!*rok*/!*".endsWith("rok") ); // true, "Prorok" končí na "rok"
```

## Získání podřetězce

V JavaScriptu jsou 3 metody pro získání podřetězce: `substring`, `substr` a `slice`.

`řetězec.slice(začátek [, konec])`
: Vrátí část řetězce od pozice `začátek` do (ale ne včetně) pozice `konec`.

    Například:

    ```js run
    let řetězec = "řetězení";
    alert( řetězec.slice(0, 5) ); // 'řetěz', podřetězec od 0 do 5 (mimo 5)
    alert( řetězec.slice(0, 1) ); // 'ř', od 0 do 1, ale mimo 1, takže jediný znak na pozici 0
    ```

    Není-li uveden druhý argument, `slice` vrátí podřetězec až do konce řetězce:

    ```js run
    let řetězec = "ře*!*tězení*/!*";
    alert( řetězec.slice(2) ); // 'tězení', od 2. pozice do konce
    ```

    Je možné, aby `začátek/konec` měly záporné hodnoty. Ty znamenají, že pozice se počítá od konce řetězce:

    ```js run
    let řetězec = "řetě*!*zen*/!*í";

    // začátek na 4. pozici zprava, konec na 1. pozici zprava
    alert( řetězec.slice(-4, -1) ); // 'zen'
    ```

`řetězec.substring(začátek [, konec])`
: Vrátí část řetězce *mezi* pozicemi `začátek` a `konec` (nezahrnuje `konec`).

    Je to téměř totéž jako `slice`, ale umožňuje, aby `začátek` byl větší než `konec` (v takovém případě se hodnoty `začátek` a `konec` jednoduše prohodí).

    Například:

    ```js run
    let řetězec = "ře*!*těze*/!*ní";

    // tyto hodnoty jsou totéž pro substring:
    alert( řetězec.substring(2, 6) ); // "těze"
    alert( řetězec.substring(6, 2) ); // "těze"

    // ...ale ne pro slice:
    alert( řetězec.slice(2, 6) ); // "těze" (totéž)
    alert( řetězec.slice(6, 2) ); // "" (prázdný řetězec)

    ```

    Záporné argumenty (na rozdíl od `slice`) nejsou podporovány a zachází se s nimi jako s `0`.

`řetězec.substr(začátek [, délka])`
: Vrátí část řetězce od pozice `začátek` se zadanou délkou `délka`.

    Na rozdíl od předchozích metod nám tato umožňuje specifikovat délku namísto koncové pozice:

    ```js run
    let řetězec = "ře*!*těze*/!*ní";
    alert( řetězec.substr(2, 4) ); // 'těze', od 2. pozice vezme 4 znaky
    ```

    První argument může být záporný, pak se bude počítat od konce:

    ```js run
    let řetězec = "řetě*!*ze*/!*ní";
    alert( řetězec.substr(-4, 2) ); // 'ze', od 4. pozice zprava vezme 2 znaky
    ```

Tato metoda je obsažena v [Dodatku B](https://tc39.es/ecma262/#sec-string.prototype.substr) specifikace jazyka. Znamená to, že by ji měly podporovat jedině motory JavaScriptu uvnitř prohlížečů a nedoporučuje se ji používat. V praxi je však podporována všude.

Abychom předešli zmatkům, všechny tyto metody si zrekapitulujme:

| metoda | vybírá... | záporné hodnoty |
|--------|-----------|-----------------|
| `slice(začátek, konec)` | od `začátek` do `konec` (mimo `konec`) | umožňuje záporné hodnoty |
| `substring(začátek, konec)` | mezi `začátek` a `konec` (mimo `konec`) | záporné hodnoty znamenají `0` |
| `substr(začátek, délka)` | od `začátek` vezme `délka` znaků | umožňuje záporný `začátek` |

```smart header="Kterou zvolit?"
Potřebnou práci odvedou všechny. Formálně má `substr` drobnou nevýhodu: není popsána v jádru specifikace JavaScriptu, ale v Dodatku B, který pokrývá vlastnosti fungující jen v prohlížečích a existující zejména z historických důvodů. Prostředí mimo prohlížeče ji tedy nemusejí podporovat. V praxi však funguje všude.

Ze zbývajících dvou variant je `slice` trochu flexibilnější, protože umožňuje záporné hodnoty a je kratší na napsání. 

Pro praktické použití si tedy stačí pamatovat jen `slice`.
```

## Porovnávání řetězců

Jak víme z kapitoly <info:comparison>, řetězce se porovnávají znak po znaku v abecedním pořadí.

Existují však některé zvláštnosti.

1. Malé písmeno je vždy větší než velké:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. Písmena s diakritickými znaménky jsou „mimo pořadí“:

    ```js run
    alert( 'Írán' > 'Zéland' ); // true
    ```

    To může vést ke zvláštním výsledkům, budeme-li řadit tyto názvy zemí. Obvykle se očekává, že `Zéland` bude v seznamu až za `Írán`.

Abychom pochopili, co se tady děje, měli bychom vědět, že všechny řetězce jsou zakódovány pomocí [UTF-16](https://cs.wikipedia.org/wiki/UTF-16). To znamená, že každý znak má odpovídající číselný kód. 

Existují speciální metody, které umožňují získat znak pro zadaný kód a naopak:

`řetězec.codePointAt(poz)`
: Vrátí desítkové číslo představující kód znaku na pozici `poz`:

    ```js run
    // malá a velká písmena mají různé kódy
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (potřebujeme-li hexadecimální hodnotu)
    ```

`String.fromCodePoint(kód)`
: Vytvoří znak podle jeho číselného kódu `kód`:

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    alert( String.fromCodePoint(0x5a) ); // Z (jako argument můžeme použít i hexadecimální hodnotu)
    ```

Nyní se podívejme na znaky s kódy `65..220` (latinská abeceda a něco navíc), když z nich vytvoříme řetězec:

```js run
let řetězec = '';

for (let i = 65; i <= 220; i++) {
  řetězec += String.fromCodePoint(i);
}
alert( řetězec );
// Výstup:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

Vidíte? Napřed jsou velká písmena, pak několik speciálních znaků, pak malá písmena a `Í` je poblíž konce výstupu.

Nyní bude zřejmé, proč `a > Z`.

Znaky se porovnávají podle svého číselného kódu. Vyšší kód znamená, že znak je větší. Kód `a` (97) je vyšší než kód `Z` (90).

- Všechna malá písmena jsou až za velkými písmeny, protože jejich kódy jsou vyšší.
- Některá písmena, např. `Í`, stojí mimo hlavní abecedu. Jejich kód je zde vyšší než kód kteréhokoli písmene od `a` do `z`.

### Správné porovnání [#correct-comparisons]

„Správný“ algoritmus pro porovnání řetězců je složitější, než se může zdát, protože různé jazyky mají různé abecedy.

Prohlížeč tedy musí znát jazyk, v němž porovnává.

Naštěstí moderní prohlížeče podporují internacionalizační standard [ECMA-402](https://www.ecma-international.org/publications-and-standards/standards/ecma-402/).

Ten poskytuje speciální metodu, jak porovnávat řetězce v různých jazycích podle jejich pravidel.

Volání [řetězec.localeCompare(řetězec2)](mdn:js/string/localeCompare) vrátí celé číslo, které oznamuje, zda `řetězec` je menší, roven nebo větší než `řetězec2` podle pravidel jazyka:

- Je-li `řetězec` menší než `řetězec2`, vrátí záporné číslo.
- Je-li `řetězec` větší než `řetězec2`, vrátí kladné číslo.
- Jsou-li si rovny, vrátí `0`.

Například:

```js run
alert( 'Česko'.localeCompare('Zéland') ); // -1
```

Tato metoda má ve skutečnosti ještě dva další argumenty specifikované v [dokumentaci](mdn:js/string/localeCompare), které umožňují specifikovat jazyk (standardně se vezme z prostředí, na jazyku závisí pořadí písmen) a nastavit další pravidla, např. rozlišování malých a velkých písmen, nebo zda se `"a"` a `"á"` mají považovat za stejné znaky, atd.

## Shrnutí

- Existují 3 druhy uvozovek. Zpětné uvozovky umožňují rozdělit řetězec na více řádků a vnořit výrazy `${…}`.
- Můžeme používat speciální znaky, například konec řádku `\n`.
- Chceme-li získat znak, použijeme `[]` nebo metodu `at`.
- Chceme-li získat podřetězec, použijeme `slice` nebo `substring`.
- Chceme-li převést řetězec na malá/velká písmena, použijeme `toLowerCase/toUpperCase`.
- Chceme-li najít podřetězec, použijeme `indexOf` nebo pro jednoduché kontroly `includes/startsWith/endsWith`.
- Chceme-li porovnat řetězce podle jazykových pravidel, použijeme `localeCompare`, jinak se budou porovnávat podle kódů znaků.

Pro řetězce existuje i několik dalších užitečných metod:

- `řetězec.trim()` -- odstraní mezery ze začátku a konce řetězce.
- `řetězec.repeat(n)` -- zopakuje řetězec `n`-krát.
- ...a další lze najít v [manuálu](mdn:js/string).

Řetězce mají také metody pro hledání a nahrazování pomocí regulárních výrazů. To je však rozsáhlé téma, proto je vysvětleno v samostatné části tutoriálu <info:regular-expressions>.

Nyní je také důležité vědět, že řetězce jsou založeny na kódování Unicode, a proto jsou zde určité problémy s porovnáváním. O Unicode se dozvíte víc v kapitole <info:unicode>.
