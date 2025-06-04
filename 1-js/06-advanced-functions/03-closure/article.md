# Oblast platnosti proměnné, uzávěr

JavaScript je značně funkcionálně orientovaný jazyk. Dává nám velké množství svobody. Funkci můžeme kdykoli vytvořit, předat ji jako argument jiné funkci a později ji volat z úplně jiného místa kódu.

Víme již, že funkce může přistupovat k proměnným, které leží mimo ni (k „vnějším“ proměnným).

Co se však stane, když se po vytvoření funkce vnější proměnné změní? Dostanou se do funkce jejich nové, nebo staré hodnoty?

A co když je funkce předána jako argument a pak je volána z jiného místa kódu? Bude mít na novém místě přístup k vnějším proměnným?

Rozšiřme si znalosti, abychom porozuměli těmto i složitějším scénářům.

```smart header="Zde budeme hovořit o proměnných deklarovaných pomocí `let/const`"
V JavaScriptu jsou tři způsoby, jak deklarovat proměnnou: `let`, `const` (tyto dva jsou moderní) a `var` (pozůstatek minulosti).

- V tomto článku budeme v příkladech používat proměnné deklarované pomocí `let`.
- Proměnné deklarované pomocí `const` se chovají stejně, takže tento článek platí i pro `const`.
- Starý příkaz `var` má určité významné rozdíly, které probereme v článku <info:var>.
```

## Kódové bloky

Jestliže je proměnná deklarována uvnitř kódového bloku `{...}`, je viditelná jedině uvnitř tohoto bloku.

Příklad:

```js run
{
  // provedeme nějakou práci s lokálními proměnnými, které nemají být vidět zvenčí

  let zpráva = "Ahoj"; // je viditelná jen v tomto bloku

  alert(zpráva); // Ahoj
}

alert(zpráva); // Chyba: zpráva není definována
```

Díky tomu můžeme izolovat část kódu, která odvede svou vlastní práci, s proměnnými, které budou patřit pouze jí:

```js run
{
  // zobrazí zprávu
  let zpráva = "Ahoj";
  alert(zpráva);
}

{
  // zobrazí jinou zprávu
  let zpráva = "Na shledanou";
  alert(zpráva);
}
```

````smart header="Bez bloků by nastala chyba"
Prosíme všimněte si, že bez oddělených bloků by nastala chyba, kdybychom použili `let` s již existujícím názvem proměnné:

```js run
// zobrazí zprávu
let zpráva = "Ahoj";
alert(zpráva);

// zobrazí jinou zprávu
*!*
let zpráva = "Na shledanou"; // Chyba: proměnná je již deklarována
*/!*
alert(zpráva);
```
````

Také pro `if`, `for`, `while` a podobné jsou proměnné deklarované v `{...}` viditelné jedině uvnitř:

```js run
if (true) {
  let věta = "Ahoj!";

  alert(věta); // Ahoj!
}

alert(věta); // Chyba, taková proměnná neexistuje!
```

Zde po skončení `if` funkce `alert` pod ním neuvidí proměnnou `věta`, takže nastane chyba.

To je skvělé, protože nám to umožňuje vytvářet blokově lokální proměnné, specifické pro větev `if`.

Podobně to platí pro cykly `for` a `while`:

```js run
for (let i = 0; i < 3; i++) {
  // proměnná i je viditelná jen uvnitř tohoto cyklu for
  alert(i); // 0, pak 1, pak 2
}

alert(i); // Chyba, taková proměnná neexistuje
```

Vizuálně je `let i` mimo `{...}`, avšak konstrukt `for` je v tomto ohledu speciální: proměnná, která je deklarována uvnitř něj, se považuje za součást bloku.

## Vnořené funkce

Funkce se nazývá „vnořená“, když je vytvořena uvnitř jiné funkce.

V JavaScriptu je to snadno možné.

Můžeme to využít k organizaci našeho kódu, například takto:

```js
function řekniAhojNashle(křestníJméno, příjmení) {

  // pomocná vnořená funkce, kterou použijeme níže
  function vraťCeléJméno() {
    return křestníJméno + " " + příjmení;
  }

  alert( "Ahoj, " + vraťCeléJméno() );
  alert( "Nashle, " + vraťCeléJméno() );

}
```

Zde je *vnořená* funkce `vraťCeléJméno()` vytvořena pro naše pohodlí. Může přistupovat k vnějším proměnným, a tak může vrátit celé jméno. Vnořené funkce jsou v JavaScriptu poměrně běžné.

Ještě zajímavější je, že vnořenou funkci můžeme vrátit: buď jako vlastnost nového objektu, nebo jako samotný výsledek funkce. Pak ji můžeme použít někde jinde. Ať to bude kdekoli, stále bude mít přístup ke stejným vnějším proměnným.

