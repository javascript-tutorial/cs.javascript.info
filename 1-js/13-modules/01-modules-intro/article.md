
# Úvod do modulů

Když se naše aplikace rozrůstá, chceme ji rozdělit do více souborů, tzv. „modulů“. Modul může obsahovat třídu nebo knihovnu funkcí sloužící specifickému účelu.

Dlouhou dobu JavaScript existoval bez modulové syntaxe na jazykové úrovni. To nebyl problém, protože skripty byly původně malé a jednoduché, takže to nebylo zapotřebí.

Časem se však skripty stávaly stále složitějšími a složitějšími, takže komunita vynalezla rozličné způsoby, jak zorganizovat kód do modulů, speciální knihovny, které načtou moduly na požádání.

Abychom vyjmenovali některé z nich (z historických důvodů):

- [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition) -- jeden z nejstarších modulových systémů, původně implementován knihovnou [require.js](http://requirejs.org/).
- [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1) -- modulový systém vytvořený pro server Node.js.
- [UMD](https://github.com/umdjs/umd) -- další modulový systém, navržený jako univerzální, kompatibilní s AMD a CommonJS.

Nyní se všechny pomalu odebírají do dějin, ale ve starých skriptech je pořád můžeme najít.

Modulový systém na jazykové úrovni se ve standardu objevil v roce 2015, od té doby se postupně vyvíjel a nyní je podporován všemi významnými prohlížeči a v Node.js. Od nynějška tedy budeme studovat moderní JavaScriptové moduly.

## Co je modul?

Modul je prostě soubor. Jeden skript je jeden modul. Tak jednoduché to je.

Moduly se mohou navzájem načítat a používat speciální direktivy `export` a `import`, aby si vzájemně vyměňovaly funkcionalitu a jeden modul mohl volat funkce druhého:

- Klíčové slovo `export` označuje proměnné a funkce, které by měly být dostupné zvnějšku aktuálního modulu.
- Klíčové slovo `import` umožňuje import funkcionality z jiných modulů.

Například máme-li soubor `řekniAhoj.js`, který exportuje funkci:

```js
// 📁 řekniAhoj.js
export function řekniAhoj(uživatel) {
  alert(`Ahoj, ${uživatel}!`);
}
```

...Pak ji jiný soubor může importovat a používat:

```js
// 📁 main.js
import {řekniAhoj} from './řekniAhoj.js';

alert(řekniAhoj); // function...
řekniAhoj('Jan'); // Ahoj, Jan!
```

Direktiva `import` nahrává modul z cesty `./řekniAhoj.js` relativní vůči aktuálnímu souboru a přiřadí exportovanou funkci `řekniAhoj` do odpovídající proměnné.

Spusťme si tento příklad v prohlížeči.

Protože moduly podporují speciální klíčová slova a jazykové prvky, musíme prohlížeči sdělit, že se skriptem má zacházet jako s modulem, použitím atributu `<script type="module">`.

Například:

[codetabs src="say" height="140" current="index.html"]

Prohlížeč automaticky stáhne a vyhodnotí importovaný modul (a jeho importy, jsou-li zapotřebí) a pak spustí skript.

```warn header="Moduly fungují jen přes HTTP(s), ne lokálně"
Pokud se pokusíte otevřít webovou stránku lokálně protokolem `file://`, zjistíte, že direktivy `import/export` nefungují. K testování modulů používejte lokální webový server, např. [statický server](https://www.npmjs.com/package/static-server#getting-started), nebo využijte schopnost „živého serveru“ ve vašem editoru, např. VS Code [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
```

## Základní vlastnosti modulů

Čím se liší moduly od „obyčejných“ skriptů?

Mají základní vlastnosti, které platí pro JavaScript na prohlížečové i serverové straně.

### Vždy používají „use strict“

Moduly vždy fungují ve striktním režimu. Například přiřazení hodnoty nedeklarované proměnné ohlásí chybu.

```html run
<script type="module">
  a = 5; // chyba
</script>
```

### Rozsah platnosti na úrovni modulu

Každý modul má na nejvyšší úrovni svůj vlastní rozsah platnosti. Jinými slovy, proměnné a funkce na nejvyšší úrovni modulu nejsou vidět v jiných skriptech.

V níže uvedeném příkladu jsou importovány dva skripty a `hello.js` se pokusí použít proměnnou `uživatel`, deklarovanou v `user.js`. Selže to, protože to je oddělený modul (chybu uvidíte v konzoli):

[codetabs src="scopes" height="140" current="index.html"]

Moduly by měly exportovat direktivou `export` to, co chtějí zpřístupnit zvnějšku, a importovat direktivou `import` to, co potřebují.

- `user.js` by měl exportovat proměnnou `uživatel`.
- `hello.js` by ji měl importovat z modulu `user.js`.

Jinými slovy, s moduly používáme import/export místo závislosti na globálních proměnných.

Toto je správná varianta:

[codetabs src="scopes-working" height="140" current="hello.js"]

V prohlížeči, hovoříme-li o HTML stránkách, existuje nezávislý rozsah platnosti na nejvyšší úrovni také pro každý `<script type="module">` zvlášť.

Zde jsou dva skripty na stejné stránce, oba mají `type="module"`. Navzájem nevidí svoje proměnné na nejvyšší úrovni:

```html run
<script type="module">
  // Proměnná je viditelná jen v tomto modulovém skriptu
  let uživatel = "Jan";
</script>

<script type="module">
  *!*
  alert(uživatel); // Chyba: uživatel není definován
  */!*
</script>
```

```smart
V prohlížeči můžeme učinit proměnnou globální na úrovni okna tím, že ji výslovně přiřadíme do vlastnosti `window`, např. `window.uživatel = "Jan"`. 

Pak ji uvidí všechny skripty, s `type="module"` i bez něj.

Při tom všem je však vytváření takových globálních proměnných nehezké. Prosíme, snažte se tomu vyhnout.
```

### Modulový kód je vyhodnocen jen poprvé, když je importován

Je-li tentýž modul importován do více jiných modulů, jeho kód se spustí pouze jednou, při prvním importu. Pak jsou jeho exporty předány všem budoucím importérům.

Jednorázové vyhodnocení má důležité důsledky, kterých bychom si měli být vědomi.

Podívejme se na několik příkladů.

Především jestliže spuštění kódu modulu způsobí vedlejší efekty, např. zobrazení zprávy, pak se při vícenásobném importu spustí pouze jednou -- poprvé:

```js
// 📁 alert.js
alert("Modul je vyhodnocen!");
```

```js
// Importujeme stejný modul z různých souborů

// 📁 1.js
import `./alert.js`; // Modul je vyhodnocen!

// 📁 2.js
import `./alert.js`; // (nezobrazí nic)
```

Druhý import nic nezobrazí, protože modul již byl vyhodnocen.

Existuje pravidlo: kód na nejvyšší úrovni modulu by měl být použit pro inicializaci, vytvoření vnitřních datových struktur specifických pro modul. Potřebujeme-li umožnit volat něco vícekrát, měli bychom to exportovat jako funkci, tak jak jsme to udělali s výše uvedeným `řekniAhoj`.

Nyní uvažujme hlubší příklad.

Řekněme, že modul exportuje objekt:

```js
// 📁 admin.js
export let admin = {
  jméno: "Jan"
};
```

Je-li tento modul importován z více souborů, je vyhodnocen pouze poprvé, vytvoří se objekt `admin` a ten je pak předán všem dalším importérům.

Všichni importéři dostanou přesně jeden a tentýž objekt `admin`:

```js
// 📁 1.js
import {admin} from './admin.js';
admin.jméno = "Petr";

// 📁 2.js
import {admin} from './admin.js';
alert(admin.jméno); // Petr

*!*
// Jak 1.js, tak 2.js se odkazují na tentýž objekt admin
// Změny učiněné v 1.js jsou viditelné ve 2.js
*/!*
```

Jak vidíte, když `1.js` v importovaném objektu `admin` změní vlastnost `jméno`, pak `2.js` uvidí nové `admin.jméno`.

To je právě proto, že modul je spuštěn pouze jednou. Vygenerují se exporty a ty jsou pak sdíleny mezi importéry, takže jestliže něco změní objekt `admin`, ostatní importéři to uvidí.

**Takové chování je ve skutečnosti velmi užitečné, protože nám umožňuje *konfigurovat* moduly.**

Jinými slovy, modul může poskytovat generickou funkcionalitu, která potřebuje nastavení. Například autentifikace potřebuje osobní údaje. Pak může exportovat konfigurační objekt a očekávat, že do něj vnější kód něco přiřadí.

Zde je klasický vzor:
1. Modul exportuje nějaký druh konfigurace, např. konfigurační objekt.
2. Při prvním importu jej inicializujeme, zapíšeme do jeho vlastností. To může udělat skript na nejvyšší úrovni aplikace.
3. Další importy budou tento modul využívat.

Například modul `admin.js` může poskytovat určitou funkcionalitu (např. autentifikaci), ale očekává, že osobní údaje přijdou do objektu `konfigurace` zvnějšku:

```js
// 📁 admin.js
export let konfigurace = { };

export function řekniAhoj() {
  alert(`Jsem připraven posloužit, ${konfigurace.uživatel}!`);
}
```

Zde modul `admin.js` exportuje objekt `konfigurace` (na začátku je prázdný, ale může mít i nějaké defaultní vlastnosti).

Pak v `init.js`, prvním skriptu naší aplikace, z něj objekt `konfigurace` importujeme a nastavíme `konfigurace.uživatel`:

```js
// 📁 init.js
import {konfigurace} from './admin.js';
konfigurace.uživatel = "Petr";
```

...Nyní je modul `admin.js` nakonfigurován.

Další importéři jej mohou volat a modul správně zobrazí aktuálního uživatele:

```js
// 📁 jiný.js
import {řekniAhoj} from './admin.js';

řekniAhoj(); // Jsem připraven posloužit, *!*Petr*/!*!
```


### import.meta

Objekt `import.meta` obsahuje informaci o aktuálním modulu.

Jeho obsah závisí na prostředí. V prohlížeči obsahuje URL skriptu nebo URL aktuální webové stránky, je-li uvnitř HTML:

```html run height=0
<script type="module">
  alert(import.meta.url); // URL skriptu
  // pro inline skript URL aktuální HTML stránky
</script>
```

### V modulu je „this“ nedefinováno

Není to významná vlastnost, ale pro úplnost bychom ji měli uvést.

V modulu je `this` na nejvyšší úrovni nedefinované.

Porovnejme si to s nemodulovými skripty, v nichž je `this` globální objekt:

```html run height=0
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

## Vlastnosti specifické pro prohlížeče

Mezi skripty s `type="module"` a běžnými skripty existuje také několik rozdílů, které jsou specifické pro prohlížeče.

Jestliže tento článek čtete poprvé nebo jestliže nepoužíváte JavaScript v prohlížeči, můžete tuto podkapitolu prozatím přeskočit.

### Modulové skripty jsou deferované

Modulové skripty jsou *vždy* deferované. Je to stejný efekt jako u atributu `defer` (popsaného v kapitole [](info:script-async-defer)), pro externí i inline skripty.

Jinými slovy:
- stahování externích modulových skriptů `<script type="module" src="...">` neblokuje zpracování HTML, načtou se paralelně s ostatními zdroji.
- modulové skripty čekají, dokud není HTML dokument zcela připraven (i pokud jsou malé a načtou se rychleji než HTML), a až pak se spustí.
- zachovává se relativní pořadí skriptů: skripty, které jsou v dokumentu uvedeny jako první, se spustí jako první.

Vedlejším efektem je, že modulové skripty vždy „vidí“ celou načtenou HTML stránku včetně HTML prvků, které jsou až pod nimi.

Například:

```html run
<script type="module">
*!*
  alert(typeof tlačítko); // object: skript „vidí“ tlačítko níže
*/!*
  // protože moduly jsou deferované, skript se spustí až poté, co se načte celá stránka
</script>

Porovnejme si to s běžným skriptem:

<script>
*!*
  alert(typeof tlačítko); // tlačítko je undefined, protože skript nevidí prvky pod sebou
*/!*
  // běžné skripty se spustí okamžitě, ještě před zpracováním zbytku stránky
</script>

<button id="tlačítko">Tlačítko</button>
```

Prosíme všimněte si: druhý skript se ve skutečnosti spustí před prvním! Nejprve tedy uvidíme `undefined`, až pak `object`.

Je to proto, že moduly jsou deferované, takže čekají, až se zpracuje celý dokument. Běžný skript se spustí okamžitě, proto jeho výstup uvidíme jako první.

Při používání modulů bychom si měli být vědomi toho, že HTML stránka se zobrazuje průběžně, když se načítá, ale JavaScriptové moduly se spustí až potom. Uživatel tedy může vidět stránku ještě předtím, než je JavaScriptová aplikace připravena. Některá funkcionalita tedy ještě nemusí fungovat. Měli bychom tam umístit „indikátory načítání“ nebo jinak zajistit, aby to návštěvníka nezmátlo.

### Na inline skriptech funguje async

Pro nemodulové skripty funguje atribut `async` pouze na externích skriptech. Asynchronní skripty se spustí okamžitě, když jsou připraveny, nezávisle na ostatních skriptech nebo HTML dokumentu.

Pro modulové skripty funguje i na inline skriptech.

Například níže uvedený inline skript má `async`, takže nebude na nic čekat.

Provede import (stáhne si `./analytics.js`) a spustí se, jakmile bude připraven, i když HTML dokument ještě nebude dokončen nebo jiné skripty budou stále čekat na vyřízení.

To je dobré pro funkcionalitu, která na ničem nezávisí, např. čítače, reklamy, listenery událostí na dokumentové úrovni.

```html
<!-- jsou staženy všechny závislosti (analytics.js) a skript se spustí -->
<!-- nečeká na dokument nebo jiné značky <script> -->
<script *!*async*/!* type="module">
  import {counter} from './analytics.js';

  counter.count();
</script>
```

### Externí skripty

Externí skripty, které mají `type="module"`, se liší ve dvou aspektech:

1. Externí skripty se stejným `src` se spustí pouze jednou:
    ```html
    <!-- skript můj.js se načte a spustí pouze jednou -->
    <script type="module" src="můj.js"></script>
    <script type="module" src="můj.js"></script>
    ```

2. Externí skripty, které jsou staženy z jiného zdroje (např. z jiné stránky), vyžadují header [CORS](mdn:Web/HTTP/CORS), jak je popsáno v kapitole <info:fetch-crossorigin>. Jinými slovy, je-li modulový skript stažen z jiného zdroje, vzdálený server musí poskytnout header `Access-Control-Allow-Origin`, který stažení umožní.
    ```html
    <!-- jina-stranka.com musí poskytovat Access-Control-Allow-Origin -->
    <!-- jinak se skript nespustí -->
    <script type="module" src="*!*http://jina-stranka.com/jejich-modul.js*/!*"></script>
    ```

    To zajišťuje větší bezpečnost.

### „Holé“ moduly nejsou povoleny

V prohlížeči musí `import` obdržet relativní nebo absolutní URL. Moduly bez cesty se nazývají „holé“ moduly. Takové moduly nejsou v `import` povoleny.

Například tento `import` je chybný:
```js
import {řekniAhoj} from 'řekniAhoj'; // Chyba, „holý“ modul
// modul musí mít cestu, např. './řekniAhoj.js' nebo kde tento modul je
```

Určitá prostředí, např. Node.js nebo spojovací nástroje, umožňují holé moduly bez jakékoli cesty, protože mají své vlastní způsoby nalezení modulů a páky, jak je vyladit. Prohlížeče však holé moduly zatím nepodporují.

### Kompatibilita, „nomodule“

Staré prohlížeče nerozumějí `type="module"`. Skripty neznámého typu prostě ignorují. Je možné jim poskytnout nouzové řešení pomocí atributu `nomodule`:

```html run
<script type="module">
  alert("Běží v moderních prohlížečích");
</script>

<script nomodule>
  alert("Moderní prohlížeče znají type=module i nomodule, takže toto přeskočí.")
  alert("Staré prohlížeče ignorují skript s neznámým type=module, ale toto spustí.");
</script>
```

## Sestavovací nástroje

V reálném životě se prohlížečové moduly jen zřídka používají ve své „surové“ podobě. Obvykle je spojujeme dohromady *(anglicky „bundle“)* pomocí speciálního nástroje zvaného *bundler*, např. [Webpack](https://webpack.js.org/), a nahráváme na produkční server.

Jednou z výhod používání bundlerů je, že nám poskytují více kontroly nad tím, jak jsou moduly vyhodnocovány, umožňují holé moduly a mnoho dalších, např. CSS/HTML moduly.

Sestavovací nástroje provádějí následující:

1. Vezmou „hlavní“ modul, ten, který je určen k vložení do `<script type="module">` v HTML.
2. Analyzují jeho závislosti: importy, pak importy importů atd.
3. Sestaví jediný soubor se všemi moduly (nebo více souborů, to lze nastavit) a nahradí nativní volání `import` spojovacími funkcemi, takže to bude fungovat. Podporovány jsou i „speciální“ typy modulů, např. HTML/CSS.
4. V tomto procesu mohou být aplikovány i jiné transformace a optimalizace:
    - Odstranění nedosažitelného kódu.
    - Odstranění nepoužitých exportů („třesení stromem“).
    - Odstranění příkazů specifických pro vývoj, např. `console` a `debugger`.
    - Moderní syntaxe JavaScriptu může být transformována na starší s podobnou funkcionalitou pomocí [Babelu](https://babeljs.io/).
    - Výsledný soubor je minifikován (mezery odstraněny, názvy proměnných nahrazeny kratšími, atd.).
    
Používáme-li bundlery, pak když jsou skripty spojeny dohromady do jediného souboru (nebo několika málo souborů), příkazy `import/export` uvnitř těchto skriptů jsou nahrazeny speciálními spojovacími funkcemi. Výsledný „spojený“ skript tedy neobsahuje žádný `import/export`, nevyžaduje `type="module"` a můžeme jej vložit do obvyklého skriptu:

```html
<!-- Předpokládáme, že jsme z nástroje, např. Webpacku, získali bundle.js -->
<script src="bundle.js"></script>
```

Při tom všem jsou však použitelné i nativní moduly. Nebudeme tedy zde používat Webpack: můžete si jej nakonfigurovat později.

## Shrnutí

Abychom to shrnuli, základní koncepty jsou:

1. Modul je soubor. Aby fungoval `import/export`, prohlížeče potřebují `<script type="module">`. Moduly mají několik odlišností:
    - Standardně jsou deferované.
    - V inline skriptech funguje async.
    - K načtení externích skriptů z jiného zdroje (domény/protokolu/portu) jsou nezbytné headery CORS.
    - Duplikátní externí skripty jsou ignorovány.
2. Moduly mají svůj vlastní, lokální rozsah platnosti na nejvyšší úrovni a vyměňují si funkcionalitu pomocí `import/export`.
3. Moduly vždy mají `use strict`.
4. Kód modulu se spustí pouze jednou. Exporty se vytvoří jednou a jsou sdíleny mezi importéry.

Když používáme moduly, každý modul implementuje funkcionalitu a exportuje ji. Pak použijeme `import` k jejímu přímému importu tam, kde je zapotřebí. Prohlížeč tyto skripty automaticky načte a vyhodnotí.

Při produkci lidé často používají bundlery, např. [Webpack](https://webpack.js.org), ke spojení modulů dohromady kvůli zlepšení výkonnosti i z jiných důvodů.

V příští kapitole uvidíme další příklady modulů a toho, jak lze věci exportovat nebo importovat.
