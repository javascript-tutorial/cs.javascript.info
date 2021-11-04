# Ostatní parametry a roztažená syntaxe

Mnoho vestavěných funkcí v JavaScriptu podporuje volitelný počet argumentů.

Například:

- `Math.max(arg1, arg2, ..., argN)` -- vrátí největší z argumentů.
- `Object.assign(cíl, zdroj1, ..., zdrojN)` -- zkopíruje vlastnosti ze `zdroj1..N` do `cíl`.
- ...a tak dále.

V této kapitole se naučíme, jak udělat totéž a také jak předávat do takových funkcí pole jako parametry.

## Ostatní parametry `...`

Funkci můžeme volat s libovolným počtem argumentů, bez ohledu na to, jak je definována.

Například zde:
```js run
function součet(a, b) {
  return a + b;
}

alert( součet(1, 2, 3, 4, 5) );
```

Kvůli „přebytečným“ argumentům nenastane chyba, ale do výsledku se samozřejmě budou počítat jen první dva.

Zbytek parametrů můžeme zahrnout do definice funkce pomocí tří teček `...`, za nimiž následuje název pole, které je bude obsahovat. Tečky doslova znamenají „shromáždi ostatní parametry do pole“.

Například abychom shromáždili všechny argumenty do pole `argumenty`:

```js run
function sečtiVše(...argumenty) { // argumenty je název pole
  let součet = 0;

  for (let arg of argumenty) součet += arg;

  return součet;
}

alert( sečtiVše(1) ); // 1
alert( sečtiVše(1, 2) ); // 3
alert( sečtiVše(1, 2, 3) ); // 6
```

Můžeme se rozhodnout, že první parametry uložíme do proměnných a shromáždíme pouze ty ostatní.

Zde budou první dva argumenty uloženy do proměnných a ostatní se uloží do pole `tituly`:

```js run
function zobrazJméno(křestníJméno, příjmení, ...tituly) {
  alert( křestníJméno + ' ' + příjmení ); // Julius Caesar

  // ostatní přijdou do pole tituly
  // tj. tituly = ["Konzul", "Imperátor"]
  alert( tituly[0] ); // Konzul
  alert( tituly[1] ); // Imperátor
  alert( tituly.length ); // 2
}

zobrazJméno("Julius", "Caesar", "Konzul", "Imperátor");
```

````warn header="Ostatní parametry musejí být na konci"
Ostatní parametry shromažďují všechny zbývající argumenty, takže následující zápis nedává smysl a vyvolá chybu:

```js
function f(arg1, ...zbytek, arg2) { // arg2 po ...zbytek ?!
  // chyba
}
```

`...zbytek` musí být vždy poslední.
````

## Proměnná „arguments“

Existuje také speciální objekt podobný poli nazvaný `arguments`, který obsahuje všechny argumenty podle jejich indexu.

Například:

```js run
function zobrazJméno() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // je iterovatelný
  // for(let arg of arguments) alert(arg);
}

// zobrazí: 2, Julius, Caesar
zobrazJméno("Julius", "Caesar");

// zobrazí: 1, Ilja, undefined (druhý argument není)
zobrazJméno("Ilja");
```

Za starých časů ostatní parametry v jazyce neexistovaly a jediný způsob, jak získat všechny argumenty funkce, bylo použití `arguments`. A to stále funguje, můžeme to nalézt ve starém kódu.

Nevýhodou však je, že ačkoli objekt `arguments` je podobný poli a iterovatelný, není to pole. Nepodporuje metody polí, takže nemůžeme volat například `arguments.map(...)`.

Navíc obsahuje vždy všechny argumenty. Nemůžeme je zachytit jen částečně, jak to můžeme udělat u ostatních parametrů.

Když tedy tuto vlastnost potřebujeme, dáváme přednost ostatním parametrům.

````smart header="Šipkové funkce nemají `„arguments“`"
Jestliže přistoupíme k objektu `arguments` v šipkové funkci, vezme jej z vnější „normální“ funkce.

Příklad:

```js run
function f() {
  let zobrazArgumenty = () => alert(arguments[0]);
  zobrazArgumenty();
}

f(1); // 1
```

Jak si pamatujeme, šipkové funkce nemají vlastní `this`. Nyní víme, že nemají ani speciální objekt `arguments`.
````


## Roztažená syntaxe [#spread-syntax]

Právě jsme viděli, jak vytvořit pole ze seznamu parametrů.

Někdy však potřebujeme udělat pravý opak.

Například existuje vestavěná funkce [Math.max](mdn:js/Math/max), která vrací největší číslo ze seznamu:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Nyní řekněme, že máme pole `[3, 5, 1]`. Jak na ně zavoláme `Math.max`?

Předat pole „tak, jak je“ nebude fungovat, protože `Math.max` očekává seznam číselných argumentů, ne jediné pole:

```js run
let pole = [3, 5, 1];

*!*
alert( Math.max(pole) ); // NaN
*/!*
```

A samozřejmě nemůžeme ručně vyjmenovat prvky pole v kódu `Math.max(pole[0], pole[1], pole[2])`, protože nevíme jistě, kolik jich tam bude. Když se náš skript spustí, může jich tam být mnoho a nemusí tam být žádný. A bylo by to ošklivé.

Zachrání nás *roztažená (spread) syntaxe*! Podobá se ostatním parametrům v tom, že také používá `...`, ale činí to přesně naopak.

