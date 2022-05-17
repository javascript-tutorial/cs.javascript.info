# Porovnávání

Z matematiky známe mnoho porovnávacích operátorů.

V JavaScriptu se píší následovně:

- Větší/menší než: <code>a &gt; b</code>, <code>a &lt; b</code>.
- Větší/menší nebo rovno: <code>a &gt;= b</code>, <code>a &lt;= b</code>.
- Rovno: `a == b`. Prosíme všimněte si, že znak dvou rovnítek za sebou `==` znamená test rovnosti, zatímco jediné rovnítko `a = b` znamená přiřazení.
- Nerovno: v matematice se používá znak <code>&ne;</code>, ale v JavaScriptu se píše <code>a != b</code>.

V tomto článku se dozvíme víc o různých druzích porovnání a o tom, jak s nimi JavaScript zachází, včetně důležitých zvláštností.

Na konci najdete recept, jak se vyhnout různým problémům způsobeným JavaScriptovými „vtípky“.

## Výsledkem je typ boolean

Všechny porovnávací operátory vracejí hodnotu typu boolean:

- `true` -- znamená „ano“, „správně“ nebo „pravda“.
- `false` -- znamená „ne“, „nesprávně“ nebo „nepravda“.

Příklad:

```js run
alert( 2 > 1 );  // true (správně)
alert( 2 == 1 ); // false (nesprávně)
alert( 2 != 1 ); // true (správně)
```

Výsledek porovnání můžeme přiřadit do proměnné, stejně jako každou jinou hodnotu:

```js run
let výsledek = 5 > 4; // přiřadíme výsledek porovnání
alert( výsledek ); // true
```

## Porovnávání řetězců

Ke zjištění, zda je jeden řetězec větší než jiný, JavaScript používá tzv. „slovníkové“ neboli „lexikografické“ pořadí.

Jinými slovy, řetězce se porovnávají znak po znaku.

Příklad:

```js run
alert( 'Z' > 'A' ); // true
alert( 'Glow' > 'Glee' ); // true
alert( 'Bee' > 'Be' ); // true
```

Algoritmus pro porovnání dvou řetězců je jednoduchý:

1. Porovnej první znak obou řetězců.
2. Je-li první znak prvního řetězce větší (menší) než první znak druhého řetězce, je první řetězec větší (menší) než druhý. Tím jsme hotovi.
3. V opačném případě, tedy jsou-li první znaky obou řetězců stejné, porovnej stejným způsobem druhé znaky.
4. Tento proces opakuj, dokud nedojdeš na konec některého z řetězců.
5. Mají-li oba řetězce stejnou délku, jsou si rovny. V opačném případě je delší řetězec větší.

Ve výše uvedených příkladech porovnání `'Z' > 'A'` dojde k výsledku hned v prvním kroku.

Porovnání řetězců `"Glow"` a `"Glee"` však vyžaduje více kroků, jelikož řetězce se porovnávají znak po znaku:

1. `G` je stejné jako `G`.
2. `l` je stejné jako `l`.
3. `o` je větší než `e`. Tady se zastavíme. První řetězec je větší.

```smart header="Není to skutečný slovník, ale pořadí podle Unicode"
Uvedený porovnávací algoritmus zhruba odpovídá tomu, jaký se používá k řazení ve slovnících nebo telefonních seznamech, ale není úplně stejný.

Například záleží na velikosti písmen. Velké písmeno `"A"` není rovno malému `"a"`. Které je větší? Malé `"a"`. Proč? Protože malá písmena mají v interní kódovací tabulce, kterou JavaScript používá (Unicode), vyšší index. Ke specifickým podrobnostem a důsledkům se vrátíme v kapitole <info:string>.
```

## Porovnávání rozdílných typů

Když JavaScript porovnává hodnoty různých typů, převádí je na čísla.

Příklad:

```js run
alert( '2' > 1 ); // true, řetězec '2' se převede na číslo 2
alert( '01' == 1 ); // true, řetězec '01' se převede na číslo 1
```

U hodnot typu boolean se `true` převede na `1` a `false` na `0`.

Příklad:

```js run
alert( true == 1 ); // true
alert( false == 0 ); // true
```

````smart header="Legrační důsledek"
Je možné, že současně:

- Dvě hodnoty se budou rovnat.
- Jedna z nich bude jako boolean `true` a druhá `false`.

Příklad:

```js run
let a = 0;
alert( Boolean(a) ); // false

let b = "0";
alert( Boolean(b) ); // true

alert(a == b); // true!
```

Z pohledu JavaScriptu je tento výsledek zcela normální. Test rovnosti převádí hodnoty pomocí konverze na čísla (proto se `"0"` převede na `0`), zatímco explicitní konverze `Boolean` funguje podle jiných pravidel.
````

## Striktní rovnost

Běžné ověření rovnosti `==` má problém. Nedokáže rozlišit `0` od `false`:

