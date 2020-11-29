# Logické operátory

V JavaScriptu jsou tři logické operátory: `||` (OR -- nebo), `&&` (AND -- a), `!` (NOT -- ne).

Ačkoli se nazývají „logické“, mohou být použity na hodnoty libovolného typu, nejenom boolean. Také jejich výsledek může být jakéhokoli typu.

Podívejme se na podrobnosti.

## || (OR)

Operátor „OR“ („nebo“) je reprezentován dvěma svislými čarami za sebou:

```js
výsledek = a || b;
```

V klasickém programování je logické OR určeno pouze k manipulaci s booleovskými hodnotami. Je-li některý z jeho argumentů `true`, vrátí `true`, jinak vrátí `false`.

V JavaScriptu je tento operátor trochu rafinovanější a silnější. Nejprve se však podívejme, co se stane s hodnotami typu boolean.

Existují čtyři možné logické kombinace:

```js run
alert( true || true );   // true
alert( false || true );  // true
alert( true || false );  // true
alert( false || false ); // false
```

Jak vidíme, výsledek je vždy `true` kromě případu, kdy jsou oba operandy `false`.

Není-li operand typu boolean, je pro účel vyhodnocení převeden na boolean.

Například číslo `1` se převede na `true`, číslo `0` na `false`:

```js run
if (1 || 0) { // funguje stejně jako if ( true || false )
  alert( 'pravda!' );
}
```

Většinou se OR `||` používá v příkazu `if` k otestování, zda *některá* ze zadaných podmínek je `true`.

Příklad:

```js run
let hodina = 9;

*!*
if (hodina < 10 || hodina > 18) {
*/!*
  alert( 'Úřad má zavřeno.' );
}
```

Můžeme předat další podmínky:

```js run
let hodina = 12;
let jeVíkend = true;

if (hodina < 10 || hodina > 18 || jeVíkend) {
  alert( 'Úřad má zavřeno.' ); // je víkend
}
```

## OR „||“ najde první pravdivou hodnotu

Výše uvedená logika je vcelku klasická. Nyní se podívejme na „extra“ vlastnosti JavaScriptu.

Rozšířený algoritmus funguje následovně.

Zadáme více hodnot, spojených ORem:

```js
výsledek = hodnota1 || hodnota2 || hodnota3;
```

Operátor OR `||` provádí následující:

- Vyhodnocuje operandy zleva doprava.
- Každý operand převede na typ boolean. Je-li výsledek `true`, zastaví se a vrátí původní hodnotu tohoto operandu.
- Pokud byly vyhodnoceny všechny operandy (tj. všechny byly `false`), vrátí poslední operand.

Hodnota se vrátí ve své původní podobě bez konverze.

Jinými slovy, řetězec ORů `"||"` vrátí první pravdivou hodnotu, a pokud není žádná pravdivá hodnota nalezena, vrátí poslední hodnotu.

Příklad:

```js run
alert( 1 || 0 ); // 1 (1 je pravdivá)

alert( null || 1 ); // 1 (1 je první pravdivá hodnota)
alert( null || 0 || 1 ); // 1 (první pravdivá hodnota)

alert( undefined || null || 0 ); // 0 (všechny jsou nepravdivé, vrátí poslední hodnotu)
```

To umožňuje některé zajímavé způsoby použití ve srovnání s „čistým, klasickým, pouze booleovským ORem“.

1. **Získání první pravdivé hodnoty ze seznamu proměnných nebo výrazů.**

    Například máme proměnné `jméno`, `příjmení` a `přezdívka`, všechny jsou nepovinné.
    
    Vybereme pomocí OR `||` tu, která obsahuje data, a zobrazíme je (není-li nastaveno nic, zobrazíme `anonym`):

    ```js run
    let jméno = "";
    let příjmení = "";
    let přezdívka = "SuperCoder";

    *!*
    alert( jméno || příjmení || přezdívka || "anonym"); // SuperCoder
    */!*
    ```

    Kdyby byly všechny proměnné nepravdivé, zobrazil by se `anonym`.

2. **Zkrácené vyhodnocení.**

    Další vlastností operátoru OR `||` je tzv. „zkrácené“ vyhodnocení.

    Znamená to, že `||` zpracovává své argumenty, dokud nenarazí na první pravdivou hodnotu, a pak tuto hodnotu okamžitě vrátí, aniž by se byť jen dotkl dalších argumentů.

    Tato jeho vlastnost nabude na významu, jestliže operandem nebude pouhá hodnota, ale výraz s vedlejším efektem, například přiřazení proměnné nebo volání funkce.

    V níže uvedeném příkladu se zobrazí jen druhá zpráva:

    ```js run no-beautify
    *!*true*/!* || alert("nezobrazí se");
    *!*false*/!* || alert("zobrazí se");
    ```

    Operátor OR `||` na prvním řádku se přestane vyhodnocovat ihned poté, co narazí na `true`, takže `alert` se nevykoná.

    Někdy lidé využívají tuto vlastnost k tomu, aby vykonali příkaz jen tehdy, není-li splněna podmínka na levé straně.

