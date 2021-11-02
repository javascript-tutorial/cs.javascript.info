# Konstruktor, operátor „new“

Obvyklá syntaxe `{...}` nám umožňuje vytvořit jeden objekt. Často však potřebujeme vytvořit mnoho podobných objektů, např. více uživatelů, položek menu a podobně.

To můžeme učinit pomocí konstruktorů a operátoru `"new"`.

## Konstruktor

Konstruktory jsou z technického hlediska běžné funkce. Platí pro ně však dvě konvence:

1. Jejich název začíná velkým písmenem.
2. Měly by být volány jen pomocí operátoru `„new“`.

Například:

```js run
function Uživatel(jméno) {
  this.jméno = jméno;
  this.jeAdmin = false;
}

*!*
let uživatel = new Uživatel("Kuba");
*/!*

alert(uživatel.jméno); // Kuba
alert(uživatel.jeAdmin); // false
```

Když je funkce volána pomocí `new`, provedou se následující kroky:

1. Vytvoří se nový prázdný objekt a přiřadí se do `this`.
2. Vykoná se tělo funkce. To obvykle modifikuje `this` a přidá do něj nové vlastnosti.
3. Vrátí se hodnota `this`.

Jinými slovy, `new Uživatel(...)` udělá něco jako:

```js
function Uživatel(jméno) {
*!*
  // this = {};  (implicitně)
*/!*

  // přidá do něj vlastnosti
  this.jméno = jméno;
  this.jeAdmin = false;

*!*
  // return this;  (implicitně)
*/!*
}
```

Takže `let uživatel = new Uživatel("Kuba")` vydá stejný výsledek jako:

```js
let uživatel = {
  jméno: "Kuba",
  jeAdmin: false
};
```

Když nyní budeme chtít vytvořit jiné uživatele, můžeme volat `new Uživatel("Anna")`, `new Uživatel("Alice")` a tak dále. Je to mnohem kratší než pokaždé používat literály a je to i lépe čitelné.

To je hlavní smysl konstruktorů -- implementovat opakovaně použitelný kód pro vytváření objektů.

Znovu poznamenejme, že technicky může být libovolná funkce použita jako konstruktor. To znamená, že kterákoli funkce může být volána pomocí `new` a pak se vykoná výše uvedený algoritmus. „Velké první písmeno“ je obvyklá úmluva, z níž bude zřejmé, že funkce má být volána pomocí `new`.

````smart header="new function() { ... }"
Máme-li mnoho řádků kódu a všechny se týkají vytvoření jediného složitého objektu, můžeme je zapouzdřit do konstruktoru, například:

```js
let uživatel = new function() {
  this.jméno = "John";
  this.jeAdmin = false;

  // ...další kód pro vytváření uživatele
  // možná složitá logika a příkazy
  // lokální proměnné atd.
};
```

Tento konstruktor nemůžeme opakovaně volat, protože není nikde uložen. Jen se vytvoří a zavolá. Smyslem tohoto triku tedy je zapouzdřit kód, který vytvoří jediný objekt a dále se nepoužívá.
````

## Test režimu konstruktoru: new.target

```smart header="Pokročilá záležitost"
Syntaxe z této části se používá málokdy. Pokud nechcete znát opravdu všechno, můžete ji přeskočit.
```

Uvnitř funkce můžeme ověřit, zda byla volána pomocí `new` nebo bez něj, speciální vlastností `new.target`.

Ta je při běžném volání `undefined`, ale pokud je funkce volána pomocí `new`, rovná se této funkci:

```js run
function Uživatel() {
  alert(new.target);
}

// bez „new“:
*!*
Uživatel(); // undefined
*/!*

// s „new“:
*!*
new Uživatel(); // function Uživatel { ... }
*/!*
```

Můžeme ji použít uvnitř funkce, abychom se dozvěděli, zda byla volána „v režimu konstruktoru“ pomocí `new` nebo „v běžném režimu“ bez něj.

Můžeme také funkci přimět, aby při volání pomocí `new` a při běžném volání prováděla totéž, například takto:

```js run
function Uživatel(jméno) {
  if (!new.target) { // pokud mě spustíte bez new
    return new Uživatel(jméno); // ...přidám new pro vás
  }

  this.jméno = jméno;
}

let jan = Uživatel("Jan"); // přesměruje volání na new Uživatel
alert(jan.jméno); // Jan
```

Tento přístup se někdy používá v knihovnách, aby byla syntaxe flexibilnější. Lidé pak mohou volat funkci s `new` nebo bez něj a funkce stále funguje.

Pravděpodobně však není dobré používat jej všude, protože bez uvedení `new` je trochu méně zřejmé, co se tady děje. Když je uvedeno `new`, všichni víme, že se vytváří nový objekt.

## Návrat z konstruktorů

Konstruktory obvykle nemají příkaz `return`. Jejich úkolem je zapsat všechno potřebné do `this` a to se pak automaticky stane výsledkem.

Jestliže však je příkaz `return` přítomen, platí jednoduché pravidlo:

- Je-li `return` volán s objektem, vrátí se namísto `this` tento objekt.
- Je-li `return` volán s primitivem, tento primitiv se ignoruje.

Jinými slovy, `return` s objektem vrátí onen objekt, ve všech ostatních případech se vrátí `this`.

Například zde `return` přepisuje `this` vrácením objektu:

```js run
function VelkýUživatel() {

  this.jméno = "Jan";

  return { jméno: "Godzilla" };  // <-- vrátí tento objekt
}

alert( new VelkýUživatel().jméno );  // Godzilla, získali jsme onen objekt
```

A zde je příklad s prázdným `return` (nebo za něj můžeme umístit primitiv, na tom nezáleží):

```js run
function MalýUživatel() {

  this.jméno = "Jan";

  return; // <-- vrátí this
}

alert( new MalýUživatel().jméno );  // Jan
```

Konstruktory obvykle příkaz `return` neobsahují. Speciální chování s vracením objektů zde zmiňujeme zejména pro úplnost.

````smart header="Vypuštění závorek"
Mimochodem, za `new` můžeme vypustit závorky, jestliže nemá žádné argumenty:

```js
let uživatel = new Uživatel; // <-- bez závorek
// totéž jako
let uživatel = new Uživatel();
```

Vypouštění závorek zde se nepovažuje za „dobrý styl“, ale specifikace tuto syntaxi povoluje.
````

## Metody v konstruktoru

Používání konstruktorů k vytváření objektů nám dává velké množství flexibility. Konstruktor může mít parametry, které definují, jak objekt zkonstruovat a co do něj uložit.

Samozřejmě do `this` můžeme přidávat nejen vlastnosti, ale také metody.

Například níže uvedené `new Uživatel(jméno)` vytvoří objekt se zadanou vlastností `jméno` a metodou `řekniAhoj`:

```js run
function Uživatel(jméno) {
  this.jméno = jméno;

  this.řekniAhoj = function() {
    alert( "Jmenuji se: " + this.jméno );
  };
}

*!*
let jan = new Uživatel("Jan");

jan.řekniAhoj(); // Jmenuji se: Jan
*/!*

/*
jan = {
   jméno: "Jan",
   řekniAhoj: function() { ... }
}
*/
```

K vytváření složitých objektů existuje i pokročilejší syntaxe -- [třídy](info:classes), kterou probereme později.

## Shrnutí

- Konstruktory jsou obvyklé funkce, avšak panuje běžná úmluva pojmenovávat je s velkým prvním písmenem.
- Konstruktory by měly být volány jedině pomocí `new`. Takové volání způsobí, že se na začátku vytvoří prázdné `this` a to se pak na konci vrátí vyplněné.

Konstruktory můžeme používat k vytváření více podobných objektů.

JavaScript poskytuje konstruktory pro mnoho vestavěných jazykových objektů: např. `Date` pro data, `Set` pro množiny a jiné, které máme v plánu prostudovat.

```smart header="Objekty, vrátíme se!"
V této kapitole probíráme ohledně objektů a konstruktorů jen základy, které jsou podstatné pro pochopení dalších věcí ohledně datových typů a funkcí v dalších kapitolách.

Až se je naučíme, vrátíme se k objektům a probereme je do hloubky v kapitolách <info:prototypes> a <info:classes>.
```