```js run
alert( 0 == false ); // true
```

Totéž platí pro prázdný řetězec:

```js run
alert( '' == false ); // true
```

To se děje proto, že operátor rovnosti `==` převádí operandy různých typů na čísla. Prázdný řetězec, stejně jako `false`, se převede na nulu.

Co máme dělat, jestliže chceme rozlišit `0` od `false`?

**Operátor striktní rovnosti `===` zkontroluje rovnost bez typové konverze.**

Jinými slovy, jsou-li `a` a `b` různých typů, pak `a === b` okamžitě vrátí `false`, aniž by se je pokusil konvertovat.

Zkusme to:

```js run
alert( 0 === false ); // false, protože typy jsou různé
```

Existuje i operátor „striktní nerovnosti“ `!==`, který je analogický s `!=`.

Operátor striktní rovnosti se píše trošičku déle, ale díky němu je hned zřejmé, o co tady jde, a ponechává méně prostoru k chybám.

## Porovnávání s null a undefined

Chování při porovnávání `null` nebo `undefined` s jinými hodnotami není zcela intuitivní.

U operátoru striktní rovnosti `===`
: Tyto hodnoty jsou různé, protože každá z nich je jiného typu.

    ```js run
    alert( null === undefined ); // false
    ```

U operátoru nestriktní rovnosti `==`
: Platí zvláštní pravidlo. Tyto dvě hodnoty tvoří „zamilovanou dvojici“: jsou si navzájem rovny (ve smyslu `==`), ale nejsou rovny žádné jiné hodnotě.

    ```js run
    alert( null == undefined ); // true
    ```

U matematických a jiných porovnání `< > <= >=`
: `null/undefined` se převádějí na čísla: `null` se převede na `0`, zatímco `undefined` se převede na `NaN`.

Nyní se podívejme na některé legrační jevy, k nimž dochází při použití těchto pravidel. A, což je důležitější, jak se s nimi nechytit do pasti.

### Podivný výsledek: null vs 0

Porovnejme `null` s nulou:

```js run
alert( null > 0 );  // (1) false
alert( null == 0 ); // (2) false
alert( null >= 0 ); // (3) *!*true*/!*
```

Matematicky je to zvláštní. Poslední uvedený výsledek tvrdí, že „`null` je větší nebo rovno nule“, takže jedno z výše uvedených porovnání musí být `true`, ale obě jsou `false`.

Důvodem je, že test rovnosti `==` a porovnání `> < >= <=` fungují odlišně. Porovnání převedou `null` na číslo a zacházejí s ním jako s `0`. Proto (3) `null >= 0` platí a (1) `null > 0` neplatí.

Naproti tomu rovnost `==` pro `undefined` a `null` je definována tak, že se bez jakýchkoli konverzí rovnají navzájem a nerovnají se ničemu jinému. Proto (2) `null == 0` neplatí.

### Neporovnatelné undefined

Hodnota `undefined` by neměla být porovnávána s jinými hodnotami:

```js run
alert( undefined > 0 ); // false (1)
alert( undefined < 0 ); // false (2)
alert( undefined == 0 ); // false (3)
```

Proč ji porovnávání nemá tak rádo? Vždycky vyjde false!

Tyto výsledky jsme získali, protože:

- Porovnání `(1)` a `(2)` vracejí `false`, protože `undefined` se převede na `NaN` a `NaN` je speciální číselná hodnota, která při všech porovnáních vrátí `false`.
- Test rovnosti `(3)` vrací `false`, protože `undefined` se rovná jedině `null` a `undefined`, žádné jiné hodnotě.

### Jak se vyhnout problémům

Jak se přes tyto příklady přenést? Měli bychom si tyto zvláštnosti neustále pamatovat? Vlastně ani ne. Ve skutečnosti se s těmito triky postupem času sžijete, ale existuje solidní způsob, jak se vyhnout problémům, které způsobují:

- Zacházejte s každým porovnáním s `undefined/null` kromě striktní rovnosti `===` výjimečně opatrně.
- Nepoužívejte porovnání `>= > < <=` na proměnnou, která by mohla být `null/undefined`, pokud si opravdu nejste jisti tím, co děláte. Může-li proměnná obsahovat tyto hodnoty, ověřte je zvlášť.

## Shrnutí

- Porovnávací operátory vracejí hodnotu typu boolean.
- Řetězce se porovnávají znak po znaku podle „slovníkového“ pořadí.
- Když se porovnávají hodnoty různých typů, převedou se na čísla (s výjimkou operátoru striktní rovnosti).
- Hodnoty `null` a `undefined` se rovnají `==` sobě navzájem, ale nerovnají se žádné jiné hodnotě.
- Buďte opatrní při používání porovnávání jako `<` nebo `>` na proměnné, které mohou být `null/undefined`. Dobrý nápad je odděleně ověřit, zda opravdu jsou `null/undefined`.
