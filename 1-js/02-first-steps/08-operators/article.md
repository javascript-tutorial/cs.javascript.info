# Základní operátory, matematika

Mnoho operátorů známe ze školy. Jsou mezi nimi sčítání `+`, násobení `*`, odčítání `-` a podobně.

V této kapitole začneme jednoduchými operátory a pak se budeme soustředit na prvky specifické pro JavaScript, které školní aritmetika nepokrývá.

## Pojmy: „unární“, „binární“, „operand“

Než budeme pokračovat, ujasníme si základní terminologii.

- *Operand* je to, na co se aplikují operátory. Například při násobení `5 * 2` máme dva operandy: levý operand je `5` a pravý operand je `2`. Někdy se jim místo „operandy“ říká „argumenty“.
- Operátor je *unární*, jestliže má jediný operand. Například unární negace `-`, která obrací znaménko čísla:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, byla aplikována unární negace
    ```
- Operátor je *binární*, jestliže má dva operandy. Stejné minus existuje i v binární podobě:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binární minus odečítá hodnoty
    ```

Formálně mají výše uvedené příklady dva různé operátory, které mají stejný symbol: operátor negace, což je unární operátor měnící znaménko, a operátor odčítání, což je binární operátor odečítající jedno číslo od druhého.

## Matematika

JavaScript podporuje následující matematické operace:

- sčítání `+`,
- odčítání `-`,
- násobení `*`,
- dělení `/`,
- zbytek po dělení `%`,
- umocňování `**`.

První čtyři jsou jasné, `%` a `**` potřebují trochu vysvětlení.

### Zbytek po dělení %

Operátor zbytku po dělení `%` nemá navzdory svému symbolu nic společného s procenty.

