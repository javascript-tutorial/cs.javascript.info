
# Funkční objekt, NFE

Jak již víme, funkce v JavaScriptu je hodnota.

Každá hodnota v JavaScriptu má svůj typ. Jakého typu je funkce?

V JavaScriptu jsou funkce objekty.

Dobrý způsob, jak si představit funkce, je představit si je jako „akční objekty“, které lze volat. Můžeme je nejenom volat, ale i zacházet s nimi jako s objekty: přidávat a ubírat vlastnosti, předávat je odkazem atd.


## Vlastnost „name“

Funkční objekty obsahují některé užitečné vlastnosti.

Například název funkce je dostupný ve vlastnosti „name“ („jméno“):

```js run
function řekniAhoj() {
  alert("Ahoj");
}

alert(řekniAhoj.name); // řekniAhoj
```

Zábavné je, že logika přiřazení názvu je chytrá a přiřadí korektní název i funkci, která je vytvořena bez názvu a pak okamžitě přiřazena:

```js run
let řekniAhoj = function() {
  alert("Ahoj");
};

alert(řekniAhoj.name); // řekniAhoj (je tady název!)
```

Funguje to i tehdy, je-li přiřazena jako defaultní hodnota: 

```js run
function f(řekniAhoj = function() {}) {
  alert(řekniAhoj.name); // řekniAhoj (funguje!)
}

f();
```

Ve specifikaci se tato vlastnost nazývá „kontextuální název“ („contextual name“). Jestliže funkce vlastní název neposkytne, pak je v přiřazení detekován z kontextu.

I metody objektů mají názvy:

```js run
let uživatel = {

  řekniAhoj() {
    // ...
  },

  řekniNashle: function() {
    // ...
  }

}

alert(uživatel.řekniAhoj.name); // řekniAhoj
alert(uživatel.řekniNashle.name); // řekniNashle
```

Není v tom však žádná magie. Existují případy, kdy není jak zjistit skutečný název. V takovém případě je vlastnost `name` prázdná, například zde:

```js run
// funkce vytvořená uvnitř pole
let pole = [function() {}];

alert( pole[0].name ); // <prázdný řetězec>
// engine nemá jak zjistit správný název, takže tady žádný není
```

V praxi však většina funkcí název má.

## Vlastnost „length“

Další vestavěná vlastnost je „length“ („délka“), která vrací počet parametrů funkce, například:

```js run
function f1(a) {}
function f2(a, b) {}
function mnoho(a, b, ...další) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(mnoho.length); // 2
```

Zde vidíme, že ostatní parametry se nepočítají.

