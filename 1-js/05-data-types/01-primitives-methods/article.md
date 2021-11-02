# Metody primitivů

JavaScript nám umožňuje pracovat s primitivy (řetězci, čísly atd.), jako by to byly objekty. Poskytuje i metody, které můžeme takto volat. Brzy je prostudujeme, ale nejprve se podíváme, jak to funguje, protože primitivy samozřejmě nejsou objekty (a zde to ještě více ozřejmíme).

Podíváme se na klíčové rozdíly mezi primitivy a objekty.

Primitiv:

- Je hodnota primitivního typu.
- Existuje 7 primitivních typů: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` a `undefined`.

Objekt:

- Je schopen ukládat více hodnot jako své vlastnosti.
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

Mnoho objektů je již vestavěných, například ty, které pracují s daty, chybami, HTML prvky a podobně. Mají různé vlastnosti a metody.

Tyto vlastnosti však mají svou cenu!

Objekty jsou „těžší“ než primitivy. Vyžadují více zdrojů, které zatěžují interní mašinérii.

## Primitiv jako objekt

Tvůrce JavaScriptu čelil následujícímu paradoxu:

- Existuje mnoho věcí, které člověk chce dělat s primitivy, jakými jsou řetězec nebo číslo. Bylo by skvělé přistupovat k nim jako k metodám.
- Primitivy musejí být co nejrychlejší a co nejlehčí.

Řešení vypadá trochu těžkopádně, ale je zde:

1. Primitiv je pořád primitiv. Jednoduchá hodnota, po jaké toužíme.
2. Jazyk umožňuje přístup k metodám a vlastnostem řetězců, čísel, booleanů a symbolů.
3. Aby to fungovalo, vytvoří se speciální objekt zvaný „wrapper“ *(česky se mu někdy říká „obal“ -- pozn. překl.)*, který poskytne tuto přídavnou funkcionalitu a pak bude zničen.

Tyto „wrappery“ jsou pro každý primitivní typ jiné a nazývají se `String`, `Number`, `Boolean` a `Symbol`. Poskytují tedy různé sady metod.

Například existuje řetězcová metoda [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase), která vrací řetězec `str` velkými písmeny.

Funguje následovně:

```js run
let str = "Ahoj";

alert( str.toUpperCase() ); // AHOJ
```

Jednoduché, že? Ve skutečnosti se ve `str.toUpperCase()` děje následující:

1. Řetězec `str` je primitiv. V okamžiku přístupu k jeho vlastnosti se tedy vytvoří speciální objekt, který zná hodnotu tohoto řetězce a obsahuje užitečné metody, např. `toUpperCase()`.
2. Tato metoda se spustí a vrátí nový řetězec (který je zobrazen funkcí `alert`).
3. Speciální objekt se zničí a zůstane samotný primitiv `str`.

Primitivy tedy mohou poskytovat metody, ale samy zůstávají lehké.

JavaScriptový engine tento proces vysoce optimalizuje. Může dokonce úplně vynechat vytvoření nového objektu. Stále však musí dodržovat specifikaci a chovat se tak, jako by jej vytvořil.

I číslo má své vlastní metody, například [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) zaokrouhluje číslo na zadanou přesnost:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

Další specifické metody uvidíme v kapitolách <info:number> a <info:string>.


````warn header="Konstruktory `String/Number/Boolean` jsou jen pro interní použití"
Některé jazyky, např. Java, nám umožňují explicitně vytvářet „wrappery“ pro primitivy pomocí syntaxe typu `new Number(1)` nebo `new Boolean(false)`.

V JavaScriptu je to z historických důvodů také možné, ale silně **nedoporučované**. Věci začnou bláznit hned na několika místech.

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

Na druhou stranu použití stejné funkce `String/Number/Boolean` bez `new` je naprosto rozumná a užitečná věc. Funkce převede hodnotu na odpovídající typ: na řetězec, na číslo nebo na boolean (na primitiv).

Například tohle je zcela v pořádku:
```js
let num = Number("123"); // převede řetězec na číslo
```
````


````warn header="null/undefined nemají žádné metody"
Speciální primitivy `null` a `undefined` jsou výjimky. Nemají odpovídající „wrappery“ a neposkytují žádné metody. V určitém smyslu slova jsou vlastně „ty nejprimitivnější“.

Pokus o přístup k vlastnosti takové hodnoty ohlásí chybu:

```js run
alert(null.test); // chyba
````

## Shrnutí

- Primitivy s výjimkou `null` a `undefined` poskytují mnoho užitečných metod. Prostudujeme je v následujících kapitolách.
- Formálně tyto metody pracují na dočasných objektech, ale JavaScriptové enginy jsou dobře vyladěny, aby je interně optimalizovaly, takže jejich volání není nákladné.