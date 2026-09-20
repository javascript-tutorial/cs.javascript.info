
# Únikové a speciální znaky

Jak jsme viděli, k označení znakových tříd se používá zpětné lomítko `pattern:\`, např. `pattern:\d`. V regulárních výrazech je to tedy speciální znak (stejně jako v běžných řetězcích).

V regulárních výrazech mají speciální význam i jiné speciální znaky, například `pattern:[ ] { } ( ) \ ^ $ . | ? * +`. Používají se k provádění silnějšího hledání.

Nesnažte se si tento seznam zapamatovat -- se všemi těmito znaky se brzy setkáme a pak je budete znát jako své boty.

## Únikový znak

Řekněme, že chceme najít tečku. Ne „libovolný znak“, ale skutečnou tečku.

Abychom použili speciální znak jako běžný, uvedeme před ním zpětné lomítko: `pattern:\.`.

Tomu se také říká „únikový znak“.

Příklad:
```js run
alert( "Kapitola 5.1".match(/\d\.\d/) ); // 5.1 (shoda!)
alert( "Kapitola 511".match(/\d\.\d/) ); // null (hledá opravdovou tečku \.)
```

Závorky jsou také speciální znaky, takže pokud je chceme hledat, měli bychom použít `pattern:\(`. Následující příklad hledá řetězec `"g()"`:

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

Jestliže hledáme zpětné lomítko `\`, je to speciální znak v běžných řetězcích i v regulárních výrazech, takže bychom je měli zdvojit.

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

## Lomítko

Symbol lomítka `'/'` není speciální znak, ale v JavaScriptu se používá k otevření a uzavření RV: `pattern:/...vzor.../`, takže bychom i před ním měli uvést únikový znak.

Takto vypadá hledání lomítka `'/'`:

```js run
alert( "/".match(/\//) ); // '/'
```

Naproti tomu, jestliže nepoužíváme `pattern:/.../`, ale vytváříme nový RV pomocí `new RegExp`, nemusíme uvádět únikový znak:

```js run
alert( "/".match(new RegExp("/")) ); // najde /
```

## new RegExp

Jestliže vytváříme regulární výraz pomocí `new RegExp`, nemusíme uvést únikový znak před `/`, ale musíme jej uvést před jinými znaky.

Uvažujme například tohle:

```js run
let rv = new RegExp("\d\.\d");

alert( "Kapitola 5.1".match(rv) ); // null
```

V jednom z předchozích příkladů fungovalo podobné hledání s `pattern:/\d\.\d/`, ale `new RegExp("\d\.\d")` nefunguje, proč?

Důvodem je, že zpětná lomítka jsou „spotřebována“ řetězcem. Jak si možná vzpomínáme, běžné řetězce mají své vlastní speciální znaky, např. `\n`, a zpětné lomítko se používá jako únikový znak.

Takto bude pochopeno `"\d\.\d"`:

```js run
alert("\d\.\d"); // d.d
```

Řetězcové uvozovky „spotřebují“ zpětná lomítka a interpretují je po svém, například:

- `\n` -- vytvoří znak nového řádku,
- `\u1234` -- vytvoří znak s uvedeným kódem v Unicode,
- ...a když není žádný speciální význam, například `pattern:\d` nebo `\z`, bude zpětné lomítko jednoduše odstraněno.

`new RegExp` tedy obdrží řetězec bez zpětných lomítek. Proto hledání nefunguje!

Abychom to opravili, potřebujeme dvojici zpětných lomítek, protože řetězcové uvozovky změní `\\` na `\`:

```js run
*!*
let regŘetězec = "\\d\\.\\d";
*/!*
alert(regŘetězec); // \d\.\d (teď je to správně)

let rv = new RegExp(regŘetězec);

alert( "Kapitola 5.1".match(rv) ); // 5.1
```

## Shrnutí

- Abychom mohli najít přímo speciální znaky `pattern:[ \ ^ $ . | ? * + ( )`, musíme před nimi uvést zpětné lomítko `\` („únikový znak“).
- Pokud jsme uvnitř `pattern:/.../`, musíme uvést únikový znak i před `/` (ale ne uvnitř `new RegExp`).
- Když předáváme řetězec do `new RegExp`, musíme zpětná lomítka zdvojit `\\`, protože řetězcové uvozovky jedno z nich spotřebují.
