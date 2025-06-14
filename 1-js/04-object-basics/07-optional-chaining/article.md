# Volitelné zřetězení „?.“

[recent browser="new"]

Volitelné zřetězení `?.` je bezpečný způsob, jak přistupovat k vnořeným vlastnostem objektu, i když vlastnost nacházející se mezi nimi neexistuje.

## Problém „neexistující vlastnosti“

Pokud jste teprve začali číst tento tutoriál a učit se JavaScript, tento problém se vás možná ještě nedotkl, ale dochází k němu poměrně často.

Jako příklad mějme objekt `uživatel`, který obsahuje informace o našich uživatelích.

Většina našich uživatelů má ve vlastnosti `uživatel.adresa` adresu s ulicí `uživatel.adresa.ulice`, ale někteří ji neuvedli.

Když se v takovém případě pokusíme získat `uživatel.adresa.ulice` a uživatel je bez adresy, dostaneme chybu:

```js run
let uživatel = {}; // uživatel bez vlastnosti „adresa“

alert(uživatel.adresa.ulice); // Chyba!
```

To je očekávaný výsledek. JavaScript takto funguje. Když `uživatel.adresa` je `undefined`, pokus o získání `uživatel.adresa.ulice` selže s chybou.

V mnoha praktických případech bychom však zde raději získali `undefined` místo chyby (což znamená „žádná ulice“).

...A jiný příklad. Při vývoji webů můžeme pomocí speciálního volání metody, např. `document.querySelector('.elem')`, získat objekt, který odpovídá určitému prvku webové stránky. Když na stránce takový prvek není, metoda vrací `null`.

```js run
// document.querySelector('.elem') je null, pokud tam žádný prvek není
let html = document.querySelector('.elem').innerHTML; // chyba, pokud je to null
```

Opět platí, že pokud tento prvek neexistuje, při přístupu k vlastnosti `.innerHTML` z `null` dostaneme chybu. Ale v některých případech, kdy je nepřítomnost prvku normální, bychom se této chybě rádi vyhnuli a prostě přijali za výsledek `html = null`.

Jak to můžeme udělat?

Očividným řešením by bylo zkontrolovat hodnotu pomocí `if` nebo podmíněného operátoru `?` před přístupem k její vlastnosti, například:

```js
let uživatel = {};

alert(uživatel.adresa ? uživatel.adresa.ulice : undefined);
```

Funguje to, nenastala žádná chyba... Ale není to příliš elegantní. Jak vidíme, `„uživatel.adresa“` se v kódu objevuje dvakrát.

Takto by vypadalo totéž pro `document.querySelector`:

```js run
let html = document.querySelector('.elem') ? document.querySelector('.elem').innerHTML : null;
```

Vidíme, že hledání prvku `document.querySelector('.elem')` se zde ve skutečnosti volá dvakrát. To není dobré.

Pro hlouběji vnořené vlastnosti to bude ještě ošklivější, protože bude potřeba více opakování.

Například zkusme podobným způsobem získat `uživatel.adresa.ulice.název`.

```js
let uživatel = {}; // uživatel nemá adresu

alert(uživatel.adresa ? uživatel.adresa.ulice ? uživatel.adresa.ulice.název : null : null);
```

Je to ošklivé a člověk může mít problémy takovému kódu porozumět.

Existuje trochu lepší způsob, jak to napsat, a to pomocí operátoru `&&`:

```js run
let uživatel = {}; // uživatel nemá adresu

alert( uživatel.adresa && uživatel.adresa.ulice && uživatel.adresa.ulice.název ); // undefined (žádná chyba)
```

Spojení celé cesty k vlastnosti ANDem sice zajistí, že všechny komponenty existují (pokud ne, vyhodnocení se zastaví), ale ani to není ideální.

Jak vidíte, názvy vlastností jsou v kódu stále zdvojeny, tj. ve výše uvedeném kódu se `uživatel.adresa` objeví třikrát.

Z tohoto důvodu bylo do jazyka přidáno volitelné zřetězení `?.`, aby tento problém vyřešilo jednou provždy!

## Volitelné zřetězení

Volitelné zřetězení `?.` zastaví vyhodnocování, jestliže hodnota před `?.` je `undefined` nebo `null`, a vrátí `undefined`.

**Dále v tomto článku budeme pro přehlednost říkat, že něco „existuje“, jestliže to není `null` ani `undefined`.**

Jinými slovy, `hodnota?.vlastnost`:
- funguje jako `hodnota.vlastnost`, jestliže `hodnota` existuje,
- v opačném případě (když `hodnota` je `undefined/null`) vrátí `undefined`.

Toto je bezpečný způsob, jak přistoupit k `uživatel.adresa.ulice` pomocí `?.`:

```js run
let uživatel = {}; // uživatel nemá adresu

alert( uživatel?.adresa?.ulice ); // undefined (bez chyby)
```

Kód je krátký a jasný, není v něm žádné zdvojení.

Zde je příklad s `document.querySelector`:

```js run
let html = document.querySelector('.elem')?.innerHTML; // není-li žádný prvek, bude undefined
```


Načtení adresy pomocí `uživatel?.adresa` funguje i tehdy, když objekt `uživatel` neexistuje:

```js run
let uživatel = null;

alert( uživatel?.adresa ); // undefined
alert( uživatel?.adresa.ulice ); // undefined
```