## && (AND)

Operátor „AND“ („a“) je reprezentován dvěma znaky „ampersand“ `&&`:

```js
výsledek = a && b;
```

V klasickém programování AND vrací `true`, jsou-li oba operandy pravdivé, a `false` jinak:

```js run
alert( true && true );   // true
alert( false && true );  // false
alert( true && false );  // false
alert( false && false ); // false
```

Příklad s `if`:

```js run
let hodina = 12;
let minuta = 30;

if (hodina == 12 && minuta == 30) {
  alert( 'Je právě 12:30' );
}
```

Stejně jako u OR může být operandem AND jakákoli hodnota:

```js run
if (1 && 0) { // vyhodnotí se jako true && false
  alert( "nevykoná se, protože výsledkem je nepravda" );
}
```


## AND „&&“ najde první nepravdivou hodnotu

Mějme několik hodnot spojených ANDem:

```js
výsledek = hodnota1 && hodnota2 && hodnota3;
```

Operátor AND `&&` provádí následující:

- Vyhodnocuje operandy zleva doprava.
- Každý operand převede na typ boolean. Je-li výsledek `false`, zastaví se a vrátí původní hodnotu tohoto operandu.
- Pokud byly vyhodnoceny všechny operandy (tj. všechny byly pravdivé), vrátí poslední operand.

Jinými slovy, řetězec ANDů `"||"` vrátí první nepravdivou hodnotu, a pokud není žádná nepravdivá hodnota nalezena, vrátí poslední hodnotu.

Výše uvedená pravidla se podobají operátoru OR. Rozdíl spočívá v tom, že AND najde první *nepravdivou* hodnotu, zatímco OR najde první *pravdivou*.

Příklady:

```js run
// je-li první operand pravdivý,
// AND vrátí druhý operand:
alert( 1 && 0 ); // 0
alert( 1 && 5 ); // 5

// je-li první operand nepravdivý,
// AND ho vrátí. Druhý operand se pak ignoruje.
alert( null && 5 ); // null
alert( 0 && "je jedno co" ); // 0
```

Můžeme předat i více hodnot za sebou. Podívejme se, jak se vrátí první nepravdivá:

```js run
alert( 1 && 2 && null && 3 ); // null
```

Když jsou všechny hodnoty pravdivé, vrátí se poslední z nich:

```js run
alert( 1 && 2 && 3 ); // 3, poslední hodnota
```

````smart header="Priorita AND `&&` je vyšší než priorita OR `||`"
Priorita operátoru AND `&&` je vyšší než priorita operátoru OR `||`.

Kód `a && b || c && d` je tedy v zásadě stejný, jako kdyby výrazy s `&&` byly uzavřeny do závorek: `(a && b) || (c && d)`.
````

````warn header="Nenahrazujte příkaz `if` operátorem || nebo &&"
Někdy lidé používají operátor AND `&&` jako „kratší variantu `if`“.

Příklad:

```js run
let x = 1;

(x > 0) && alert( 'Větší než nula!' );
```

Akce napravo od `&&` se vykoná jen tehdy, když k ní dospěje vyhodnocování, tedy jen když `(x > 0)` platí.

Máme tedy v zásadě analogii k:

```js run
let x = 1;

if (x > 0) alert( 'Větší než nula!' );
```

Ačkoli varianta s `&&` se zdá být kratší, `if` je jasnější a bývá trochu čitelnější. Doporučujeme tedy používat každou konstrukci k tomu, k čemu byla stvořena: používejte `if`, chcete-li „pokud“, a používejte `&&`, chcete-li AND.
````


## ! (NOT)

Booleovský operátor „NOT“ („ne“) je reprezentován vykřičníkem `!`.

Jeho syntaxe je velice jednoduchá:

```js
výsledek = !hodnota;
```

Tento operátor přijímá jediný argument a provádí následující:

1. Převede operand na typ boolean: `true/false`.
2. Vrátí opačnou hodnotu.

Příklad:

```js run
alert( !true ); // false
alert( !0 ); // true
```

Někdy se používá dvojité NOT `!!` ke konverzi hodnoty na typ boolean:

```js run
alert( !!"neprázdný řetězec" ); // true
alert( !!null ); // false
```

Znamená to, že první NOT převede hodnotu na boolean a vrátí opak, druhý NOT jej znovu převrátí. Na konci tedy máme planou konverzi na boolean.

Existuje trochu výmluvnější způsob, jak udělat totéž -- vestavěná funkce `Boolean`:

```js run
alert( Boolean("neprázdný řetězec") ); // true
alert( Boolean(null) ); // false
```

Operátor NOT `!` má nejvyšší prioritu ze všech logických operátorů, takže se vždy vykoná jako první, dříve než `&&` nebo `||`.
