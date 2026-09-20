# Množiny a rozsahy [...]

Více znaků nebo znakových tříd uvnitř hranatých závorek `[…]` znamená „najdi kterýkoli z uvedených znaků“.

## Množiny

Například `pattern:[eao]` znamená kterýkoli z těchto 3 znaků: `'a'`, `'e'` nebo `'o'`.

To se nazývá *množina*. Množiny lze používat v regulárním výrazu spolu s běžnými znaky:

```js run
// najdi [t nebo m] a pak "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

Prosíme všimněte si, že ačkoli je v množině několik znaků, ve shodě jim odpovídá právě jeden znak.

Následující příklad tedy nenajde žádnou shodu:

```js run
// najdi "V", pak [o nebo i], pak "la"
alert( "Voila".match(/V[oi]la/) ); // null, žádná shoda
```

Vzor hledá:

- `pattern:V`,
- pak *jedno* z písmen `pattern:[oi]`,
- pak `pattern:la`.

Shoda tedy nastane pro `match:Vola` nebo `match:Vila`.

## Rozsahy

Hranaté závorky mohou obsahovat i *rozsahy znaků*.

Například `pattern:[a-z]` znamená libovolný znak v rozsahu od `a` do `z` a `pattern:[0-5]` znamená číslici od `0` do `5`.

V následujícím příkladu hledáme `"x"`, po němž následují dvě číslice nebo písmena od `A` do `F`:

```js run
alert( "Výjimka 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

Zde `pattern:[0-9A-F]` obsahuje dva rozsahy: najde znak, kterým je buď číslice od `0` do `9`, nebo písmeno od `A` do `F`.

Kdybychom chtěli hledat i malá písmena, mohli bychom přidat rozsah `a-f`: `pattern:[0-9A-Fa-f]`. Nebo uvést příznak `pattern:i`.

Uvnitř `[…]` můžeme používat i znakové třídy.

Kdybychom například chtěli hledat slovní znak `pattern:\w` nebo pomlčku `pattern:-`, pak by množina byla `pattern:[\w-]`.

Je možné i kombinovat více tříd, např. `pattern:[\s\d]` znamená „mezerový znak nebo číslice“.

```smart header="Znakové třídy jsou zkratky určitých množin znaků"
Například:

- **\d** -- je totéž jako `pattern:[0-9]`,
- **\w** -- je totéž jako `pattern:[a-zA-Z0-9_]`,
- **\s** -- je totéž jako `pattern:[\t\n\v\f\r ]` plus několik dalších vzácných mezerových znaků z Unicode.
```

### Příklad: vícejazyčné \w

Protože znaková třída `pattern:\w` je zkratkou pro `pattern:[a-zA-Z0-9_]`, nedokáže najít čínské hieroglyfy, písmena kyrilice a podobně.

Můžeme si napsat univerzálnější vzor, který bude hledat slovní znaky jakéhokoli jazyka. S vlastnostmi z Unicode je to snadné: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Rozšifrujme to. Vytváříme si vlastní množinu podobnou `pattern:\w`, která obsahuje znaky s následujícími vlastnostmi v Unicode:

- `Alphabetic` (`Alpha`) - písmena,
- `Mark` (`M`) - diakritická znaménka,
- `Decimal_Number` (`Nd`) - číslice,
- `Connector_Punctuation` (`Pc`) - podtržítko `'_'` a podobné znaky,
- `Join_Control` (`Join_C`) - dva speciální kódy `200c` a `200d` používané v ligaturách, např. v arabštině.

Příklad použití:

```js run
let rv = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let řetězec = `Čau 你好 12`;

// najde všechna písmena a číslice:
alert( řetězec.match(rv) ); // Č,a,u,你,好,1,2
```

Tento vzor můžeme samozřejmě měnit: přidávat nebo odstraňovat vlastnosti z Unicode. Tyto vlastnosti jsou podrobněji probrány v článku <info:regexp-unicode>.

```warn header="Vlastnosti z Unicode nejsou podporovány v IE"
Vlastnosti z Unicode `pattern:p{…}` nejsou implementovány v IE. Pokud je opravdu potřebujeme, můžeme použít knihovnu [XRegExp](https://xregexp.com/).

Nebo jen použít rozsahy znaků v jazyce, který nás zajímá, např. `pattern:[а-я]` pro písmena kyrilice.
```

## Vylučovací rozsahy

Kromě normálních rozsahů existují také „vylučovací“ rozsahy, které vypadají takto: `pattern:[^…]`.

Jsou na začátku označeny znakem stříšky `^` a odpovídá jim každý znak *kromě uvedených*.

Například:

- `pattern:[^aeyo]` -- jakýkoli znak kromě  `'a'`, `'e'`, `'y'` nebo `'o'`.
- `pattern:[^0-9]` -- jakýkoli znak kromě číslice, totéž jako `pattern:\D`.
- `pattern:[^\s]` -- jakýkoli nemezerový znak, totéž jako `\S`.

Následující příklad hledá všechny znaky kromě písmen, číslic a mezer:

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ a .
```

## Únikové znaky v […]

Když chceme najít přímo speciální znak, obvykle před ním musíme uvést únikový znak `pattern:\.`. Pokud potřebujeme zpětné lomítko, používáme `pattern:\\` a podobně.

V hranatých závorkách můžeme používat převážnou většinu speciálních znaků bez únikového znaku:

- Symboly `pattern:. + ( )` nikdy nepotřebují únikový znak.
- Pomlčka `pattern:-` nepotřebuje únikový znak na začátku a na konci (kde nedefinuje rozsah).
- Stříška `pattern:^` potřebuje únikový znak jen na začátku (kde znamená vyloučení).
- Uzavírací hranatá závorka `pattern:]` potřebuje únikový znak vždy (pokud ji potřebujeme hledat).

Jinými slovy, všechny speciální znaky jsou povoleny bez únikového znaku kromě situace, kdy mají v hranatých závorkách nějaký zvláštní význam.

Tečka `.` uvnitř hranatých závorek znamená skutečnou tečku. Vzor `pattern:[.,]` najde jeden z uvedených znaků: buď tečku, nebo čárku.

V následujícím příkladu RV `pattern:[-().^+]` hledá jeden ze znaků `-().^+`:

```js run
// Nepotřebujeme únikový znak
let rv = /[-().^+]/g;

