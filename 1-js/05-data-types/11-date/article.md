# Datum a čas

Seznámíme se s novým vestavěným objektem: [Date](mdn:js/Date). Tento objekt ukládá datum a čas a poskytuje metody pro práci s nimi.

Můžeme jej například použít k uložení doby vytvoření nebo modifikace, k měření času nebo jen k vypsání dnešního data.

## Vytvoření

Abychom vytvořili objekt `Date`, zavoláme `new Date()` s jedním z následujících argumentů:

`new Date()`
: Bez argumentů -- vytvoří se objekt `Date` pro aktuální datum a čas:

    ```js run
    let nyní = new Date();
    alert( nyní ); // zobrazí aktuální datum a čas
    ```

`new Date(milisekundy)`
: Vytvoří objekt `Date` s časem, který odpovídá počtu milisekund (1/1000 sekundy), které uplynuly od 1. ledna 1970 UTC+0.

    ```js run
    // 0 znamená 01.01.1970 UTC+0
    let Leden01_1970 = new Date(0);
    alert( Leden01_1970 );

    // nyní přidáme 24 hodin a získáme 02.01.1970 UTC+0
    let Leden02_1970 = new Date(24 * 3600 * 1000);
    alert( Leden02_1970 );
    ```

    Celé číslo, které představuje počet milisekund, které uplynuly od začátku roku 1970, se nazývá *časové razítko* nebo *časová značka* (anglicky *timestamp*).

    Je to číselná reprezentace data. Z časového razítka můžeme vždy vytvořit datum pomocí `new Date(časovéRazítko)` a existující objekt `Date` můžeme převést na časové razítko pomocí metody `datum.getTime()` (viz níže).

    Data před 1. lednem 1970 mají záporná časová razítka, např.:
    ```js run
    // 31. prosinec 1969
    let Pros31_1969 = new Date(-24 * 3600 * 1000);
    alert( Pros31_1969 );
    ```

`new Date(datovýŘetězec)`
: Jestliže je uveden jediný argument a je to řetězec, bude automaticky rozparsován. Algoritmus je stejný, jaký používá `Date.parse`. Probereme ho později.

    ```js run
    let datum= new Date("2017-01-26");
    alert(datum);
    // Čas není nastaven, takže se předpokládá půlnoc GMT a
    // přizpůsobí se časovému pásmu, ve kterém je kód spuštěn
    // Výsledek tedy může být
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Australian Eastern Daylight Time)
    // nebo
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Pacific Standard Time)
    // V Česku zřejmě bude:
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Středoevropský standardní čas) - pozn. překl.
    ```

`new Date(rok, měsíc, den, hodiny, minuty, sekundy, ms)`
: Vytvoří datum ze zadaných součástí v místním časovém pásmu. Povinné jsou jen první dva argumenty.

    - Parametr `rok` musí mít 4 číslice: `2013` je správně, `98` ne.
    - Parametr `měsíc` se počítá od `0` (leden) do `11` (prosinec).
    - Parametr `den` znamená den v měsíci. Není-li uveden, předpokládá se `1`.
    - Nejsou-li uvedeny parametry `hodiny/minuty/sekundy/ms`, předpokládá se, že jsou `0`.

    Příklad:

    ```js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1. leden 2011, 00:00:00
    new Date(2011, 0, 1); // totéž, hodiny atd. jsou standardně 0
    ```

    Maximální přesnost je 1 ms (1/1000 s):

    ```js run
    let datum = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( datum ); // 1.01.2011, 02:03:04.567
    ```

## Přístup ke složkám data

Existují metody, kterými můžeme přistupovat k roku, měsíci a tak dále objektu `Date`:

[getFullYear()](mdn:js/Date/getFullYear)
: Vrací rok (4-číslicový).

[getMonth()](mdn:js/Date/getMonth)
: Vrací měsíc **od 0 do 11**.

[getDate()](mdn:js/Date/getDate)
: Vrací den v měsíci od 1 do 31. Název metody skutečně vypadá trochu podivně.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Vracejí odpovídající časové složky (`getHours()` vrací hodiny, `getMinutes()` minuty, `getSeconds()` sekundy, `getMilliseconds()` milisekundy -- pozn. překl.).

```warn header="Ne `getYear()`, ale `getFullYear()`"
Mnoho JavaScriptových enginů implementuje nestandardní metodu `getYear()`. Tato metoda je zastaralá. Někdy vrací 2-číslicový letopočet. Prosíme nepoužívejte ji. Ke zjištění roku je určena metoda `getFullYear()`.
```

