# Alternace (NEBO) |

Alternace je v regulárních výrazech pojem, který ve skutečnosti znamená jednoduše „NEBO“.

V regulárním výrazu je označován znakem svislé čáry `pattern:|`.

Například potřebujeme najít názvy programovacích jazyků: HTML, PHP, Java nebo JavaScript.

Odpovídající regulární výraz: `pattern:html|php|java(script)?`.

Příklad použití:

```js run
let rv = /html|php|css|java(script)?/gi;

let řetězec = "Napřed se objevil HTML, pak CSS, pak JavaScript";

alert( řetězec.match(rv) ); // 'HTML', 'CSS', 'JavaScript'
```

Už jsme viděli něco podobného -- hranaté závorky. Ty nám umožňují výběr z několika znaků, například `pattern:gr[ae]y` najde `match:gray` nebo `match:grey`.

Hranaté závorky umožňují jen znaky nebo znakové třídy. Alternace umožňuje libovolné výrazy. Regulární výraz `pattern:A|B|C` znamená jeden z výrazů `A`, `B` nebo `C`.

Příklad:

- `pattern:gr(a|e)y` znamená přesně totéž jako `pattern:gr[ae]y`.
- `pattern:gra|ey` znamená `match:gra` nebo `match:ey`.

Abychom aplikovali alternaci na zvolenou část vzoru, můžeme ji uzavřít do závorek:
- `pattern:Mám rád HTML|CSS` znamená `match:Mám rád HTML` nebo `match:CSS`.
- `pattern:Mám rád (HTML|CSS)` znamená `match:Mám rád HTML` nebo `match:Mám rád CSS`.

## Příklad: regulární výraz pro čas

V předchozích článcích jsme měli úlohu na vytvoření RV pro hledání času ve tvaru `hh:mm`, například `12:00`. Jednoduchý výraz `pattern:\d\d:\d\d` je však příliš neurčitý. Přijme jako čas `25:99` (protože 99 minut odpovídá vzoru, ale čas je neplatný).

Jak můžeme vytvořit lepší vzor?

Můžeme použít pečlivější porovnávání. Napřed hodiny:

- Pokud je první číslice `0` nebo `1`, pak následující číslice může být libovolná: `pattern:[01]\d`.
- Jinak pokud je první číslice `2`, pak následující musí být `pattern:[0-3]`.
- (žádná jiná první číslice není povolena)

V regulárním výrazu můžeme zapsat obě varianty pomocí alternace: `pattern:[01]\d|2[0-3]`.

Dále minuty musejí být od `00` do `59`. V jazyce regulárních výrazů to můžeme zapsat jako `pattern:[0-5]\d`: první číslice `0-5` a pak libovolná.

Když spojíme hodiny a minuty dohromady, získáme vzor: `pattern:[01]\d|2[0-3]:[0-5]\d`.

Jsme téměř hotovi, ale je tu problém. Alternace `pattern:|` se nyní děje mezi `pattern:[01]\d` a `pattern:2[0-3]:[0-5]\d`.

To znamená, že minuty jsou přidány jako druhá varianta alternace, zde je to jasně vidět:

```
[01]\d  |  2[0-3]:[0-5]\d
```

Tento vzor hledá `pattern:[01]\d` nebo `pattern:2[0-3]:[0-5]\d`.

To je však špatně, alternace by měla být použita jen v „hodinové“ části regulárního výrazu, aby umožňovala `pattern:[01]\d` NEBO `pattern:2[0-3]`. Opravme to uzavřením „hodin“ do závorek: `pattern:([01]\d|2[0-3]):[0-5]\d`.

Konečné řešení:

```js run
let rv = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(rv)); // 00:00,10:10,23:59
```
