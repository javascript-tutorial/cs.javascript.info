# Řetězce

Textová data se v JavaScriptu ukládají jako řetězce. Neexistuje oddělený typ pro jediný znak.

Interní formát řetězce je vždy [UTF-16](https://cs.wikipedia.org/wiki/UTF-16), nezávisí na kódování stránky.

## Uvozovky

Připomeňme si druhy uvozovek.

Řetězce mohou být uzavřeny do apostrofů, uvozovek nebo gravisů (obrácených čárek):

```js
let apostrofy = 'apostrofy';
let uvozovky = "uvozovky";

let gravisy = `gravisy`;
```

Apostrofy a uvozovky jsou v zásadě stejné. Gravisy nám však umožňují vložit do řetězce jakýkoli výraz, když jej uzavřeme do `${…}`:

```js run
function součet(a, b) {
  return a + b;
}

alert(`1 + 2 = ${součet(1, 2)}.`); // 1 + 2 = 3.
```

Další výhodou používání gravisů je, že umožňují rozdělit řetězec na více řádků:

```js run
let seznamHostů = `Hosté:
 * Jan
 * Petr
 * Marie
`;

alert(seznamHostů); // seznam hostů, více řádků
```

Vypadá to přirozeně, že? Ale apostrofy nebo uvozovky takto nefungují.

Jestliže je použijeme a pokusíme se rozdělit text na více řádků, nastane chyba:

```js run
let seznamHostů = "Hosté: // Error: Unexpected token ILLEGAL
  * Jan";
```

Apostrofy a uvozovky pocházejí ze starodávných časů vytváření jazyka, kdy potřeba víceřádkových řetězců nebyla brána v úvahu. Gravisy se objevily mnohem později, a tak jsou univerzálnější.

Obrácené čárky nám také umožňují specifikovat „šablonovou funkci“ před levou čárkou. Syntaxe je <code>funkce&#96;řetězec&#96;</code>. Funkce `funkce` je volána automaticky, obdrží řetězec a vnořené výrazy a může je zpracovat. To se nazývá „značkované vlastnosti“ *(anglicky „tagged templates“ -- pozn. překl.)*. Tato vlastnost nám umožňuje snadněji implementovat vlastní šablony, ale v praxi se používá jen málokdy. Více se o ní můžete dočíst v [manuálu](mdn:/JavaScript/Reference/Template_literals#Tagged_templates).

## Speciální znaky

Je ovšem možné vytvořit víceřádkové řetězce uzavřené do apostrofů nebo uvozovek pomocí tzv. „znaku nového řádku“, který se zapisuje `\n` a stanovuje konec řádku:

```js run
let seznamHostů = "Hosté:\n * Jan\n * Petr\n * Marie";

alert(seznamHostů); // víceřádkový seznam hostů
```

Například tyto dva řádky jsou stejné, jen jinak zapsané:

```js run
let řetězec1 = "Ahoj\nsvěte"; // dva řádky pomocí „symbolu konce řádku“

// dva řádky pomocí obyčejného nového řádku a gravisů
let řetězec2 = `Ahoj
světe`;

alert(řetězec1 == řetězec2); // true
```

Existují i jiné, méně běžné „speciální“ znaky.

Následuje jejich úplný seznam:

| Znak | Popis |
|------|-------|
|`\n`|Nový řádek|
|`\r`|V textových souborech ve Windows reprezentuje konec řádku kombinace dvou znaků `\r\n`, zatímco v jiných OS je to pouze `\n`. Je to z historických důvodů, většina softwaru pod Windows rozumí i `\n`.|
|`\'`, `\"`|Apostrof, uvozovky|
|`\\`|Zpětné lomítko|
|`\t`|Tabulátor|
|`\b`, `\f`, `\v`| Backspace, Form Feed, vertikální tabulátor -- ponechány kvůli kompatibilitě, v současnosti se nepoužívají. |
|`\xXX`| Znak Unicode se zadaným hexadecimálním kódem v Unicode `XX`, např. `'\x7A'` je totéž jako `'z'`.|
|`\uXXXX`|Symbol Unicode s hexadecimálním kódem `XXXX` v kódování UTF-16, např. `\u00A9` -- Unicode pro symbol copyrightu `©`. Musí obsahovat přesně 4 hexadecimální číslice. |
|`\u{X…XXXXXX}` (1 až 6 hexadecimálních znaků)|Symbol Unicode se zadaným kódováním UTF-32. Pomocí dvou symbolů Unicode jsou zakódovány některé vzácné znaky, které zaberou 4 bajty. Tímto způsobem můžeme vkládat dlouhé kódy. |

Příklady s Unicode:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, vzácný čínský znak (dlouhý Unicode)
alert( "\u{1F60D}" ); // 😍, symbol usmívající se tváře (další dlouhý Unicode)
```

Všechny speciální znaky začínají znakem zpětného lomítka `\`. Tomu se také říká „únikový *(escape)* znak“.

Můžeme jej také použít, když chceme vložit do řetězce uvozovky nebo apostrof.

Například:

```js run
alert( 'To*!*\'*/!*s přehnal!' ); // *!*To's*/!* přehnal!
```

Jak vidíme, museli jsme před vnitřním apostrofem uvést zpětné lomítko `\'`, jinak by apostrof znamenal konec řetězce.

Samozřejmě musíme předznamenat únikovým znakem jen stejný druh uvozovek jako ty, které obklopují řetězec. Jako elegantnější řešení bychom tedy mohli použít uvozovky nebo gravisy:

```js run
alert( `To's přehnal!` ); // To's přehnal!
```

Všimněte si, že zpětné lomítko `\` poslouží pro korektní načtení řetězce JavaScriptem a pak zmizí. Řetězec uložený v paměti neobsahuje žádné `\`. Můžete to jasně vidět v `alert` ve výše uvedených příkladech.

Co ale, když potřebujeme zobrazit v řetězci skutečné zpětné lomítko  `\`?

Je to možné, ale musíme je zdvojit `\\`:

```js run
alert( `Zpětné lomítko: \\` ); // Zpětné lomítko: \
```

## Délka řetězce

Délku řetězce obsahuje vlastnost `length`:

```js run
alert( `Já\n`.length ); // 3
```

Všimněte si, že `\n` je jediný „speciální“ znak, takže délka bude opravdu `3`.

```warn header="`length` je vlastnost"
Lidé zvyklí na některé jiné jazyky někdy nesprávně píší volání funkce `str.length()` místo `str.length`. To nefunguje.

Prosíme všimněte si, že `str.length` je číselná vlastnost, ne funkce. Není důvod za ní uvádět závorky.
```

## Přístup ke znakům

Abyste získali znak na pozici `poz`, použijte hranaté závorky `[poz]` nebo zavolejte metodu [str.charAt(pos)](mdn:js/String/charAt). První znak se nachází na pozici nula:

```js run
let řetězec = `Ahoj`;

// první znak
alert( řetězec[0] ); // A
alert( řetězec.charAt(0) ); // A

// poslední znak
alert( řetězec[řetězec.length - 1] ); // j
```

Moderním způsobem získání znaku jsou hranaté závorky, zatímco `charAt` existuje převážně z historických důvodů.

Jediný rozdíl mezi nimi je v tom, že když není znak nalezen, `[]` vrátí `undefined`, ale `charAt` vrátí prázdný řetězec:

```js run
let řetězec = `Ahoj`;

alert( řetězec[1000] ); // undefined
alert( řetězec.charAt(1000) ); // '' (prázdný řetězec)
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

Obvyklý způsob, jak to obejít, je vytvořit úplně nový řetězec a přiřadit jej do `řetězec` namísto starého.

Například:

```js run
let řetězec = 'Pa';

řetězec = 'p' + řetězec[1]; // nahradí řetězec

alert( řetězec ); // pa
```

V následujících podkapitolách uvidíme další příklady.

## Změna písmen na malá nebo velká

Metoda [toLowerCase()](mdn:js/řetězecing/toLowerCase) mění písmena řetězce na malá a metoda [toUpperCase()](mdn:js/řetězecing/toUpperCase) na velká:

```js run
alert( 'Rozhraní'.toUpperCase() ); // ROZHRANÍ
alert( 'Rozhraní'.toLowerCase() ); // rozhraní
```

Nebo jestliže chceme jediný znak malým písmenem:

```js
alert( 'Rozhraní'[0].toLowerCase() ); // 'r'
```

## Hledání podřetězce

Je mnoho způsobů, jak v řetězci najít podřetězec.

### řetězec.indexOf

První metoda je [řetězec.indexOf(podřetězec, pozice)](mdn:js/řetězecing/indexOf).

Hledá `podřetězec` v `řetězec`, počínajíc zadanou pozicí `pozice`, a vrátí pozici, na níž byla nalezena shoda. Jestliže nebylo nic nalezeno, vrátí `-1`.

Například:

```js run
let řetězec = 'Prorokovo oko';

alert( řetězec.indexOf('Prorokovo') ); // 0, protože 'Prorokovo' je nalezen na začátku
alert( řetězec.indexOf('prorokovo') ); // -1, nenalezeno, hledání rozlišuje malá a velká písmena

alert( řetězec.indexOf("oko") ); // 4, "oko" nalezeno na pozici 4 (..okovo oko)
```

Nepovinný druhý parametr nám umožňuje začít hledání na zadané pozici.

Například první výskyt `"oko"` je na pozici `4`. Chceme-li hledat další výskyt, začněme hledání od pozice `5`:

```js run
let řetězec = 'Prorokovo oko';

alert( řetězec.indexOf('oko', 5) ) // 10
```

Pokud nás zajímají všechny výskyty, můžeme spustit `indexOf` v cyklu. Každé nové volání se bude konat od pozice za předchozím nálezem:

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
  alert( `Nalezeno na ${poz}` );
}
*/!*
```

```smart header="`řetězec.lastIndexOf(podřetězec, pozice)`"
Existuje i podobná metoda [řetězec.lastIndexOf(podřetězec, pozice)](mdn:js/string/lastIndexOf), která hledá od konce řetězce směrem k jeho začátku.

