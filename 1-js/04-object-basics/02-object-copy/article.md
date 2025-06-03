# Odkazy na objekty a kopírování objektů

Jeden ze základních rozdílů mezi objekty a primitivními typy je, že objekty se ukládají a kopírují jako „odkazy“, zatímco primitivní hodnoty: řetězce, čísla, booleany atd. -- se kopírují vždy „jako celá hodnota“.

Snadno tomu porozumíme, jestliže se podíváme trochu více pod kapuci toho, co se děje, když kopírujeme hodnotu.

Začněme primitivním typem, třeba řetězcem.

Do proměnné `věta` zkopírujeme proměnnou `zpráva`:

```js
let zpráva = "Ahoj!";
let věta = zpráva;
```

Výsledkem budou dvě nezávislé proměnné, v každé bude uložen řetězec `"Ahoj!"`.

![](variable-copy-value.svg)

Vcelku zjevný výsledek, že?

Objekty se takhle nechovají.

**V proměnné, do níž je přiřazen objekt, není uložen samotný objekt, ale jeho „adresa v paměti“ -- jinými slovy „odkaz“ na objekt.**

Podívejme se na příklad takové proměnné:

```js
let uživatel = {
  jméno: "Jan"
};
```

A takto je ve skutečnosti uložen v paměti:

![](variable-contains-reference.svg)

Objekt je uložen někde v paměti (na obrázku vpravo), zatímco proměnná `uživatel` (vlevo) obsahuje „odkaz“ na něj.

Můžeme se dívat na objektovou proměnnou, např. `uživatel`, jako na kus papíru, na němž je napsána adresa objektu.

Když provádíme akci nad objektem, např. zjišťujeme vlastnost `uživatel.jméno`, motor JavaScriptu se podívá na to, co je na této adrese, a provede operaci nad skutečným objektem.

Teď vysvětlíme, proč je to důležité.

**Když je kopírována objektová proměnná, zkopíruje se odkaz, ale samotný objekt se nezdvojí.**

Například:

```js no-beautify
let uživatel = { jméno: "Jan" };

let správce = uživatel; // kopírování odkazu
```

Nyní máme dvě proměnné, v obou jsou uloženy odkazy na tentýž objekt:

![](variable-copy-reference.svg)

Jak vidíte, objekt je stále jen jeden, ale nyní se na něj odkazují dvě proměnné.

Obě proměnné můžeme používat k přístupu k objektu a modifikaci jeho obsahu:

```js run
let uživatel = { jméno: 'Jan' };

let správce = uživatel;

*!*
správce.jméno = 'Petr'; // změna pomocí odkazu „správce“
*/!*

alert(*!*uživatel.jméno*/!*); // 'Petr', změny jsou vidět i z odkazu „uživatel“
```

Je to, jako kdybychom měli skříň se dvěma klíči a použili jeden z nich (`správce`) k tomu, abychom se do ní dostali a provedli změny. Když poté použijeme druhý klíč (`uživatel`), budeme stále otevírat stejnou skříň a můžeme přistupovat ke změněnému obsahu.

## Porovnání pomocí odkazů

Dva objekty jsou si rovny, jen když je to jeden a tentýž objekt.

Například zde `a` a `b` jsou odkazy na tentýž objekt, takže jsou si rovny:

```js run
let a = {};
let b = a; // kopírování odkazu

alert( a == b ); // true, obě proměnné se odkazují na tentýž objekt
alert( a === b ); // true
```

A zde si dva nezávislé objekty nejsou rovny, přestože vypadají podobně (oba jsou prázdné):

```js run
let a = {};
let b = {}; // dva nezávislé objekty

alert( a == b ); // false
```

Při porovnání typu `obj1 > obj2` nebo při porovnání s primitivním typem `obj == 5` se objekty převádějí na primitivy. Jak funguje porovnávání objektů, prostudujeme velmi brzy, ale upřímně řečeno, taková porovnání jsou zapotřebí jen velmi zřídka -- obvykle se objevují v důsledku programátorské chyby.