alert( "1 + 2 - 3".match(rv) ); // Najde +, -
```

...Když se však rozhodnete „pro všechny případy“ únikový znak uvést, ničemu tím neublížíte:

```js run
// Únikový znak všude
let rv = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(rv) ); // také to funguje: +, -
```

## Rozsahy a příznak „u“

Jestliže jsou v množině zástupné páry, je třeba uvést příznak `pattern:u`, aby fungovaly správně.

Podívejme se například na `pattern:[𝒳𝒴]` v řetězci `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // zobrazí podivný znak, např. [?]
// (hledání bylo provedeno nesprávně, vrátila se polovina znaku)
```

Výsledek není správný, protože regulární výrazy standardně „neznají“ zástupné páry.

Motor regulárních výrazů si myslí, že `[𝒳𝒴]` nejsou dva, ale čtyři znaky:
1. levá polovina `𝒳` `(1)`,
2. pravá polovina `𝒳` `(2)`,
3. levá polovina `𝒴` `(3)`,
4. pravá polovina `𝒴` `(4)`.

Jejich kódy můžeme vidět následovně:

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

Výše uvedený příklad tedy najde a zobrazí levou polovinu znaku `𝒳`.

Jestliže přidáme příznak `pattern:u`, chování bude korektní:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

Obdobná situace nastane, když budeme hledat rozsah, například `[𝒳-𝒴]`.

Pokud zapomeneme uvést příznak `pattern:u`, nastane chyba:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression
```

Důvodem je, že bez příznaku `pattern:u` se zástupné páry považují za dva znaky, takže `[𝒳-𝒴]` je interpretováno jako `[<55349><56499>-<55349><56500>]` (každý zástupný pár je nahrazen svými kódy). Nyní jasně vidíme, proč je rozsah `56499-55349` neplatný: jeho počáteční kód `56499` je větší než koncový `55349`. To je formální příčina chyby.

S příznakem `pattern:u` bude vzor fungovat správně:

```js run
// hledá znaky od 𝒳 do 𝒵
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
