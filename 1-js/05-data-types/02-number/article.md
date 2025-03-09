# Čísla

Moderní JavaScript obsahuje dva druhy čísel:

1. Běžná čísla v JavaScriptu jsou uložena v 64-bitovém formátu [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754). Jsou známa také jako „čísla s pohyblivou řádovou čárkou s dvojnásobnou přesností“. To jsou čísla, která používáme ve většině případů a v této kapitole o nich budeme hovořit.

2. Čísla typu BigInt představují celá čísla libovolné délky. Jsou někdy zapotřebí, neboť běžné celé číslo nemůže bezpečně překročit <code>(2<sup>53</sup>-1)</code> nebo být menší než <code>-(2<sup>53</sup>-1)</code>, jak jsme uvedli již dříve v kapitole <info:types>. Jelikož biginty se používají jen v některých speciálních oblastech, věnujeme jim zvláštní kapitolu <info:bigint>.

Zde tedy budeme hovořit o běžných číslech. Rozšiřme si své znalosti o nich.

## Další způsoby, jak napsat číslo

Představme si, že musíme napsat 1 miliardu. Obvyklý způsob je:

```js
let miliarda = 1000000000;
```

Můžeme jako oddělovač použít podtržítko `_`:

```js
let miliarda = 1_000_000_000;
```