Navíc můžeme získat i den v týdnu:

[getDay()](mdn:js/Date/getDay)
: Vrací den v týdnu od `0` (neděle) do `6` (sobota). První den je vždy neděle. V některých zemích to tak není, ale nedá se to změnit.

**Všechny výše uvedené metody vracejí složky relativní k místnímu časovému pásmu.**

Existují také jejich UTC-protějšky, které vracejí den, měsíc atd. pro časové pásmo UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Stačí vložit `"UTC"` rovnou za `"get"`.

Jestliže je vaše místní časové pásmo vzhledem k UTC posunuto, pak níže uvedený kód zobrazí různé hodiny:

```js run
// nynější datum
let datum = new Date();

// hodina ve vašem nynějším časovém pásmu
alert( datum.getHours() );

// hodina v časovém pásmu UTC+0 (londýnský zimní čas)
alert( datum.getUTCHours() );
```

Kromě uvedených metod existují i dvě speciální, které nemají UTC-variantu:

[getTime()](mdn:js/Date/getTime)
: Vrací časové razítko data -- počet milisekund, které uplynuly od 1. ledna 1970 UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Vrací rozdíl mezi UTC a místním časovým pásmem v minutách:

    ```js run
    // jestliže jste v časovém pásmu UTC-1, vypíše 60
    // jestliže jste v časovém pásmu UTC+3, vypíše -180
    // (v Česku vypíše v letním čase -120, v zimním -60 - pozn. překl.)
    alert( new Date().getTimezoneOffset() );

    ```

## Nastavení složek data

Následující metody umožňují nastavit složky data a času:

- [`setFullYear(rok, [měsíc], [den])`](mdn:js/Date/setFullYear)
- [`setMonth(měsíc, [den])`](mdn:js/Date/setMonth)
- [`setDate(den)`](mdn:js/Date/setDate)
- [`setHours(hodina, [minuty], [sekundy], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(minuty, [sekundy], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sekundy, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milisekundy)`](mdn:js/Date/setTime) (nastaví celé datum podle milisekund uplynulých od 1.1.1970 UTC)

Každá z nich kromě `setTime()` má UTC-variantu, např. `setUTCHours()`.

Jak vidíme, některé metody umožňují nastavit více složek najednou, např. `setHours`. Složky, které nejsou uvedeny, nebudou změněny.

Příklad:

```js run
let dnes = new Date();

dnes.setHours(0);
alert(dnes); // stále dnes, ale hodina se změní na 0

dnes.setHours(0, 0, 0, 0);
alert(dnes); // stále dnes, nyní 00:00:00
```

## Automatická oprava

*Automatická oprava* je velmi šikovná vlastnost objektů `Date`. Můžeme nastavit hodnoty mimo rozsah a ty se automaticky přizpůsobí.

Příklad:

```js run
let datum = new Date(2013, 0, *!*32*/!*); // 32. leden 2013 ?!?
alert(datum); // ...je 1. únor 2013!
```

Datové složky mimo povolený rozsah se automaticky přepočítají.

Řekněme, že potřebujeme zvýšit datum „28. únor 2016“ o 2 dny. Může to být „2. březen“ nebo v případě přestupného roku „1. březen“. Na to nemusíme myslet. Stačí přičíst 2 dny. O zbytek se postará objekt `Date`:

```js run
let datum = new Date(2016, 1, 28);
*!*
datum.setDate(datum.getDate() + 2);
*/!*

alert( datum ); // 1. březen 2016
```

Tato vlastnost se často používá k získání data, které nastane po uplynutí zadaného času. Například získejme datum, které bude za „70 sekund od nynějška“:

```js run
let datum = new Date();
datum.setSeconds(datum.getSeconds() + 70);

alert( datum ); // zobrazí správné datum
```

Můžeme nastavit i nulové nebo záporné hodnoty. Například:

```js run
let datum = new Date(2016, 0, 2); // 2. leden 2016

datum.setDate(1); // nastavíme 1. den v měsíci
alert( datum );

datum.setDate(0); // minimální den je 1, takže se předpokládá poslední den předchozího měsíce
alert( datum ); // 31. prosinec 2015
```

## Konverze data na číslo, rozdíl dat

Když je objekt `Date` konvertován na číslo, převede se na časové razítko, stejné, jaké vrací metoda `datum.getTime()`:

```js run
let datum = new Date();
alert(+datum); // počet milisekund, totéž jako datum.getTime()
```

Důležitý vedlejší efekt: data lze od sebe odečítat, výsledkem je jejich rozdíl v milisekundách.

To můžeme využít k měření času:

```js run
let začátek = new Date(); // spustíme měření času

// uděláme práci
for (let i = 0; i < 100000; i++) {
  let dělejNěco = i * i * i;
}

let konec = new Date(); // zastavíme měření času

alert( `Cyklus trval ${konec - začátek} ms` );
```

## Date.now()

Jestliže chceme jenom měřit čas, nepotřebujeme objekt `Date`.

Existuje speciální metoda `Date.now()`, která vrací aktuální časové razítko.

Je sémanticky ekvivalentní `new Date().getTime()`, ale nevytváří dočasný objekt `Date`. Je tedy rychlejší a nezatěžuje garbage collector.

Používá se většinou kvůli pohodlí nebo tehdy, když záleží na výkonu, například v JavaScriptových hrách nebo jiných specializovaných aplikacích.

Tohle je tedy pravděpodobně lepší:

```js run
*!*
let začátek = Date.now(); // počet milisekund od 1. ledna 1970
*/!*

// uděláme práci
for (let i = 0; i < 100000; i++) {
  let dělejNěco = i * i * i;
}

*!*
let konec = Date.now(); // hotovo
*/!*

alert( `Cyklus trval ${konec - začátek} ms` ); // odečítáme čísla, ne data
```

## Benchmarking

Jestliže chceme spolehlivý benchmark funkce náročné na CPU, měli bychom být opatrní.

Například změřme dvě funkce, které počítají rozdíl mezi dvěma daty: která z nich je rychlejší?

Taková měření výkonu se často nazývají „benchmarky“.

```js
// máme datum1 a datum2, která funkce vrátí rychleji jejich rozdíl v ms?
function rozdílOdečtením(datum1, datum2) {
  return datum2 - datum1;
}

// nebo
function rozdílPomocíGetTime(datum1, datum2) {
  return datum2.getTime() - datum1.getTime();
}
```

Tyto dvě funkce dělají přesně totéž, ale jedna z nich používá explicitní `datum.getTime()`, aby získala datum v milisekundách, zatímco druhá se spoléhá na transformaci data na číslo. Jejich výsledek je vždy stejný.

Která je tedy rychlejší?

První myšlenka může být spustit je mnohokrát za sebou a změřit rozdíl časů. V našem případě jsou tyto funkce velmi jednoduché, takže to musíme udělat alespoň 100000krát.

Změřme to:

```js run
function rozdílOdečtením(datum1, datum2) {
  return datum2 - datum1;
}

function rozdílPomocíGetTime(datum1, datum2) {
  return datum2.getTime() - datum1.getTime();
}

function bench(f) {
  let datum1 = new Date(0);
  let datum2 = new Date();

  let začátek = Date.now();
  for (let i = 0; i < 100000; i++) f(datum1, datum2);
  return Date.now() - začátek;
}

alert( 'Čas funkce rozdílOdečtením: ' + bench(rozdílOdečtením) + ' ms' );
alert( 'Čas funkce rozdílPomocíGetTime: ' + bench(rozdílPomocíGetTime) + ' ms' );
```

Páni! Použití `getTime()` je mnohem rychlejší! Je to proto, že když tam není typová konverze, je pro enginy mnohem snadnější funkci optimalizovat.

Dobrá, něco tedy máme. To však ještě není dobrý benchmark.

Představme si, že v době spuštění `bench(rozdílOdečtením)` CPU prováděl paralelně něco jiného a to něco mu ubíralo zdroje. A v době spuštění `bench(rozdílPomocíGetTime)` tahle práce skončila.

V moderních multiprocesních operačních systémech je to dosti reálný scénář.

Výsledkem je, že první benchmark měl méně zdrojů CPU než druhý. To mohlo vést ke špatným výsledkům.

**Pro spolehlivější benchmarking bychom měli celý balíček benchmarků spustit několikrát za sebou.**

Například takto:

```js run
function rozdílOdečtením(datum1, datum2) {
  return datum2 - datum1;
}

function rozdílPomocíGetTime(datum1, datum2) {
  return datum2.getTime() - datum1.getTime();
}

function bench(f) {
  let datum1 = new Date(0);
  let datum2 = new Date();

  let začátek = Date.now();
  for (let i = 0; i < 100000; i++) f(datum1, datum2);
  return Date.now() - začátek;
}

let čas1 = 0;
let čas2 = 0;

*!*
// spustíme bench(rozdílOdečtením) a bench(rozdílPomocíGetTime) střídavě, každou 10krát
for (let i = 0; i < 10; i++) {
  čas1 += bench(rozdílOdečtením);
  čas2 += bench(rozdílPomocíGetTime);
}
*/!*

alert( 'Celkový čas funkce rozdílOdečtením: ' + čas1 );
alert( 'Celkový čas funkce rozdílPomocíGetTime: ' + čas2 );
```