Vlastnost `length` se někdy používá pro [introspekci](https://en.wikipedia.org/wiki/Type_introspection) ve funkcích, které operují s jinými funkcemi.

Například v níže uvedeném kódu funkce `zeptejSe` přijímá parametr `otázka`, kterou položí, a libovolný počet funkčních handlerů, které zavolá.

Jakmile uživatel poskytne odpověď, funkce zavolá handlery. Můžeme předávat dva druhy handlerů:

- Funkci bez argumentů, která se volá jedině tehdy, když uživatel zadá kladnou odpověď.
- Funkci s argumenty, která se volá v každém případě a vrátí odpověď.

Abychom zavolali `handler` správně, prozkoumáme vlastnost `handler.length`.

Myšlenkou je, že máme jednoduchou syntaxi handleru bez argumentů pro kladné případy (nejčastější varianta), ale jsme schopni podporovat i univerzální handlery:

```js run
function zeptejSe(otázka, ...handlery) {
  let jeAno = confirm(otázka);

  for(let handler of handlery) {
    if (handler.length == 0) {
      if (jeAno) handler();
    } else {
      handler(jeAno);
    }
  }

}

// při kladné odpovědi se volají oba handlery
// při záporné odpovědi se volá jen druhý
zeptejSe("Otázka?", () => alert('Řekl jste ano'), výsledek => alert(výsledek));
```

Toto je zvláštní případ tzv. [polymorfismu](https://cs.wikipedia.org/wiki/Polymorfismus_(programování)) -- odlišného zacházení s argumenty v závislosti na jejich typu nebo v našem případě v závislosti na `length`. Tato myšlenka je využívána v knihovnách JavaScriptu.

## Vlastní vlastnosti

Můžeme si také přidávat svoje vlastní vlastnosti.

Zde přidáme vlastnost `čítač`, která počítá celkový počet volání:

```js run
function řekniAhoj() {
  alert("Ahoj");

  *!*
  // spočítáme, kolikrát jsme ji volali
  řekniAhoj.čítač++;
  */!*
}
řekniAhoj.čítač = 0; // počáteční hodnota

řekniAhoj(); // Ahoj
řekniAhoj(); // Ahoj

alert( `Voláno ${řekniAhoj.čítač}krát` ); // Voláno 2krát
```

```warn header="Vlastnost není proměnná"
Vlastnost přiřazená funkci, např. `řekniAhoj.čítač = 0`, *nedefinuje* uvnitř funkce lokální proměnnou `čítač`. Jinými slovy, vlastnost `čítač` a proměnná `let čítač` jsou dvě různé věci.

Můžeme s funkcí zacházet jako s objektem, ukládat do ní vlastnosti, ale to nemá žádný vliv na její provádění. Proměnné nejsou vlastnosti funkce a naopak. Jsou to dva paralelní světy.
```

Vlastnosti funkce mohou někdy nahradit uzávěry. Například můžeme přepsat příklad funkce čítače z kapitoly <info:closure> tak, že použijeme vlastnost funkce:

```js run
function vytvořČítač() {
  // namísto:
  // let počet = 0

  function čítač() {
    return čítač.počet++;
  };

  čítač.počet = 0;

  return čítač;
}

let čítač = vytvořČítač();
alert( čítač() ); // 0
alert( čítač() ); // 1
```

Nyní je `počet` uložen přímo ve funkci, ne v jejím vnějším lexikálním prostředí.

Je to lepší nebo horší, než použít uzávěr?

Hlavním rozdílem je, že jestliže hodnota `počet` přebývá ve vnější proměnné, externí kód není schopen k ní přistupovat. Mohou ji modifikovat jedině vnořené funkce. Ale jestliže je vázána na funkci, pak je taková věc možná:

```js run
function vytvořČítač() {

  function čítač() {
    return čítač.počet++;
  };

  čítač.počet = 0;

  return čítač;
}

let čítač = vytvořČítač();

*!*
čítač.počet = 10;
alert( čítač() ); // 10
*/!*
```

Volba implementace tedy závisí na našich potřebách.

## Pojmenovaný funkční výraz

Pojmenovaný funkční výraz, zkráceně NFE *(z anglického „Named Function Expression“ -- pozn. překl.)*, je termín označující funkční výraz, který má nějaký název.

Vezměme si například obyčejný funkční výraz:

```js
let řekniAhoj = function(kdo) {
  alert(`Ahoj, ${kdo}`);
};
```

A přidejme mu název:

```js
let řekniAhoj = function *!*funkce*/!*(kdo) {
  alert(`Ahoj, ${kdo}`);
};
```

Dosáhli jsme tím něčeho? Jaký je smysl přidaného názvu `„funkce“`?

Nejprve si všimněme, že stále máme funkční výraz. Přidání názvu `„funkce“` za `function` z něj neučinilo deklaraci funkce, protože funkce je stále vytvořena jako součást operace přiřazení.

Přidání takového názvu rovněž nic nerozbilo.

Funkce je stále dostupná jako `řekniAhoj()`:

```js run
let řekniAhoj = function *!*funkce*/!*(kdo) {
  alert(`Ahoj, ${kdo}`);
};

řekniAhoj("Jan"); // Ahoj, Jan
```

Na názvu `funkce` jsou dvě speciální věci, které jsou důvodem pro jeho použití:

1. Název umožňuje funkci odkazovat se interně sama na sebe.
2. Název není viditelný zvnějšku funkce.

Například níže uvedená funkce `řekniAhoj` volá sama sebe s parametrem `"Host"`, není-li poskytnuto `kdo`:

```js run
let řekniAhoj = function *!*funkce*/!*(kdo) {
  if (kdo) {
    alert(`Ahoj, ${kdo}`);
  } else {
*!*
    funkce("Host"); // použijeme „funkce“ k volání sebe sama
*/!*
  }
};

řekniAhoj(); // Ahoj, Host

// Ale tohle nebude fungovat:
funkce(); // Chyba, funkce není definována (není viditelná zvnějšku funkce)
```

Proč používáme `funkce`? Možná by pro vnořené volání stačilo použít `řekniAhoj`?

Ve skutečnosti ve většině případů ano:

```js
let řekniAhoj = function(kdo) {
  if (kdo) {
    alert(`Ahoj, ${kdo}`);
  } else {
*!*
    řekniAhoj("Host");
*/!*
  }
};
```

Problém s tímto kódem je, že `řekniAhoj` se může změnit ve vnějším kódu. Jestliže funkce bude přiřazena do jiné proměnné, tento kód začne způsobovat chyby:

```js run
let řekniAhoj = function(kdo) {
  if (kdo) {
    alert(`Ahoj, ${kdo}`);
  } else {
*!*
    řekniAhoj("Host"); // Chyba: řekniAhoj není funkce
*/!*
  }
};

let vítej = řekniAhoj;
řekniAhoj = null;

vítej(); // Chyba, vnořené volání řekniAhoj už nefunguje!
```

To se stane proto, že funkce přebírá `řekniAhoj` ze svého vnějšího lexikálního prostředí. Neexistuje lokální `řekniAhoj`, takže se použije vnější proměnná. A ve chvíli volání je vnější `řekniAhoj` rovno `null`.

Volitelný název, který můžeme vložit do funkčního výrazu, je určen právě k řešení problémů tohoto druhu.

Použijme jej k opravě našeho kódu:

```js run
let řekniAhoj = function *!*funkce*/!*(kdo) {
  if (kdo) {
    alert(`Ahoj, ${kdo}`);
  } else {
*!*
    funkce("Host"); // Nyní je vše v pořádku
*/!*
  }
};

let vítej = řekniAhoj;
řekniAhoj = null;

vítej(); // Ahoj, Host (vnořené volání funguje)
```

Nyní to funguje, protože název `"funkce"` je funkčně lokální. Nepřebírá se zvnějšku (a není tam viditelný). Specifikace zaručuje, že se bude vždy odkazovat na aktuální funkci.

<<<<<<< Updated upstream
The outer code still has it's variable `sayHi` or `welcome`. And `func` is an "internal function name", how the function can call itself internally.
=======
Vnější kód stále má svou proměnnou `řekniAhoj` nebo `vítej`. A `funkce` je „interní funkční název“, jakým tato funkce může interně volat sama sebe.
>>>>>>> Stashed changes

```smart header="Pro deklarace funkce nic takového neexistuje"
Zde popsaná vlastnost „interní název“ je k dispozici jen pro funkční výrazy, ne pro deklarace funkcí. V deklaracích funkcí neexistuje žádná syntaxe, jak přidat „interní“ název.

Někdy, když potřebujeme spolehlivý interní název, je to důvod, proč přepsat deklaraci funkce do formy pojmenovaného funkčního výrazu.
```

## Shrnutí

Funkce jsou objekty.

Zde jsme probrali jejich vlastnosti:

- `name` -- název funkce. Obvykle se přebírá z definice funkce, ale pokud tam není, JavaScript se pokusí odhadnout jej z kontextu (tj. z přiřazení).
- `length` -- počet argumentů v definici funkce. Ostatní parametry se nepočítají.

Je-li funkce deklarována jako funkční výraz (ne v hlavním toku kódu) a ten obsahuje název, nazývá se pojmenovaný funkční výraz. Název lze používat uvnitř funkce, aby se na ni odkazoval, pro rekurzívní volání a podobně.

<<<<<<< Updated upstream
They create a "main" function and attach many other "helper" functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.
=======
Funkce si také může uchovávat přidané vlastnosti. Tuto vlastnost zhusta využívá mnoho dobře známých JavaScriptových knihoven.
>>>>>>> Stashed changes

Vytvářejí „hlavní“ funkci a přidávají k ní mnoho dalších „pomocných“ funkcí. Například knihovna [jQuery](https://jquery.com) vytváří funkci jménem `$`. Knihovna [lodash](https://lodash.com) vytváří funkci jménem `_` a pak do ní přidává `_.clone`, `_.keyBy` a jiné vlastnosti (pokud se o nich chcete dozvědět víc, viz [dokumentaci](https://lodash.com/docs)). Ve skutečnosti to dělají proto, aby snížily zamoření globálního prostoru, takže jedna knihovna vytváří pouze jednu globální proměnnou. Tím se snižuje pravděpodobnost konfliktů názvů.

Funkce tedy může sama o sobě odvádět užitečnou práci a může také obsahovat hromadu jiných funkcionalit ve svých vlastnostech.