Podtržítko `_` zde hraje roli „[syntaktického cukru](https://cs.wikipedia.org/wiki/Syntaktický_cukr)“, který činí číslo čitelnějším. Motor JavaScriptu podtržítka `_` mezi číslicemi jednoduše ignoruje, takže je to přesně stejná miliarda jako výše uvedená.

V reálném životě se však snažíme vyhnout zápisu dlouhých sekvencí nul. Jsme na to příliš líní. Snažíme se zapsat miliardu nějak jako `"1 mld."` nebo 7 miliard 300 miliónů jako `"7,3 mld."`. To platí pro většinu velkých čísel.

V JavaScriptu můžeme číslo zkrátit tím, že za ně přidáme písmeno `"e"` a uvedeme počet nul:

```js run
let miliarda = 1e9;  // 1 miliarda, doslova: 1 a 9 nul

alert( 7.3e9 );  // 7.3 miliard (totéž jako 7300000000 nebo 7_300_000_000)
```

Jinými slovy, `e` toto číslo násobí číslem `1` se zadaným počtem nul.

```js
1e3 === 1 * 1000 // e3 znamená *1000
1.23e6 === 1.23 * 1000000 // e6 znamená *1000000
```

Nyní zapišme nějaké velmi malé číslo. Třeba 1 mikrosekundu (jednu milióntinu sekundy):

```js
let mcs = 0.000001;
```

Stejně jako předtím nám může pomoci použití `"e"`. Jestliže se chceme vyhnout explicitnímu zápisu nul, můžeme zapsat totéž jako:

```js
let mcs = 1e-6; // pět nul nalevo od 1
```

Spočítáme-li nuly v čísle `0.000001`, bude jich 6. Je to tedy přirozeně `1e-6`.

Jinými slovy, záporné číslo za `"e"` znamená dělení číslem 1 se zadaným počtem nul:

```js
// -3 znamená dělení číslem 1 se 3 nulami
1e-3 === 1 / 1000; // 0.001

// -6 znamená dělení číslem 1 se 6 nulami
1.23e-6 === 1.23 / 1000000; // 0.00000123

// příklad s větším číslem
1234e-2 === 1234 / 100; // 12.34, desetinná čárka se posune 2krát
```

### Hexadecimální, binární a oktální čísla

[Hexadecimální čísla (v šestnáctkové soustavě)](https://cs.wikipedia.org/wiki/Šestnáctková_soustava) se v JavaScriptu široce používají k reprezentaci barev, kódování znaků a mnoha dalším věcem. Pochopitelně tedy existuje kratší způsob, jak je zapsat: `0x` a pak číslo.

Například:

```js run
alert( 0xff ); // 255
alert( 0xFF ); // 255 (totéž, malá a velká písmena se nerozlišují)
```

Binární (dvojková) a oktální (osmičková) soustava se používají jen vzácně, ale jsou také podporovány, a to za použití prefixů `0b` a `0o`:


```js run
let a = 0b11111111; // binární podoba 255
let b = 0o377; // oktální podoba 255

alert( a == b ); // true, stejné číslo 255 na obou stranách
```

Takovou podporu mají pouze tři číselné soustavy. Pro jiné číselné soustavy bychom měli použít funkci `parseInt` (kterou uvidíme později v této kapitole).

## toString(základ)

Metoda `číslo.toString(základ)` vrátí řetězcovou reprezentaci čísla `číslo` v číselné soustavě o zadaném základu `základ`.

Příklad:
```js run
let číslo = 255;

alert( číslo.toString(16) );  // ff
alert( číslo.toString(2) );   // 11111111
```

Hodnota `základ` může být od `2` do `36`. Standardně je to `10`.

Běžná použití jsou:

- **základ=16** se používá pro hexadecimální barvy, kódování znaků atd., číslice mohou být `0..9` nebo `A..F`.
- **základ=2** slouží zejména pro ladění bitových operací, číslice mohou být `0` nebo `1`.
- **základ=36** je maximum, číslice mohou být `0..9` nebo `A..Z`. K reprezentaci čísla se používá celá latinská abeceda. Legrační, ale užitečné využití `36` představuje případ, kdy potřebujeme změnit dlouhý číselný identifikátor na něco kratšího, například abychom vytvořili kratší URL. Můžeme jej snadno reprezentovat v číselné soustavě o základu `36`:

    ```js run
    alert( 123456..toString(36) ); // 2n9c
    ```

```warn header="Volání metody dvěma tečkami"
Prosíme všimněte si, že dvě tečky v `123456..toString(36)` není překlep. Chceme-li volat metodu přímo na čísle, např. `toString` v uvedeném příkladu, pak za číslo musíme umístit dvě tečky `..`.

Kdybychom umístili jedinou tečku: `123456.toString(36)`, nastala by chyba, protože syntaxe JavaScriptu očekává za první tečkou desetinnou část. Když však uvedeme další tečku, JavaScript pozná, že desetinná část je prázdná, a nyní použije metodu.

## Zaokrouhlování

Jedna z nejčastěji používaných operací při práci s čísly je zaokrouhlování.

Pro zaokrouhlování existuje několik vestavěných funkcí:

`Math.floor`
: Zaokrouhluje dolů: `3.1` se zaokrouhlí na `3`, `-1.1` se zaokrouhlí na `-2`.

`Math.ceil`
: Zaokrouhluje nahoru: `3.1` se zaokrouhlí na `4`, `-1.1` se zaokrouhlí na `-1`.

`Math.round`
: Zaokrouhluje na nejbližší celé číslo: `3.1` se zaokrouhlí na `3`, `3.6` se zaokrouhlí na `4`. V prostředních případech se `3.5` zaokrouhlí nahoru na `4` a `-3.5` se zaokrouhlí nahoru na `-3`.

`Math.trunc` (není podporována v Internet Exploreru)
: Odstraní vše za desetinnou čárkou bez zaokrouhlení: `3.1` se převede na `3`, `-1.1` se převede na `-1`.

Rozdíly mezi těmito funkcemi shrnuje následující tabulka:

|   | `Math.floor` | `Math.ceil` | `Math.round` | `Math.trunc` |
|---|---------|--------|---------|---------|
|`3.1`|  `3`    |   `4`  |    `3`  |   `3`   |
|`3.5`|  `3`    |   `4`  |    `4`  |   `3`   |
|`3.6`|  `3`    |   `4`  |    `4`  |   `3`   |
|`-1.1`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.5`|  `-2`    |   `-1`  |    `-1`  |   `-1`   |
|`-1.6`|  `-2`    |   `-1`  |    `-2`  |   `-1`   |


Tyto funkce pokrývají všechny možné způsoby zacházení s desetinnou částí čísla. Ale co když chceme zaokrouhlit číslo na `n-tou` číslici za desetinnou čárkou?

Máme například `1.2345` a chceme toto číslo zaokrouhlit na 2 desetinná místa, abychom dostali jen `1.23`.

Existují dva způsoby, jak to udělat:

1. Násobit a dělit.

    Abychom například zaokrouhlili číslo na 2. číslici za desetinnou čárkou, můžeme toto číslo vynásobit `100`, zavolat zaokrouhlovací funkci a pak je znovu vydělit.

    ```js run
    let číslo = 1.23456;

    alert( Math.round(číslo * 100) / 100 ); // 1.23456 -> 123.456 -> 123 -> 1.23
    ```

2. Metoda [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) zaokrouhluje číslo na `n` číslic za desetinnou čárkou a vrací řetězcovou reprezentaci výsledku.

    ```js run
    let číslo = 12.34;
    alert( číslo.toFixed(1) ); // "12.3"
    ```

    Zaokrouhlí číslo nahoru nebo dolů na nejbližší hodnotu, podobně jako `Math.round`:

    ```js run
    let číslo = 12.36;
    alert( číslo.toFixed(1) ); // "12.4"
    ```

    Všimněte si, že výsledkem `toFixed` je řetězec. Je-li desetinná část čísla kratší, než bylo vyžadováno, na konec se přidají nuly:

    ```js run
    let číslo = 12.34;
    alert( číslo.toFixed(5) ); // "12.34000", přidají se nuly, aby číslic bylo přesně 5
    ```

    Můžeme jej převést na číslo pomocí unárního plus nebo volání `Number()`, např. napsat `+číslo.toFixed(5)`.

## Nepřesné výpočty

Číslo je vnitřně reprezentováno v 64-bitovém formátu [IEEE-754](https://en.wikipedia.org/wiki/IEEE_754), takže se ukládá přesně do 64 bitů: 52 z nich se používá k uložení číslic, v 11 z nich je uložena pozice desetinné čárky  a 1 bit je pro znaménko.

Je-li číslo opravdu velké, může toto 64-bitové úložiště překročit a stát se speciální číselnou hodnotou `Infinity` (nekonečno):

```js run
alert( 1e500 ); // Infinity
```

Co může být trochu méně zřejmé, ale stává se poměrně často, je ztráta přesnosti.

Uvažujme tento (nepravdivý!) test rovnosti:

```js run
alert( 0.1 + 0.2 == 0.3 ); // *!*false*/!*
```

Je to tak. Jestliže ověříme, zda součet `0.1` a `0.2` je `0.3`, dostaneme `false`.

Zvláštní! Co tedy je, když ne `0.3`?

```js run
alert( 0.1 + 0.2 ); // 0.30000000000000004
```

Ouvej! Představme si, že vytváříme elektronický obchod a návštěvník si do košíku uloží zboží za `$0.10` a za `$0.20`. Celková cena pak bude `$0.30000000000000004`. To každého překvapí.

Ale proč se to děje?

Číslo je v paměti uloženo ve své binární podobě, jako posloupnost bitů -- jedniček a nul. Ale desetinná čísla jako `0.1` nebo `0.2`, která v desítkové soustavě vypadají jednoduše, jsou ve své binární podobě ve skutečnosti nekonečná.

```js run
alert(0.1.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
alert(0.2.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
alert((0.1 + 0.2).toString(2)); // 0.0100110011001100110011001100110011001100110011001101
```

Co je vlastně `0.1`? Je to jedna děleno deseti `1/10`, jedna desetina. V desítkové soustavě lze taková čísla snadno reprezentovat. Srovnejme si to s jednou třetinou: `1/3`. Z ní se stane nekonečné desetinné číslo `0.33333(3)`.

Je tedy zaručeno, že dělení mocninami `10` bude v desítkové soustavě fungovat dobře, ale dělení třemi ne. Ze stejného důvodu je v binární soustavě zaručeno, že bude fungovat dělení mocninami `2`, ale z `1/10` se stane nekonečné binární číslo.

V binární soustavě prostě neexistuje způsob, jak uložit *přesně 0,1* nebo *přesně 0,2*, stejně jako v desítkové soustavě není způsob, jak uložit jako desetinné číslo jednu třetinu.

Číselný formát IEEE-754 to řeší zaokrouhlením na nejbližší možné číslo. Tato zaokrouhlovací pravidla nám běžně neumožňují vidět tuto „drobnou ztrátu přesnosti“, ale ta tam je.

Můžeme to vidět v akci:
```js run
alert( 0.1.toFixed(20) ); // 0.10000000000000000555
```

A když sečteme dvě čísla, jejich „ztráty přesnosti“ se sečtou.

Proto `0.1 + 0.2` není přesně `0.3`.

```smart header="To není jen JavaScript"
Stejný problém existuje v mnoha jiných programovacích jazycích.

Přesně stejný výsledek vydají i PHP, Java, C, Perl nebo Ruby, protože jsou založeny na stejném číselném formátu.
```

Můžeme se tomuto problému vyhnout? Jistě. Nejspolehlivější metoda je zaokrouhlit výsledek pomocí metody [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed):

```js run
let součet = 0.1 + 0.2;
alert( součet.toFixed(2) ); // "0.30"
```

Prosíme všimněte si, že `toFixed` vrací vždy řetězec. Zajišťuje, že za desetinnou tečkou má vždy 2 číslice. To se obzvláště hodí, když máme elektronický obchod a potřebujeme zobrazit `$0.30`. V jiných případech můžeme použít unární plus, abychom řetězec převedli na číslo:

```js run
let součet = 0.1 + 0.2;
alert( +součet.toFixed(2) ); // 0.3
```

Můžeme také dočasně násobit tato čísla 100 (nebo vyšším číslem), abychom z nich vytvořili celá čísla, provést výpočty a pak je znovu vydělit. Pak, jelikož provádíme výpočty s celými čísly, chyba se trochu sníží, ale při dělení ji stále dostaneme:

```js run
alert( (0.1 * 10 + 0.2 * 10) / 10 ); // 0.3
alert( (0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001
```

Použití násobení a dělení tedy chybu zredukuje, ale úplně ji neodstraní.

Někdy se snažíme úplně se desetinným číslům vyhnout. Například když vytváříme obchod, můžeme ukládat ceny v centech namísto v dolarech. Ale co když aplikujeme slevu 30%? V praxi je úplné vyhnutí se desetinným číslům možné jen zřídka. Prostě je zaokrouhlujte, abyste odřízli „zbytky“, když je třeba.

````smart header="Legrační věcička"
Zkuste si spustit tohle:

```js run
// Ahoj! Já jsem samozvyšující se číslo!
alert( 9999999999999999 ); // zobrazí 10000000000000000
```

To trpí stejným neduhem: ztrátou přesnosti. Pro číslo je 64 bitů, 52 z nich lze použít k uložení číslic, ale to nestačí. Nejméně významné číslice tedy zmizí.

JavaScript při takových událostech nevyvolá chybu. Udělá, co může, aby se číslo vešlo do požadovaného formátu, ale naneštěstí tento formát není dostatečně velký.
````

```smart header="Dvě nuly"
Dalším legračním důsledkem této interní reprezentace čísel je existence dvou nul: `0` a `-0`.

Je to proto, že znaménko je reprezentováno jediným bitem, který může být nastaven na 1 nebo 0 pro jakékoli číslo včetně nuly.

Ve většině případů je tento rozdíl neznatelný, protože operátory jsou vytvořeny tak, aby s oběma nulami zacházely stejně.
```

## Testy: isFinite a isNaN

Vzpomínáte si na tyto dvě speciální číselné hodnoty?

- `Infinity` (a `-Infinity`) je speciální číselná hodnota, která je větší (menší) než cokoli jiného.
- `NaN` představuje chybu.

Patří k typu `number`, ale nejsou to „normální“ čísla, takže existují speciální funkce, které je prověří:


- `isNaN(hodnota)` převede svůj argument na číslo a pak jej otestuje, zda je `NaN`:

    ```js run
    alert( isNaN(NaN) ); // true
    alert( isNaN("řetězec") ); // true
    ```

    Ale potřebujeme vůbec tuto funkci? Nemůžeme jednoduše použít porovnání `=== NaN`? Bohužel ne. Hodnota `NaN` je unikátem, který se nerovná ničemu jinému, dokonce ani sám sobě:

    ```js run
    alert( NaN === NaN ); // false
    ```

- `isFinite(hodnota)` převede svůj argument na číslo a vrátí `true`, jestliže je to skutečné číslo a ne `NaN/Infinity/-Infinity`:

    ```js run
    alert( isFinite("15") ); // true
    alert( isFinite("řetězec") ); // false, protože je to speciální hodnota: NaN
    alert( isFinite(Infinity) ); // false, protože je to speciální hodnota: Infinity
    ```

Někdy se `isFinite` používá k ověření, zda řetězcová hodnota je skutečné číslo:


```js run
let číslo = +prompt("Zadejte číslo", '');

// bude true, pokud nezadáte Infinity, -Infinity nebo něco jiného než číslo
alert( isFinite(číslo) );
```

Prosíme všimněte si, že s prázdným řetězcem nebo s řetězcem složeným pouze z mezer se zachází jako s `0` ve všech číselných funkcích včetně `isFinite`.

````smart header="`Number.isNaN` a `Number.isFinite`"
Metody [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) a [Number.isFinite](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) jsou „striktnější“ verze funkcí `isNaN` a `isFinite`. Svůj argument nepřevádějí automaticky na číslo, ale místo toho ověří, zda jejich argument je typu `number`.

- `Number.isNaN(hodnota)` vrací `true`, jestliže argument je typu `number` a je `NaN`. V jakémkoli jiném případě vrací `false`.

    ```js run
    alert( Number.isNaN(NaN) ); // true
    alert( Number.isNaN("řetězec" / 2) ); // true

    // Všimněte si rozdílu:
    alert( Number.isNaN("řetězec") ); // false, protože "řetězec" je typu string, ne typu number
    alert( isNaN("řetězec") ); // true, protože isNaN převede "řetězec" na číslo a jako výsledek této konverze získá NaN
    ```

- `Number.isFinite(value)` vrací `true`, jestliže argument je typu `number` a není `NaN/Infinity/-Infinity`. V jakémkoli jiném případě vrací `false`.

    ```js run
    alert( Number.isFinite(123) ); // true
    alert( Number.isFinite(Infinity) ); // false
    alert( Number.isFinite(2 / 0) ); // false

    // Všimněte si rozdílu:
    alert( Number.isFinite("123") ); // false, protože "123" je typu string, ne typu number
    alert( isFinite("123") ); // true, protože isFinite převede řetězec "123" na číslo 123
    ```

Svým způsobem jsou `Number.isNaN` a `Number.isFinite` jednodušší a přímější než funkce `isNaN` a `isFinite`. V praxi se však většinou používají `isNaN` a `isFinite`, jelikož jsou kratší na napsání.
````

```smart header="Porovnání pomocí `Object.is`"
Existuje speciální vestavěná metoda `Object.is`, která porovnává hodnoty stejně jako `===`, ale ve dvou krajních případech je spolehlivější:

1. Funguje pro `NaN`: `Object.is(NaN, NaN) === true`, což je dobrá věc.
2. Hodnoty `0` a `-0` jsou rozdílné: `Object.is(0, -0) === false`, technicky je to správně, protože vnitřně číslo obsahuje znaménkový bit, který se může lišit, i když jsou všechny ostatní bity nulové.

Ve všech ostatních případech je `Object.is(a, b)` totéž jako `a === b`.

Metodu `Object.is` zde zmiňujeme proto, že se často používá ve specifikaci JavaScriptu. Když interní algoritmus potřebuje porovnat, zda jsou dvě hodnoty přesně stejné, používá `Object.is` (interně nazvanou [SameValue](https://tc39.github.io/ecma262/#sec-samevalue)).
```


## parseInt a parseFloat

Číselná konverze prováděná pomocí plus `+` nebo `Number()` je striktní. Není-li hodnota přesně číslo, konverze selže:

```js run
alert( +"100px" ); // NaN
```

Jedinou výjimkou jsou mezery na začátku nebo na konci řetězce, které jsou ignorovány.

V reálném životě však často máme hodnoty s jednotkami, např. `"100px"` nebo `"12pt"` v CSS. Navíc v mnoha zemích se symbol měny píše až za částku, takže máme `"19€"` a rádi bychom z toho získali číselnou hodnotu.

K tomu slouží funkce `parseInt` a `parseFloat`.

„Načítají“ číslo z řetězce tak dlouho, dokud to jde. Jakmile nastane chyba, vrátí nahromaděné číslo. Funkce `parseInt` vrátí celé číslo, zatímco `parseFloat` vrátí číslo s pohyblivou řádovou čárkou:

```js run
alert( parseInt('100px') ); // 100
alert( parseFloat('12.5em') ); // 12.5

alert( parseInt('12.3') ); // 12, vrátí se jen celá část
alert( parseFloat('12.3.4') ); // 12.3, druhá tečka ukončí načítání
```

Existují situace, v nichž `parseInt/parseFloat` vrátí `NaN`. To se stane tehdy, když nelze načíst ani jednu číslici:

```js run
alert( parseInt('a123') ); // NaN, první znak tento proces zastaví
```

````smart header="Druhý argument `parseInt(řetězec, soustava)`"
Funkce `parseInt()` má nepovinný druhý parametr. Ten specifikuje základ číselné soustavy, takže `parseInt` může také načítat řetězce s hexadecimálními čísly, binárními čísly a podobně:

```js run
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255, funguje to i bez 0x

alert( parseInt('2n9c', 36) ); // 123456
```
````

## Další matematické funkce

JavaScript má vestavěný objekt [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math), který obsahuje malou knihovnu matematických funkcí a konstant.

Několik příkladů:

`Math.random()`
: Vrátí náhodné číslo od 0 do 1 (kromě 1).

    ```js run
    alert( Math.random() ); // 0.1234567894322
    alert( Math.random() ); // 0.5435252343232
    alert( Math.random() ); // ... (jakákoli náhodná čísla)
    ```

`Math.max(a, b, c...)` a `Math.min(a, b, c...)`
: Vrátí největší a nejmenší z libovolného počtu argumentů.

    ```js run
    alert( Math.max(3, 5, -10, 0, 1) ); // 5
    alert( Math.min(1, 2) ); // 1
    ```

`Math.pow(n, exponent)`
: Vrátí `n` umocněné na zadaný exponent.

    ```js run
    alert( Math.pow(2, 10) ); // 2 na 10 = 1024
    ```

V objektu `Math` jsou i další konstanty a funkce včetně goniometrických. Můžete je najít v [dokumentaci k objektu Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math).

## Shrnutí

Abychom napsali číslo s mnoha nulami:

- Připojíme za číslo `"e"` a počet nul. Například `123e6` je totéž jako `123` s 6 nulami: `123000000`.
- Záporné číslo za `"e"` způsobí, že číslo bude děleno číslem 1 se zadaným počtem nul. Například `123e-6` znamená `0.000123` (`123` milióntin).

Pro různé číselné soustavy:

- Můžeme zapisovat čísla přímo v hexadecimální (`0x`), oktální (`0o`) a binární (`0b`) soustavě.
- `parseInt(řetězec, základ)` převede `řetězec` na celé číslo v číselné soustavě o zadaném základu `základ`, `2 ≤ základ ≤ 36`.
- `číslo.toString(základ)` převede číslo na řetězec v číselné soustavě o zadaném základu `základ`.

Pro testování čísel:

- `isNaN(hodnota)` převede svůj argument na číslo a pak testuje, zda je `NaN`
- `Number.isNaN(hodnota)` ověří, zda je její argument typu `number`, a pokud ano, testuje, zda je `NaN`
- `isFinite(hodnota)` převede svůj argument na číslo a pak testuje, zda není `NaN/Infinity/-Infinity`
- `Number.isFinite(hodnota)` ověří, zda je její argument typu `number`, a pokud ano, testuje, zda není `NaN/Infinity/-Infinity`

Pro převod hodnot jako `12pt` nebo `100px` na číslo:

- Pro „měkkou“ konverzi používejte `parseInt/parseFloat`, která načte číslo z řetězce a pak vrátí hodnotu, kterou dokázala přečíst, než nastala chyba.

Pro desetinná čísla:

- Zaokrouhlujte pomocí `Math.floor`, `Math.ceil`, `Math.trunc`, `Math.round` nebo `číslo.toFixed(přesnost)`.
- Při práci s desetinnými čísly se ujistěte, že nezapomínáte na ztrátu přesnosti.

Další matematické funkce:

- Až je budete potřebovat, podívejte se na objekt [Math](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math). Je to velmi malá knihovna, ale základní potřeby dokáže pokrýt.
