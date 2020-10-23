# Úvod do JavaScriptu

Podívejme se, co je na JavaScriptu tak zvláštního, čeho s ním můžeme dosáhnout a jaké další technologie s ním dobře hrají.

## Co je JavaScript?

*JavaScript* byl původně vytvořen za účelem „oživení webových stránek“.

Programy v tomto jazyce se nazývají *skripty*. Mohou být zapsány přímo do HTML webové stránky a spuštěny automaticky při načítání stránky.

Skripty jsou poskytovány a spouštěny jako prostý text. Ke spuštění nepotřebují speciální přípravu ani kompilaci.

V tomto ohledu se JavaScript velmi liší od jiného jazyka zvaného [Java](https://cs.wikipedia.org/wiki/Java_(programovací_jazyk)).

```smart header="Proč se nazývá <u>Java</u>Script?"
Když byl vytvořen JavaScript, měl zpočátku jiný název: „LiveScript“. Ale Java byla v té době velmi populární, takže bylo rozhodnuto, že umístění nového jazyka jako „mladšího bratra“ Javy pomůže.

Jak se ale vyvíjel, JavaScript se stal plně nezávislým jazykem s vlastní specifikací nazvanou [ECMAScript](http://cs.wikipedia.org/wiki/ECMAScript) a nyní již nemá vůbec žádný vztah k Javě.
```

Dnes se JavaScript může spouštět nejen v prohlížeči, ale také na serveru nebo ve skutečnosti na jakémkoli zařízení, které má speciální program s názvem [JavaScript engine](https://cs.wikipedia.org/wiki/JavaScript_engine).

Prohlížeč má zabudovaný engine, který se někdy nazývá „virtuální stroj JavaScript“.

Různé enginy mají různá „kódová jména“. Například:

- [V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) - v prohlížeči Chrome a Opera.
- [SpiderMonkey](https://cs.wikipedia.org/wiki/SpiderMonkey) - ve Firefoxu.
- ... Existují další kódová jména jako „Chakra“ pro IE, „ChakraCore“ pro Microsoft Edge, „Nitro“ a „SquirrelFish“ pro Safari atd.

Výše uvedené výrazy je dobré si pamatovat, protože se používají v článcích pro vývojáře na internetu. Použijeme je také. Například pokud „funkce X je podporována ve V8“, tak pravděpodobně funguje v prohlížečích Chrome a Opera.

```smart header="Jak fungují enginy?"

Enginy jsou komplikované. Ale základy jsou snadné.

1. Engine (vložený, pokud je to prohlížeč) čte („analyzuje“) skript.
2. Poté převede („zkompiluje“) skript do jazyka stroje.
3. A pak běží strojový kód, docela rychle.

Engine aplikuje optimalizace v každém kroku procesu. Dokonce sleduje spuštěný kompilovaný skript, analyzuje data, která jím procházejí, a na základě těchto znalostí dále optimalizuje strojový kód.
```

## Co může dělat JavaScript v prohlížeči?

Moderní JavaScript je „bezpečný“ programovací jazyk. Neposkytuje nízkoúrovňový přístup k paměti nebo CPU, protože byl původně vytvořen pro prohlížeče, které to nevyžadují.

Schopnosti JavaScriptu velmi závisí na prostředí, ve kterém běží. Například [Node.js](https://cs.wikipedia.org/wiki/Node.js) podporuje funkce, které umožňují JavaScriptu číst / zapisovat libovolné soubory, provádět síťové požadavky, atd.

JavaScript v prohlížeči umožňuje vše, co souvisí s manipulací s webovými stránkami, interakcí s uživatelem a webovým serverem.

Například JavaScript v prohlížeči je schopen:

- Přidat na stránku nový HTML, změnit stávající obsah, upravit styly.
- Reagovat na akce uživatele, kliknutí myši, pohyby kurzoru, stisknutí kláves.
- Odesílat požadavky přes síť na vzdálené servery, stahovat a nahrávat soubory (tzv. [AJAX](https://cs.wikipedia.org/wiki/AJAX) a [COMET](https://en.wikipedia.org/wiki/Comet_(programming)) technologie).
- Získávat a nastavovat soubory cookie, klást návštěvníkovi dotazy, zobrazovat zprávy.
- Pamatovat si data na straně klienta („místní úložiště“).

## Co NEMŮŽE JavaScript v prohlížeči udělat?

Kvůli bezpečnosti uživatele jsou schopnosti JavaScriptu v prohlížeči omezené. Cílem je zabránit zlé webové stránce v přístupu k soukromým informacím nebo poškození dat uživatele.

Mezi příklady takových omezení patří:

- JavaScript na webové stránce nemůže číst / zapisovat libovolné soubory na pevný disk, kopírovat je nebo spouštět programy. Nemá přímý přístup k funkcím OS.

    Moderní prohlížeče umožňují práci se soubory, ale přístup je omezený a je k dispozici pouze v případě, že uživatel provede určité akce, například „přetažení“ souboru do okna prohlížeče nebo jeho výběr pomocí značky `<input>`.

    Existují způsoby, jak komunikovat s kamerou / mikrofonem a jinými zařízeními, ale vyžadují výslovné povolení uživatele. Stránka s podporou JavaScriptu tedy nemůže tajně povolit webovou kameru, sledovat okolí a odesílat informace [NSA](https://cs.wikipedia.org/wiki/N%C3%A1rodn%C3%AD_bezpe%C4%8Dnostn%C3%AD_agentura).
- Různé karty / okna o sobě obecně nevědí. Někdy ano, například když jedno okno používá JavaScript k otevření druhého. Ale i v tomto případě nemůže JavaScript z jedné stránky přistupovat na druhou, pokud pochází z různých webů (z jiné domény, protokolu nebo portu).

    Toto se nazývá „politika stejného původu“. Aby to bylo možné obejít, musí *obě stránky* souhlasit s výměnou dat a musí obsahovat speciální JavaScript kód, který je zpracovává. Pokryjeme to v tutoriálu.

    Toto omezení je opět pro bezpečnost uživatele. Stránka z `http://anysite.com`, kterou si uživatel otevřel, nesmí mít přístup na jinou záložku prohlížeče s URL `http://gmail.com` a odtamtud si odnést informace.
- JavaScript může snadno komunikovat přes síť na server, odkud pochází aktuální stránka. Ale jeho schopnost přijímat data z jiných webů / domén je omezená. I když je to možné, vyžaduje to ze vzdálené strany výslovný souhlas (vyjádřený v záhlavích HTTP). Opět je to bezpečnostní omezení.

![](limitations.svg)

Taková omezení neexistují, pokud se JavaScript používá mimo prohlížeč, například na serveru. Moderní prohlížeče také umožňují zásuvné moduly / rozšíření, které mohou vyžadovat rozšířená oprávnění.

## Čím je JavaScript jedinečný?

V JavaScriptu jsou minimálně *tři* skvělé věci:

```porovnej
+ Plná integrace s HTML / CSS.
+ Jednoduché věci se dělají jednoduše.
+ Podpora od všech hlavních prohlížečů a ve výchozím nastavení je povolen.
```
JavaScript je jediná technologie prohlížeče, která kombinuje tyto tři věci.

Díky tomu je JavaScript jedinečný. Proto je to nejrozšířenější nástroj pro vytváření rozhraní prohlížeče.

JavaScript také umožňuje vytvářet servery, mobilní aplikace atd.

## Jazyky „oproti“ JavaScriptu

Syntaxe JavaScriptu nevyhovuje potřebám každého. Různí lidé chtějí různé funkce.

To se dá očekávat, protože projekty a požadavky se u každého liší.

Nedávno se tedy objevila spousta nových jazyků, které jsou *transpilovány* (převedeny) na JavaScript před spuštěním v prohlížeči.

Díky moderním nástrojům je transpilace velmi rychlá a transparentní, což vývojářům umožňuje kódovat v jiném jazyce a automaticky jej „pod kapotou“ převádět.

Příklady takových jazyků:

- [CoffeeScript](http://coffeescript.org/) je „syntaktický cukr“ pro JavaScript. Zavádí kratší syntaxi, což nám umožňuje psát jasnější a přesnější kód. Ruby vývojářům se to obvykle líbí.
- [TypeScript](http://www.typescriptlang.org/) se soustředí na přidání „striktního silně typového systému“, aby se zjednodušil vývoj a podpora složitých systémů. Vyvinut společností Microsoft.
- [Flow](http://flow.org/) také přidává typový systém, ale jiným způsobem. Vyvinut Facebookem.
- [Dart](https://www.dartlang.org/) je samostatný jazyk, který má svůj vlastní engine, který běží mimo prohlížeč (třeba vývoj mobilní aplikace), ale lze jej také převést do JavaScriptu. Vyvinuto společností Google.
- [Brython](https://brython.info/) je překladač Pythonu do JavaScriptu, který umožňuje psát aplikace v čistém Pythonu bez JavaScriptu.

Je jich více. Samozřejmě, i když používáme jeden z transpilovaných jazyků, měli bychom také znát JavaScript, abychom skutečně pochopili, co děláme.

## Souhrn

- JavaScript byl původně vytvořen jako jazyk pouze pro prohlížeč, ale nyní se používá také v mnoha jiných prostředích.
- JavaScript má dnes jedinečné postavení jako nejrozšířenější jazyk prohlížeče s plnou integrací do HTML / CSS.
- Existuje mnoho jazyků, které jsou „převedeny“ do JavaScriptu a poskytují určité funkce. Po zvládnutí JavaScriptu je doporučeno se na ně alespoň krátce podívat.
