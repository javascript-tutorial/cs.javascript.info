# Automatické testování pomocí Mochy

Automatické testování bude používáno v dalších úlohách a široce se používá i ve skutečných projektech.

## K čemu potřebujeme testy?

Když píšeme funkci, můžeme si obvykle představit, co by měla dělat: jaké parametry by měly dávat jaké výsledky.

Během vývoje můžeme tuto funkci zkontrolovat tak, že ji spustíme a porovnáme její výsledek s očekávaným. Můžeme to udělat například na konzoli.

Jestliže je něco špatně -- pak opravíme kód, znovu spustíme funkci, zkontrolujeme výsledek -- a tak dále, dokud to nebude fungovat.

Avšak takové ruční „znovuspouštění“ není dokonalé.

**Když testujeme kód tím, že ho znovu ručně spouštíme, můžeme snadno něco přehlédnout.**

Například vytváříme funkci `f`. Napíšeme kód a testujeme: `f(1)` funguje, ale `f(2)` ne. Opravíme kód a nyní `f(2)` funguje. Vypadá to kompletně? Ale zapomněli jsme znovu otestovat `f(1)`. To může vést k chybě.

To je velmi typické. Když něco vyvíjíme, máme na paměti mnoho možných případů použití. Těžko však očekávat od programátora, že je po každé změně všechny znovu ručně prověří. Lehce se tedy stává, že opravíme jednu věc a rozbijeme jinou.

**Automatické testování znamená, že testy jsou psány odděleně navíc ke kódu. Různými způsoby spouštějí naše funkce a porovnávají jejich výsledky s očekávanými.**

## Vývoj řízený chováním (BDD)

Začněme technikou nazývanou *Vývoj řízený chováním*, anglicky [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development), zkráceně BDD.

**BDD jsou tři věci v jedné: testy A dokumentace A příklady.**

Abychom BDD pochopili, prozkoumáme praktický příklad vývoje.

## Vývoj funkce „mocnina“: specifikace

Řekněme, že chceme vytvořit funkci `mocnina(x, n)`, která umocní `x` na celočíselný exponent `n`. Předpokládáme, že `n≥0`.

Tato úloha je jenom příklad: v JavaScriptu je operátor `**`, který to umí, ale zde se soustředíme na proces vývoje, který může být aplikován i na složitější úlohy.

Před vytvořením kódu funkce `mocnina` si představíme, co by tato funkce měla dělat, a popíšeme to.

Takový popis se nazývá *specifikace* a obsahuje popisy případů použití společně s jejich testy, například takto:

```js
describe("mocnina", function() {

  it("umocní na n-tou", function() {
    assert.equal(mocnina(2, 3), 8);
  });

});
```

Specifikace má tři hlavní stavební bloky, které vidíte výše:

`describe("název", function() { ... })`
: Jakou funkcionalitu popisujeme? V našem případě popisujeme funkci `mocnina`. Používá se k seskupení „pracovníků“ -- bloků `it`.

`it("popis případu použití", function() { ... })`
: V titulku `it` popíšeme *lidsky čitelným způsobem* konkrétní případ použití. Druhým argumentem je funkce, která jej otestuje.

`assert.equal(hodnota1, hodnota2)`
: Je-li implementace korektní, kód uvnitř bloku `it` by se měl spustit bez chyb.

Funkce `assert.*` se používají k ověření, zda `mocnina` funguje tak, jak očekáváme. Právě zde používáme jednu z nich -- `assert.equal`, která porovná argumenty a vyvolá chybu, pokud si nejsou rovny. Zde zkontroluje, zda výsledek `mocnina(2, 3)` se rovná `8`. Existují i jiné druhy porovnání a kontrol, které přidáme později.

Specifikaci můžeme spustit a ta pak spustí test specifikovaný v bloku `it`. To uvidíme později.

## Proces vývoje

Proces vývoje obvykle vypadá takto:

1. Napíše se úvodní specifikace s testy pro většinu základní funkcionality.
2. Vytvoří se úvodní implementace.
3. Abychom prověřili, zda funguje, spustíme testovací rámec [Mocha](https://mochajs.org/) (více později), který spustí specifikaci. Dokud funkcionalita není úplná, budou se zobrazovat chyby. Provádíme opravy, dokud nebude vše fungovat.
4. Nyní máme funkční úvodní implementaci s testy.
5. Do specifikace přidáváme další případy použití, které implementace pravděpodobně ještě nepodporuje. Testy začnou selhávat.
6. Vrátíme se ke kroku 3 a vylepšujeme implementaci, dokud testy nepřestanou vydávat chyby.
7. Opakujeme kroky 3-6, dokud nebude funkcionalita připravena.

Vývoj je tedy *iterativní*. Napíšeme specifikaci, implementujeme ji, ujistíme se, že testy projdou, napíšeme další testy, ujistíme se, že projdou, atd. Nakonec máme funkční implementaci i její testy.

Podívejme se na tento proces vývoje v praxi.

První krok je již téměř hotov: máme úvodní specifikaci funkce `mocnina`. Nyní před vytvořením implementace použijeme několik JavaScriptových knihoven ke spuštění testů, abychom viděli, zda fungují (všechny testy selžou).

## Specifikace v akci

V tomto tutoriálu budeme pro testy používat následující JavaScriptové knihovny:

- [Mocha](https://mochajs.org/) -- jádro rámce: poskytuje běžné testovací funkce včetně `describe` a `it` a hlavní funkci, která spouští testy.
- [Chai](https://www.chaijs.com/) -- knihovna s mnoha kontrolami. Umožňuje nám použít spoustu různých kontrol, ale nyní budeme potřebovat jen `assert.equal`.
- [Sinon](https://sinonjs.org/) -- knihovna k prozkoumávání funkcí, emulování vestavěných funkcí a podobně. Budeme ji potřebovat až mnohem později.

Tyto knihovny jsou vhodné pro testování v prohlížeči i na straně serveru. Zde budeme uvažovat prohlížečovou variantu.

Celá HTML stránka s těmito rámci a specifikací funkce `mocnina`:

```html src="index.html"
```

Tuto stránku lze rozdělit do pěti částí:

1. `<head>` -- přidává knihovny třetích stran a styly pro testy.
2. `<script>` s funkcí k testování, v našem případě s kódem funkce `mocnina`.
3. Testy -- v našem případě externí skript `test.js`, který obsahuje výše uvedené `describe("mocnina", ...)`.
4. HTML značka `<div id="mocha">`, kterou bude používat Mocha k výstupu výsledků.
5. Testy jsou zahájeny příkazem `mocha.run()`.

Výsledek:

[iframe height=250 src="pow-1" border=1 edit]

Prozatím test selže a vydá chybu. To je logické: ve funkci `mocnina` máme prázdný kód, takže `mocnina(2, 3)` vrátí `undefined` namísto `8`.

Do budoucna poznamenejme, že existuje více vysokoúrovňových spouštěčů testů, např. [karma](https://karma-runner.github.io/) a jiné, které usnadňují automatické provádění mnoha různých testů.

## Úvodní implementace

Vytvořme jednoduchou implementaci funkce `mocnina`, aby testy prošly:

```js
function mocnina(x, n) {
  return 8; // :) podvádíme!
}
```

Hurá, teď to funguje!

[iframe height=250 src="pow-min" border=1 edit]

## Zlepšení specifikace

To, co jsme udělali, je samozřejmě podvod. Funkce nefunguje: pokus o výpočet `mocnina(3, 4)` vydá nekorektní výsledek, ale testy projdou.

...Tato situace je však poměrně typická, v praxi k ní dochází. Testy projdou, ale funkce funguje špatně. Naše specifikace je nedokonalá. Musíme do ní přidat další případy použití.

Přidejme jeden další test, který ověří, zda `mocnina(3, 4) = 81`.

Zde si můžeme vybrat jeden ze dvou způsobů, jak test organizovat:

1. První varianta -- přidáme jeden další `assert` do stejného `it`:

    ```js
    describe("mocnina", function() {

      it("umocní na n-tou", function() {
        assert.equal(mocnina(2, 3), 8);
    *!*
        assert.equal(mocnina(3, 4), 81);
    */!*
      });

    });
    ```
2. Druhá varianta -- vytvoříme dva testy:

    ```js
    describe("mocnina", function() {

      it("2 na 3 je 8", function() {
        assert.equal(mocnina(2, 3), 8);
      });

      it("3 na 4 je 81", function() {
        assert.equal(mocnina(3, 4), 81);
      });

    });
    ```

Principiální rozdíl je v tom, že když `assert` vyvolá chybu, blok `it` se okamžitě ukončí. Jestliže tedy v první variantě první `assert` neuspěje, neuvidíme výsledek druhého `assert`.

Rozdělení testů je užitečné pro získání více informací o tom, co se děje, takže druhá varianta je lepší.

A kromě toho existuje ještě jedno pravidlo, které se vyplatí dodržovat.

**Jeden test kontroluje jednu věc.**

Podíváme-li se na test a uvidíme v něm dvě nezávislé kontroly, je lepší ho rozdělit na dva jednodušší testy.

Budeme tedy pokračovat druhou variantou.

Výsledek:

[iframe height=250 src="pow-2" edit border="1"]

Jak se dalo očekávat, druhý test neuspěje. Pochopitelně, naše funkce vrátí vždy `8`, zatímco `assert` očekává `81`.

## Zlepšení implementace

Napišme něco reálnějšího, aby testy prošly:

```js
function mocnina(x, n) {
  let výsledek = 1;

  for (let i = 0; i < n; i++) {
    výsledek *= x;
  }

  return výsledek;
}
```

Abychom se ujistili, že funkce funguje správně, otestujme ji na dalších hodnotách. Namísto manuálního psaní `it` bloků je můžeme vytvořit v cyklu `for`:

```js
describe("mocnina", function() {

  function vytvořTest(x) {
    let očekáváno = x * x * x;
    it(`${x} na 3 je ${očekáváno}`, function() {
      assert.equal(mocnina(x, 3), očekáváno);
    });
  }

  for (let x = 1; x <= 5; x++) {
    vytvořTest(x);
  }

});
```

Výsledek:

[iframe height=250 src="pow-3" edit border="1"]

## Vnořené „describe“

Přidáme ještě další testy. Předtím však poznamenejme, že pomocná funkce `vytvořTest` a cyklus `for` by měly být seskupeny. Nebudeme potřebovat `vytvořTest` v jiných testech, je zapotřebí jedině ve `for`: jejich společným úkolem je zkontrolovat, jak `mocnina` umocňuje na zadaný exponent.

Seskupení se provádí pomocí vnořeného `describe`:

```js
describe("mocnina", function() {

*!*
  describe("umocní x na 3", function() {
*/!*

    function vytvořTest(x) {
      let očekáváno = x * x * x;
      it(`${x} na 3 je ${očekáváno}`, function() {
        assert.equal(mocnina(x, 3), očekáváno);
      });
    }

    for (let x = 1; x <= 5; x++) {
      vytvořTest(x);
    }

*!*
  });
*/!*

  // ... zde budou následovat další testy, můžeme přidat jak describe, tak it
});
```

Vnořené `describe` definuje novou „podskupinu“ testů. Na výstupu můžeme vidět otitulkované odsazení:

[iframe height=250 src="pow-4" edit border="1"]

V budoucnosti můžeme přidávat další `it` a `describe` na nejvyšší úrovni s vlastními pomocnými funkcemi. V nich nebude vidět `vytvořTest`.

````smart header="`before/after` a `beforeEach/afterEach`"
Můžeme nastavit funkce `before/after`, které se spustí před provedením/po provedení testů, a také funkce `beforeEach/afterEach`, které se spustí před provedením/po provedení *každého* `it`.

Například:

```js no-beautify
describe("test", function() {

  before(() => alert("Začíná testování - před všemi testy"));
  after(() => alert("Končí testování - po všech testech"));

  beforeEach(() => alert("Před testem - vstup do testu"));
  afterEach(() => alert("Po testu - výstup z testu"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

Provedená sekvence bude:

```
Začíná testování - před všemi testy (before)
Před testem - vstup do testu        (beforeEach)
1
Po testu - výstup z testu           (afterEach)
Před testem - vstup do testu        (beforeEach)
2
Po testu - výstup z testu           (afterEach)
Končí testování - po všech testech  (after)
```

[edit src="beforeafter" title="Otevře příklad na pískovišti."]

Obvykle se `beforeEach/afterEach` a `before/after` používají k provedení inicializace, vynulování čítačů nebo provedení něčeho jiného mezi testy (nebo skupinami testů).
````

## Rozšíření specifikace

Základní funkcionalita funkce `mocnina` je hotová. První kolo vývoje je za námi. Až skončíme oslavu a dopijeme šampaňské, půjdeme ji zlepšit.

Jak bylo řečeno, funkce `mocnina(x, n)` je zamýšlena tak, aby fungovala s kladnými celočíselnými hodnotami `n`.

Funkce JavaScriptu obvykle oznamují matematickou chybu tak, že vrátí `NaN`. Proveďme totéž pro neplatné hodnoty `n`.

Nejprve přidáme toto chování do specifikace(!):

```js
describe("mocnina", function() {

  // ...

  it("pro záporné n je výsledek NaN", function() {
*!*
    assert.isNaN(mocnina(2, -1));
*/!*
  });

  it("pro necelé n je výsledek NaN", function() {
*!*
    assert.isNaN(mocnina(2, 1.5));    
*/!*
  });

});
```

Výsledek s novými testy:

[iframe height=530 src="pow-nan" edit border="1"]

Nově přidané testy selžou, protože je naše implementace nepodporuje. Tímto způsobem se provádí BDD: nejprve napíšeme selhávající testy, až pak pro ně vytvoříme implementaci.

```smart header="Další kontroly"
Všimněte si prosím kontroly `assert.isNaN`: kontroluje hodnotu `NaN`.

V [Chai](https://www.chaijs.com/) jsou i jiné kontroly, například:

- `assert.equal(hodnota1, hodnota2)` -- prověří rovnost  `hodnota1 == hodnota2`.
- `assert.strictEqual(hodnota1, hodnota2)` -- prověří striktní rovnost `hodnota1 === hodnota2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverzní kontroly k výše uvedeným.
- `assert.isTrue(hodnota)` -- prověří, zda `hodnota === true`
- `assert.isFalse(hodnota)` -- prověří, zda `hodnota === false`
- ...úplný seznam najdete v [dokumentaci](https://www.chaijs.com/api/assert/)
```

Do funkce `mocnina` bychom tedy měli přidat několik řádků:

```js
function mocnina(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let výsledek = 1;

  for (let i = 0; i < n; i++) {
    výsledek *= x;
  }

  return výsledek;
}
```

Nyní to funguje a všechny testy projdou:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Otevřít úplný konečný příklad na pískovišti."]

## Shrnutí

V BDD se nejprve vytváří specifikace, pak až následuje implementace. Nakonec máme jak specifikaci, tak kód.

Specifikaci můžeme použít třemi způsoby:

1. Jako **testy** -- zaručí nám, že kód funguje správně.
2. Jako **dokumentaci** -- titulky `describe` a `it` nám říkají, co funkce provádí.
3. Jako **příklady** -- testy jsou v podstatě fungující příklady, které nám ukazují, jak může být funkce použita.

S touto specifikací můžeme funkci bezpečně zlepšovat, měnit nebo i od začátku přepisovat a máme jistotu, že stále bude fungovat správně.

To je obzvláště důležité ve velkých projektech, v nichž se funkce používá na mnoha místech. Když takovou funkci změníme, nemáme žádný způsob, jak ručně ověřit, zda stále funguje správně na všech místech, kde se používá.

Bez testů mají lidé dvě možnosti:

1. Provést změnu, ať už jakoukoli. Pak se naši uživatelé setkají s chybami, jelikož pravděpodobně něco ručně nezkontrolujeme.
2. Nebo, je-li trest za chyby příliš tvrdý, bez testů se lidé budou bát takové funkce modifikovat, kód se pak stane zastaralým a nikdo do něj nebude chtít pronikat. To není dobré pro vývoj.

**Automatické testování pomáhá předejít těmto problémům!**

Jestliže je projekt pokryt testy, žádný takový problém nenastane. Po každé změně můžeme provést testy a uvidíme spoustu kontrol, které se provedou během několika sekund.

**Kromě toho dobře testovaný kód má lepší architekturu.**

Přirozeně je to proto, že automaticky testovaný kód se snadněji modifikuje a vylepšuje. Je tady však i jiný důvod.

Abychom mohli psát testy, měl by kód být organizován tak, aby každá funkce měla jasně popsaný úkol a dobře definovaný vstup a výstup. To znamená mít od začátku dobrou architekturu.

V reálném životě to někdy nebývá tak lehké. Někdy je obtížné napsat specifikaci dříve než skutečný kód, protože ještě není zřejmé, jak by se měl chovat. Obecně však psaní testů činí vývoj rychlejším a stabilnějším.

Později v tomto tutoriálu se setkáme s mnoha úlohami s vestavěnými testy. Uvidíte tedy i praktičtější příklady.

Psaní testů vyžaduje dobrou znalost JavaScriptu. My jsme se ho však teprve začali učit. Proto abychom vás uklidnili, prozatím od vás nevyžadujeme, abyste psali testy, ale měli byste už být schopni je číst, i když budou trochu složitější než v této kapitole.
