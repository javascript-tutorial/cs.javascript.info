# Datové typy

Každá hodnota v JavaScriptu je určitého typu, například řetězec nebo číslo.

V JavaScriptu existuje osm základních datových typů. Zde je všeobecně popíšeme a v příštích kapitolách podrobně rozebereme každý z nich.

Do proměnné můžeme uložit hodnotu libovolného typu. Například proměnná může být v jednu chvíli řetězec a pak do ní můžeme uložit číslo:

```js
// to není chyba
let zpráva = "ahoj";
zpráva = 123456;
```

Programovací jazyky jako JavaScript, které něco takového umožňují, se nazývají „dynamicky typované“. Znamená to, že v nich existují datové typy, ale proměnné na ně nejsou navázány.

## Číslo

```js
let n = 123;
n = 12.345;
```

Typ *číslo* (anglicky *number*) představuje čísla, a to celá čísla i čísla s plovoucí řádovou čárkou.

Pro čísla existuje mnoho operací, např. násobení `*`, dělení `/`, sčítání `+`, odčítání `-` a jiné.

Kromě běžných čísel obsahuje JavaScript i tzv. „speciální číselné hodnoty“, které také patří do tohoto datového typu: `Infinity`, `-Infinity` a `NaN`.

- `Infinity` (anglicky nekonečno) představuje matematické [nekonečno](https://en.wikipedia.org/wiki/Infinity) ∞. Je to speciální hodnota, která je větší než kterékoli číslo.

    Můžeme je získat jako výsledek dělení nulou:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Nebo se na ně přímo odkázat:

    ```js run
    alert( Infinity ); // Infinity
    ```
    
- `NaN` (z anglického „not a number“ -- není číslo) představuje výpočetní chybu. Je to výsledek nekorektní nebo nedefinované matematické operace, například:

    ```js run
    alert( "to není číslo" / 2 ); // NaN, takové dělení je chybné
    ```

    `NaN` je „lepkavé“. Jakákoli operace provedená s `NaN` vrátí opět `NaN`:

    ```js run
    alert( NaN + 1 ); // NaN
    alert( 3 * NaN ); // NaN
    alert( "to není číslo" / 2 - 1 ); // NaN
    ```

    Je-li tedy někde v matematickém výrazu `NaN`, přenese se až do jeho celkového výsledku (jediná výjimka: `NaN ** 0` je `1`).

```smart header="Matematické operace jsou bezpečné"
Veškeré matematické výpočty v JavaScriptu jsou „bezpečné“. Můžeme provádět cokoli: dělit nulou, zacházet s řetězci neobsahujícími číslo jako s čísly a podobně.

Skript nikdy neskončí fatální chybou („nespadne“). Přinejhorším dostaneme jako výsledek `NaN`.
```

Speciální číselné hodnoty formálně patří k typu „číslo“. Samozřejmě to nejsou čísla v běžném slova smyslu.

O práci s čísly si povíme víc v kapitole <info:number>.

## BigInt [#bigint-type]

Typ „číslo“ v JavaScriptu nedokáže reprezentovat celočíselné hodnoty větší než <code>(2<sup>53</sup>-1)</code> (což je `9007199254740991`), nebo záporné hodnoty nižší než <code>-(-2<sup>53</sup>-1)</code>.

Abychom byli opravdu přesní, typ „číslo“ umí ukládat větší celá čísla (až do <code>1.7976931348623157 * 10<sup>308</sup></code>), ale mimo bezpečný celočíselný interval <code>±(2<sup>53</sup>-1)</code> nastane chyba přesnosti, jelikož do pevného 64-bitového úložiště se nevejdou všechny číslice. Může být tedy uložena „přibližná“ hodnota.

Například tato dvě čísla (těsně nad bezpečným intervalem) budou stejná:

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

Dá se tedy říci, že do typu „číslo“ nelze uložit žádné liché celé číslo větší než <code>(2<sup>53</sup>-1)</code>.

Pro většinu účelů je interval <code>±(2<sup>53</sup>-1)</code> dostačující, ale někdy potřebujeme opravdu velká čísla, např. pro kryptografii nebo časová razítka s přesností na mikrosekundy.

Proto byl do jazyka nedávno přidán typ `BigInt`, který představuje celá čísla libovolné délky.

Hodnota typu `BigInt` vznikne přidáním písmene `n` na konec celého čísla:

```js
// "n" na konci znamená, že to je BigInt
const bigInt = 1234567890123456789012345678901234567890n;
```

Protože čísla typu `BigInt` potřebujeme jen málokdy, nebudeme je tady probírat, ale věnujeme jim zvláštní kapitolu <info:bigint>. Až budete tak velká čísla potřebovat, přečtěte si ji.

<<<<<<< HEAD
```smart header="Otázka kompatibility"
Právě nyní je `BigInt` podporován ve Firefoxu/Chrome/Edge/Safari, ale ne v IE.
```

Nahlédnutím do [*MDN* tabulky kompatibility pro BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#Browser_compatibility) zjistíte, které verze prohlížeče jej podporují.

## Řetězec
=======
## String
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d

Řetězec (anglicky string) v JavaScriptu musí být uzavřen do uvozovek.

```js
let řtzc = "Ahoj";
let řtzc2 = 'Jednoduché uvozovky lze také použít';
let věta = `může zahrnovat jiný ${řtzc}`;
```

JavaScript rozeznává tři druhy uvozovek.

1. Dvojité uvozovky: `"Ahoj"`.
2. Jednoduché uvozovky: `'Ahoj'`.
3. Zpětné uvozovky: <code>&#96;Ahoj&#96;</code>.

Dvojité a jednoduché uvozovky jsou „obyčejné“. V JavaScriptu mezi nimi není prakticky žádný rozdíl.

Zpětné uvozovky jsou uvozovky „s rozšířenou funkcionalitou“. Umožňují nám vložit do řetězce proměnné a výrazy, když je uzavřeme do `${…}`. Například:

```js run
let jméno = "Jan";

// vložíme proměnnou
alert( `Ahoj, *!*${jméno}*/!*!` ); // Ahoj, Jan!

// vložíme výraz
alert( `výsledek je *!*${1 + 2}*/!*` ); // výsledek je 3
```

Výraz uvnitř `${…}` se vypočítá a jeho výsledek se stane součástí řetězce. Můžeme tam vložit cokoli: proměnnou jako `jméno`, aritmetický výraz jako `1 + 2`, nebo i něco složitějšího.

Všimněte si, že toto lze provést jen uvnitř zpětných uvozovek. Ostatní druhy uvozovek tuto funkcionalitu nemají!
```js run
alert( "výsledek je ${1 + 2}" ); // výsledek je ${1 + 2} (dvojité uvozovky s tím nic neudělají)
```

Řetězce probereme podrobněji v kapitole <info:string>.

```smart header="V JavaScriptu není typ *znak*"
V některých jazycích existuje speciální typ „znak“ pro jediný znak. Například v jazyce C nebo Java se nazývá „char“.

V JavaScriptu žádný takový typ není. Je tady jen jeden typ: `string` (řetězec). Řetězec může být prázdný (neobsahovat žádný znak), může se skládat z jediného znaku nebo z více znaků.
```

## Boolean (logický typ)

Typ boolean má jen dvě hodnoty: `true` a `false`.

Tento typ se běžně používá k ukládání hodnot ano/ne: `true` znamená „ano, pravda“, `false` znamená „ne, nepravda“.

Příklad:

```js
let poleJménaZkontrolováno = true; // ano, pole se jménem je zkontrolováno
let poleVěkuZkontrolováno = false; // ne, pole s věkem není zkontrolováno
```

Booleovské hodnoty také dostáváme jako výsledek porovnání:

```js run
let jeVětší = 4 > 1;

alert( jeVětší ); // true (výsledek porovnání je „ano“)
```

Datový typ boolean probereme podrobněji v kapitole <info:logical-operators>.

## Hodnota „null“

Speciální hodnota `null` nepatří k žádnému z výše uvedených typů.

Tvoří samostatný typ, který obsahuje jedině hodnotu `null`:

```js
let věk = null;
```

V JavaScriptu `null` není „odkaz na neexistující objekt“ nebo „nulový ukazatel“, jako v některých jiných jazycích.

Je to speciální hodnota, která představuje „nic“, „prázdno“ nebo „neznámá hodnota“.

Výše uvedený kód říká, že `věk` je neznámý.

## Hodnota „undefined“

Rovněž speciální hodnota `undefined` stojí stranou a tvoří svůj vlastní typ, stejně jako `null`.

Význam `undefined` je „hodnota není přiřazena“.

Je-li proměnná deklarována, ale není jí přiřazena hodnota, pak má hodnotu `undefined`:

```js run
let věk;

alert(věk); // zobrazí „undefined“
```

Technicky je možné výslovně přiřadit hodnotu `undefined` nějaké proměnné:

```js run
let věk = 100;

// změníme hodnotu na undefined
věk = undefined;

alert(věk); // "undefined"
```

...Toto však nedoporučujeme. Běžně se k přiřazení „prázdné“ nebo „neznámé“ hodnoty do proměnné používá `null`, zatímco `undefined` je vyhrazeno jako výchozí úvodní hodnota u proměnných, kterým nebyla hodnota přiřazena.

## Objekty a symboly

Typ `object` je speciální.

Všechny ostatní typy se nazývají „primitivní“, protože jejich hodnoty mohou obsahovat pouze jednu věc (ať je to řetězec, číslo nebo cokoli). Naproti tomu objekty se používají k ukládání kolekcí dat a složitějších entit.

Když jsou objekty tak důležité, vyžadují zvláštní zacházení. Budeme o nich hovořit později v kapitole <info:object>, až se dozvíme více o primitivních typech.

Typ `symbol` se používá k vytváření unikátních identifikátorů pro objekty. Musíme jej zde zmínit, aby seznam byl úplný, ale podrobnosti si necháme až na dobu, kdy budeme vědět více o objektech.

## Operátor typeof [#type-typeof]

Operátor `typeof` vrací typ operandu. Je užitečný, když chceme hodnoty různých typů zpracovávat různě anebo si jen chceme typ rychle ověřit.

Volání `typeof x` vrátí řetězec s názvem typu:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Poslední tři řádky možná vyžadují podrobnější vysvětlení:

1. `Math` je vestavěný objekt, který poskytuje matematické operace. Dozvíme se o něm víc v kapitole <info:number>. Zde nám slouží jen jako příklad objektu.
2. Výsledkem `typeof null` je `"object"`. Toto je oficiálně přiznaná chyba chování `typeof`, která pochází z pravěku JavaScriptu a byla v něm ponechána kvůli kompatibilitě. Ve skutečnosti `null` není objekt. Je to speciální hodnota, která má svůj vlastní typ.
3. Výsledkem `typeof alert` je `"function"`, protože `alert` je funkce. Funkce prostudujeme v dalších kapitolách, kde také uvidíme, že v JavaScriptu není žádný speciální typ „funkce“. Funkce jsou typu objekt. Avšak `typeof` s nimi zachází jinak a vrátí `"function"`. To také pochází z pravěku JavaScriptu. Technicky není toto chování korektní, ale v praxi může být užitečné.

```smart header="Syntaxe `typeof(x)`"
Můžete narazit i na jinou syntaxi: `typeof(x)`. To je totéž jako `typeof x`.

Abychom to objasnili: `typeof` je operátor, ne funkce. Závorky zde uvedené nejsou součástí `typeof`. Je to stejný druh závorek, který se v matematice používá pro seskupování.

Zpravidla takové závorky obsahují matematický výraz, např. `(2 + 2)`, ale zde obsahují jen jediný argument `(x)`. Syntakticky umožňují vyhnout se mezeře mezi operátorem `typeof` a jeho argumentem. Některým lidem se to líbí.

Někteří lidé dávají přednost `typeof(x)`, ačkoli syntaxe `typeof x` je mnohem běžnější.
```

## Shrnutí

V JavaScriptu existuje osm základních datových typů.

- Sedm primitivních datových typů:
    - `number` pro čísla libovolného druhu: celá čísla nebo čísla s plovoucí řádovou čárkou. Celá čísla jsou omezena hodnotou <code>±(2<sup>53</sup>-1)</code>.
    - `bigint` pro celá čísla libovolné délky.
    - `string` pro řetězce. Řetězec může mít nula nebo více znaků. Neexistuje datový typ pro znak.
    - `boolean` pro `true`/`false`.
    - `null` pro neznámé hodnoty -- samostatný typ, který má jedinou hodnotu `null`.
    - `undefined` pro nepřiřazené hodnoty -- samostatný typ, který má jedinou hodnotu `undefined`.
    - `symbol` pro unikátní identifikátory.
- A jeden neprimitivní datový typ:
    - `object` pro složitější datové struktury.

Operátor `typeof` nám umožní zjistit, jaký typ byl uložen do proměnné.

- Obvykle se používá jako `typeof x`, ale je možné i `typeof(x)`.
- Vrátí řetězec s názvem typu, např. `"string"`.
- Pro `null` vrátí `"object"` -- to je chyba jazyka, ve skutečnosti to není objekt.

V dalších kapitolách se zaměříme na primitivní hodnoty. Až je budeme dobře znát, přejdeme k objektům.
