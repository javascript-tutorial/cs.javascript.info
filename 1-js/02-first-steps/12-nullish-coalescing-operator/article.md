# Operátor koalescence „??“

[recent browser="new"]

Operátor koalescence se zapisuje dvěma otazníky za sebou `??`.

Protože tento operátor zachází s hodnotami `null` a `undefined` podobně, budeme v tomto článku používat speciální pojem. Řekněmě, že výraz je „definován“, pokud nemá hodnotu `null` ani `undefined`.

Výsledkem `a ?? b` je:
- pokud `a` je definovaný, pak `a`;
- pokud `a` není definovaný, pak `b`;

Jinými slovy, `??` vrátí první argument, jestliže ten nemá hodnotu `null/undefined`. Jinak vrátí druhý argument.

Operátor koalescence není zcela nová věc. Je to jen pěkná syntaxe, jak vrátit první „definovanou“ hodnotu ze dvou.

Můžeme přepsat `result = a ?? b` pomocí operátorů, které již známe, například:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Nyní by mělo být naprosto zřejmé, co `??` umí. Podíváme se, kde nám pomůže.

Operátor `??` se běžně používá k poskytnutí defaultní hodnoty proměnné, která může být nedefinovaná.

Například zde zobrazíme `anonym`, jestliže proměnná `uživatel` není definována:

```js run
let uživatel;

alert(uživatel ?? "anonym"); // anonym (uživatel není definován)
```

Zde je příklad pro případ, že je proměnné `uživatel` přiřazena hodnota:

```js run
let uživatel = "Jan";

alert(uživatel ?? "anonym"); // Jan (uživatel je definován)
```

Můžeme také použít sekvenci `??` k výběru první hodnoty ze seznamu, která není `null/undefined`.

Představme si, že máme data o uživateli v proměnných `jméno`, `příjmení` a `přezdívka`, které obsahují jeho křestní jméno, příjmení a přezdívku. Všechny mohou být nedefinované, jestliže se uživatel rozhodl nezadat žádnou hodnotu.

Rádi bychom zobrazili uživatelovo jméno: jednu z těchto tří proměnných, nebo „Anonym“, pokud žádná z nich není definována.

Použijeme k tomu operátor `??`:

```js run
let jméno = null;
let příjmení = null;
let přezdívka = "Supercoder";

// zobrazíme první definovanou hodnotu:
*!*
alert(jméno ?? příjmení ?? přezdívka ?? "Anonym"); // Supercoder
*/!*
```

## Srovnání s ||

Operátor OR `||` můžeme používat stejným způsobem jako `??`, jak bylo popsáno v [předchozí kapitole](info:logical-operators#or-finds-the-first-truthy-value).

Například ve výše uvedeném kódu můžeme operátor `??` nahradit operátorem `||` a získat stejný výsledek:

```js run
let jméno = null;
let příjmení = null;
let přezdívka = "Supercoder";

// zobrazí první pravdivou hodnotu:
*!*
alert(jméno || příjmení || přezdívka || "Anonym"); // Supercoder
*/!*
```

Historicky tu operátor OR `||` byl dříve. Existuje již od začátků JavaScriptu, takže jej vývojáři pro tyto účely dlouhou dobu skutečně používali.

Naproti tomu operátor koalescence `??` byl do JavaScriptu přidán teprve nedávno a důvodem bylo, že lidé nebyli s operátorem `||` zcela spokojeni.

Důležitý rozdíl mezi nimi je, že:
- `||` vrací první *pravdivou* hodnotu.
- `??` vrací první *definovanou* hodnotu.

Jinými slovy, `||` nerozlišuje mezi `false`, `0`, prázdným řetězcem `""` a `null/undefined`. Pro něj jsou všechny stejné -- nepravdivé hodnoty. Je-li kterákoli z nich prvním argumentem `||`, dostaneme jako výsledek druhou hodnotu.

V praxi však můžeme chtít použít defaultní hodnotu jen tehdy, je-li proměnná `null/undefined`, tedy když hodnota je opravdu neznámá nebo není nastavena.

Například uvažujme tento kód:

```js run
let výška = 0;

alert(výška || 100); // 100
alert(výška ?? 100); // 0
```

- `výška || 100` prověří, zda `výška` je nepravdivá hodnota, a protože je `0`, je tomu tak.
  - výsledkem `||` je tedy druhý argument `100`.
- `výška ?? 100` prověří, zda `výška` je `null/undefined`, a to není.
  - výsledkem je tedy `výška` tak, jak je, tedy `0`.

V praci je nulová výška často platnou hodnotou, takže by neměla být nahrazena defaultní hodnotou. Zde tedy bude správně fungovat `??`.

## Priorita

Priorita operátoru `??` je přibližně stejná jako `||`, jen o něco nižší. Je rovna `5` v [tabulce MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), zatímco `||` má prioritu `6`.

To znamená, že operátor koalescence `??` se stejně jako `||` vyhodnocuje před `=` a `?`, ale až po většině ostatních operací, například  `+`, `*`.

Jestliže tedy chcete vybrat hodnotu pomocí `??` ve výrazu obsahujícím i jiné operátory, zvažte použití závorek:

```js run
let výška = null;
let šířka = null;

// důležité: použijte závorky
let plocha = (výška ?? 100) * (šířka ?? 50);

alert(plocha); // 5000
```

Kdybychom závorky nepoužili, `*` by se spustilo jako první, neboť má vyšší prioritu než `??`. To by vedlo k nesprávným výsledkům.

```js
// bez závorek
let plocha = výška ?? 100 * šířka ?? 50;

// ...funguje stejně jako toto (což jsme pravděpodobně nechtěli):
let plocha = výška ?? (100 * šířka) ?? 50;
```

### Používání ?? společně s && nebo ||

Z bezpečnostních důvodů JavaScript zakazuje používat `??` společně s operátory `&&` a `||`, pokud není priorita výslovně uvedena pomocí závorek.

Následující kód vydá syntaktickou chybu:

```js run
let x = 1 && 2 ?? 3; // Syntaktická chyba
```

Toto omezení je bezpochyby diskutabilní. Do specifikace jazyka bylo přidáno za účelem zabránit programátorským chybám, až lidé začnou z `||` přecházet na `??`.

Dá se obejít pomocí závorek:

```js run
*!*
let x = (1 && 2) ?? 3; // funguje
*/!*

alert(x); // 2
```

## Shrnutí

- Operátor koalescence `??` poskytuje zkratku, jak vybrat první „definovanou“ hodnotu ze seznamu.

    Používá se k přiřazení defaultních hodnot do proměnných:

    ```js
    // nastavíme výška=100, je-li výška null nebo undefined
    výška = výška ?? 100;
    ```

- Operátor `??` má velmi nízkou prioritu, jen o něco vyšší než `?` a `=`, takže když jej používáte ve výrazu, zvažte použití závorek.
- Je zakázáno používat jej spolu s operátory `||` nebo `&&` bez uvedení závorek.
