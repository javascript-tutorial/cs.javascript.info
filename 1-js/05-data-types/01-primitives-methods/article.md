# Metody primitivů

JavaScript nám umožňuje pracovat s primitivy (řetězci, čísly atd.), jako by to byly objekty. Poskytuje i metody, které na nich můžeme volat jako na objektech. V dalších kapitolách je prostudujeme, ale nejprve se podíváme, jak to funguje, protože primitivy samozřejmě nejsou objekty (a zde to ještě více ozřejmíme).

Podíváme se na klíčové rozdíly mezi primitivy a objekty.

Primitiv:

- Je hodnota primitivního typu.
- Existuje 7 primitivních typů: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` a `undefined`.

Objekt:

- Dokáže obsahovat více hodnot uložených ve svých vlastnostech.
- Může být vytvořen pomocí `{}`, např. `{jméno: "Jan", věk: 30}`. V JavaScriptu jsou i jiné druhy objektů, například funkce jsou objekty.

Jedna z nejlepších věcí na objektech je, že jako jejich vlastnost můžeme uložit funkci.

```js run
let jan = {
  jméno: "Jan",
  řekniAhoj: function() {
    alert("Ahoj kámo!");
  }
};

jan.řekniAhoj(); // Ahoj kámo!
```

Zde jsme tedy vytvořili objekt `jan` s metodou `řekniAhoj`.

JavaScript obsahuje mnoho vestavěných objektů, například ty, které pracují s daty, chybami, HTML prvky a podobně. Mají různé vlastnosti a metody.

Tyto vlastnosti však mají svou cenu!

Objekty jsou „těžší“ než primitivy. Vyžadují více zdrojů, které zatěžují vnitřní stroj.

## Primitiv jako objekt

Tvůrci JavaScriptu čelili následujícímu paradoxu:

- Existuje mnoho věcí, které člověk chce dělat s primitivy, jakými jsou řetězec nebo číslo. Bylo by skvělé přistupovat k nim pomocí metod.
- Primitivy musejí být co nejrychlejší a co nejmenší.

Řešení vypadá trochu těžkopádně, ale je zde:

1. Primitiv je pořád primitiv. Jednoduchá hodnota, po jaké toužíme.
2. Jazyk umožňuje přístup k metodám a vlastnostem řetězců, čísel, booleanů a symbolů.
3. Aby to fungovalo, vytvoří se speciální objekt zvaný „obal“ neboli „wrapper“, který tuto přídavnou funkcionalitu poskytne a pak bude zničen.

Tyto „objektové obaly“ jsou pro každý primitivní typ jiné a nazývají se: `String`, `Number`, `Boolean`, `Symbol` a `BigInt`. Poskytují tedy různé sady metod.

Například existuje řetězcová metoda [řetězec.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase), která vrací `řetězec` zapsaný velkými písmeny.

Funguje následovně:

```js run
let řetězec = "Ahoj";

alert( řetězec.toUpperCase() ); // AHOJ
```

Jednoduché, že? Ve skutečnosti se v `řetězec.toUpperCase()` děje následující:

1. Řetězec `řetězec` je primitiv. V okamžiku přístupu k jeho vlastnosti se tedy vytvoří speciální objekt, který zná hodnotu tohoto řetězce a obsahuje užitečné metody, např. `toUpperCase()`.
2. Tato metoda se spustí a vrátí nový řetězec (který je zobrazen funkcí `alert`).
3. Speciální objekt se zničí a zůstane samotný primitiv `řetězec`.

Primitivy tedy mohou poskytovat metody, ale samy zůstávají malé.

JavaScriptový motor tento proces značně optimalizuje. Může dokonce úplně vynechat vytvoření nového objektu. Stále však musí dodržovat specifikaci a chovat se tak, jako by jej vytvořil.

I čísla mají své vlastní metody, například [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) zaokrouhluje číslo se zadanou přesností:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

Další specifické metody uvidíme v kapitolách <info:number> a <info:string>.


````warn header="Konstruktory `String/Number/Boolean` jsou jen pro interní použití"
Některé jazyky, např. Java, nám umožňují explicitně vytvářet „obaly“ pro primitivy pomocí syntaxe typu `new Number(1)` nebo `new Boolean(false)`.

V JavaScriptu je to z historických důvodů také možné, ale důrazně **nedoporučované**. Skript se začne chovat bláznivě hned na několika místech.

Například:

```js run
alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
```

Objekty jsou v `if` vždy pravdivé, takže zde se zobrazí hlášení:

```js run
let nula = new Number(0);

if (nula) { // nula je pravdivá, protože je to objekt
  alert( "nula je pravdivá!?!" );
}
```

Naproti tomu použití stejné funkce `String/Number/Boolean` bez `new` je zcela správná a užitečná věc. Funkce převede hodnotu na odpovídající typ: na řetězec, na číslo nebo na boolean (na primitiv).

Například tohle je zcela v pořádku:

```js
let číslo = Number("123"); // převede řetězec na číslo
```
````


````warn header="null/undefined nemají žádné metody"
Speciální primitivy `null` a `undefined` představují výjimky. Nemají odpovídající „obaly“ a neposkytují žádné metody. V určitém smyslu slova jsou vlastně „ty nejprimitivnější“.

Pokus o přístup k vlastnosti takové hodnoty ohlásí chybu:

```js run
alert(null.test); // chyba
````

## Shrnutí

- Primitivy s výjimkou `null` a `undefined` poskytují mnoho užitečných metod. Prostudujeme je v následujících kapitolách.
- Formálně tyto metody pracují na dočasných objektech, ale JavaScriptové motory jsou dobře vyladěny, aby je vnitřně optimalizovaly, takže jejich volání není nákladné.