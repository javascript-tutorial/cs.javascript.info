# Příslib

Představte si, že jste špičkový zpěvák a vaši fanoušci se dnem i nocí dožadují vaší nejnovější písně.

Abyste získali trochu klidu, slíbíte jim, že jim píseň pošlete, až bude vydána. Dáte svým fanouškům seznam, do kterého mohou zadat svou emailovou adresu, takže až bude píseň k dispozici, všichni podepsaní ji okamžitě dostanou. A i kdyby se něco ošklivě pokazilo, například kdyby vyhořelo nahrávací studio a vy byste nemohli svou píseň vydat, stále jim to budete moci oznámit.

Všichni jsou šťastní: vy, protože vás lidé už neobléhají, a fanoušci, protože jim píseň neunikne.

To je analogie ze skutečného života s tím, co často máme v programování:

1. „Produkující kód“, který něco provádí a nějakou dobu mu to trvá. Například kód, který načítá data ze sítě. To je „zpěvák“.
2. „Konzumující kód“, který chce mít výsledek „produkujícího kódu“, až bude připraven. Tento výsledek může být potřeba v mnoha funkcích. To jsou „fanoušci“.
3. *Příslib* (anglicky *promise*) je speciální JavaScriptový objekt, který spojuje „produkující kód“ a „konzumující kód“ dohromady. V pojmech naší analogie to je „podpisový seznam“. „Produkující kód“ dostane čas, který potřebuje k vyprodukování slibovaného výsledku, a „příslib“ zprostředkuje výsledek veškerému podepsanému kódu, až bude připraven.

Tato analogie není zcela přesná, protože JavaScriptové přísliby jsou složitější než pouhý podpisový seznam: mají další možnosti a omezení. Pro začátek však postačí.

Syntaxe konstruktoru objektu příslibu je:

```js
let příslib = new Promise(function(splň, zamítni) {
  // exekutor (produkující kód, „zpěvák“)
});
```

Funkce předaná do konstruktoru `new Promise` se nazývá *exekutor*. Když je vytvořen `new Promise`, exekutor se automaticky spustí. Obsahuje produkující kód, který by měl nakonec vyprodukovat výsledek. V pojmech výše uvedené analogie: exekutor je „zpěvák“.

Jeho argumenty `splň` a `zamítni` jsou callbacky, které poskytuje samotný JavaScript. Náš kód je obsažen pouze v exekutoru.

Když exekutor získá výsledek, nezáleží na tom, zda je to dříve či později, měl by volat jeden z těchto callbacků:

- `splň(hodnota)` — pokud práce skončila úspěšně, s výsledkem `hodnota`.
- `zamítni(chyba)` — pokud došlo k chybě, `chyba` je chybový objekt.

Když to tedy shrneme: exekutor se automaticky spustí a pokusí se provést svou práci. Když je s tímto pokusem hotov, volá buď `splň`, jestliže byl úspěšný, nebo `zamítni`, pokud nastala chyba.

Objekt `příslib` vracený konstruktorem `new Promise` obsahuje tyto interní vlastnosti:

- `state` (stav) — na začátku `"pending"` („čekající na vyřízení“), pak se změní buď na `"fulfilled"` („splněný“), když je voláno `splň`, nebo na `"rejected"` („zamítnutý“), když je voláno `zamítni`.
- `result` (výsledek) — na začátku `undefined`, pak se změní buď na `hodnota`, když je voláno `splň(hodnota)`, nebo na `chyba`, když je voláno `zamítni(chyba)`.

Exekutor tedy nakonec uvede objekt `příslib` do jednoho z těchto stavů:

![](promise-resolve-reject.svg)

Později uvidíme, jak se na tyto změny mohou zapsat „fanoušci“.

Uveďme příklad konstruktoru příslibu a jednoduchého exekutoru s „produkujícím kódem“, který zabere nějaký čas (pomocí `setTimeout`):

```js
let příslib = new Promise(function(splň, zamítni) {
  // tato funkce se spustí automaticky, když se vytvoří příslib

  // po 1 sekundě signalizuje, že práce je hotová s výsledkem "hotovo"
  setTimeout(() => *!*splň("hotovo")*/!*, 1000);
});
```

Při spuštění uvedeného kódu uvidíme dvě věci:

