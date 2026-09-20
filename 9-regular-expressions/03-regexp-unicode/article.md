# Unicode: příznak „u“ a třída \p{...}

JavaScript používá pro řetězce [kódování Unicode](https://cs.wikipedia.org/wiki/Unicode). Většina znaků je zakódována do 2 bytů, ale to umožňuje reprezentovat nejvýše 65536 znaků.

Tento rozsah nestačí pro zakódování všech možných znaků, proto jsou některé vzácné znaky zakódovány do 4 bytů, například `𝒳` (matematické X) nebo `😄` (úsměv), některé hieroglyfy a podobně.

Zde jsou hodnoty některých znaků v Unicode:

| Znak  | Unicode | Počet bytů v Unicode  |
|------------|---------|--------|
| a | `0x0061` |  2 |
| ≈ | `0x2248` |  2 |
|𝒳| `0x1d4b3` | 4 |
|𝒴| `0x1d4b4` | 4 |
|😄| `0x1f604` | 4 |

Znaky jako `a` a `≈` tedy zabírají 2 byty, zatímco kódy pro `𝒳`, `𝒴` a `😄` jsou delší a mají 4 byty.

Před delší dobou, když JavaScript vznikl, bylo kódování Unicode jednodušší: neobsahovalo 4-bytové znaky. Některé prvky jazyka je tedy stále zpracovávají nesprávně.

Například `length` si myslí, že to jsou dva znaky:

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

...Ale my vidíme, že tam je jen jeden znak, že? Důvod spočívá v tom, že `length` zachází se 4 byty jako se dvěma 2-bytovými znaky. To je nekorektní, protože se s nimi musí zacházet vždy společně (tzv. „zástupný pár“, můžete si o něm přečíst v článku <info:string>).

Regulární výrazy také standardně zacházejí se 4-bytovými „dlouhými znaky“ jako s párem 2-bytových. A stejně jako u řetězců to může vést k podivným výsledkům. Uvidíme to o něco později, v článku <info:regexp-character-sets-and-ranges>.

Na rozdíl od řetězců však regulární výrazy mají příznak `pattern:u`, který tyto problémy řeší. S tímto příznakem RV zpracovává 4-bytové znaky správně. Rovněž se tím zpřístupní vyhledávání podle vlastnosti v Unicode, ke kterému se dostaneme dále.

## Vlastnosti Unicode \p{...}

Každý znak v Unicode má mnoho vlastností. Ty popisují, do jaké „kategorie“ tento znak patří, a obsahují o něm různé informace.

Například pokud znak má vlastnost `Letter` (písmeno), znamená to, že patří do nějaké abecedy (jakéhokoli jazyka). A vlastnost `Number` (číslo) znamená, že to je číslice: může být arabská, čínská i jiná.

Můžeme vyhledávat znaky s určitou vlastností pomocí zápisu `pattern:\p{…}`. Abychom mohli `pattern:\p{…}` použít, musí regulární výraz obsahovat příznak `pattern:u`.

Například `\p{Letter}` znamená písmeno v jakémkoli jazyce. Můžeme psát i `\p{L}`, jelikož `L` je zkratka pro `Letter`. Zkratka existuje pro téměř každou vlastnost.

V následujícím příkladu můžeme najít písmena tří druhů: anglické, gruzínské a korejské.

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (žádná shoda, \p nefunguje bez příznaku "u")
```

Hlavní kategorie znaků a jejich podkategorie jsou následující:

- Písmeno `L`:
  - malé `Ll`,
  - modifikátor `Lm`,
  - titulkové `Lt`,
  - velké `Lu`,
  - jiné `Lo`.
- Číslo `N`:
  - desítková číslice `Nd`,
  - písmenné číslo `Nl`,
  - jiné `No`.
- Interpunkční znaménko `P`:
  - spojovník `Pc`,
  - pomlčka `Pd`,
  - počáteční uvozovky `Pi`,
  - koncové uvozovky `Pf`,
  - otevírací závorka `Ps`,
  - uzavírací závorka `Pe`,
  - jiné `Po`.
- Diakritické znaménko `M` (přízvuky apod.):
  - vedle písmene („spacing combining“) `Mc`,
  - obklopující `Me`,
  - nad nebo pod písmenem `Mn`.
- Symbol `S`:
  - měny `Sc`,
  - modifikátor `Sk`,
  - matematický `Sm`,
  - jiný `So`.
- Oddělovač `Z`:
  - čára `Zl`,
  - odstavec `Zp`,
  - mezera `Zs`.
- Jiné `C`:
  - řídící znak `Cc`,
  - formátovací znak `Cf`,
  - nepřiřazený `Cn`,
  - k soukromému použití `Co`,
  - zástupný `Cs`.

Když tedy například potřebujeme malá písmena, můžeme zapsat `pattern:\p{Ll}`, pro interpunkční znaménka `pattern:\p{P}` a tak dále.

Existují i jiné odvozené kategorie, například:
- `Alphabetic` (`Alpha`), obsahuje písmena `L`, písmenná čísla `Nl` (např. Ⅻ - znak pro římské číslo 12) a některé další symboly `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` obsahuje hexadecimální číslice: `0-9`, `a-f`.
- ...a podobně.

Unicode podporuje mnoho různých vlastností a jejich úplný seznam by zabral spoustu místa, proto uvádíme odkazy:

- Seznam všech vlastností podle znaků: <https://unicode.org/cldr/utility/character.jsp>.
- Seznam všech znaků podle vlastností: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Zkratky vlastností: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- Úplný seznam znaků v Unicode v textovém formátu se všemi vlastnostmi je zde: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Příklad: čísla v šestnáctkové soustavě

Hledejme například čísla v šestnáctkové soustavě zapsaná jako `xFF`, kde `F` je hexadecimální číslice (0..9 nebo A..F).

Hexadecimální číslici můžeme zapsat jako `pattern:\p{Hex_Digit}`:

```js run
let rv = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("číslo: xAF".match(rv)); // xAF
```

### Příklad: čínské hieroglyfy

Hledejme čínské hieroglyfy.

V Unicode existuje vlastnost `Script` (písmenná soustava), která může mít hodnotu: `Cyrillic`, `Greek`, `Arabic`, `Han` (čínská) a tak dále, [úplný seznam je zde](https://en.wikipedia.org/wiki/Script_(Unicode)).

Pro hledání znaků určité písmenné soustavy bychom měli použít `pattern:Script=<hodnota>`, např. pro písmena kyrilice: `pattern:\p{sc=Cyrillic}`, pro čínské hieroglyfy: `pattern:\p{sc=Han}`, a tak dále:

```js run
let rv = /\p{sc=Han}/gu; // vrátí čínské hieroglyfy

let řetězec = `Ahoj Привет 你好 123_456`;

alert( řetězec.match(rv) ); // 你,好
```

### Příklad: měna

Znaky, které označují měnu, například `$`, `€`, `¥`, mají v Unicode vlastnost `pattern:\p{Currency_Symbol}`, zkratka: `pattern:\p{Sc}`.

Použijme ji pro hledání cen ve formátu „měna následovaná číslicí“:

```js run
let rv = /\p{Sc}\d/gu;

let řetězec = `Ceny: $2, €1, ¥9`;

alert( řetězec.match(rv) ); // $2,€1,¥9
```

Později, v článku <info:regexp-quantifiers>, uvidíme, jak najít čísla obsahující více číslic.

## Shrnutí

Příznak `pattern:u` umožňuje podporu Unicode v regulárních výrazech.

To znamená dvě věci:

1. Znaky o délce 4 byty budou zpracovány správně: jako jediný znak, ne jako dva 2-bytové znaky.
2. Pro hledání můžeme použít vlastnosti v Unicode: `\p{…}`.

Pomocí vlastností v Unicode můžeme hledat slova v určitém jazyce, speciální znaky (uvozovky, měny) a podobně.