Ta by vypsala výskyty v opačném pořadí.
```

Metoda `indexOf` přináší drobnou nepohodlnost do testu v `if`. Nemůžeme ji umístit do `if` takto:

```js run
let řetězec = "Prorokovo oko";

if (řetězec.indexOf("Prorokovo")) {
    alert("Našli jsme"); // to nefunguje!
}
```

V uvedeném příkladu se `alert` nezobrazí, protože `řetězec.indexOf("Prorokovo")` vrátila `0` (což znamená, že našla shodu na počáteční pozici). To je správně, ale `if` považuje `0` za `false`.

Ve skutečnosti bychom tedy měli kontrolovat na `-1`, např. takto:

```js run
let řetězec = "Prorokovo oko";

*!*
if (řetězec.indexOf("Prorokovo") != -1) {
*/!*
    alert("Našli jsme"); // teď to funguje!
}
```

#### Trik s bitovým NOT

Jeden z nejstarších zde používaných triků je operátor [bitového NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT) `~`, který převádí číslo na 32-bitové celé číslo (odstraní desetinnou část, pokud nějaká je) a pak převrátí všechny bity v jeho binární reprezentaci.

V praxi to znamená jednoduchou věc: pro 32-bitová celá čísla se `~n` rovná `-(n+1)`.

Například:

```js run
alert( ~2 ); // -3, totéž jako -(2+1)
alert( ~1 ); // -2, totéž jako -(1+1)
alert( ~0 ); // -1, totéž jako -(0+1)
*!*
alert( ~-1 ); // 0, totéž jako -(-1+1)
*/!*
```

Jak vidíme, `~n` je nulová, jedině když `n == -1` (to platí pro kterékoli 32-bitové celé číslo `n` se znaménkem).

Test `if ( ~řetězec.indexOf("...") )` je tedy pravdivý jedině tehdy, jestliže výsledek `indexOf` není `-1`. Jinými slovy, když je něco nalezeno.

Lidé to používají ke zkrácení kontrol výsledku `indexOf`:

```js run
let řetězec = "Prorokovo";