1. Exekutor je volán automaticky a okamžitě (pomocí `new Promise`).
2. Exekutor obdrží dva argumenty: `splň` a `zamítni`. Tyto funkce jsou předdefinovány motorem JavaScriptu, takže je nemusíme vytvářet. Měli bychom jen volat jednu z nich, až budeme připraveni.

    Po jedné sekundě „zpracovávání“ exekutor zavolá `splň("hotovo")`, aby vytvořil výsledek. Tím se změní stav objektu `příslib`:

![](promise-resolve-1.svg)

To byl příklad úspěšného dokončení práce, „splněný příslib“.

A nyní uvedeme příklad exekutoru, který zamítne příslib s chybou:

```js
let příslib = new Promise(function(splň, zamítni) {
  // po 1 sekundě signalizuje, že práce je hotová s chybou
  setTimeout(() => *!*zamítni(new Error("Ouha!"))*/!*, 1000);
});
```

Volání `zamítni(...)` uvede objekt příslibu do stavu `"rejected"`:

![](promise-reject-1.svg)

Když to tedy shrneme, exekutor by měl provést nějakou práci (zpravidla něco, co zabere nějaký čas) a pak volat buď `splň`, nebo `zamítni`, aby změnil stav odpovídajícího objektu příslibu.

Příslib, který je buď splněný, nebo zamítnutý, se nazývá „usazený“ („settled“), oproti původně „čekajícímu“ („pending“) příslibu.

````smart header="Výsledek nebo chyba může být pouze jeden"
Exekutor by měl volat pouze jednou `splň` nebo jednou `zamítni`. Jakákoli změna stavu je konečná.

Veškerá další volání `splň` a `zamítni` se ignorují:

```js
let příslib = new Promise(function(splň, zamítni) {
*!*
  splň("hotovo");
*/!*

  zamítni(new Error("…")); // ignorováno
  setTimeout(() => splň("…")); // ignorováno
});
```

Myšlenkou je, že práce prováděná exekutorem může mít pouze jeden výsledek nebo chybu.

Navíc `splň`/`zamítni` očekává pouze jediný argument (nebo žádný) a všechny další argumenty bude ignorovat.
````

```smart header="Zamítnutí s objekty třídy `Error`"
V případě, že se něco pokazí, by exekutor měl volat `zamítni`. To je možné volat s argumentem libovolného typu (stejně jako `splň`). Doporučuje se však používat objekty třídy `Error` (nebo objekty zděděné z třídy `Error`). Důvod bude brzy objasněn.
```

````smart header="Okamžité volání `splň`/`zamítni`"
V praxi exekutor obvykle provádí něco asynchronně a volá `splň`/`zamítni` až za nějakou dobu, ale nemusí to tak být. Můžeme volat `splň` nebo `zamítni` i okamžitě, například:

```js
let příslib = new Promise(function(splň, zamítni) {
  // odvést tuto práci nám nezabere žádný čas
  splň(123); // okamžitě vydáme výsledek: 123
});
```

Může se to stát například tehdy, když začneme dělat nějakou práci, ale pak uvidíme, že všechno už bylo dokončeno a uloženo do mezipaměti.

To je dobře. Hned máme příslib splněný.
````

```smart header="Vlastnosti `state` a `result` jsou interní"
Vlastnosti `state` a `result` objektu Promise jsou interní. Nemůžeme k nim přistupovat přímo. Můžeme k tomu použít metody `.then`/`.catch`/`.finally`, které budou dále vysvětleny.
```

## Konzumenti: then, catch

Objekt Promise slouží jako spojení mezi exekutorem („produkující kód“ nebo „zpěvák“) a konzumujícími funkcemi („fanoušci“), které obdrží výsledek nebo chybu. Konzumující funkce mohou být registrovány (zapsány) použitím metod `.then` a `.catch`.

### then

Základní a nejdůležitější z nich je `.then`.

Její syntaxe je:

```js
příslib.then(
  function(výsledek) { *!*/* zpracování úspěšného výsledku */*/!* },
  function(chyba) { *!*/* zpracování chyby */*/!* }
);
```

Prvním argumentem `.then` je funkce, která se spustí, když je příslib splněn, a obdrží výsledek.

Druhým argumentem `.then` je funkce, která se spustí, když je příslib zamítnut, a obdrží chybu.

Například zde je reakce na úspěšně provedený příslib:

```js run
let příslib = new Promise(function(splň, zamítni) {
  setTimeout(() => splň("hotovo!"), 1000);
});

// splň spustí první funkci v .then
příslib.then(
*!*
  výsledek => alert(výsledek), // zobrazí "hotovo!" za 1 sekundu
*/!*
  chyba => alert(chyba) // nespustí se
);
```

