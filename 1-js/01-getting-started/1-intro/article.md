# Úvod do JavaScriptu

Podíváme se, co je na JavaScriptu tak zvláštního, čeho s ním můžeme dosáhnout a které jiné technologie si s ním dobře rozumějí.

## Co je JavaScript?

*JavaScript* byl původně vytvořen k „oživení webových stránek“.

Programy v tomto jazyce se nazývají *skripty*. Mohou být vepsány přímo v HTML kódu webové stránky a spustí se automaticky při jejím načtení.

Skripty jsou poskytovány a spouštěny jako čistý text. Ke spuštění nepotřebují žádnou speciální přípravu nebo kompilaci.

V tomto směru se JavaScript značně odlišuje od jiného jazyka, nazvaného [Java](https://cs.wikipedia.org/wiki/Java_(programovací_jazyk)).

```smart header="Proč se jmenuje <u>Java</u>Script?"
Když byl JavaScript vytvořen, jmenoval se původně jinak: „LiveScript“. Avšak jazyk Java byl tehdy velmi populární, a tak bylo rozhodnuto, že novému jazyku pomůže, když bude prohlášen za „mladšího bratříčka“ Javy.

Postupně při vývoji se však JavaScript stal zcela nezávislým jazykem se svou vlastní specifikací nazvanou [ECMAScript](http://cs.wikipedia.org/wiki/ECMAScript) a nyní nemá k Javě vůbec žádný vztah.
```

Dnes je možné spouštět JavaScript nejen v prohlížeči, ale i na serveru nebo na kterémkoli zařízení, které obsahuje zvláštní program nazvaný [JavaScriptový engine](https://en.wikipedia.org/wiki/JavaScript_engine).

Prohlížeč má zabudovaný engine, který se někdy nazývá „virtuální stroj JavaScriptu“.

Různé enginy mají různá „kódová označení“. Například:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) -- v Chrome, Opeře a Edge.
- [SpiderMonkey](https://cs.wikipedia.org/wiki/SpiderMonkey) -- ve Firefoxu.
- Existují i jiná krycí jména, například „Chakra“ pro Internet Explorer, "JavaScriptCore", „Nitro“ a „SquirrelFish“ pro Safari, a tak dále.

Výše uvedené pojmy je dobré si pamatovat, protože se používají ve vývojářských článcích na internetu. Budeme je používat i my. Například je-li uvedeno „vlastnost X je podporována ve V8“, znamená to, že pravděpodobně bude fungovat v Chrome, Opeře a Edge.

```smart header="Jak enginy fungují?"

Enginy jsou složité, ale jejich základy jsou jednoduché.

<<<<<<< HEAD
1. Engine (v případě prohlížeče zahrnutý do něj) načte („rozebere“, „parsuje“) skript.
2. Pak přeloží („zkompiluje“) skript do strojového jazyka.
3. A pak se strojový kód hezky rychle spustí.
=======
1. The engine (embedded if it's a browser) reads ("parses") the script.
2. Then it converts ("compiles") the script to machine code.
3. And then the machine code runs, pretty fast.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

Při každém kroku procesu engine aplikuje optimalizace. Dokonce sleduje, jak zkompilovaný skript běží, analyzuje data, která jím protékají, a podle těchto znalostí dále optimalizuje strojový kód.
```

## Co může JavaScript v prohlížeči dělat?

<<<<<<< HEAD
Moderní JavaScript je „bezpečný“ programovací jazyk. Neposkytuje přímý přístup k paměti nebo CPU na nejnižší úrovni, protože byl původně vytvořen pro prohlížeče, které jej nepotřebují.
=======
Modern JavaScript is a "safe" programming language. It does not provide low-level access to memory or the CPU, because it was initially created for browsers which do not require it.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

Schopnosti JavaScriptu značně závisejí na prostředí, v němž je spuštěn. Například prostředí [Node.js](https://cs.wikipedia.org/wiki/Node.js) podporuje funkce, které umožňují JavaScriptu svévolně číst a zapisovat do souborů, provádět požadavky na síti a podobně.

JavaScript v prohlížeči umí dělat vše, co se týká manipulace s webovou stránkou, interakce s uživatelem a webového serveru.

Například JavaScript v prohlížeči může:

- Přidat na stránku nový HTML kód, měnit existující obsah, modifikovat styly.
- Reagovat na uživatelské akce, spouštět skript při kliknutí myší, pohybu kurzorem, stisku klávesy.
- Posílat po síti požadavky na vzdálené servery, stahovat a uploadovat soubory (tzv. technologie [AJAX](https://cs.wikipedia.org/wiki/AJAX) a [COMET](https://en.wikipedia.org/wiki/Comet_(programming))).
- Číst a nastavovat cookies, pokládat návštěvníkovi otázky, zobrazovat zprávy.
- Pamatovat si data na straně klienta („lokální úložiště“).

## Co NEMŮŽE JavaScript v prohlížeči dělat?

<<<<<<< HEAD
Schopnosti JavaScriptu v prohlížeči jsou omezeny v zájmu bezpečnosti uživatele. Cílem je zabránit zlé webové stránce v přístupu k soukromým informacím nebo v poškození uživatelových dat.
=======
JavaScript's abilities in the browser are limited to protect the user's safety. The aim is to prevent an evil webpage from accessing private information or harming the user's data.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

Příklady takových omezení:

- JavaScript na webové stránce nesmí svévolně číst a zapisovat do souborů na pevném disku, kopírovat je nebo spouštět programy. Nemá přímý přístup k funkcím operačního systému.

	Moderní prohlížeče umožňují pracovat se soubory, ale přístup je omezen a je poskytován jen tehdy, když uživatel provede určitou akci, např. „přetažení“ souboru do okna prohlížeče nebo jeho výběr pomocí tagu `<input>`.

<<<<<<< HEAD
	Existují způsoby, jak komunikovat s kamerou, mikrofonem nebo jinými zařízeními, ale ty vyžadují výslovné svolení uživatele. Stránka s povoleným JavaScriptem tedy nemůže bez vědomí uživatele zapnout webovou kameru, nasnímat okolí a nahrávku poslat do [NSA](https://cs.wikipedia.org/wiki/Národní_bezpečnostní_agentura).
- Různé záložky a okna o sobě navzájem obvykle nevědí. Někdy ano, například tehdy, když jedno okno používá JavaScript k otevření druhého. Ale ani v tomto případě JavaScript z jedné stránky nemůže přistupovat k jiné, pokud pocházejí z různých webových sídel (z jiné domény, protokolu nebo portu).

	Tento postup se nazývá „politika stejného původu“. Je možné ji obejít tak, že *obě stránky* souhlasí s výměnou dat a obsahují speciální JavaScriptový kód, který to umožňuje. V tomto tutoriálu to budeme probírat.

	Toto omezení je zde opět pro bezpečnost uživatele. Stránka z `http://anysite.com`, kterou uživatel otevřel, nesmí mít možnost přistupovat k jiné záložce prohlížeče s URL `http://gmail.com` a krást odtamtud informace.
- JavaScript může jednoduše komunikovat po síti se serverem, z něhož přišla aktuální stránka, ale jeho schopnost získávat data z jiných sídel/domén je značně omezená. Přestože je to možné, vyžaduje to výslovný souhlas (uvedený v HTTP hlavičce) vzdálené strany. I to je bezpečnostní omezení.

![](limitations.svg)

Jestliže použijete JavaScript mimo prohlížeč, např. na serveru, tato omezení neplatí. Moderní prohlížeče navíc umožňují používat pluginy nebo rozšíření, které mohou uživatele požádat o další povolení.
=======
    There are ways to interact with the camera/microphone and other devices, but they require a user's explicit permission. So a JavaScript-enabled page may not sneakily enable a web-camera, observe the surroundings and send the information to the [NSA](https://en.wikipedia.org/wiki/National_Security_Agency).
- Different tabs/windows generally do not know about each other. Sometimes they do, for example when one window uses JavaScript to open the other one. But even in this case, JavaScript from one page may not access the other page if they come from different sites (from a different domain, protocol or port).

    This is called the "Same Origin Policy". To work around that, *both pages* must agree for data exchange and must contain special JavaScript code that handles it. We'll cover that in the tutorial.

    This limitation is, again, for the user's safety. A page from `http://anysite.com` which a user has opened must not be able to access another browser tab with the URL `http://gmail.com`, for example, and steal information from there.
- JavaScript can easily communicate over the net to the server where the current page came from. But its ability to receive data from other sites/domains is crippled. Though possible, it requires explicit agreement (expressed in HTTP headers) from the remote side. Once again, that's a safety limitation.

![](limitations.svg)

Such limitations do not exist if JavaScript is used outside of the browser, for example on a server. Modern browsers also allow plugins/extensions which may ask for extended permissions.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

## V čem je JavaScript unikátní?

Na JavaScriptu jsou nejméně *tři* skvělé věci:

```compare
+ Plná integrace s HTML/CSS.
+ Jednoduché věci se v něm dělají jednoduše.
+ Je podporován ve všech významných prohlížečích a standardně bývá povolen.
```
JavaScript je jediná prohlížečová technologie, která má všechny tyto tři vlastnosti současně.

To vše činí JavaScript unikátním. To vše je důvodem, proč je dnes nejrozšířenějším nástrojem pro vytváření prohlížečových rozhraní.

<<<<<<< HEAD
Při tom všem však JavaScript umožňuje vytvářet i servery, mobilní aplikace a podobně.
=======
That said, JavaScript can be used to create servers, mobile applications, etc.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

## Jazyky „nad“ JavaScriptem

Syntaxe JavaScriptu samozřejmě neuspokojí každého, neboť různí lidé chtějí různé vlastnosti.

To se dá očekávat, jelikož každý má jiné požadavky a pracuje na jiných projektech.

<<<<<<< HEAD
Proto se začala objevovat spousta nových jazyků, které jsou před spuštěním v prohlížeči *transpilovány* (překládány) do JavaScriptu.
=======
So, recently a plethora of new languages appeared, which are *transpiled* (converted) to JavaScript before they run in the browser.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

Moderní nástroje provádějí transpilaci velmi rychle a čistě. V podstatě umožňují vývojářům programovat v jiném jazyce a automaticky jej převádět do JavaScriptu.

Příklady takových jazyků:

<<<<<<< HEAD
- [CoffeeScript](https://coffeescript.org/) je „syntaktický cukr“ pro JavaScript, který zavádí kratší syntaxi a tím nám umožňuje psát čistší a přesnější kód. Obvykle jej mají v oblibě vývojáři, kteří používají jazyk Ruby.
- [TypeScript](https://www.typescriptlang.org/) se soustředí na přidání „striktního, silně typovaného systému“, aby zjednodušil vývoj a podporu složitých systémů. Vyvinula jej firma Microsoft.
- [Flow](https://flow.org/) rovněž přidává typovací systém, ale jiným způsobem. Vyvinul jej Facebook.
- [Dart](https://www.dartlang.org/) je samostatný jazyk se svým vlastním enginem, který běží v prostředích mimo prohlížeč (např. v mobilních aplikacích), ale i ten může být transpilován do JavaScriptu. Vyvinut firmou Google.
- [Brython](https://brython.info/) je transpiler Pythonu do JavaScriptu, který umožňuje psát aplikace v čistém Pythonu bez JavaScriptu.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) je moderní, stručný a bezpečný programovací jazyk, jehož cílem může být prohlížeč nebo Node.

Jsou i další. Samozřejmě i když používáme některý z transpilovaných jazyků, měli bychom znát i JavaScript, abychom skutečně porozuměli tomu, co se děje.
=======
- [CoffeeScript](https://coffeescript.org/) is "syntactic sugar" for JavaScript. It introduces shorter syntax, allowing us to write clearer and more precise code. Usually, Ruby devs like it.
- [TypeScript](https://www.typescriptlang.org/) is concentrated on adding "strict data typing" to simplify the development and support of complex systems. It is developed by Microsoft.
- [Flow](https://flow.org/) also adds data typing, but in a different way. Developed by Facebook.
- [Dart](https://www.dartlang.org/) is a standalone language that has its own engine that runs in non-browser environments (like mobile apps), but also can be transpiled to JavaScript. Developed by Google.
- [Brython](https://brython.info/) is a Python transpiler to JavaScript that enables the writing of applications in pure Python without JavaScript.
- [Kotlin](https://kotlinlang.org/docs/reference/js-overview.html) is a modern, concise and safe programming language that can target the browser or Node.

There are more. Of course, even if we use one of these transpiled languages, we should also know JavaScript to really understand what we're doing.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

## Shrnutí

- JavaScript byl původně vytvořen jako jazyk určený výhradně pro prohlížeč, ale dnes se používá i v mnoha jiných prostředích.
- Dnes si JavaScript vydobyl unikátní postavení jako nejrozsáhleji přijímaný prohlížečový jazyk s plnou integrací s HTML/CSS.
- Existuje mnoho jazyků, které jsou „transpilovány“ do JavaScriptu a poskytují určité vlastnosti. Až zvládnete JavaScript, doporučujeme vám, abyste se na ně alespoň krátce podívali.
