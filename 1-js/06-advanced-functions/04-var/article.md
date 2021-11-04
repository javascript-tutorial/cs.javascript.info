
# Starý příkaz „var“

```smart header="Tento článek slouží k pochopení starých skriptů"
Informace v tomto článku je užitečná, abyste porozuměli starým skriptům.

Není to způsob, jak psát nový kód.
```

V úplně první kapitole o [proměnných](info:variables) jsme zmínili tři způsoby deklarace proměnných:

1. `let`
2. `const`
3. `var`

Deklarace `var` je podobná `let`. Ve většině případů můžeme nahradit `let` za `var` nebo naopak a očekávat, že vše bude fungovat:

```js run
var zpráva = "Ahoj";
alert(zpráva); // Ahoj
```

Interně je však `var` velmi odlišná potvůrka, která pochází z prastarých časů. V moderních skriptech se obvykle nepoužívá, ale ve starých stále číhá.

Pokud neplánujete se s takovými skripty setkat, můžete tuto kapitolu přeskočit nebo odložit na později.

Na druhou stranu je důležité porozumět rozdílům, když převádíte staré skripty z `var` na `let`, abyste se vyhnuli podivným chybám.

## „var“ nemá blokovou platnost

Proměnné deklarované pomocí `var` mají rozsah platnosti buď funkční, nebo globální. Jsou viditelné i skrz bloky.

Například:

```js run
if (true) {
  var test = true; // použijeme „var“ namísto „let“
}

*!*
alert(test); // true, proměnná existuje i za if
*/!*
```

Protože `var` ignoruje kódové bloky, vytvořili jsme globální proměnnou `test`.

Kdybychom použili `let test` namísto `var test`, pak by tato proměnná byla viditelná jen uvnitř `if`:

```js run
if (true) {
  let test = true; // použijeme „let“
}

*!*
alert(test); // ReferenceError: test není definován
*/!*
```

Totéž platí pro cykly: `var` nemůže být lokální v bloku nebo ve smyčce:

```js run
for (var i = 0; i < 10; i++) {
  var jedna = 1;
  // ...
}

*!*
alert(i);   // 10, „i“ je viditelná i za cyklem, je to globální proměnná
alert(jedna); // 1, „jedna“ je viditelná i za cyklem, je to globální proměnná
*/!*
```

Nachází-li se kódový blok uvnitř funkce, pak `var` deklaruje proměnnou na úrovni funkce:

```js run
function řekniAhoj() {
  if (true) {
    var věta = "Ahoj";
  }

  alert(věta); // funguje
}

řekniAhoj();
alert(věta); // ReferenceError: věta není definována
```

Jak vidíme, `var` se probije skrz `if`, `for` a jiné kódové bloky. Je to proto, že v dávných časech JavaScriptu bloky neměly lexikální prostředí a `var` je toho pozůstatkem.

## „var“ toleruje opakované deklarace

Jestliže deklarujeme stejnou proměnnou pomocí `let` ve stejné oblasti dvakrát, nastane chyba:

```js run
let uživatel;
let uživatel; // SyntaxError: 'uživatel' již byl deklarován
```

Pomocí `var` můžeme znovu deklarovat proměnnou, kolikrát chceme. Použijeme-li `var` s již deklarovanou proměnnou, bude ignorováno:

```js run
var uživatel = "Petr";

var uživatel = "Jan"; // tento „var“ neudělá nic (proměnná je již deklarována)
// ...nevyvolá chybu

alert(uživatel); // Jan
```

## Proměnné deklarované „var“ můžeme deklarovat až za jejich použitím

Deklarace `var` se zpracovávají, když se funkce spustí (nebo když se spustí skript, jsou-li globální).

Jinými slovy, proměnné `var` jsou definovány od začátku funkce bez ohledu na to, kde se tato definice nachází (předpokládáme, že definice není uvnitř vnořené funkce).

Takže tento kód:

```js run
function řekniAhoj() {
  věta = "Ahoj";

  alert(věta);

*!*
  var věta;
*/!*
}
řekniAhoj();
```

...je technicky stejný jako tento (přesuneme `var věta` nahoru):

```js run
function řekniAhoj() {
*!*
  var věta;
*/!*

  věta = "Ahoj";

  alert(věta);
}
řekniAhoj();
```

...Nebo i jako tento (pamatujte, že kódové bloky jsou ignorovány):

```js run
function řekniAhoj() {
  věta = "Ahoj"; // (*)

  *!*
  if (false) {
    var věta;
  }
  */!*

  alert(věta);
}
řekniAhoj();
```

Takovému chování lidé někdy říkají „stoupání“ *(anglicky „hoisting“ nebo „raising“ -- pozn. překl.)*, jelikož každý `var` „vystoupá“ *(„hoist“, „raise“)* až k vrcholu funkce.