Byla spuštěna první funkce.

A v případě zamítnutí se spustí druhá:

```js run
let příslib = new Promise(function(splň, zamítni) {
  setTimeout(() => zamítni(new Error("Ouha!")), 1000);
});

// zamítni spustí druhou funkci v .then
příslib.then(
  result => alert(result), // nespustí se
*!*
  chyba => alert(chyba) // zobrazí "Error: Ouha!" za 1 sekundu
*/!*
);
```

Jestliže nás zajímají pouze úspěšná dokončení, můžeme funkci `.then` poskytnout pouze jeden argument:

```js run
let příslib = new Promise(splň => {
  setTimeout(() => splň("hotovo!"), 1000);
});

*!*
příslib.then(alert); // zobrazí "hotovo!" za 1 sekundu
*/!*
```

### catch

Pokud nás zajímají pouze chyby, můžeme jako první argument použít `null`: `.then(null, funkceOšetřujícíChybu)`. Nebo můžeme použít `.catch(funkceOšetřujícíChybu)`, což je přesně totéž:


```js run
let příslib = new Promise((splň, zamítni) => {
  setTimeout(() => zamítni(new Error("Ouha!")), 1000);
});

*!*
// .catch(f) je totéž jako příslib.then(null, f)
příslib.catch(alert); // zobrazí "Error: Ouha!" za 1 sekundu
*/!*
```

Volání `.catch(f)` je zcela analogické `.then(null, f)`, je to jen zkratka.

## Úklid: finally

Stejně jako existuje klauzule `finally` v běžném bloku `try {...} catch {...}`, existuje i `finally` v příslibech.

Volání `.finally(f)` se podobá `.then(f, f)` v tom smyslu, že `f` se spustí vždy, když se příslib usadí: ať už je splněn nebo zamítnut.

Myšlenkou `finally` je nastavit handler pro provádění úklidu nebo finalizace po dokončení předchozí operace.

Například zastavení ukazatelů nahrávání, uzavření již nepotřebných připojení a podobně.

Představte si ho jako uklízečku po večírku. Ať se večírek povedl nebo ne, ať na něm byl jakýkoli počet přátel, pokaždé po něm musíme (nebo bychom aspoň měli) uklidit.

Kód může vypadat třeba následovně:

```js
new Promise((splň, zamítni) => {
  /* udělá něco, co trvá nějaký čas, a pak volá splň nebo možná zamítni */
})
*!*
  // spustí se vždy, když se příslib usadí, nezávisle na tom, zda úspěšně nebo ne
  .finally(() => zastav ukazatel nahrávání)
  // ukazatel nahrávání se tedy vždy zastaví dříve, než budeme pokračovat
*/!*
  .then(výsledek => zobraz výsledek, chyba => zobraz chybu)
```

Prosíme, všimněte si však, že `finally(f)` není přesně totéž jako `then(f, f)`.

Je mezi nimi několik důležitých rozdílů:

1. Handler `finally` nemá žádné argumenty. Ve `finally` nevíme, zda byl příslib úspěšný nebo ne. To je v pořádku, jelikož naším úkolem je obvykle provést „obecné“ finalizační procedury.
    
    Prosíme, podívejte se na uvedený příklad: jak vidíte, handler `finally` nemá žádné argumenty a výsledek příslibu je zpracován v dalším handleru.
2. Handler `finally` „předává“ výsledek nebo chybu dalšímu vhodnému handleru.

    Například zde je výsledek předán skrz `finally` do `then`:
    ```js run
    new Promise((splň, zamítni) => {
      setTimeout(() => splň("hodnota"), 2000)
    })
      .finally(() => alert("Příslib připraven")) // spustí se jako první
      .then(výsledek => alert(výsledek)); // <-- .then zobrazí "hodnota"
    ```
    
    Jak vidíte, `hodnota` vrácená prvním příslibem se předá skrz `finally` do dalšího `then`.
    
    To je velmi vhodné, protože `finally` není určeno k tomu, aby zpracovalo výsledek příslibu. Jak bylo řečeno, jeho účelem je provést obecný úklid, nezávisle na tom, jaký byl výstup.

    A zde je v příslibu chyba, abychom viděli, jak se předá skrz `finally` do `catch`:

    ```js run
    new Promise((splň, zamítni) => {
      throw new Error("chyba");
    })
      .finally(() => alert("Příslib připraven")) // spustí se jako první
      .catch(chyba => alert(chyba));  // <-- .catch zobrazí chybu
    ```
    
