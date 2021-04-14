
# Typ symbol

Podle specifikace mohou klíče vlastností objektů být buď typu řetězec, nebo typu symbol. Nesmějí to být ani čísla, ani booleany, jedině řetězce nebo symboly, tyto dva typy.

Doposud jsme používali pouze řetězce. Nyní se podívejme na výhody, jaké nám mohou poskytnout symboly.

## Symboly

„Symbol“ představuje unikátní identifikátor.

Hodnotu tohoto typu můžeme vytvořit pomocí `Symbol()`:

```js
// id je nový symbol
let id = Symbol();
```

Po vytvoření můžeme symbolu dát nějaký popis (nazývaný také název symbolu), což je užitečné zejména pro účely ladění:

```js
// id je symbol s popisem "id"
let id = Symbol("id");
```

Symboly jsou zaručeně unikátní. I když vytvoříme mnoho symbolů se stejným popisem, jejich hodnoty budou různé. Popis je jenom štítek, který nemá na nic vliv.

Například zde jsou dva symboly se stejným popisem -- přesto si nejsou rovny:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Jestliže znáte Ruby nebo jiný jazyk, který také obsahuje nějaký druh „symbolů“ -- prosíme, nenechte se zmást. Symboly v JavaScriptu jsou jiné.

````warn header="Symboly se automaticky nekonvertují na řetězce"
Většina hodnot v JavaScriptu podporuje implicitní konverzi na řetězec. Například můžeme použít `alert` na téměř jakoukoli hodnotu a bude fungovat. Symboly jsou zvláštní. Ty se automaticky nekonvertují.

Například tento `alert` ohlásí chybu:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

Je to „jazyková stráž“ proti nepořádku, jelikož řetězce a symboly jsou naprosto odlišné a neměly by se náhodně konvertovat jedny na druhé.

Jestliže opravdu chceme zobrazit symbol, musíme na něm explicitně zavolat `.toString()`, např. zde:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), nyní to funguje
*/!*
```

Nebo načíst vlastnost `symbol.description`, aby se zobrazil jen popis:
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## „Skryté“ vlastnosti

Symboly nám umožňují vytvářet „skryté“ vlastnosti objektu, k nimž žádná jiná část kódu nemůže neúmyslně přistoupit nebo je přepsat.

Například pracujeme s objekty `uživatel`, které patří do kódu třetí strany, a my bychom do nich rádi přidali identifikátory.

Použijeme pro ně symbolický klíč:

```js run
let uživatel = { // patří do jiného kódu
  name: "Jan"
};

let id = Symbol("id");

uživatel[id] = 1;

alert( uživatel[id] ); // můžeme přistupovat k datům pomocí tohoto symbolu jako klíče
```

Jaká je výhoda používání `Symbol("id")` oproti řetězci `"id"`?

Když objekt `uživatel` patří do jiného kódu a tento kód s ním také pracuje, neměli bychom do něj přidávat žádná pole. Není to bezpečné. Avšak k symbolu nelze neúmyslně přistoupit, kód třetí strany jej pravděpodobně ani neuvidí, takže je pravděpodobně v pořádku to udělat.

Představte si také, že jiný skript bude chtít uvnitř objektu `uživatel` mít svůj vlastní identifikátor pro své účely. Může to být jiná JavaScriptová knihovna, takže skripty o sobě navzájem vůbec nevědí.

Pak tento skript může vytvořit svůj vlastní `Symbol("id")`, například takto:

```js
// ...
let id = Symbol("id");

uživatel[id] = "Jeho hodnota id";
```

Nenastane žádný konflikt mezi našimi a jeho identifikátory, protože symboly jsou vždy různé, i když mají stejný název.

...Kdybychom však ke stejnému účelu místo symbolu použili řetězec `"id"`, pak by konflikt *nastal*:

```js
let uživatel = { jméno: "Jan" };

// Náš skript používá vlastnost „id“
uživatel.id = "Naše hodnota id";

// ...Jiný skript chce také „id“ pro své vlastní účely...

uživatel.id = "Jeho hodnota id"
// Bum! cizí skript nám ji přepsal!
```

### Symboly v objektovém literálu

Chceme-li použít symbol v objektovém literálu `{...}`, musíme jej uzavřít do hranatých závorek.

Například:

```js
let id = Symbol("id");

let uživatel = {
  jméno: "Jan",
*!*
  [id]: 123 // ne "id": 123
*/!*
};
```
Je to proto, že jako klíč potřebujeme hodnotu proměnné `id`, ne řetězec `"id"`.

### Cyklus for..in symboly přeskakuje

Symbolické vlastnosti se neúčastní cyklu `for..in`.

Například:

```js run
let id = Symbol("id");
let uživatel = {
  jméno: "Jan",
  věk: 30,
  [id]: 123
};

*!*
for (let klíč in uživatel) alert(klíč); // jméno, věk (žádné symboly)
*/!*

// přímý přístup k symbolu funguje
alert( "Přímo: " + uživatel[id] );
```

Ignoruje je i metoda `Object.keys(uživatel)`. To je součást obecného principu „skrývání symbolických vlastností“. Jestliže jiný skript nebo knihovna provádí cyklus nad naším objektem, nepřistoupí nečekaně k symbolické vlastnosti.

Naproti tomu [Object.assign](mdn:js/Object/assign) zkopíruje řetězcové i symbolické vlastnosti:

```js run
let id = Symbol("id");
let uživatel = {
  [id]: 123
};

let klon = Object.assign({}, uživatel);