Ve výše uvedeném příkladu se větev `if (false)` nikdy nespustí, ale na tom nezáleží. Příkaz `var` uvnitř se zpracuje na začátku funkce, takže ve chvíli `(*)` proměnná existuje.

**Deklarace stoupají, ale přiřazení ne.**

Nejlépe to uvidíme na příkladu:

```js run
function řekniAhoj() {
  alert(věta);  

*!*
  var věta = "Ahoj";
*/!*
}

řekniAhoj();
```

Řádek `var věta = "Ahoj"` má v sobě dvě akce:

1. Deklaraci proměnné `var`.
2. Přiřazení proměnné `=`.

Deklarace se vykonává na začátku spuštění funkce („stoupání“), ale přiřazení se provede vždy na místě, na němž se objevilo. Kód tedy funguje v zásadě následovně:

```js run
function řekniAhoj() {
*!*
  var věta; // deklarace se provede na začátku...
*/!*

  alert(věta); // undefined

*!*
  věta = "Ahoj"; // ...přiřazení - když se na ně dostane provádění.
*/!*
}

řekniAhoj();
```

Protože všechny deklarace `var` se zpracovávají na začátku funkce, můžeme se na ně odkazovat kdekoli. Ale proměnné jsou nedefinované až do přiřazení.

V obou příkladech se `alert` spustí bez chyby, protože proměnná `věta` existuje. Ale ještě jí není přiřazena hodnota, takže se zobrazí `undefined`.

## IIFE

V minulosti, kdy bylo jenom `var` a neexistovala viditelnost na úrovni bloku, programátoři vymysleli způsob, jak ji emulovat. To, co vynalezli, nazvali „okamžitě volané funkční výrazy“, zkráceně IIFE *(z anglického „immediately-invoked function expressions“ - pozn. překl.)*.

Není to nic, co bychom měli používat v současnosti, ale ve starých skriptech je stále můžete najít.

IIFE vypadá následovně:

```js run
(function() {

  var zpráva = "Ahoj";

  alert(zpráva); // Ahoj

})();
```

Zde se vytvoří a okamžitě zavolá funkční výraz. Kód se tedy okamžitě spustí a má své vlastní soukromé proměnné.

Funkční výraz je uzavřen do závorek `(function {...})`, protože když engine JavaScriptu narazí v hlavním kódu na `„function“`, chápe to jako začátek deklarace funkce. Avšak deklarace funkce musí mít svůj název, takže tento kód vyvolá chybu:

```js run
// Snaží se deklarovat a okamžitě zavolat funkci
function() { // <-- SyntaxError: Deklarace funkce vyžaduje název funkce

  var zpráva = "Ahoj";

  alert(zpráva); // Ahoj

}();
```

I kdybychom si řekli: „dobře, tak přidáme název“, nebude to fungovat, protože JavaScript neumožňuje, aby byla deklarace funkce okamžitě volána:

```js run
// syntaktická chyba kvůli závorkám níže
function jdi() {

}(); // <-- deklaraci funkce nemůžeme okamžitě volat
```

Závorky kolem funkce jsou tedy trik, jak ukázat JavaScriptu, že funkce je vytvořena v kontextu jiného výrazu, a proto je to funkční výraz: nemusí mít název a může být okamžitě zavolán.

Kromě závorek existují i jiné způsoby, jak oznámit JavaScriptu, že máme na mysli funkční výraz:

```js run
// Způsoby vytvoření IIFE

(function() {
  alert("Závorky okolo funkce");
}*!*)*/!*();

(function() {
  alert("Závorky okolo toho všeho");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitový operátor NOT zahajuje výraz");
}();

*!*+*/!*function() {
  alert("Unární plus zahajuje výraz");
}();
```

Ve všech výše uvedených případech deklarujeme funkční výraz a okamžitě jej zavoláme. Znovu opakujeme: v dnešní době není důvod takový kód psát.

## Shrnutí

Existují dva hlavní rozdíly `var` ve srovnání s `let/const`:

1. Proměnné `var` nemají blokovou platnost a oblast jejich viditelnosti je celá aktuální funkce. Jsou-li deklarovány mimo funkci, jsou globální.
2. Deklarace `var` se zpracovávají na začátku funkce (globální deklarace na začátku skriptu).

Existuje ještě jeden velmi drobný rozdíl vztahující se ke globálnímu objektu, který probereme v příští kapitole.

Kvůli těmto rozdílům je `var` ve většině případů horší než `let`. Proměnné na úrovni bloku jsou vynikající věc. To je důvod, proč bylo do standardu již před dlouhou dobou zahrnuto `let`, a to je nyní hlavním způsobem (spolu s `const`) deklarace proměnných.