if (~řetězec.indexOf("Prorokovo")) {
  alert( 'Nalezeno!' ); // funguje to
}
```

Obecně se nedoporučuje používat vlastnosti jazyka neprůhledným způsobem, ale tento konkrétní trik se zhusta používá ve starých kódech, takže bychom mu měli rozumět.

Jen si pamatujte: `if (~řetězec.indexOf(...))` se čte jako „jestliže je nalezeno“.

Abychom však byli přesní, jelikož operátor `~` zkracuje velká čísla na 32 bitů, existují i jiná čísla, která dávají `0`, nejmenší z nich je `~4294967295=0`. Taková kontrola je tedy správná jen tehdy, není-li řetězec tak dlouhý.

V současnosti vidíme tento trik jen ve starém kódu, jelikož moderní JavaScript poskytuje metodu `.includes` (viz níže).

### includes, startsWith, endsWith

Modernější metoda [řetězec.includes(podřetězec, poz)](mdn:js/řetězecing/includes) vrátí `true/false` podle toho, zda `řetězec` v sobě obsahuje `podřetězec`.

Je to správná volba, když potřebujeme testovat výskyt, ale nezajímá nás jeho pozice:

```js run
alert( "Prorokovo oko".includes("Prorok") ); // true

alert( "Ahoj".includes("Sbohem") ); // false
```

Nepovinný druhý argument `řetězec.includes` je pozice, od níž se má začít hledat:

```js run
alert( "Prorokovo".includes("oko") ); // true
alert( "Prorokovo".includes("oko", 5) ); // false, od pozice 5 není žádné "oko"
```

Metody [řetězec.startsWith](mdn:js/string/startsWith) a [řetězec.endsWith](mdn:js/string/endsWith) dělají přesně to, co je jejich názvem *(„startsWith“ = začíná na, „endsWith“ = končí na, takže `startsWith` vrátí `true`, jestliže řetězec začíná zadaným podřetězcem, a `endsWith` vrátí `true`, jestliže řetězec končí zadaným podřetězcem -- pozn. překl.)*:

```js run
alert( "Prorok".startsWith("Pro") ); // true, "Prorok" začíná na "Pro"
alert( "Prorok".endsWith("rok") ); // true, "Prorok" končí na "rok"
```

## Získání podřetězce

V JavaScriptu jsou 3 metody pro získání podřetězce: `substring`, `substr` a `slice`.

`řetězec.slice(začátek [, konec])`
: Vrátí část řetězce od pozice `začátek` do (ale ne včetně) pozice `konec`.

    Například:

    ```js run
    let řetězec = "řetězení";
    alert( řetězec.slice(0, 5) ); // 'řetěz', podřetězec od 0 do 5 (mimo 5)
    alert( řetězec.slice(0, 1) ); // 'ř', od 0 do 1, ale mimo 1, takže jediný znak na 0
    ```

    Není-li uveden druhý argument, `slice` jde až na konec řetězce:

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
: Vrátí část řetězce *mezi* pozicemi `začátek` a `konec`.

    Je to téměř totéž jako `slice`, ale umožňuje, aby `začátek` byl větší než `konec`.

    Například:

    ```js run
    let řetězec = "ře*!*těze*/!*ní";

    // je to totéž pro substring:
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