Výsledkem `a % b` je [zbytek](https://cs.wikipedia.org/wiki/Zbytek_po_dělení) při celočíselném dělení čísla `a` číslem `b`.

Příklad:

```js run
<<<<<<< HEAD
alert( 5 % 2 ); // 1, zbytek po dělení 5 děleno 2
alert( 8 % 3 ); // 2, zbytek po dělení 8 děleno 3
=======
alert( 5 % 2 ); // 1, the remainder of 5 divided by 2
alert( 8 % 3 ); // 2, the remainder of 8 divided by 3
alert( 8 % 4 ); // 0, the remainder of 8 divided by 4
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0
```

### Umocňování **

Operátor umocňování `a ** b` umocní `a` na `b`-tou.

Ve školní matematice to zapisujeme a<sup>b</sup>.

Příklad:

```js run
alert( 2 ** 2 ); // 2² = 4
alert( 2 ** 3 ); // 2³ = 8
alert( 2 ** 4 ); // 2⁴ = 16
```

<<<<<<< HEAD
Stejně jako v matematice je operátor umocňování definován i pro necelá čísla. 
=======
Just like in maths, the exponentiation operator is defined for non-integer numbers as well.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

Například odmocnina je umocnění na ½:

```js run
alert( 4 ** (1/2) ); // 2 (umocnění na 1/2 je totéž jako druhá odmocnina)
alert( 8 ** (1/3) ); // 2 (umocnění na 1/3 je totéž jako třetí odmocnina)
```


## Spojení řetězců pomocí binárního +

<<<<<<< HEAD
Přejděme nyní k vlastnostem JavaScriptu, které jsou za hranicemi školní aritmetiky.
=======
Let's meet the features of JavaScript operators that are beyond school arithmetics.
>>>>>>> 746ad803c878e33182e7fab1578c0d15b9b75ca0

Operátor plus `+` obvykle sčítá čísla.

Pokud je však binární `+` použito na řetězce, spojí je (zřetězí):

```js
let s = "můj" + "řetězec";
alert(s); // můjřetězec
```

Všimněte si, že jestliže je kterýkoli z operandů řetězec, bude na řetězec převeden i druhý operand.

Příklad:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Vidíme, že nezáleží na tom, zda je řetězec první nebo druhý operand.

Složitější příklad:

```js run
alert(2 + 2 + '1' ); // "41", ne "221"
```

Tady operátory fungují jeden za druhým. První `+` sečte dvě čísla, takže vrátí `4`, pak druhé `+` k němu přidá řetězec `1`, takže je to jako `4 + '1' = 41`.

```js run
alert('1' + 2 + 2); // "122" a ne "14"
```

První operand je zde řetězec, takže kompilátor zachází i s ostatními dvěma operandy jako s řetězci. `2` se zřetězí s `'1'`, takže to bude jako `'1' + 2 = "12"` a `"12" + 2 = "122"`.

Binární `+` je jediný operátor, který takovýmto způsobem podporuje řetězce. Ostatní aritmetické operátory fungují jen s čísly a své operandy převádějí vždy na čísla.

Ukázka odčítání a dělení:

```js run
alert( 6 - '2' ); // 4, převede '2' na číslo
alert( '6' / '2' ); // 3, převede oba operandy na čísla
```

## Konverze na číslo a unární +

Plus `+` existuje ve dvou podobách: binární, kterou jsme používali výše, a unární.

Unární plus, jinými slovy operátor `+` aplikovaný na jedinou hodnotu, neprovádí s čísly nic. Jestliže však operand není číslo, unární plus jej převede na číslo.

Příklad:

```js run
// Žádný efekt na čísla
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Převádí hodnoty, které nejsou čísla
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Dělá tedy ve skutečnosti totéž jako `Number(...)`, ale je kratší.

Potřeba převádět řetězce na čísla se objevuje velmi často. Například jestliže načítáme hodnoty z polí HTML formulářů, jsou to obvykle řetězce. Co když je chceme sečíst?

Binární plus by je spojilo jako řetězce:

```js run
let jablka = "2";
let pomeranče = "3";

alert( jablka + pomeranče ); // "23", binární plus spojuje řetězce
```

Pokud s nimi chceme zacházet jako s čísly, musíme je napřed konvertovat a teprve pak sečíst:

```js run
let jablka = "2";
let pomeranče = "3";

*!*
// obě hodnoty převedeme na čísla před binárním plus
alert( +jablka + +pomeranče ); // 5
*/!*

// delší varianta
// alert( Number(jablka) + Number(pomeranče) ); // 5
```

Z pohledu matematika může přemíra plusů vypadat podivně, ale z pohledu programátora na tom nic zvláštního není: nejprve se aplikují unární plusy, které převedou řetězce na čísla, a pak je binární plus sečte.

Proč se unární plusy aplikují na hodnoty dříve než binární? Jak uvidíme, je to důsledkem jejich *vyšší priority*.

## Priorita operátorů

Obsahuje-li výraz více než jeden operátor, je pořadí jejich výkonu definováno jejich *prioritou*, nebo jinými slovy standardním pořadím operátorů.

Ze školy jistě všichni víme, že ve výrazu `1 + 2 * 2` by násobení mělo být vyhodnoceno před sčítáním. To je přesně otázkou priority. Říkáme, že násobení má *vyšší prioritu* než sčítání.

Závorky mají přednost před veškerou prioritou, takže nejsme-li spokojeni se standardním pořadím, můžeme je s jejich pomocí změnit. Například zapíšeme `(1 + 2) * 2`.

JavaScript obsahuje mnoho operátorů. Každému z nich odpovídá hodnota jeho priority. Dříve se vykoná ten, jehož priorita je vyšší. Je-li priorita více operátorů stejná, vykonávají se v pořadí zleva doprava.

Následuje výtažek z [tabulky priorit](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) (nemusíte si ji celou pamatovat, ale všimněte si, že unární operátory mají vyšší prioritu než odpovídající binární):

| Priorita | Název | Znak |
|----------|-------|------|
| ... | ... | ... |
| 14 | unární plus | `+` |
| 14 | unární negace | `-` |
| 13 | umocňování | `**` |
| 12 | násobení | `*` |
| 12 | dělení | `/` |
| 11 | sčítání | `+` |
| 11 | odčítání | `-` |
| ... | ... | ... |
| 2 | přiřazení | `=` |
| ... | ... | ... |

Jak vidíme, „unární plus“ má prioritu `14`, která je vyšší než priorita `11` „sčítání“ (binární plus). To je důvod, proč se ve výrazu `"+jablka + +pomeranče"` unární plusy vyhodnotí před sčítáním.

## Přiřazení

Všimněte si, že přiřazení `=` je také operátor. V tabulce priorit je uveden s velmi nízkou prioritou `2`.

To je důvod, proč při přiřazení proměnné, např. `x = 2 * 2 + 1`, se nejprve provedou výpočty a až potom se vyhodnotí `=`, které uloží výsledek do `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

### Přiřazení = vrátí hodnotu

Skutečnost, že `=` je operátor a ne nějaký „magický“ jazykový konstrukt, má zajímavý důsledek.

Všechny operátory v JavaScriptu vracejí nějakou hodnotu. Pro `+` a `-` je to samozřejmé, ale platí to i pro `=`.

Volání `x = hodnota` zapíše hodnotu `hodnota` do `x` *a pak ji vrátí*.

Následuje ukázka, v níž je přiřazení využito jako součást složitějšího výrazu:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

V uvedeném příkladu je výsledkem výrazu `(a = b + 1)` hodnota, která je přiřazena do `a` (což je `3`). Ta se pak použije pro další výpočty.

Legrační kód, že? Měli bychom porozumět, jak funguje, protože v knihovnách JavaScriptu bývá občas k vidění.

Přesto vás prosíme, abyste takový kód nepsali. Takové triky zcela jistě nepřispívají k jeho jasnosti a čitelnosti.

### Zřetězení přiřazení

Další zajímavá vlastnost je možnost zřetězit přiřazení za sebou:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Zřetězená přiřazení se vyhodnocují zprava doleva. Nejprve se vyhodnotí výraz `2 + 2` nejvíce vpravo a jeho hodnota se pak přiřadí do proměnných vlevo: `c`, `b` a `a`. Nakonec tedy budou mít všechny proměnné stejnou hodnotu.

Opět je pro účely čitelnosti lepší rozdělit takový kód do více řádků:

```js
c = 2 + 2;
b = c;
a = c;
```
Snadněji se to čte, zejména když kód rychle projíždíte očima.

## Modifikace na místě

Často potřebujeme aplikovat operátor na nějakou proměnnou a uložit nový výsledek do této proměnné.

Příklad:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Tento zápis lze zkrátit pomocí operátorů `+=` a `*=`:

```js run
let n = 2;
n += 5; // nyní n = 7 (totéž jako n = n + 5)
n *= 2; // nyní n = 14 (totéž jako n = n * 2)

alert( n ); // 14
```

Takové „modifikační“ operátory existují pro všechny aritmetické a bitové operátory: `/=`, `-=`, apod.

Tyto operátory mají stejnou prioritu jako běžné přiřazení, takže se provedou až po většině ostatních výpočtů:

```js run
let n = 2;

n *= 3 + 5; // napřed se provede část vpravo, totéž jako n *= 8

alert( n ); // 16
```

## Inkrementace a dekrementace

<!-- Can't use -- in title, because the built-in parser turns it into a 'long dash' – -->

Jednou z nejběžnějších číselných operací je zvýšení nebo snížení čísla o 1 (inkrementace, dekrementace).

Proto pro ně existují speciální operátory:

- **Inkrementace** `++` zvýší proměnnou o 1:

    ```js run no-beautify
    let čítač = 2;
    čítač++;        // funguje stejně jako čítač = čítač + 1, ale je to kratší
    alert( čítač ); // 3
    ```
- **Dekrementace** `--` sníží proměnnou o 1:

    ```js run no-beautify
    let čítač = 2;
    čítač--;        // funguje stejně jako čítač = čítač - 1, ale je to kratší
    alert( čítač ); // 1
    ```

```warn
Inkrementaci a dekrementaci lze aplikovat pouze na proměnné. Pokus použít ji na hodnotu, např. `5++`, vyvolá chybu.
```

Operátory `++` a `--` lze umístit před i za proměnnou.

- Je-li operátor umístěn za proměnnou, nazývá se to „postfixová notace“: `čítač++`.
- „Prefixová notace“ je umístění operátoru před proměnnou: `++čítač`.

Oba tyto příkazy vykonají totéž: zvýší `čítač` o `1`.

Je v nich tedy nějaký rozdíl? Ano, ale uvidíme ho jen tehdy, když použijeme hodnotu, kterou operátor `++/--` vrátí.

Ujasněme si to. Jak víme, všechny operátory vracejí nějakou hodnotu. Inkrementace a dekrementace nejsou výjimkou. Prefixová notace vrací novou hodnotu, zatímco postfixová notace vrací starou hodnotu (tu před zvýšením nebo snížením).

Abychom viděli rozdíl, uvedeme příklad:

```js run
let čítač = 1;
let a = ++čítač; // (*)

alert(a); // *!*2*/!*
```

Na řádku `(*)` *prefixová* notace `++čítač` zvýšila `čítač` a vrátila novou hodnotu, `2`. Proto `alert` zobrazila `2`.

Nyní použijeme postfixovou notaci:

```js run
let čítač = 1;
let a = čítač++; // (*) změnili jsme ++čítač na čítač++

alert(a); // *!*1*/!*
```

Na řádku `(*)` *postfixová* notace `čítač++` rovněž zvýšila `čítač`, ale vrátila *starou* hodnotu (tu před zvýšením). Proto `alert` zobrazil `1`.

Shrneme to:

- Pokud výsledek zvýšení nebo snížení nepoužijeme, není rozdíl v tom, kterou notaci použijeme:

    ```js run
    let čítač = 0;
    čítač++;
    ++čítač;
    alert( čítač ); // 2, oba výše uvedené řádky dělají totéž
    ```
- Pokud chceme zvýšit hodnotu *a* výsledek operátoru ihned použít, potřebujeme prefixovou notaci:

    ```js run
    let čítač = 0;
    alert( ++čítač ); // 1
    ```
- Pokud chceme zvýšit hodnotu, ale použít předchozí hodnotu, potřebujeme postfixovou notaci:

    ```js run
    let čítač = 0;
    alert( čítač++ ); // 0
    ```

````smart header="Inkrementace a dekrementace mezi jinými operátory"
Operátory `++/--` je možné použít i uvnitř výrazů. Jejich priorita je vyšší než priorita většiny ostatních aritmetických operací.

Příklad:

```js run
let čítač = 1;
alert( 2 * ++čítač ); // 4
```

Porovnejte si to s:

```js run
let čítač = 1;
alert( 2 * čítač++ ); // 2, protože čítač++ vrací „starou“ hodnotu
```

Ačkoli je to technicky v pořádku, takový zápis obvykle snižuje čitelnost kódu. Jeden řádek provádí více věcí, a to není dobré.

Když čteme kód, při rychlém „svislém“ projíždění očima můžeme snadno přehlédnout něco jako `čítač++` a nevšimneme si, že se proměnná zvýšila.

Doporučujeme psát stylem „jeden řádek -- jedna akce“:

```js run
let čítač = 1;
alert( 2 * čítač );
čítač++;
```
````

## Bitové operátory

Bitové operátory zacházejí s argumenty jako s 32-bitovými celými čísly a pracují na úrovni jejich binární reprezentace.

Tyto operátory nejsou specifické pro JavaScript. Podporuje je většina programovacích jazyků.

Seznam operátorů:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT (posun doleva) ( `<<` )
- RIGHT SHIFT (posun doprava) ( `>>` )
- ZERO-FILL RIGHT SHIFT (posun doprava s doplněním nul) ( `>>>` )

Tyto operátory se používají jen velmi zřídka, když potřebujeme pracovat s čísly na naprosto nejnižší (bitové) úrovni. Nebudeme je v dohledné době potřebovat, jelikož při vývoji webů se využívají jen málokdy, ale jsou užitečné v některých speciálních oblastech, například v kryptografii. Až je budete potřebovat, můžete si o nich přečíst [článek](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise) na MDN.

## Čárka

Operátor čárky `,` je jeden z nejvzácnějších a nejneobvyklejších operátorů. Někdy se používá k psaní kratšího kódu, takže jej potřebujeme znát, abychom pochopili, o co tady jde.

Operátor čárky nám umožňuje vyhodnotit několik výrazů za sebou, oddělených čárkou `,`. Vyhodnotí se každý z nich, ale vrátí se jen výsledek posledního.

Příklad:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (výsledek 3 + 4)
```

Zde se napřed vyhodnotí první výraz `1 + 2` a jeho výsledek se zahodí. Pak se vyhodnotí `3 + 4` a jeho výsledek je vrácen.

```smart header="Čárka má velmi nízkou prioritu"
Všimněte si, že operátor čárky má velmi nízkou prioritu, dokonce nižší než `=`, takže závorky jsou ve výše uvedeném příkladu nezbytné.

Bez nich: `a = 1 + 2, 3 + 4`, jako první by se vyhodnotilo `+`, které by sečetlo čísla do `a = 3, 7`, pak by operátor přiřazení `=` přiřadil `a = 3` a zbytek by se ignoroval. Bylo by to jako `(a = 1 + 2), 3 + 4`.
```

K čemu potřebujeme operátor, který zahodí všechno kromě posledního výrazu?

Někdy jej lidé používají ve složitějších konstrukcích, aby umístili několik akcí na jeden řádek.

Příklad:

```js
// tři operace na jednom řádku
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Takové triky se používají v mnoha rámcích JavaScriptu, a proto se o nich zmiňujeme. Obvykle však zrovna nezlepšují čitelnost kódu, a proto byste si jejich používání měli dobře rozmyslet.