````smart header="Konstantní objekty můžeme modifikovat"
Důležitým vedlejším efektem ukládání objektů jako odkazů je, že objekt deklarovaný jako `const` *může* být modifikován.

Například:

```js run
const uživatel = {
  jméno: "Jan"
};

*!*
uživatel.jméno = "Petr"; // (*)
*/!*

alert(uživatel.jméno); // Petr
```

Může se zdát, že na řádku `(*)` bude ohlášena chyba, ale nestane se tak. Hodnota objektu `uživatel` je konstantní a musí pořád odkazovat na stejný objekt, ale vlastnosti tohoto objektu lze libovolně měnit.

Jinými slovy, `const uživatel` vyvolá chybu, jen pokud se pokusíme nastavit `uživatel=...` jako celek.

Jestliže ovšem skutečně potřebujeme učinit vlastnosti objektů konstantní, je to rovněž možné, ale úplně jiným způsobem. Zmíníme se o tom v kapitole <info:property-descriptors>.
````

## Klonování a slučování, Object.assign [#cloning-and-merging-object-assign]

Kopírování objektové proměnné tedy vytvoří další odkaz na tentýž objekt.

Co když však potřebujeme duplikovat objekt?

Můžeme vytvořit nový objekt a replikovat strukturu existujícího objektu tím, že budeme iterovat nad jeho vlastnostmi a kopírovat je na úrovni primitivů.

Například:

```js run
let uživatel = {
  jméno: "Jan",
  věk: 30
};

*!*
let klon = {}; // nový prázdný objekt

// zkopírujme do něj všechny uživatelské vlastnosti
for (let klíč in uživatel) {
  klon[klíč] = uživatel[klíč];
}
*/!*

// nyní je klon plně nezávislý objekt se stejným obsahem
klon.jméno = "Petr"; // změníme data uvnitř

alert( uživatel.jméno ); // v původním objektu je stále Jan
```