V následujícím příkladu `vytvořČítač` vytvoří funkci „čítače“, která při každém zavolání vrátí další číslo:

```js run
function vytvořČítač() {
  let počet = 0;

  return function() {
    return počet++;
  };
}

let čítač = vytvořČítač();

alert( čítač() ); // 0
alert( čítač() ); // 1
alert( čítač() ); // 2
```

Mírně upravené varianty tohoto kódu, třebaže jsou jednoduché, mají praktické využití, například jako [generátor pseudonáhodných čísel](https://cs.wikipedia.org/wiki/Generátor_pseudonáhodných_čísel), který generuje náhodné hodnoty pro automatizované testy.

Jak to funguje? Když vytvoříme více čítačů, budou nezávislé? Co se bude dít se zdejšími proměnnými?

Porozumět takovým věcem je skvělé pro všeobecnou znalost JavaScriptu a vyplatí se při složitějších scénářích. Pojďme tedy trochu do hloubky.

## Lexikální prostředí

```warn header="Zde jsou draci!"
Před námi leží hlubší technické vysvětlení.

Jakkoli se snažím vyhnout se nízkoúrovňovým detailům jazyka, bez nich by porozumění bylo děravé a neúplné, takže se na ně připravte.
```

Aby to bylo jasnější, rozdělíme vysvětlení na několik kroků.

### Krok 1. Proměnné

V JavaScriptu je ke každé spuštěné funkci, kódovému bloku `{...}` i celému skriptu připojen interní (skrytý) objekt, nazývaný *lexikální prostředí*.

Objekt lexikálního prostředí se skládá ze dvou částí:

1. *Záznam prostředí* -- objekt, v němž jsou uloženy všechny lokální proměnné jako jeho vlastnosti (a některé další informace, např. hodnota `this`).
2. Odkaz na *vnější lexikální prostředí*, tedy to, které je spojeno s vnějším kódem.

**„Proměnná“ je jen vlastnost speciálního interního objektu, `záznamu prostředí`. „Načíst nebo změnit proměnnou“ znamená „načíst nebo změnit vlastnost tohoto objektu“.**

V tomto jednoduchém kódu bez funkcí existuje pouze jedno lexikální prostředí:

![lexikální prostředí](lexical-environment-global.svg)

To je tzv. *globální* lexikální prostředí, připojené k celému skriptu.

Obdélník v uvedeném obrázku znamená záznam prostředí (skladiště proměnných) a šipka znamená odkaz na vnější prostředí. Globální lexikální prostředí nemá žádný odkaz na vnější prostředí, proto šipka ukazuje na `null`.

Když se kód začne provádět, lexikální prostředí se s jeho během mění.

Zde je trochu delší kód:

![lexikální prostředí](closure-variable-phrase.svg)

Obdélníky napravo ukazují, jak se globální lexikální prostředí mění během provádění kódu:

1. Když se skript spustí, lexikální prostředí se obsadí všemi deklarovanými proměnnými.
    - Na začátku jsou ve stavu „neinicializováno“. To je speciální vnitřní stav, který znamená, že motor ví o proměnné, ale nelze se na ni odkazovat, dokud nebude deklarována pomocí `let`. Je to skoro totéž, jako by proměnná neexistovala.
2. Pak se objeví definice `let věta`. Zatím zde není žádné přiřazení, takže hodnota proměnné je `undefined`. Od této chvíle můžeme tuto proměnnou používat.
3. Do proměnné `věta` je přiřazena hodnota.
4. Hodnota proměnné `věta` se změní.

Prozatím to všechno vypadá jednoduše, že?

- Proměnná je vlastností speciálního interního objektu, připojeného k právě vykonávanému bloku/funkci/skriptu.
- Práce s proměnnými je ve skutečnosti práce s vlastnostmi tohoto objektu.

```smart header="Lexikální prostředí je objekt ze specifikace"
„Lexikální prostředí“ je objekt ze specifikace: existuje jen „teoreticky“ ve [specifikaci jazyka](https://tc39.es/ecma262/#sec-lexical-environments), aby popisoval, jak vše funguje. V našem kódu nemůžeme tento objekt získat a přímo s ním manipulovat.

Motory JavaScriptu jej také mohou optimalizovat, vyřazovat nepoužívané proměnné, aby ušetřily paměť, a provádět jiné vnitřní triky, pokud jeho viditelné chování zůstává takové, jak je zde popsáno.
```

### Krok 2. Deklarace funkcí

Funkce je také hodnota, stejně jako proměnná.

**Rozdíl je v tom, že při deklaraci je funkce okamžitě plně inicializována.**

Když je vytvořeno lexikální prostředí, deklarace funkce okamžitě vytvoří funkci připravenou k použití (na rozdíl od proměnné v `let`, která je před deklarací nepoužitelná).

Z tohoto důvodu můžeme používat funkci, deklarovanou deklarací funkce, ještě před samotnou deklarací.

Například zde je úvodní stav globálního lexikálního prostředí, když přidáme funkci:

![](closure-function-declaration.svg)

Pochopitelně toto chování platí jen pro deklarace funkcí, ne pro funkční výrazy, v nichž přiřazujeme funkci do proměnné, například `let řekni = function(jméno)...`.

### Krok 3. Vnitřní a vnější lexikální prostředí

Když se spustí funkce, na začátku jejího volání je automaticky vytvořeno nové lexikální prostředí, do něhož se ukládají lokální proměnné a parametry volání.

Například pro `řekni("Jan")` vypadá takto (běh je na řádku označeném šipkou):

<!--
    ```js
    let věta = "Ahoj";

    function say(name) {
     alert( `${věta}, ${name}` );
    }

    say("John"); // Ahoj, John
    ```-->

![](lexical-environment-simple.svg)

Během volání funkce máme dvě lexikální prostředí: vnitřní (pro volání funkce) a vnější (globální):

- Vnitřní lexikální prostředí odpovídá aktuálnímu běhu funkce `řekni`. Má jedinou vlastnost: `jméno`, argument funkce. Voláme ji `řekni("Jan")`, takže hodnota vlastnosti `jméno` je `"Jan"`.
- Vnější lexikální prostředí je globální lexikální prostředí. Má proměnnou `věta` a samotnou funkci.

Vnitřní lexikální prostředí obsahuje odkaz `outer` na vnější.

**Když kód chce přistupovat k proměnné -- nejprve se prohledá vnitřní lexikální prostředí, pak vnější, pak ještě vnější a tak dále, až ke globálnímu.**

Není-li proměnná nikde nalezena, ve striktním režimu nastane chyba (bez `use strict` přiřazení do neexistující proměnné vytvoří novou globální proměnnou, aby byla zachována kompatibilita se starým kódem).

V tomto příkladu hledání postupuje následovně:

- Co se týče proměnné `jméno`, `alert` uvnitř `řekni` ji najde okamžitě ve vnitřním lexikálním prostředí.
- Když chce přistupovat k proměnné `věta`, pak lokálně žádnou proměnnou `věta` nenajde, takže pokračuje odkazem na vnější lexikální prostředí a najde ji v něm.

![náhled na lexikální prostředí](lexical-environment-simple-lookup.svg)


### Krok 4. Vrácení funkce

Vraťme se k příkladu `vytvořČítač`.

```js
function vytvořČítač() {
  let počet = 0;

  return function() {
    return počet++;
  };
}

let čítač = vytvořČítač();
```

Na začátku každého volání `vytvořČítač()` se vytvoří nový objekt lexikálního prostředí, do něhož se uloží proměnné pro tento běh funkce `vytvořČítač`.

Máme tedy dvě vnořená lexikální prostředí, podobně jako ve výše uvedeném příkladu:

![](closure-makecounter.svg)

Rozdíl spočívá v tom, že během provádění funkce `vytvořČítač()` se vytvoří drobná vnořená funkce tvořená jediným řádkem: `return počet++`. Tuto funkci zatím nevoláme, jenom ji vytvoříme.

Všechny funkce si pamatují lexikální prostředí, v němž byly vytvořeny. Technicky v tom není nic magického: všechny funkce mají skrytou vlastnost jménem `[[Environment]]`, která si udržuje odkaz na lexikální prostředí, v němž byla funkce vytvořena:

![](closure-makecounter-environment.svg)

Takže `čítač.[[Environment]]` má odkaz na lexikální prostředí `{počet: 0}`. Tímto způsobem si funkce pamatuje, kde byla vytvořena, bez ohledu na to, kde je volána. Odkaz `[[Environment]]` se při vytvoření funkce nastaví jednou provždy.

Když je `čítač()` později volán, vytvoří se pro toto volání nové lexikální prostředí a odkaz na jeho vnější lexikální prostředí se převezme z `čítač.[[Environment]]`:

![](closure-makecounter-nested-call.svg)

Když nyní kód uvnitř funkce `čítač()` hledá proměnnou `počet`, nejprve prohledá své vlastní lexikální prostředí (prázdné, jelikož tady nejsou žádné lokální proměnné), pak lexikální prostředí vnějšího volání `vytvořČítač()`, kde ji najde a změní.

**Proměnná je změněna v lexikálním prostředí, v němž přebývá.**

Zde je stav po provedení funkce:

![](closure-makecounter-nested-call-2.svg)

Jestliže voláme `čítač()` vícekrát, proměnná `počet` se zvýší na `2`, `3` a tak dále, a to na stejném místě.

```smart header="Uzávěr"
Existuje obecný programovací pojem „uzávěr“, který by vývojáři obecně měli znát.

[Uzávěr](https://cs.wikipedia.org/wiki/Uz%C3%A1v%C4%9Br_(programov%C3%A1n%C3%AD)) je funkce, která si pamatuje své vnější proměnné a může k nim přistupovat. V některých jazycích to není možné nebo funkce musí být napsána speciálním způsobem, aby se to mohlo dít. Ale jak bylo vysvětleno výše, v JavaScriptu jsou všechny funkce přirozeně uzávěry (je tady jen jedna výjimka, kterou probereme v kapitole <info:new-function>).

To znamená: pomocí skryté vlastnosti `[[Environment]]` si automaticky pamatují, kde byly vytvořeny, a jejich kód pak může přistupovat k vnějším proměnným.

Kdyby front-end vývojář v rozhovoru dostal otázku „co je to uzávěr?“, správná odpověď by byla definice uzávěru a vysvětlení, že v JavaScriptu jsou všechny funkce uzávěry, a možná několik dalších slov o technických detailech: o vlastnosti `[[Environment]]` a o tom, jak fungují lexikální prostředí.
```

## Sběr odpadků

Lexikální prostředí funkce je zpravidla odstraněno z paměti i se všemi proměnnými poté, co volání funkce skončí. Je to proto, že pak už na ně neexistují žádné odkazy. Stejně jako všechny objekty v JavaScriptu je udržováno v paměti, jen dokud je dosažitelné.

Jestliže však existuje vnořená funkce, která je po skončení funkce stále dosažitelná, pak tato funkce má vlastnost `[[Environment]]`, která se na toto lexikální prostředí odkazuje.

V takovém případě je lexikální prostředí stále dostupné i po skončení funkce, takže bude nadále existovat.

Například:

```js
function f() {
  let hodnota = 123;

  return function() {
    alert(hodnota);
  }
}

let g = f(); // g.[[Environment]] si uloží odkaz na lexikální prostředí
             // příslušného volání f()
```

Prosíme všimněte si, že je-li `f()` volána mnohokrát a výsledné funkce jsou někam uloženy, pak zůstanou v paměti i všechny příslušné objekty lexikálních prostředí. V následujícím kódu to budou všechny tři:

```js
function f() {
  let hodnota = Math.random();

  return function() { alert(hodnota); };
}

// 3 funkce v poli, každá z nich se odkazuje na lexikální prostředí
// z příslušného spuštění f()
let pole = [f(), f(), f()];
```

Objekt lexikálního prostředí je zničen, když se stane nedosažitelným (stejně jako každý jiný objekt). Jinými slovy, bude existovat, jen dokud bude existovat nejméně jedna vnořená funkce, která se na něj odkazuje.

V následujícím kódu je po odstranění vnořené funkce její uzavírající lexikální prostředí (a tedy i `hodnota`) vymazáno z paměti:

```js
function f() {
  let hodnota = 123;

  return function() {
    alert(hodnota);
  }
}

let g = f(); // dokud existuje funkce g, hodnota zůstane v paměti

g = null; // ...a nyní bude paměť pročištěna
```

### Optimalizace v reálném životě

Jak jsme viděli, teoreticky dokud funkce existuje, jsou udržovány i všechny vnější proměnné.

V praxi se však JavaScriptové motory snaží o optimalizaci. Analyzují používání proměnných, a je-li z kódu zřejmé, že vnější proměnná není nikde použita, bude odstraněna.

**Důležitý vedlejší efekt ve V8 (Chrome, Edge, Opera) je, že taková proměnná přestane být dostupná při ladění.**

Zkuste si spustit níže uvedený příklad v Chrome s otevřenými vývojářskými nástroji.

Když se zastaví, v konzoli zadejte `alert(hodnota)`.

```js run
function f() {
  let hodnota = Math.random();

  function g() {
    debugger; // v konzoli zadejte: alert(hodnota); taková proměnná neexistuje!
  }

  return g;
}

let g = f();
g();
```

Jak vidíme -- taková proměnná neexistuje! Teoreticky by měla být dostupná, ale motor ji vyřadil při optimalizaci.

To může vést k zábavným (kdyby nezabíraly tolik času) problémům při ladění. Jeden z nich -- můžeme vidět vnější proměnnou se stejným názvem namísto očekávané:

```js run global
let hodnota = "Překvapení!";

function f() {
  let hodnota = "nejbližší hodnota";

  function g() {
    debugger; // v konzoli zadejte: alert(hodnota); Překvapení!
  }

  return g;
}

let g = f();
g();
```

Tuto vlastnost V8 je dobré znát. Jestliže ladíte v Chrome, Edge nebo Opeře, dříve nebo později se s ní setkáte.

Není to chyba ladicího nástroje, ale spíše speciální vlastnost V8. Možná bude časem změněna. Vždy si ji můžete ověřit spuštěním příkladů na této stránce.
