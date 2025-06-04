# Dekorátory a přesměrování, call/apply

JavaScript poskytuje při práci s funkcemi výjimečnou flexibilitu. Funkce mohou být předávány, používány jako objekty a nyní uvidíme, jak *přesměrovávat* volání mezi nimi a jak je *dekorovat*.

## Transparentní ukládání do mezipaměti

Řekněme, že máme funkci `pomalá(x)`, která značně zatěžuje CPU, ale její výsledky jsou stabilní. Jinými slovy, pro stejná `x` vždy vrací stejný výsledek.

Je-li funkce volána často, můžeme si její výsledky ukládat do mezipaměti (cache), abychom se vyhnuli spotřebování dalšího času při opakovaných výpočtech.

Místo přidání této funkcionality do `pomalá()` však vytvoříme obalovou (wrapperovou) funkci, která umožní ukládání do mezipaměti. Jak uvidíme, přinese nám to mnoho výhod.

Zde je kód a vysvětlení bude následovat:

```js run
function pomalá(x) {
  // zde může být výpočet značně zatěžující CPU
  alert(`Voláno s ${x}`);
  return x;
}

function ukládacíDekorátor(funkce) {
  let mezipaměť = new Map();

  return function(x) {
    if (mezipaměť.has(x)) {     // je-li v mezipaměti takový klíč
      return mezipaměť.get(x);  // načteme výsledek z mezipaměti
    }

    let výsledek = funkce(x);   // jinak zavoláme funkci

    mezipaměť.set(x, výsledek); // a výsledek uložíme do mezipaměti (zapamatujeme)
    return výsledek;
  };
}

pomalá = ukládacíDekorátor(pomalá);

alert( pomalá(1) ); // pomalá(1) se uloží do mezipaměti a výsledek se vrátí
alert( "Znovu: " + pomalá(1) ); // výsledek funkce pomalá(1) vrácený z mezipaměti

alert( pomalá(2) ); // pomalá(2) se uloží do mezipaměti a výsledek se vrátí
alert( "Znovu: " + pomalá(2) ); // výsledek funkce pomalá(2) vrácený z mezipaměti
```

Funkce `ukládacíDekorátor` v uvedeném kódu je *dekorátor*: speciální funkce, která přebírá jinou funkci a mění její chování.

Myšlenkou je, že můžeme volat `ukládacíDekorátor` na kteroukoli funkci a ona nám vrátí ukládací obal. To je skvělé, protože můžeme mít mnoho funkcí, které takové chování využijí, a nebudeme muset udělat nic víc než aplikovat na ně `ukládacíDekorátor`.

Oddělením ukládání od hlavního kódu funkce navíc udržujeme hlavní kód jednodušší.

Výsledkem `ukládacíDekorátor(funkce)` je „obal“: `function(x)`, který „obalí“ volání `funkce(x)` do logiky ukládání:

![](decorator-makecaching-wrapper.svg)

Z pohledu vnějšího kódu obalená funkce `pomalá` provádí stále totéž, jen byl k jejímu chování přidán aspekt ukládání.

Když to tedy shrneme, existuje několik výhod používání oddělené funkce `ukládacíDekorátor` namísto změny kódu samotné funkce `pomalá`:

- Funkce `ukládacíDekorátor` je opakovaně použitelná. Můžeme ji aplikovat na další funkci.
- Logika ukládání je oddělená a nezvyšuje složitost samotné funkce `pomalá` (pokud nějaká složitost byla).
- V případě potřeby můžeme zkombinovat více dekorátorů (jiné dekorátory budou následovat).

## Použití „funkce.call“ pro kontext

Uvedený dekorátor ukládání není vhodný pro práci s objektovými metodami.

Například v následujícím kódu metoda `pracovník.pomalá()` přestane po dekoraci fungovat:

```js run
// přidáme do metody pracovník.pomalá ukládání
let pracovník = {
  nějakáMetoda() {
    return 1;
  },

  pomalá(x) {
    // zde je úloha značně zatěžující CPU
    alert("Voláno s " + x);
    return x * this.nějakáMetoda(); // (*)
  }
};

// stejný kód jako předtím
function ukládacíDekorátor(funkce) {
  let mezipaměť = new Map();
  return function(x) {
    if (mezipaměť.has(x)) {
      return mezipaměť.get(x);
    }
*!*
    let výsledek = funkce(x); // (**)
*/!*
    mezipaměť.set(x, výsledek);
    return výsledek;
  };
}

alert( pracovník.pomalá(1) ); // původní metoda funguje

pracovník.pomalá = ukládacíDekorátor(pracovník.pomalá); // nyní přidáme ukládání

*!*
alert( pracovník.pomalá(2) ); // Ouha! Chyba: Nelze načíst vlastnost 'nějakáMetoda' z undefined
*/!*
```