Abychom předešli zmatkům, všechny tyto metody si zrekapitulujme:

| metoda | vybírá... | záporné hodnoty |
|--------|-----------|-----------------|
| `slice(začátek, konec)` | od `začátek` do `konec` (mimo `konec`) | umožňuje záporné hodnoty |
| `substring(začátek, konec)` | mezi `začátek` a `konec` | záporné hodnoty znamenají `0` |
| `substr(začátek, délka)` | od `začátek` vezme `délka` znaků | umožňuje záporný `začátek` |

```smart header="Kterou zvolit?"
Všechny odvedou svou práci. Formálně má `substr` drobnou nevýhodu: není popsána v jádru specifikace JavaScriptu, ale v Příloze B, která pokrývá pouze prohlížečové vlastnosti, existující zejména z historických důvodů. Neprohlížečová prostředí ji tedy nemusejí podporovat. V praxi však funguje všude.

Ze zbývajících dvou variant je `slice` trochu flexibilnější, protože umožňuje záporné hodnoty a je kratší na napsání. Z těchto tří metod si tedy stačí pamatovat `slice`.
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

Abychom pochopili, co se tady děje, prohlédneme si vnitřní reprezentaci řetězců v JavaScriptu.

Všechny řetězce jsou zakódovány pomocí [UTF-16](https://cs.wikipedia.org/wiki/UTF-16). To je: každý znak má odpovídající číselný kód. Existují speciální metody, které umožňují získat znak pro zadaný kód a naopak.

`řetězec.codePointAt(poz)`
: Vrátí kód znaku na pozici `poz`:

    ```js run
    // písmena různé velikosti mají různé kódy
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(kód)`
: Vytvoří znak podle jeho číselného kódu `kód`:

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    Můžeme vytvořit znaky Unicode podle jejich kódů i pomocí `\u`, za nímž následuje hexadecimální kód:

    ```js run
    // 90 je 5a v hexadecimální soustavě
    alert( '\u005a' ); // Z
    ```

Nyní se podívejme na znaky s kódy `65..220` (latinská abeceda a něco navíc), když z nich vytvoříme řetězec:

```js run
let řetězec = '';

