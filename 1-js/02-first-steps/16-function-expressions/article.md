# Funkční výrazy

Funkce v JavaScriptu není nějaká „magická jazyková struktura“, ale speciální druh hodnoty.

Syntaxe, kterou jsme dosud používali, se nazývá *deklarace funkce*:

```js
function řekniAhoj() {
  alert( "Ahoj" );
}
```

Existuje i jiná syntaxe pro vytváření funkce, která se nazývá *funkční výraz*.

Ten nám umožňuje vytvořit novou funkci uprostřed libovolného výrazu.

Například:

```js
let řekniAhoj = function() {
  alert( "Ahoj" );
};
```

Tuto hodnotu dokonce můžeme zobrazit pomocí `alert`:

```js run
function řekniAhoj() {
  alert( "Ahoj" );
}

*!*
alert( řekniAhoj ); // zobrazí kód funkce
*/!*
```

Všimněte si, že poslední řádek nevolá funkci, protože za `řekniAhoj` nejsou závorky. Existují programovací jazyky, v nichž je funkce zavolána pokaždé, když je uveden její název, ale to není případ JavaScriptu.

V JavaScriptu je funkce hodnota, takže s ní můžeme zacházet jako s hodnotou. Výše uvedený kód zobrazí její řetězcovou reprezentaci, kterou je zdrojový kód funkce.

Samozřejmě, funkce je speciální hodnota v tom smyslu, že ji můžeme volat, např. `řekniAhoj()`. Je to však stále hodnota, a proto s ní můžeme pracovat jako s hodnotou jakéhokoli jiného druhu.

Můžeme zkopírovat funkci do jiné proměnné:

```js run no-beautify
function řekniAhoj() {   // (1) vytvoření
  alert( "Ahoj" );
}

let funkce = řekniAhoj;  // (2) zkopírování

funkce(); // Ahoj        // (3) spustíme kopii (funguje to!)
řekniAhoj(); // Ahoj     //     tohle pořád funguje taky (proč by nemělo)
```

Co se v uvedeném příkladu přesně stane:

1. Deklarace funkce `(1)` vytvoří funkci a uloží ji do proměnné nazvané `řekniAhoj`.
2. Řádek `(2)` ji zkopíruje do proměnné `funkce`. Opět si všimněte, že za `řekniAhoj` nejsou závorky. Kdyby tam byly, příkaz `funkce = řekniAhoj()` by zapsal do proměnné `funkce` *výsledek volání* `řekniAhoj`, ne samotnou *funkci* `řekniAhoj`.
3. Nyní můžeme tuto funkci volat pomocí `řekniAhoj()` i pomocí `funkce()`.

Na prvním řádku jsme mohli deklarovat `řekniAhoj` i pomocí funkčního výrazu:

```js
let řekniAhoj = function() { // (1) vytvoření
  alert( "Ahoj" );
};

let funkce = řekniAhoj;
// ...
```

Všechno bude fungovat stejně.


````smart header="Proč je na konci středník?"
Možná se divíte, proč funkční výraz obsahuje na konci středník `;`, ale deklarace funkce ne:

```js
function řekniAhoj() {
  // ...
}

let řekniAhoj = function() {
  // ...
}*!*;*/!*
```

Odpověď je jednoduchá: funkční výraz je zde vytvořen jako `function(…) {…}` uvnitř příkazu přiřazení: `let řekniAhoj = …;`. Středník `;` se doporučuje uvádět na konci příkazu, není to součást syntaxe funkce.

Středník by zde byl i u jednoduššího přiřazení, například `let řekniAhoj = 5;`, a je zde také u přiřazení funkce.
````

## Funkce zpětného volaní (callbackové funkce)

Podíváme se na další příklady předávání funkcí jako hodnot a používání funkčních výrazů.

Napíšeme funkci `zeptejSe(otázka, ano, ne)` se třemi parametry:

`otázka`
: Text otázky

`ano`
: Funkce, která se spustí, je-li odpověď „ano“

`ne`
: Funkce, která se spustí, je-li odpověď „ne“

Funkce by měla položit otázku `otázka` a pak podle odpovědi uživatele zavolat `ano()` nebo `ne()`:

```js run
*!*
function zeptejSe(otázka, ano, ne) {
  if (confirm(otázka)) ano()
  else ne();
}
*/!*

function zobrazOK() {
  alert( "Souhlasil jste." );
}

function zobrazStorno() {
  alert( "Zrušil jste provádění." );
}

// použití: funkce zobrazOK, zobrazStorno jsou předány funkci zeptejSe jako argumenty
zeptejSe("Souhlasíte?", zobrazOK, zobrazStorno);
```