Když ve volání funkce použijeme `...pole`, „roztáhne“ iterovatelný objekt `pole` do seznamu argumentů.

Pro `Math.max`:

```js run
let pole = [3, 5, 1];

alert( Math.max(...pole) ); // 5 (roztažení přetvoří pole na seznam argumentů)
```

Tímto způsobem můžeme předat i více iterovatelných objektů:

```js run
let pole1 = [1, -2, 3, 4];
let pole2 = [8, 3, -8, 1];

alert( Math.max(...pole1, ...pole2) ); // 8
```

Můžeme dokonce kombinovat roztaženou syntaxi s běžnými hodnotami:


```js run
let pole1 = [1, -2, 3, 4];
let pole2 = [8, 3, -8, 1];

alert( Math.max(1, ...pole1, 2, ...pole2, 25) ); // 25
```

Roztaženou syntaxi můžeme použít i ke spojení polí:

```js run
let pole = [3, 5, 1];
let pole2 = [8, 9, 15];

*!*
let spojené = [0, ...pole, 2, ...pole2];
*/!*

alert(spojené); // 0,3,5,1,2,8,9,15 (0, pak pole, pak 2, pak pole2)
```

Ve výše uvedených příkladech jsme k předvedení roztažené syntaxe použili pole, ale funguje to na jakémkoli iterovatelném objektu.

Například zde použijeme roztaženou syntaxi k převedení řetězce na pole znaků:

```js run
let řetězec = "Ahoj";

alert( [...řetězec] ); // A,h,o,j
```

Roztažená syntaxe interně využívá iterátory ke shromažďování prvků stejným způsobem, jako cyklus `for..of`.

Takže pro řetězec `for..of` vrátí znaky a `...řetězec` se převede na `"A","h","o","j"`. Seznam znaků se předá do inicializátoru pole `[...řetězec]`.

Pro tento konkrétní úkol bychom mohli použít i `Array.from`, protože tato metoda převádí iterovatelný objekt (např. řetězec) na pole:

```js run
let řetězec = "Ahoj";

// Array.from převede iterovatelný objekt na pole
alert( Array.from(řetězec) ); // A,h,o,j
```

Výsledek je stejný jako u `[...řetězec]`.

Existuje však drobný rozdíl mezi `Array.from(obj)` a `[...obj]`:

- `Array.from` funguje na poli podobných objektech i na iterovatelných objektech.
- Roztažená syntaxe funguje jen na iterovatelných objektech.

Pro účel převedení něčeho na pole tedy `Array.from` bývá univerzálnější.

## Kopírování pole/objektu

Pamatujete si, jak jsme [dříve](info:object-copy#cloning-and-merging-object-assign) hovořili o `Object.assign()`?

S roztaženou syntaxí můžeme udělat totéž.

```js run
let pole = [1, 2, 3];

*!*
let kopiePole = [...pole]; // roztáhneme pole do seznamu parametrů
                           // pak uložíme výsledek do nového pole
*/!*

// mají tato pole stejný obsah?
alert(JSON.stringify(pole) === JSON.stringify(kopiePole)); // true

// jsou si tato pole rovna?
alert(pole === kopiePole); // false (není to stejný odkaz)

// modifikace našeho původního pole nezmění kopii:
pole.push(4);
alert(pole); // 1, 2, 3, 4
alert(kopiePole); // 1, 2, 3
```

Všimněte si, že můžeme udělat totéž, abychom vytvořili kopii objektu:

```js run
let objekt = { a: 1, b: 2, c: 3 };

*!*
let kopieObjektu = { ...objekt }; // roztáhneme objekt do seznamu parametrů
                                  // pak vrátíme výsledek v novém objektu
*/!*

// mají tyto objekty stejný obsah?
alert(JSON.stringify(objekt) === JSON.stringify(kopieObjektu)); // true

// jsou si tyto objekty rovny?
alert(objekt === kopieObjektu); // false (není to stejný odkaz)

// modifikace našeho původního objektu nezmění kopii:
objekt.d = 4;
alert(JSON.stringify(objekt)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(kopieObjektu)); // {"a":1,"b":2,"c":3}
```

Tento způsob kopírování objektu je mnohem kratší než `let kopieObjektu = Object.assign({}, objekt)` nebo pro pole `let kopiePole = Object.assign([], pole)`, takže mu dáváme přednost, kde jen můžeme.


## Shrnutí

Když v kódu vidíme `"..."`, jsou to buď ostatní parametry, nebo roztažená syntaxe.

Je možné mezi nimi snadno rozlišovat:

- Když je `...` na konci funkčních parametrů, jsou to „ostatní parametry“ a shromažďují zbytek seznamu argumentů do pole.
- Když se `...` vyskytuje ve volání funkce nebo něčem podobném, nazývá se „roztažená syntaxe“ a roztáhne pole do seznamu.

Vzory použití:

- Ostatní parametry se používají k vytváření funkcí, které přijímají volitelný počet argumentů.
- Roztažená syntaxe se používá k předání pole do funkcí, které normálně vyžadují seznam mnoha argumentů.

Společně nám pomáhají snadno přepínat mezi seznamem a polem parametrů.

Všechny argumenty volání funkce jsou rovněž k dispozici v objektu `arguments` ve starém stylu: iterovatelném objektu podobném poli.