Prosíme všimněte si: syntaxe `?.` umožňuje, aby volitelná byla hodnota před ní, ale žádná další.

Např. `?.` v `uživatel?.adresa.ulice.název` umožňuje, aby `uživatel` byl bezpečně `null/undefined` (a v takovém případě vrátí `undefined`), ale to platí jen pro objekt `uživatel`. K dalším vlastnostem se přistupuje obvyklým způsobem. Chceme-li, aby některá z nich byla volitelná, musíme nahradit další `.` za `?.`.

```warn header="Nepoužívejte volitelné zřetězení přehnaně často"
Měli bychom používat `?.` jen tehdy, když je v pořádku, že něco neexistuje.

Například pokud podle logiky našeho kódu musí objekt `uživatel` existovat, ale `adresa` je volitelná, pak bychom měli psát `uživatel.adresa?.ulice`, ale ne `uživatel?.adresa?.ulice`.

Pak pokud se stane, že `uživatel` bude nedefinovaný, uvidíme programátorskou chybu a opravíme ji. Kdybychom však přehnaně používali `?.`, mohly by se chyby v kódu neohlásit i tehdy, když to není vhodné, a ladění by bylo obtížnější.
```

````warn header="Proměnná před `?.` musí být deklarovaná"
Pokud proměnná `uživatel` vůbec neexistuje, pak `uživatel?.cokoli` ohlásí chybu:

```js run
// ReferenceError: uživatel není definován
uživatel?.adresa;
```
Proměnná musí být deklarovaná (tj. `let/const/var uživatel` nebo jako parametr funkce). Volitelné zřetězení funguje jen pro deklarované proměnné.
````

## Zkratování

Jak bylo řečeno, `?.` okamžitě zastaví („vyzkratuje“) vyhodnocování, jestliže levá část neexistuje.

Jestliže tedy vpravo za `?.` následují další volání funkcí nebo operace, nevykonají se.

Například:

```js run
let uživatel = null;
let x = 0;

uživatel?.řekniAhoj(x++); // „uživatel“ není, takže běh se nedostane k volání řekniAhoj a x++

alert(x); // 0, hodnota se nezvýšila
```

## Další varianty: ?.(), ?.[]

Volitelné zřetězení `?.` není operátor, ale speciální syntaktický konstrukt, který funguje i s funkcemi a hranatými závorkami.

Například `?.()` se používá k volání funkce, která nemusí existovat.

V níže uvedeném kódu někteří z našich uživatelů mají metodu `správce` a někteří ne:

```js run
let uživatelSprávce = {
  správce() {
    alert("Jsem správce");
  }
};

let uživatelHost = {};

*!*
uživatelSprávce.správce?.(); // Jsem správce
*/!*

*!*
uživatelHost.správce?.(); // nic se nestane (taková metoda není)
*/!*
```

Zde na obou řádcích nejprve použijeme tečku (`uživatelSprávce.správce`) k získání vlastnosti `správce`, protože předpokládáme, že objekt `uživatel` existuje, takže je bezpečné z něj číst.

Pak `?.()` prověří levou stranu: jestliže funkce `správce` existuje, pak se spustí (tak tomu je pro `uživatelSprávce`). Jinak (pro `uživatelHost`) se vyhodnocování zastaví bez chyb.

Funguje také syntaxe `?.[]`, jestliže pro přístup k vlastnostem raději používáme hranaté závorky `[]` namísto tečky `.`. Podobně jako v předchozích případech nám umožňuje bezpečně načíst vlastnost z objektu, který nemusí existovat.

```js run
let klíč = "křestníJméno";

let uživatel1 = {
  křestníJméno: "Jan"
};

let uživatel2 = null; 

alert( uživatel1?.[klíč] ); // Jan
alert( uživatel2?.[klíč] ); // undefined
```

Můžeme použít `?.` i s `delete`:

```js run
delete uživatel?.jméno; // delete uživatel.jméno, pokud uživatel existuje
```

````warn header="Můžeme používat `?.` k bezpečnému čtení a mazání, ale ne k zápisu"
Volitelné zřetězení `?.` nelze použít na levé straně přiřazení.

Například:
```js run
let uživatel = null;

uživatel?.jméno = "Jan"; // Chyba, nefunguje to
// protože se to vyhodnotí jako: undefined = "Jan"
```
````

## Shrnutí

Syntaxe volitelného zřetězení `?.` má tři podoby:

1. `obj?.vlastnost` -- jestliže `obj` existuje, vrátí `obj.vlastnost`, jinak vrátí `undefined`.
2. `obj?.[vlastnost]` -- jestliže `obj` existuje, vrátí `obj[vlastnost]`, jinak vrátí `undefined`.
3. `obj.metoda?.()` -- jestliže `obj.metoda` existuje, zavolá `obj.metoda()`, jinak vrátí `undefined`.

Jak vidíme, všechny jsou srozumitelné a snadno se používají. `?.` ověří, zda levá strana je `null/undefined`, a pokud není, umožní pokračovat ve vyhodnocování.

Řetězec více `?.` nám umožňuje bezpečný přístup k vnořeným vlastnostem.

Přesto bychom měli používat `?.` opatrně a jen tehdy, když je podle logiky našeho kódu přijatelné, aby levá strana skutečně neexistovala. Tak se před námi neukryjí programátorské chyby, jestliže k nim dojde.
