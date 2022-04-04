# BigInt

[recent caniuse="bigint"]

`BigInt` je speciální číselný typ, který poskytuje podporu celých čísel libovolné délky.

Číslo typu BigInt se vytvoří přidáním písmene `n` na konec celočíselného literálu nebo voláním funkce `BigInt`, která vytváří biginty z řetězců, čísel apod.

```js
const bigint = 1234567890123456789012345678901234567890n;

const stejnýBigint = BigInt("1234567890123456789012345678901234567890");

const bigintZČísla = BigInt(10); // totéž jako 10n
```

## Matematické operátory

`BigInt` lze většinou používat jako obvyklé číslo, například:

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

Prosíme všimněte si: dělení `5/2` vrací výsledek zaokrouhlený směrem k nule, bez desetinné části. Všechny operace na bigintech vracejí biginty.

Nemůžeme směšovat biginty a běžná čísla:

```js run
alert(1n + 2); // Chyba: Nelze míchat dohromady BigInt a jiné typy
```

Když je potřeba, měli bychom je explicitně konvertovat: použitím buď `BigInt()`, nebo `Number()`, například:

```js run
let bigint = 1n;
let číslo = 2;

// číslo na bigint
alert(bigint + BigInt(číslo)); // 3

// bigint na číslo
alert(Number(bigint) + číslo); // 3
```

Konverzní operace jsou vždy tiché a nikdy neohlásí chybu, ale je-li bigint příliš velký a nevejde se do číselného typu, budou přebývající bity odříznuty, takže bychom při takové konverzi měli být opatrní.

````smart header="Biginty nepodporují unární plus"
Operátor unárního plusu `+hodnota` je dobře známý způsob, jak převést hodnotu `hodnota` na číslo.

Aby nedocházelo ke zmatkům, biginty jej nepodporují:
```js run
let bigint = 1n;

alert( +bigint ); // chyba
```
Ke konverzi bigintu na číslo bychom tedy měli používat `Number()`.
````

## Porovnávání

Porovnávání, např. `<`, `>`, fungují s biginty a čísly správně:

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

Prosíme všimněte si však, že protože čísla a biginty patří k různým typům, mohou si být rovny `==`, ale ne striktně rovny `===`:

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

## Booleovské operace

Když jsme uvnitř `if` nebo jiných booleovských operací, biginty se chovají jako čísla.

Například v `if` je bigint `0n` nepravdivý, ostatní hodnoty jsou pravdivé:

```js run
if (0n) {
  // nikdy se nespustí
}
```

Rovněž booleovské operátory, např. `||`, `&&` a jiné, fungují s biginty obdobně jako s čísly:

```js run
alert( 1n || 2 ); // 1 (1n se považuje za pravdivé)

alert( 0n || 2 ); // 2 (0n se považuje za nepravdivé)
```

## Polyfilly

Polyfillování bigintů je problematické. Příčinou je, že mnoho JavaScriptových operátorů, např. `+`, `-` a podobně, se chová na bigintech jinak oproti běžným číslům.

Například dělení bigintů vrátí vždy bigint (zaokrouhlený, je-li to nutné).

Aby polyfill mohl takové chování emulovat, musel by analyzovat kód a nahradit všechny takové operátory svými funkcemi. Provést něco takového je však těžkopádné a značně by to snížilo výkon.

Dosud tedy není dobře znám žádný dobrý polyfill.

Jinou cestičku kolem ovšem nabízejí vývojáři knihovny [JSBI](https://github.com/GoogleChromeLabs/jsbi).

Tato knihovna implementuje velká čísla svými vlastními metodami. Můžeme je používat místo nativních bigintů:

| Operace | Nativní `BigInt` | JSBI |
|-----------|-----------------|------|
| Vytvoření z čísla | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Sčítání | `c = a + b` | `c = JSBI.add(a, b)` |
| Odčítání	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...A pak použít polyfill (plugin Babel) ke konverzi volání JSBI na nativní biginty pro prohlížeče, které je podporují.

Jinými slovy, tento přístup nám navrhuje, abychom místo používání nativních bigintů psali kód v JSBI. Avšak JSBI interně pracuje s čísly jako s biginty a emuluje je způsobem blízkým specifikaci, takže kód bude „připraven pro biginty“.

Takový kód s JSBI můžeme používat „tak, jak je“ na enginech, které biginty nepodporují, i na těch, které ano -- polyfill bude konvertovat volání na nativní biginty.

## Odkazy

- [MDN dokumentace BigIntu](mdn:/JavaScript/Reference/Global_Objects/BigInt).
- [Specifikace](https://tc39.es/ecma262/#sec-bigint-objects).