alert( klon[id] ); // 123
```

Není to žádný paradox. Je to tak podle designu. Myšlenka je, že když klonujeme objekt nebo slučujeme objekty, chceme obvykle zkopírovat *všechny* vlastnosti (včetně symbolických, jako `id`).

## Globální symboly

Jak jsme viděli, všechny symboly jsou zpravidla různé, i když mají stejný název. Někdy však chceme, aby symboly se stejným názvem byly stejnými entitami. Například různé části naší aplikace chtějí přistupovat k symbolu `"id"`, který má znamenat stále tutéž vlastnost.

K tomu, abychom toho mohli dosáhnout, existuje *globální registr symbolů*. V něm můžeme symboly vytvořit a později k nim přistupovat. Registr nám zaručuje, že opakovaný přístup stejným názvem vrátí přesně stejný symbol.

K načtení (nebo vytvoření, pokud neexistuje) symbolu z registru použijeme `Symbol.for(klíč)`.

Tato metoda zavolá kontrolu globálního registru, a jestliže je v něm symbol popsaný jako `klíč`, vrátí jej, v opačném případě vytvoří nový symbol `Symbol(klíč)` a uloží ho do registru pod zadaným `klíč`em.

Například:

```js run
// načtení z globálního registru
let id = Symbol.for("id"); // jestliže symbol neexistoval, bude vytvořen

// načteme ho znovu (třeba z jiné části kódu)
let idZnovu = Symbol.for("id");

// tentýž symbol
alert( id === idZnovu ); // true
```

Symboly v tomto registru se nazývají *globální symboly*. Chceme-li symbol pro celou aplikaci, který bude dostupný všude v kódu -- k tomuto účelu nám registr slouží.

```smart header="To zní jako Ruby"
V některých programovacích jazycích, např. Ruby, existuje jediný symbol pro každý název.

V JavaScriptu, jak vidíme, to platí pro globální symboly.
```

### Symbol.keyFor

Pro globální symboly není jen `Symbol.for(klíč)`, která vrátí symbol podle názvu, ale existuje i opačná metoda: `Symbol.keyFor(sym)`, která udělá opak: vrátí název globálního symbolu.

Například:

```js run
// načteme symbol podle názvu
let sym = Symbol.for("jméno");
let sym2 = Symbol.for("id");

// načteme název podle symbolu
alert( Symbol.keyFor(sym) ); // jméno
alert( Symbol.keyFor(sym2) ); // id
```

Metoda `Symbol.keyFor` interně používá globální registr symbolů k vyhledání klíče pro symbol. Pro neglobální symboly tedy nefunguje. Není-li symbol globální, nebude ho schopna najít a vrátí `undefined`.

Když o tom mluvíme, všechny symboly mají vlastnost `description`.

Například:

```js run
let globálníSymbol = Symbol.for("jméno");
let lokálníSymbol = Symbol("jméno");

alert( Symbol.keyFor(globálníSymbol) ); // jméno, globální symbol
alert( Symbol.keyFor(lokálníSymbol) ); // undefined, není globální

alert( lokálníSymbol.description ); // jméno
```

## Systémové symboly

V JavaScriptu existuje mnoho „systémových“ symbolů, které JavaScript interně využívá a my je můžeme použít k vyladění různých aspektů našich objektů.

Jsou uvedeny ve specifikaci v tabulce [Dobře známé symboly](https://tc39.github.io/ecma262/#sec-well-known-symbols):

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...a tak dále.

Například `Symbol.toPrimitive` nám umožňuje popsat konverzi objektu na primitiv. Jeho použití uvidíme velmi brzy.

Až prostudujeme příslušné vlastnosti jazyka, seznámíme se i s jinými symboly.

## Shrnutí

`Symbol` je primitivní typ pro unikátní identifikátory.

Symboly se vytvářejí voláním `Symbol()` s nepovinným popisem (názvem).

Symboly jsou vždy různé hodnoty, i když mají stejný název. Jestliže chceme, aby si symboly se stejným názvem byly rovny, měli bychom použít globální registr: `Symbol.for(klíč)` vrátí (vytvoří, je-li potřeba) globální symbol, jehož název bude `klíč`. Více volání `Symbol.for` se stejnou hodnotou `klíč` vrátí přesně tentýž symbol.

Symboly mají dvě hlavní použití:

1. „Skryté“ vlastnosti objektů.
    Chceme-li do objektu přidat vlastnost, která „patří“ do jiného skriptu nebo knihovny, můžeme vytvořit symbol a použít jej jako klíč vlastnosti. Symbolická vlastnost se neobjeví ve `for..in`, takže nebude neúmyslně zpracována společně s ostatními vlastnostmi. Nikdo jiný k ní také nebude přímo přistupovat, jelikož jiný skript nebude mít náš symbol. Vlastnost tedy bude chráněna před náhodným použitím nebo přepsáním.

    Pomocí symbolických vlastností tedy můžeme „utajeně“ ukrýt do objektů něco, co potřebujeme, ale jiní by to neměli vidět.

2. JavaScript používá mnoho systémových symbolů, které jsou dostupné pomocí `Symbol.*`. Někdy je můžeme použít, abychom změnili vestavěné chování. Například později v tomto tutoriálu budeme používat `Symbol.iterator` pro [iterovatelné objekty](info:iterable), `Symbol.toPrimitive` k nastavení [konverze objektů na primitivy](info:object-toprimitive) a tak dále.

Z technického hlediska nejsou symboly na 100% skryté. Existuje vestavěná metoda [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols), která nám umožňuje získat všechny symboly. Existuje i metoda [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys), která vrátí *všechny* klíče objektu včetně symbolických. Nejsou tedy doopravdy skryté. Většina knihoven, vestavěných funkcí a syntaktických konstrukcí však tyto metody nepoužívá.