Můžeme také použít metodu [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

Její syntaxe je:

```js
Object.assign(cíl, ...zdroje])
```

- První argument `cíl` je cílový objekt.
- Další argumenty jsou seznam zdrojů.

Metoda zkopíruje vlastnosti všech zdrojových objektů do cíle `cíl` a ten pak vrátí jako svůj výsledek.

Například máme objekt `uživatel`. Přidejme do něj několik oprávnění:

```js
let uživatel = { jméno: "Jan" };

let oprávnění1 = { můžeProhlížet: true };
let oprávnění2 = { můžeEditovat: true };

*!*
// zkopíruje všechny vlastnosti z objektů oprávnění1 a oprávnění2 do objektu uživatel
Object.assign(uživatel, oprávnění1, oprávnění2);
*/!*

// nyní uživatel = { jméno: "Jan", můžeProhlížet: true, můžeEditovat: true }
alert(uživatel.jméno); // John
alert(uživatel.můžeProhlížet); // true
alert(uživatel.můžeEditovat); // true
```

Jestliže vlastnost s kopírovaným názvem již existuje, bude přepsána:

```js run
let uživatel = { jméno: "Jan" };

Object.assign(uživatel, { jméno: "Petr" });

alert(uživatel.jméno); // nyní uživatel = { jméno: "Petr" }
```

Můžeme také využít `Object.assign` k provedení jednoduchého klonování objektu:

```js
let uživatel = {
  jméno: "Jan",
  věk: 30
};

*!*
let klon = Object.assign({}, uživatel);
*/!*

alert(clone.name); // John
alert(clone.age); // 30
```

Zde metoda zkopíruje všechny vlastnosti objektu `uživatel` do prázdného objektu a ten pak vrátí.

Existují i jiné metody klonování objektu, např. použitím [rozšířené syntaxe](info:rest-parameters-spread) `klon = {...uživatel}`, kterou vysvětlíme později v tomto tutoriálu.

## Vnořené klonování

Až dosud jsme předpokládali, že všechny vlastnosti objektu `uživatel` jsou primitivní. Ale vlastnosti mohou být i odkazy na jiné objekty.

Například:
```js run
let uživatel = {
  jméno: "Jan",
  míry: {
    výška: 182,
    šířka: 50
  }
};

alert( uživatel.míry.výška ); // 182
```

Teď nestačí kopírovat `klon.míry = uživatel.míry`, protože `uživatel.míry` je objekt a bude zkopírován odkazem, takže `klon` a `uživatel` budou sdílet stejné míry:

```js run
let uživatel = {
  jméno: "Jan",
  míry: {
    výška: 182,
    šířka: 50
  }
};

let klon = Object.assign({}, uživatel);

alert( uživatel.míry === klon.míry ); // true, stejný objekt

// uživatel a klon sdílejí tytéž míry
uživatel.míry.šířka = 60; // změníme vlastnost na jednom místě
alert(klon.míry.šířka);   // 60, získáme výsledek z jiného místa
```

Abychom to opravili a učinili objekty `uživatel` a `klon` skutečně oddělenými, měli bychom použít klonovací cyklus, který prozkoumá každou hodnotu `uživatel[klíč]`, a pokud je to objekt, replikuje i jeho strukturu. Toto klonování se nazývá „hloubkové“ („hluboké“) anebo „strukturované“. Existuje metoda `structuredClone`, která implementuje hloubkové klonování.

### structuredClone

Volání `structuredClone(objekt)` vytvoří klon objektu `objekt` se všemi vnořenými vlastnostmi.

V našem příkladu ji můžeme použít následovně:

```js run
let uživatel = {
  jméno: "Jan",
  míry: {
    výška: 182,
    šířka: 50
  }
};

*!*
let klon = structuredClone(uživatel);
*/!*

alert( uživatel.míry === klon.míry ); // false, různé objekty

// uživatel a klon nyní nejsou nijak propojeny
uživatel.míry.šířka = 60; // změníme vlastnost na jednom místě
alert(klon.míry.šířka);   // 50, nemělo to vliv
```

Metoda `structuredClone` může klonovat většinu datových typů, např. objekty, pole, primitivní hodnoty.

Podporuje i kruhové odkazy, kdy vlastnost nějakého objektu odkazuje na tento objekt samotný (přímo nebo skrz řetězec odkazů).

Příklad:

```js run
let uživatel = {};
// vytvořme kruhový odkaz:
// uživatel.já odkazuje na samotného uživatele
uživatel.já = uživatel;

let klon = structuredClone(uživatel);
alert(klon.já === klon); // true
```

Jak vidíte, `klon.já` odkazuje na `klon`, ne na `uživatel`! Kruhový odkaz byl tedy rovněž správně naklonován.

Existují však případy, kdy `structuredClone` selhává.

Například když objekt má funkční vlastnost:

```js run
// chyba
structuredClone({
  f: function() {}
});
```

Funkční vlastnosti nejsou podporovány.

Abychom zvládli tak složité příklady, možná budeme muset použít kombinaci klonovacích metod, napsat si vlastní kód nebo, abychom znovu nevynalézali kolo, použít existující implementaci, například [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) z JavaScriptové knihovny [lodash](https://lodash.com).

## Shrnutí

Objekty se přiřazují a kopírují odkazem. Jinými slovy, v proměnné není uložena „hodnota objektu“, ale „odkaz“ (adresa v paměti) na tuto hodnotu. Zkopírování této hodnoty nebo její předání do funkce jako argument tedy zkopíruje tento odkaz, ne objekt samotný.

Všechny operace na zkopírovaných odkazech (např. přidávání nebo odebírání vlastností) jsou prováděny na jednom a tomtéž objektu.

Abychom vytvořili „skutečnou kopii“ (klon), můžeme použít `Object.assign` pro tzv. „mělkou kopii“ (vnořené objekty se kopírují odkazem) nebo funkci `structuredClone` pro „hloubkové klonování“, nebo zákaznickou implementaci klonování, např. [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
