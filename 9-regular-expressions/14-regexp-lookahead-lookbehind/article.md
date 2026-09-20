# Dopředné a zpětné nahlédnutí

Někdy potřebujeme najít jen ty shody se vzorem, které se nacházejí před nebo za jiným vzorem.

K tomu existuje speciální syntaxe, nazývaná „dopředné nahlédnutí“ („lookahead“) a „zpětné nahlédnutí“ („lookbehind“). Obě společně se nazývají „nahlédnutí“ („lookaround“).

Pro začátek najděme cenu v řetězci, např. `subject:1 krocan stojí 30€`. To znamená: číslo, po němž následuje znak `subject:€`.

## Dopředné nahlédnutí

Syntaxe je: `pattern:X(?=Y)`, znamená „najdi `pattern:X`, ale jen pokud za ním následuje `pattern:Y`“. Na místě `pattern:X` a `pattern:Y` může být libovolný vzor.

Pro celé číslo následované znakem `subject:€` bude regulární výraz `pattern:\d+(?=€)`:

```js run
let řetězec = "1 krocan stojí 30€";

alert( řetězec.match(/\d+(?=€)/) ); // 30, číslo 1 se ignoruje, neboť po něm nenásleduje €
```

Prosíme všimněte si, že nahlédnutí je pouhý test, obsah závorek `pattern:(?=...)` nebude do výsledku `match:30` zahrnut.

Když hledáme `pattern:X(?=Y)`, motor regulárních výrazů najde `pattern:X` a pak ověří, zda okamžitě za ním následuje `pattern:Y`. Pokud ne, potenciální shoda se přeskočí a hledání pokračuje.

Jsou možné i složitější testy, např. `pattern:X(?=Y)(?=Z)` znamená:

1. Najdi `pattern:X`.
2. Ověř, zda `pattern:Y` je okamžitě za `pattern:X` (pokud ne, přeskoč ho).
3. Ověř, zda `pattern:Z` je také okamžitě za `pattern:X` (pokud ne, přeskoč ho).
4. Pokud oba testy prošly, je `pattern:X` shoda, jinak pokračuj v hledání.

Jinými slovy, takový vzor znamená, že hledáme `pattern:X`, po němž následují současně `pattern:Y` a `pattern:Z`.

To je možné jen tehdy, pokud se vzory `pattern:Y` a `pattern:Z` navzájem nevylučují.

Například `pattern:\d+(?=\s)(?=.*30)` hledá `pattern:\d+`, po němž následuje mezera `pattern:(?=\s)` a někde za ním je `30` `pattern:(?=.*30)`:

```js run
let řetězec = "1 krocan stojí 30€";

alert( řetězec.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

V našem řetězci tomu přesně odpovídá číslo `1`.

## Negativní dopředné hledání

Řekněme, že chceme ve stejném řetězci hledat množství, ne cenu. To znamená číslo `pattern:\d+`, po němž NENÁSLEDUJE `subject:€`.

K tomu můžeme použít negativní dopředné hledání.

Syntaxe je: `pattern:X(?!Y)`, znamená „najdi `pattern:X`, ale jen pokud za ním nenásleduje `pattern:Y`“.

```js run
let řetězec = "2 krocani stojí 60€";

alert( řetězec.match(/\d+\b(?!€)/g) ); // 2 (cena neodpovídá)
```

## Zpětné hledání

```warn header="Kompatibilita prohlížečů se zpětným hledáním"
Prosíme všimněte si: Zpětné hledání není podporováno v prohlížečích, které nejsou postaveny na V8, např. Safari nebo Internet Explorer.
```

Dopředné hledání umožňuje přidat podmínku pro to, „co následuje“.

Zpětné hledání funguje podobně, ale dívá se dozadu. To znamená, že umožňuje najít vzor jen tehdy, pokud je něco před ním.

Syntaxe je:
- Pozitivní zpětné hledání: `pattern:(?<=Y)X`, najde `pattern:X`, ale jen pokud před ním je `pattern:Y`.
- Negativní zpětné hledání: `pattern:(?<!Y)X`, najde `pattern:X`, ale jen pokud před ním není `pattern:Y`.

Změňme například cenu na americké dolary. Znak dolaru se obvykle uvádí před číslem, takže pro hledání `$30` použijeme `pattern:(?<=\$)\d+` -- číslo, před kterým je `subject:$`:

```js run
let řetězec = "1 krocan stojí $30";

// znak dolaru je za únikovým znakem \$
alert( řetězec.match(/(?<=\$)\d+/) ); // 30 (samostatné číslo přeskočíme)
```

A pokud potřebujeme množství -- číslo, před nímž není `subject:$`, můžeme použít negativní zpětné hledání `pattern:(?<!\$)\d+`:

```js run
let řetězec = "2 krocani stojí $60";

alert( řetězec.match(/(?<!\$)\b\d+/g) ); // 2 (cena neodpovídá)
```

## Zachytávací skupiny

Obsah uvnitř závorek obklopujících nahlédnutí se obvykle nestává součástí výsledku.

Například ve vzoru `pattern:\d+(?=€)` nebude znak `pattern:€` zachycen jako součást shody. To je přirozené: hledáme číslo `pattern:\d+`, zatímco `pattern:(?=€)` je jen test, že by po něm mělo následovat `subject:€`.

V některých situacích však můžeme chtít zachytit i nahlížený výraz nebo jeho část. I to je možné. Jednoduše uzavřeme tuto část do dalších závorek.

V následujícím příkladu je znak měny `pattern:(€|kr)` zachycen společně s částkou:

```js run
let řetězec = "1 krocan stojí 30€";
let rv = /\d+(?=(€|kr))/; // další závorky kolem €|kr

alert( řetězec.match(rv) ); // 30, €
```

A zde je totéž pro zpětné nahlédnutí:

```js run
let řetězec = "1 krocan stojí $30";
let rv = /(?<=(\$|£))\d+/;

alert( řetězec.match(rv) ); // 30, $
```

## Shrnutí

Dopředné a zpětné nahlédnutí (společně nazývaná „nahlédnutí“) jsou užitečná, když chceme najít něco, co závisí na kontextu před/za sebou.

U jednoduchých regulárních výrazů můžeme něco podobného udělat ručně. To znamená: najít všechno v jakémkoli kontextu a pak výsledky filtrovat podle kontextu v cyklu.

Nezapomeňte, že `řetězec.match` (bez příznaku `pattern:g`) a `řetězec.matchAll` (vždy) vrátí shody jako pole s vlastností `index`, takže přesně víme, kde v textu se shoda nachází, a můžeme zkontrolovat kontext.

Nahlédnutí je však obecně vhodnější.

Druhy nahlédnutí:

| Vzor               | Typ              | Najde   |
|--------------------|------------------|---------|
| `X(?=Y)`   | Pozitivní dopředné nahlédnutí | `pattern:X`, pokud za ním je `pattern:Y` |
| `X(?!Y)`   | Negativní dopředné nahlédnutí | `pattern:X`, pokud za ním není `pattern:Y` |
| `(?<=Y)X` |  Pozitivní zpětné nahlédnutí | `pattern:X`, pokud před ním je `pattern:Y` |
| `(?<!Y)X` | Negativní zpětné nahlédnutí | `pattern:X`, pokud před ním není `pattern:Y` |