3. Handler `finally` by také neměl nic vracet. Pokud tak učiní, návratová hodnota se tiše ignoruje.
    
    Jedinou výjimkou z tohoto pravidla je situace, kdy handler `finally` vygeneruje chybu. Pak se do dalšího handleru místo předchozího výstupu předá tato chyba.
    
Shrňme to:

- Handler `finally` neobdrží výstup předchozího handleru (nemá žádné argumenty). Výstup se místo toho předá dál následujícímu vhodnému handleru.
- Pokud handler `finally` vrátí nějakou hodnotu, je ignorována.
- Když `finally` vygeneruje chybu, běh pokračuje do nejbližšího chybového handleru.

Tyto vlastnosti jsou užitečné a zajistí, že vše bude fungovat správně, pokud použijeme `finally` k tomu, k čemu je určeno: pro obecné úklidové procedury.

````smart header="Můžeme připojit handlery k již usazeným příslibům"
Pokud příslib čeká na vyřízení, handlery `.then/catch/finally` počkají na jeho výstup.

Někdy se může stát, že ve chvíli, kdy k příslibu přidáme handler, je příslib již usazen.

V takovém případě se tyto handlery prostě okamžitě spustí:

```js run
// příslib bude splněn ihned po vytvoření
let příslib = new Promise(splň => splň("hotovo!"));

příslib.then(alert); // hotovo! (zobrazí se hned teď)
```

Všimněte si, že to činí přísliby silnějšími než „podpisový seznam“ z reálného života. Jestliže už zpěvák svou píseň vydal a nějaká osoba se zapíše na podpisový seznam až pak, píseň už pravděpodobně nedostane. Podpisy v reálném životě musejí být učiněny ještě před událostí.

Přísliby jsou flexibilnější. Můžeme přidávat handlery kdykoli: pokud je výsledek už hotov, handler se jednoduše spustí.
````

## Příklad: načtiSkript [#loadscript]

Dále uvidíme praktičtější příklady, jak nám přísliby mohou pomoci psát asynchronní kód.

Uvažujme funkci `načtiSkript` pro načtení skriptu z předchozí kapitoly.

Zde je varianta založená na callbacku, jen pro připomenutí:

```js
function načtiSkript(zdroj, callback) {
  let skript = document.createElement('script');
  skript.src = zdroj;

*!*
  skript.onload = () => callback(null, skript);
  skript.onerror = () => callback(new Error(`Chyba načítání skriptu pro ${zdroj}`));
*/!*

  document.head.append(skript);
}
```

Přepišme ji s použitím příslibů.

Nová funkce `načtiSkript` nebude vyžadovat callback. Místo něj vytvoří a vrátí objekt příslibu, který se splní, až bude načítání hotovo. Vnější kód do něj může přidávat handlery (podepisující funkce) prostřednictvím `.then`:

```js run
function načtiSkript(zdroj) {
  return new Promise(function(splň, zamítni) {
    let skript = document.createElement('script');
    skript.src = zdroj;

    skript.onload = () => splň(skript);
    skript.onerror = () => zamítni(new Error(`Chyba načítání skriptu pro ${zdroj}`));

    document.head.append(skript);
  });
}
```

Použití:

```js run
let příslib = načtiSkript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

příslib.then(
  skript => alert(`${skript.src} je načten!`),
  chyba => alert(`Chyba: ${chyba.message}`)
);

příslib.then(skript => alert('Další handler...'));
```

Hned vidíme několik výhod oproti vzoru založenému na callbacku:


| Přísliby | Callbacky |
|----------|-----------|
| Přísliby nám umožňují dělat věci v přirozeném pořadí. Nejprve spustíme `načtiSkript(skript)` a pak do `.then` napíšeme, co máme dělat s výsledkem. | Musíme mít funkci `callback` k dispozici, už když voláme `načtiSkript(skript, callback)`. Jinými slovy, ještě *před* voláním `načtiSkript` musíme vědět, co dělat s výsledkem. |
| Můžeme volat `.then` na příslibu tolikrát, kolikrát chceme. Pokaždé přidáme na „podpisový seznam“ nového „fanouška“, novou podepsanou funkci. Více o tom v další kapitole: [](info:promise-chaining). | Callback může být pouze jeden. |

Přísliby nám tedy poskytují lepší běh kódu a flexibilitu. Je toho však ještě víc. Uvidíme to v dalších kapitolách.