Chyba nastane na řádku `(*)`, který se pokusí přistoupit k `this.nějakáMetoda` a selže. Vidíte proč?

Důvodem je, že obal volá původní funkci jako `funkce(x)` na řádku `(**)`. A když je funkce takto volána, obdrží `this = undefined`.

Podobný problém uvidíme, pokud se pokusíme spustit:

```js
let funkce = pracovník.pomalá;
funkce(2);
```

Obal tedy předá volání původní metodě, ale bez kontextového `this`. Proto nastane chyba.

Opravme to.

Existuje speciální vestavěná funkční metoda [funkce.call(kontext, ...argumenty)](mdn:js/Function/call), která nám umožňuje volat funkci s výslovným nastavením `this`.

Syntaxe je:

```js
funkce.call(kontext, arg1, arg2, ...)
```

Spustí funkci `funkce`, které poskytne první argument jako `this` a další jako její argumenty.

Abychom to zjednodušili, tato dvě volání provádějí skoro totéž:
```js
funkce(1, 2, 3);
funkce.call(obj, 1, 2, 3)
```

Obě volají funkci `funkce` s argumenty `1`, `2` a `3`. Jediný rozdíl je v tom, že `funkce.call` navíc nastaví `this` na `obj`.

Jako příklad v následujícím kódu zavoláme `řekniAhoj` v kontextu různých objektů: `řekniAhoj.call(uživatel)` spustí funkci `řekniAhoj`, které poskytne `this=uživatel`, a další řádek nastaví `this=správce`:

```js run
function řekniAhoj() {
  alert(this.jméno);
}

let uživatel = { jméno: "Jan" };
let správce = { jméno: "Správce" };

// použitím call předáme různé objekty jako „this“
řekniAhoj.call( uživatel ); // Jan
řekniAhoj.call( správce ); // Správce
```

A zde použijeme `call`, abychom zavolali `řekni` se zadaným kontextem a větou:


```js run
function řekni(věta) {
  alert(this.jméno + ': ' + věta);
}

let uživatel = { jméno: "Jan" };

// uživatel se stane this a "Ahoj" se stane prvním argumentem
řekni.call( uživatel, "Ahoj" ); // Jan: Ahoj
```

V našem případě můžeme použít `call` v obalu, abychom předali kontext původní funkci:

```js run
let pracovník = {
  nějakáMetoda() {
    return 1;
  },

  pomalá(x) {
    alert("Voláno s " + x);
    return x * this.nějakáMetoda(); // (*)
  }
};

function ukládacíDekorátor(funkce) {
  let mezipaměť = new Map();
  return function(x) {
    if (mezipaměť.has(x)) {
      return mezipaměť.get(x);
    }
*!*
    let výsledek = funkce.call(this, x); // „this“ se nyní předá správně
*/!*
    mezipaměť.set(x, výsledek);
    return výsledek;
  };
}

pracovník.pomalá = ukládacíDekorátor(pracovník.pomalá); // nyní do ní přidejme ukládání

alert( pracovník.pomalá(2) ); // funguje
alert( pracovník.pomalá(2) ); // funguje, nevolá originál (výsledek je v mezipaměti)
```

Nyní je všechno v pořádku.

Abychom to všechno objasnili, podívejme se hlouběji na to, jak se `this` předává:

1. Funkce `pracovník.pomalá` je po dekoraci obalem `function (x) { ... }`.
2. Když je tedy spuštěno `pracovník.pomalá(2)`, obal obdrží `2` jako argument a `this=pracovník` (je to objekt před tečkou).
3. Uvnitř obalu za předpokladu, že výsledek ještě není v mezipaměti, `funkce.call(this, x)` předá původní metodě aktuální `this` (`=pracovník`) a aktuální argument (`=2`).

## Buďme víceargumentoví

Učiňme nyní `ukládacíDekorátor` ještě univerzálnější. Zatím funguje jen pro funkce s jediným argumentem.

Jak nyní ukládat výsledek metody `pracovník.pomalá` s více argumenty?

```js
let pracovník = {
  pomalá(min, max) {
    return min + max; // předpokládáme velkou zátěž CPU
  }
};

// měla by si pamatovat volání se stejnými argumenty
pracovník.pomalá = ukládacíDekorátor(pracovník.pomalá);
```

Předtím jsme pro jediný argument `x` mohli jednoduše volat `mezipaměť.set(x, výsledek)` pro uložení výsledku a `mezipaměť.get(x)` pro jeho získání. Nyní si však musíme pamatovat výsledek pro *kombinaci argumentů* `(min,max)`. Nativní `Map` přijímá jako klíč pouze jedinou hodnotu.

Možných řešení je mnoho:

1. Implementovat novou datovou strukturu podobnou mapě (nebo použít nějakou od třetí strany), která je univerzálnější a umožňuje vícenásobné klíče.
2. Použít vnořené mapy: `mezipaměť.set(min)` bude `Map`, v níž bude uložena dvojice `(max, výsledek)`. Pak můžeme získat `výsledek` pomocí `mezipaměť.get(min).get(max)`.
3. Spojit dvě hodnoty do jedné. V našem konkrétním případě bychom jako klíč pro `Map` mohli použít jednoduše řetězec `"min,max"`. Pro flexibilitu můžeme umožnit dekorátoru poskytnout *hašovací funkci*, která umí vytvořit z mnoha hodnot jedinou.

Pro řadu praktických aplikací postačí třetí varianta, takže se zaměříme na ni.

Rovněž do `funkce.call` potřebujeme předávat nejen `x`, ale všechny argumenty. Vzpomeňme si, že ve `function()` můžeme získat pseudopole jejích argumentů jako `arguments`, takže `funkce.call(this, x)` můžeme nahradit za `funkce.call(this, ...arguments)`.

Zde je silnější `ukládacíDekorátor`:

```js run
let pracovník = {
  pomalá(min, max) {
    alert(`Voláno s ${min},${max}`);
    return min + max;
  }
};

function ukládacíDekorátor(funkce, hašovacíFunkce) {
  let mezipaměť = new Map();
  return function() {
*!*
    let klíč = hašovacíFunkce(arguments); // (*)
*/!*
    if (mezipaměť.has(klíč)) {
      return mezipaměť.get(klíč);
    }

*!*
    let výsledek = funkce.call(this, ...arguments); // (**)
*/!*

    mezipaměť.set(klíč, výsledek);
    return výsledek;
  };
}

function hašovacíFunkce(argumenty) {
  return argumenty[0] + ',' + argumenty[1];
}

pracovník.pomalá = ukládacíDekorátor(pracovník.pomalá, hašovacíFunkce);

alert( pracovník.pomalá(3, 5) ); // funguje
alert( "Znovu " + pracovník.pomalá(3, 5) ); // totéž (v mezipaměti)
```

Nyní to funguje pro libovolný počet argumentů (ačkoli bychom museli přizpůsobit libovolnému počtu argumentů i hašovací funkci. Zajímavý způsob, jak to zvládnout, bude probrán dále).

Jsou tady dvě změny:

- Na řádku `(*)` voláme `hašovacíFunkce` k vytvoření jediného klíče z `arguments`. Zde použijeme jednoduchou „spojovací“ funkci, která převede argumenty `(3, 5)` na klíč `"3,5"`. Složitější případy mohou vyžadovat jiné hašovací funkce.
- Pak `(**)` používá `funkce.call(this, ...arguments)`, aby předal původní funkci kontext i všechny argumenty (nejen první), které obal obdržel.

## funkce.apply

Místo `funkce.call(this, ...arguments)` můžeme použít `funkce.apply(this, arguments)`.

Syntaxe vestavěné metody [funkce.apply](mdn:js/Function/apply) je:

```js
funkce.apply(kontext, argumenty)
```

Metoda spustí funkci `funkce` tak, že nastaví `this=kontext` a použije objekt podobný poli `argumenty` jako seznam argumentů.

Jediný syntaktický rozdíl mezi `call` a `apply` je, že `call` očekává seznam argumentů, zatímco `apply` přijímá objekt podobný poli, který je obsahuje.

Tato dvě volání jsou tedy téměř ekvivalentní:

```js
funkce.call(kontext, ...argumenty);
funkce.apply(kontext, argumenty);
```

Obě provádějí stejné volání `funkce` se zadaným kontextem a argumenty.

Je tady jen jeden drobný rozdíl týkající se objektu `argumenty`:

- Roztažená syntaxe `...` umožňuje přidat *iterovatelný* objekt `argumenty` jako seznam do `call`.
- `apply` přijímá jako `argumenty` jedině *objekt podobný poli*.

...A pro objekty, které jsou současně iterovatelné a podobné poli, například skutečné pole, můžeme použít kteroukoli z nich, ale `apply` bude pravděpodobně rychlejší, jelikož většina motorů JavaScriptu ji vnitřně lépe optimalizuje.

Předávání všech argumentů společně s kontextem do jiné funkce se nazývá *přesměrování volání (call forwarding)*.

Toto je jeho nejjednodušší forma:

```js
let obal = function() {
  return funkce.apply(this, arguments);
};
```

Když externí kód zavolá takový `obal`, je to nerozlišitelné od volání původní funkce `funkce`.

## Vypůjčení metody [#method-borrowing]

Proveďme nyní ještě jedno malé vylepšení hašovací funkce:

```js
function hašovacíFunkce(argumenty) {
  return argumenty[0] + ',' + argumenty[1];
}
```

Zatím funguje jen pro dva argumenty. Bylo by lepší, kdyby dokázala spojit jakýkoli počet argumentů v `argumenty`.

Přirozené řešení by bylo použít metodu [pole.join](mdn:js/Array/join):

```js
function hašovacíFunkce(argumenty) {
  return argumenty.join();
}
```

...Naneštěstí to nebude fungovat. Je to proto, že voláme `hašovacíFunkce(arguments)` a objekt `arguments` je sice iterovatelný i podobný poli, ale není to skutečné pole.

Volání `join` na něm tedy selže, jak vidíme:

```js run
function hašovacíFunkce() {
*!*
  alert( arguments.join() ); // Chyba: arguments.join není funkce
*/!*
}

hašovacíFunkce(1, 2);
```

Stále je tady však snadný způsob, jak použít spojení polí:

```js run
function hašovacíFunkce() {
*!*
  alert( [].join.call(arguments) ); // 1,2
*/!*
}

hašovacíFunkce(1, 2);
```

Tento trik se nazývá *vypůjčení metody*.

Vezmeme (vypůjčíme si) spojovací metodu z běžného pole (`[].join`) a použijeme `[].join.call`, abychom ji spustili v kontextu `arguments`.

Proč to funguje?

Je to proto, že vnitřní algoritmus nativní metody `pole.join(spojka)` je velmi jednoduchý.

Převzato ze specifikace téměř doslovně:

1. Nechť `spojka` je první argument. Nejsou-li žádné argumenty, pak to bude čárka `","`.
2. Nechť `výsledek` je prázdný řetězec.
3. Připojíme `this[0]` k `výsledek`.
4. Připojíme `spojka` a `this[1]`.
5. Připojíme `spojka` a `this[2]`.
6. ...Budeme to dělat tak dlouho, než bude spojeno `this.length` prvků.
7. Vrátíme `výsledek`.

Technicky tedy funkce vezme `this` a spojí dohromady `this[0]`, `this[1]` atd. Je úmyslně napsána způsobem, který umožňuje jakékoli `this` podobné poli (to není náhoda, tuto praktiku používá mnoho metod). To je také důvod, proč funkce funguje s `this=arguments`.

## Dekorátory a vlastnosti funkcí

Nahradit funkci nebo metodu dekorovanou funkcí či metodou je obecně bezpečné až na jednu drobnost. Má-li původní funkce v sobě vlastnosti, např. `funkce.početVolání` nebo cokoli jiného, dekorovaná funkce je neposkytne, protože to je obal. Při jejich používání tedy musíme být opatrní.

Například jestliže ve výše uvedeném příkladu má funkce `pomalá` v sobě nějaké vlastnosti, pak `ukládacíDekorátor(pomalá)` je obal a tyto vlastnosti nemá.

Některé dekorátory mohou poskytnout své vlastní vlastnosti. Například dekorátor může počítat, kolikrát byla funkce volána a jak dlouhou dobu zabrala, a poskytnout tyto informace jako vlastnosti obalu.

Existuje způsob, jak vytvářet dekorátory, které zachovávají přístup k vlastnostem funkcí, ale to vyžaduje použití speciálního objektu `Proxy` k obalení funkce. Probereme to později v článku <info:proxy#proxy-apply>.

## Shrnutí

*Dekorátor* je obal okolo funkce, který mění její chování. Funkce stále odvádí svou hlavní práci.

Na dekorátory lze pohlížet jako na „prvky“ nebo „aspekty“, které lze přidávat do funkce. Můžeme přidat jeden nebo více. A to všechno beze změny kódu funkce!

Pro implementaci dekorátoru `ukládacíDekorátor` jsme prostudovali metody:

- [funkce.call(kontext, arg1, arg2...)](mdn:js/Function/call) -- volá funkci `funkce` se zadaným kontextem a argumenty.
- [funkce.apply(kontext, argumenty)](mdn:js/Function/apply) -- volá funkci `funkce`, které předá `kontext` jako `this` a objekt podobný poli `argumenty` do seznamu argumentů.

Generické *přesměrování volání* se obvykle provádí pomocí `apply`:

```js
let obal = function() {
  return původníFunkce.apply(this, arguments);
};
```

Viděli jsme také příklad *vypůjčení funkce*, když jsme vzali metodu z objektu a volali ji pomocí `call` v kontextu jiného objektu. Brát metody polí a aplikovat je na `arguments` je poměrně běžné. Alternativou je použít objekt zbytkových parametrů, který je skutečným polem.

V divočině číhá mnoho dekorátorů. Řešením úloh v této kapitole si ověřte, jak dobře jste je pochopili.