for (let i = 65; i <= 220; i++) {
  řetězec += String.fromCodePoint(i);
}
alert( řetězec );
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

Naštěstí všechny moderní prohlížeče (IE10- vyžaduje přidání knihovny [Intl.js](https://github.com/andyearnshaw/Intl.js/)) podporují internacionalizační standard [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

Ten poskytuje speciální metodu, jak porovnávat řetězce v různých jazycích podle jejich pravidel.

Volání [řetězec.localeCompare(řetězec2)](mdn:js/string/localeCompare) vrátí celé číslo, které oznamuje, zda `řetězec` je menší, roven nebo větší než `řetězec2` podle pravidel jazyka:

- Je-li `řetězec` menší než `řetězec2`, vrátí záporné číslo.
- Je-li `řetězec` větší než `řetězec2`, vrátí kladné číslo.
- Jsou-li si rovny, vrátí `0`.

Například:

```js run
alert( 'Česko'.localeCompare('Zéland') ); // -1
```

Tato metoda má ve skutečnosti ještě dva další argumenty specifikované v [dokumentaci](mdn:js/string/localeCompare), které umožňují specifikovat jazyk (standardně se vezme z prostředí, na jazyku závisí pořadí písmen) a nastavit další pravidla, např. velikost písmen, nebo zda se `"a"` a `"á"` mají brát jako stejné znaky, atd.

## Vnitřní reprezentace, Unicode

```warn header="Pokročilá znalost"
Tato podkapitola zachází hlouběji do vnitřní reprezentace řetězců. Tato znalost vám bude užitečná, jestliže plánujete pracovat s emoji, vzácnými matematickými či hieroglyfickými znaky nebo jinými vzácnými symboly.

Jestliže je neplánujete podporovat, můžete tuto podkapitolu přeskočit.
```

### Znaky kódované dvěma dvojicemi bajtů

Všechny často používané znaky mají 2-bajtové kódy. Písmena většiny evropských jazyků, číslice a dokonce většina hieroglyfů má 2-bajtovou reprezentaci.

Avšak 2 bajty umožňují jen 65536 kombinací, a to pro všechny možné symboly nestačí. Vzácné symboly se tedy kódují dvojicí 2-bajtových znaků, která se nazývá „surrogate pair“ *(není mi znám žádný používaný český ekvivalent -- pozn. překl.)*.

Délka takových symbolů je `2`:

```js run
alert( '𝒳'.length ); // 2, VELKÉ X V MATEMATICKÉM SKRIPTU
alert( '😂'.length ); // 2, TVÁŘ SE SLZAMI RADOSTI
alert( '𩷶'.length ); // 2, vzácný čínský znak
```

Všimněte si, že v době, kdy byl JavaScript vytvořen, surrogate pairy ještě neexistovaly, a proto je jazyk nezpracovává korektně!

Ve skutečnosti máme v každém z výše uvedených řetězců jediný symbol, ale `length` ukáže délku `2`.

Jedny z mála vzácných metod, které pracují se surrogate pairy správně, jsou `String.fromCodePoint` a `řetězec.codePointAt`. Ty se objevily v jazyce teprve nedávno. Před nimi existovaly jen [String.fromCharCode](mdn:js/string/fromCharCode) a [řetězec.charCodeAt](mdn:js/string/charCodeAt). Tyto metody jsou ve skutečnosti totéž jako `fromCodePoint/codePointAt`, avšak nefungují se surrogate pairy.

Získat symbol může být ošidné, jelikož se surrogate pairy se zachází jako se dvěma znaky:

```js run
alert( '𝒳'[0] ); // podivné symboly...
alert( '𝒳'[1] ); // ...části surrogate pairu
```

Všimněte si, že části surrogate pairu nemají jedna bez druhé žádný význam. Funkce `alert` ve výše uvedeném příkladu tedy ve skutečnosti zobrazí nesmysly.

Technicky jsou surrogate pairy detekovatelné i podle svého kódu: má-li znak kód v intervalu `0xd800..0xdbff`, je to první část surrogate pairu. Další znak (druhá část) musí mít kód v intervalu `0xdc00..0xdfff`. Tyto intervaly jsou standardem výslovně vyhrazeny pro surrogate pairy.

Ve výše uvedeném příkladu:

```js run
// charCodeAt nezná surrogate pairy, takže vydá kódy pro jejich části

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, mezi 0xd800 a 0xdbff
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, mezi 0xdc00 a 0xdfff
```

Další způsoby, jak si poradit se surrogate pairy, najdete později v kapitole <info:iterable>. Existují pro ně pravděpodobně i speciální knihovny, ale žádná není natolik slavná, abych ji tady navrhl.

### Diakritická znaménka a normalizace

Mnoho jazyků obsahuje symboly, které se skládají ze základního znaku a znaménka nad nebo pod ním.

Například písmeno `a` může být základním znakem pro: `àáâäãåā`. Většina běžných „složených“ znaků má v tabulce UTF-16 svůj vlastní kód, ale ne všechny, protože možných kombinací je příliš mnoho.

Aby UTF-16 podporovalo libovolnou složeninu, umožňuje nám použít několik znaků Unicode: základní znak následovaný jedním nebo více „znaménky“, která jej „zdobí“.

Například máme-li `S` následované speciálním znakem „tečka nahoře“ (kód `\u0307`), zobrazí se jako Ṡ.

```js run
alert( 'S\u0307' ); // Ṡ
```

Potřebujeme-li nad písmenem (nebo pod ním) další znaménko -- není to problém, prostě přidejte znak požadovaného znaménka.

Například přidáme-li znak „tečka dole“ (kód `\u0323`), budeme mít „S s tečkami nahoře a dole“: `Ṩ`.

Příklad:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

To nám poskytuje velkou flexibilitu, ale také zajímavý problém: dva znaky mohou vizuálně vypadat stejně, ale jsou reprezentovány různými složeninami Unicode.

Například:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + tečka nahoře + tečka dole
let s2 = 'S\u0323\u0307'; // Ṩ, S + tečka dole + tečka nahoře

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false, ačkoli znaky vypadají stejně (?!)
```

Abychom to vyřešili, existuje algoritmus „normalizace Unicode“, který vytvoří z každého řetězce jedinou „normální“ formu.

Je implementován ve funkci [řetězec.normalize()](mdn:js/string/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Je veselé, že v naší situaci `normalize()` ve skutečnosti vytvoří z posloupnosti tří znaků jediný: `\u1e68` (S se dvěma tečkami).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

Ve skutečnosti tomu tak vždy není. Důvodem je, že symbol `Ṩ` je „dostatečně běžný“, takže jej tvůrci UTF-16 zahrnuli do hlavní tabulky a přiřadili mu kód.

Chcete-li se dozvědět víc o pravidlech a variantách normalizace -- jsou popsány v příloze ke standardu Unicode: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), ale pro většinu praktických účelů postačí informace z této podkapitoly.

## Shrnutí

- Existují 3 druhy uvozovek. Gravisy umožňují rozdělit řetězec na více řádků a vnořit výrazy `${…}`.
- Řetězce v JavaScriptu jsou kódovány pomocí UTF-16.
- Můžeme používat speciální znaky jako `\n` a vkládat písmena podle jejich kódu Unicode pomocí `\u...`.
- Chceme-li získat znak, použijeme `[]`.
- Chceme-li získat podřetězec, použijeme `slice` nebo `substring`.
- Chceme-li převést řetězec na malá/velká písmena, použijeme `toLowerCase/toUpperCase`.
- Chceme-li najít podřetězec, použijeme `indexOf` nebo pro jednoduché kontroly `includes/startsWith/endsWith`.
- Chceme-li porovnat řetězce podle jazykových pravidel, použijeme `localeCompare`, jinak se budou porovnávat podle kódů znaků.

Pro řetězce existuje i několik dalších užitečných metod:

- `řetězec.trim()` -- odstraní mezery ze začátku a konce řetězce.
- `řetězec.repeat(n)` -- zopakuje řetězec `n`-krát.
- ...a další lze najít v [manuálu](mdn:js/string).

Řetězce mají také metody pro hledání a nahrazování pomocí regulárních výrazů. To je však rozsáhlé téma, které bude vysvětleno v samostatné části tutoriálu <info:regular-expressions>.