Moderní JavaScriptové enginy začínají aplikovat pokročilejší optimalizace jen na „horký kód“, který se provádí mnohokrát (není třeba optimalizovat to, co se provádí jen vzácně). Ve výše uvedeném příkladu tedy první spuštění nejsou dobře optimalizovaná. Můžeme chtít přidat zahřívací kolo:

```js
// přidáno pro „zahřátí“ před hlavní smyčkou
bench(rozdílOdečtením);
bench(rozdílPomocíGetTime);

// nyní benchmark
for (let i = 0; i < 10; i++) {
  čas1 += bench(rozdílOdečtením);
  čas2 += bench(rozdílPomocíGetTime);
}
```

```warn header="Při mikrobenchmarkingu buďte opatrní"
Moderní JavaScriptové enginy provádějí množství optimalizací, které mohou vylepšit výsledky „umělých testů“ ve srovnání s „běžným použitím“, zvláště když benchmarkujeme něco velmi malého, např. práci operátoru nebo vestavěnou funkci. Pokud tedy chcete skutečně porozumět výkonu, pak si prosíme prostudujte, jak funguje JavaScriptový engine. A pak už pravděpodobně nebudete mikrobenchmarky vůbec potřebovat.

Výborný balík článků o V8 naleznete na <http://mrale.ph>.
```

## Parsování data z řetězce

Metoda [Date.parse(str)](mdn:js/Date/parse) dokáže načíst datum z řetězce.

Řetězec by měl mít formát `RRRR-MM-DDTHH:mm:ss.sssZ`, kde:

- `RRRR-MM-DD` -- je datum: rok-měsíc-den.
- Znak `"T"` se používá jako oddělovač.
- `HH:mm:ss.sss` -- je čas: hodiny, minuty, sekundy a milisekundy.
- Nepovinná část `'Z'` označuje časové pásmo ve formátu `+-hh:mm`. Samotné písmeno `Z` znamená UTC+0.

Jsou možné i kratší varianty, např. `RRRR-MM-DD` nebo `RRRR-MM` nebo jen `RRRR`.

Volání `Date.parse(str)` parsuje řetězec v zadaném formátu a vrátí časové razítko (počet milisekund od 1. ledna 1970 UTC+0). Není-li formát správný, vrátí `NaN`.

Příklad:

```js run
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (časové razítko)
```

Z tohoto časového razítka můžeme ihned vytvořit objekt pomocí `new Date`:

```js run
let datum = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(datum);  
```

## Shrnutí

- Datum a čas v JavaScriptu představuje objekt [Date](mdn:js/Date). Nemůžeme vytvořit „jen datum“ nebo „jen čas“: objekty `Date` obsahují vždy obojí.
- Měsíce se počítají od nuly (ano, leden je nultý měsíc).
- Dny v týdnu ve funkci `getDay()` se také počítají od nuly (to je neděle).
- `Date` se automaticky opravuje, když jsou nastaveny složky mimo rozsah. To je dobré pro přičítání/odečítání dnů/měsíců/hodin.
- Data od sebe lze odečítat, výsledkem je jejich rozdíl v milisekundách. To je proto, že `Date` se při konverzi na číslo převede na časové razítko.
- Aktuální časové razítko rychle získáme pomocí `Date.now()`.

Všimněte si, že na rozdíl od mnoha jiných systémů se časová razítka v JavaScriptu počítají v milisekundách, ne v sekundách.

Někdy potřebujeme přesnější měření času. Samotný JavaScript neobsahuje způsob, jak měřit čas v mikrosekundách (1 milióntina sekundy), ale většina prostředí jej poskytuje. Například prohlížeč má metodu [performance.now()](mdn:api/Performance/now), která vrací počet milisekund od začátku načítání stránky s přesností na mikrosekundy (3 číslice za desetinnou čárkou):

```js run
alert(`Načítání začalo před ${performance.now()}ms`);
// Něco jako: "Načítání začalo před 34731.26000000001ms"
// .26 jsou mikrosekundy (260 mikrosekund)
// více než 3 číslice za desetinnou čárkou jsou chyba přesnosti, jedině první 3 jsou správné
```

Node.js má modul `microtime` a jiné způsoby. Technicky téměř každé zařízení a každé prostředí umožňuje získat lepší přesnost, jenom to není v `Date`.