V praxi jsou takové funkce poměrně užitečné. Hlavním rozdílem mezi `zeptejSe` ve skutečném životě a uvedeným příkladem je, že skutečné funkce používají složitější způsoby interakce s uživatelem, než pouhé `confirm`. V prohlížeči taková funkce obvykle vykreslí pěkné dotazovací okno. To je však jiný příběh.

**Argumenty `zobrazOK` a `zobrazStorno` funkce `zeptejSe` se nazývají *callbackové funkce* nebo jednoduše *callbacky*.**

Myšlenkou je, že předáme funkci a očekáváme, že bude „zpětně volána“ (call = volání, back = zpět) později, až to bude nutné. V našem případě `zobrazOK` se stala callbackem pro odpověď „ano“ a `zobrazStorno` pro odpověď „ne“.

Pomocí funkčních výrazů můžeme napsat ekvivalentní, ale kratší funkci:

```js run no-beautify
function zeptejSe(otázka, ano, ne) {
  if (confirm(otázka)) ano()
  else ne();
}

*!*
zeptejSe(
  "Souhlasíte?",
  function() { alert("Souhlasil jste."); },
  function() { alert("Zrušil jste provádění."); }
);
*/!*
```

Zde jsou funkce deklarovány přímo ve volání `zeptejSe(...)`. Nemají žádný název, a tak se nazývají *anonymní*. Takové funkce nejsou dostupné mimo `zeptejSe` (protože nejsou přiřazeny žádným proměnným), ale to je přesně to, co tady chceme.

Takový kód se v našich skriptech objevuje zcela přirozeně a je přesně v duchu JavaScriptu.

```smart header="Funkce je hodnota představující „akci“"
Běžné hodnoty, např. řetězce nebo čísla, představují *data*.

Na funkci lze pohlížet jako na *akci*.

Můžeme ji předávat mezi proměnnými a zavolat, až budeme chtít.
```


## Funkční výrazy vs. deklarace funkcí

Zformulujme nyní základní rozdíly mezi deklaracemi funkcí a funkčními výrazy.

První rozdíl je syntaxe: jak je rozlišovat v kódu.

- *Deklarace funkce:* funkce deklarovaná samostatným příkazem v hlavním toku kódu:

    ```js
    // deklarace funkce
    function součet(a, b) {
      return a + b;
    }
    ```
- *Funkční výraz:* funkce vytvořená uprostřed výrazu nebo uvnitř jiného syntaktického konstruktu. Zde je funkce vytvořena na pravé straně „operátoru přiřazení“ `=`:

    ```js
    // funkční výraz
    let součet = function(a, b) {
      return a + b;
    };
    ```

Jemnější rozdíl spočívá v tom, *kdy* přesně je funkce vytvořena enginem JavaScriptu.

**Funkční výraz je vytvořen ve chvíli, kdy k němu dospěje vykonávání kódu, a je použitelný až od této chvíle.**

Jakmile se provádění skriptu dostane k pravé straně přiřazení `let součet = function…` -- v tom okamžiku je funkce vytvořena a od nynějška může být používána (přiřazena, volána apod.).

Deklarace funkcí jsou odlišné.

**Deklarovaná funkce může být volána ještě dříve, než je definována.**

Například globální deklarace funkce je viditelná v celém skriptu, ať se nachází kdekoli.

Je to způsobeno vnitřními algoritmy. Když JavaScript připravuje spuštění skriptu, nejprve v něm najde globální deklarace funkcí a tyto funkce vytvoří. Můžeme to považovat za „přípravnou fázi“.

Teprve až jsou všechny deklarace funkcí zpracovány, kód se vykoná. Proto má k těmto funkcím přístup.

Například toto funguje:

```js run refresh untrusted
*!*
řekniAhoj("Jan"); // Ahoj, Jan
*/!*

function řekniAhoj(jméno) {
  alert( `Ahoj, ${jméno}` );
}
```

Deklarace funkce `řekniAhoj` se vytvoří, když JavaScript připravuje spuštění skriptu, a je v něm všude viditelná.

...Kdyby to však byl funkční výraz, nefungovalo by to:

```js run refresh untrusted
*!*
řekniAhoj("Jan"); // chyba!
*/!*

let řekniAhoj = function(jméno) {  // (*) už žádná magie
  alert( `Ahoj, ${jméno}` );
};
```

Funkční výrazy se vytvoří, když k nim dorazí vykonávání kódu. To se stane až na řádku `(*)`. Pozdě.

Další speciální vlastností deklarací funkcí je blok jejich platnosti.

**Ve striktním režimu platí, že když je deklarace funkce umístěna v bloku kódu, je viditelná všude uvnitř tohoto bloku, ale ne mimo něj.**

Například si představme, že potřebujeme deklarovat funkci `uvítání()`, která závisí na proměnné `věk`, kterou získáme za běhu skriptu. A pak ji plánujeme použít o něco později.

Kdybychom použili deklaraci funkce, nefungovalo by to tak, jak zamýšlíme:

```js run
let věk = prompt("Kolik je vám let?", 18);

// podmíněná deklarace funkce
if (věk < 18) {

  function uvítání() {
    alert("Ahoj!");
  }

} else {

  function uvítání() {
    alert("Dobrý den!");
  }

}

// ...použijeme ji později
*!*
uvítání(); // Chyba: uvítání není definováno
*/!*
```

Je to proto, že deklarace funkce je viditelná jedině uvnitř bloku kódu, v němž se nachází.

Další příklad:

```js run
let věk = 16; // vezmeme 16 jako příklad

if (věk < 18) {
*!*
  uvítání();               // \   (spustí se)
*/!*
                           //  |
  function uvítání() {     //  |
    alert("Ahoj!");        //  |  deklarace funkce je k dispozici
  }                        //  |  všude v bloku, v němž je funkce deklarována
                           //  |
*!*
  uvítání();               // /   (spustí se)
*/!*

} else {

  function uvítání() {
    alert("Zdravíme vás!");
  }
}

// Tady už jsme mimo složené závorky,
// takže nevidíme deklarace funkcí, které se nacházejí uvnitř nich.

*!*
uvítání(); // Chyba: uvítání není definováno
*/!*
```

Jak můžeme `uvítání` učinit viditelným i mimo `if`?

Správný přístup by byl použití funkčního výrazu a přiřazení `uvítání` do proměnné, která je deklarována mimo `if` a má náležitou viditelnost.

Tento kód funguje tak, jak zamýšlíme:

```js run
let věk = prompt("Kolik je vám let?", 18);

let uvítání;

if (věk < 18) {

  uvítání = function() {
    alert("Ahoj!");
  };

} else {

  uvítání = function() {
    alert("Dobrý den!");
  };

}

*!*
uvítání(); // nyní je to v pořádku
*/!*
```

Nebo to můžeme ještě zjednodušit pomocí operátoru otazníku `?`:

```js run
let věk = prompt("Kolik je vám let?", 18);

let uvítání = (věk < 18) ?
  function() { alert("Ahoj!"); } :
  function() { alert("Dobrý den!"); };

*!*
uvítání(); // nyní je to v pořádku
*/!*
```

```smart header="Kdy zvolit deklaraci funkce a kdy funkční výraz?"
Orientační pravidlo zní, že když potřebujeme deklarovat funkci, měli bychom napřed zvážit syntaxi deklarace funkce. Ta nám dává více svobody v tom, jak zorganizovat kód, protože takovou funkci můžeme volat ještě předtím, než je deklarována.

Je také lépe čitelná, protože je jednodušší najít v kódu `function f(…) {…}` než `let f = function(…) {…};`. Deklarace funkcí lépe „padnou do oka“.

...Jestliže nám však deklarace funkce pro naše účely nestačí nebo potřebujeme podmíněnou deklaraci (jak jsme právě viděli v příkladu), měli bychom použít funkční výraz.
```

## Shrnutí

- Funkce jsou hodnoty. Kdekoli v kódu je můžeme přiřazovat, kopírovat nebo deklarovat.
- Je-li funkce deklarována samostatným příkazem v hlavním kódu, nazývá se to „deklarace funkce“.
- Je-li funkce vytvořena jako součást výrazu, nazývá se to „funkční výraz“.
- Deklarace funkcí se zpracovávají ještě předtím, než je blok kódu vykonán. Jsou tedy viditelné všude v celém bloku.
- Funkční výrazy se vytvoří až ve chvíli, kdy k nim dorazí výkon kódu.

Ve většině případů, kdy potřebujeme deklarovat funkci, dáváme přednost deklaraci funkce, protože pak je funkce viditelná ještě před samotnou deklarací. To nám dává více možností při organizaci kódu a je to zpravidla čitelnější.

Funkční výrazy bychom tedy měli používat jen tehdy, když nám pro naše účely deklarace funkce nestačí. V této kapitole jsme viděli několik takových příkladů a v budoucnu uvidíme další.
