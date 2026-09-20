# Komunikace mezi okny

Vzájemný přístup mezi okny a rámy omezuje politika „stejného původu“ (stejného sídla).

Myšlenkou je, že když má uživatel otevřené dvě stránky, jednu z `john-smith.com` a druhá je `gmail.com`, pak nechce, aby skript z `john-smith.com` mohl přečíst mail z `gmail.com`. Účelem politiky „stejného původu“ je tedy chránit uživatele před krádeží informací.

## Stejný původ [#same-origin]

O dvou URL říkáme, že mají „stejný původ“, jestliže mají stejný protokol, doménu a port.

Všechna následující URL mají stejný původ:

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

Následující nemají stejný původ jako předchozí:

- <code>http://<b>www.</b>site.com</code> (jiná doména: `www.` vadí)
- <code>http://<b>site.org</b></code> (jiná doména: `.org` vadí)
- <code><b>https://</b>site.com</code> (jiný protokol: `https`)
- <code>http://site.com:<b>8080</b></code> (jiný port: `8080`)

Politika „stejného původu“ říká, že:

- jestliže máme odkaz na jiné okno, např. vyskakovací okno vytvořené pomocí `window.open` nebo okno uvnitř `<iframe>`, a toto okno pochází ze stejného původu, máme k tomuto oknu plný přístup;
- v opačném případě, když pochází z jiného původu, nemůžeme přistupovat k jeho obsahu: k proměnným, k dokumentu, zkrátka k ničemu. Jedinou výjimkou je `location`: tu můžeme změnit (a tedy přesměrovat uživatele). Nemůžeme však lokaci *načíst* (takže nevidíme, kde se uživatel právě nachází, aby nedošlo k úniku informací).

### V akci: iframe

Značka `<iframe>` obsahuje oddělené vnořené okno s jeho vlastními oddělenými objekty `document` a `window`.

Můžeme k nim přistupovat pomocí těchto vlastností:

- `iframe.contentWindow` vrátí okno uvnitř `<iframe>`.
- `iframe.contentDocument` vrátí dokument uvnitř `<iframe>`, je to zkratka pro `iframe.contentWindow.document`.

Když přistoupíme k něčemu uvnitř vnořeného okna, prohlížeč prověří, zda vnitřní rám má stejný původ. Pokud ne, nebude přístup povolen (výjimkou je zápis do `location`, který bude stále povolen).

Například zkusme číst a psát do `<iframe>` jiného původu:

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // můžeme získat odkaz na vnitřní okno
*!*
    let vnitřníOkno = iframe.contentWindow; // OK
*/!*
    try {
      // ...ale ne na dokument uvnitř
*!*
      let doc = iframe.contentDocument; // CHYBA
*/!*
    } catch(e) {
      alert(e); // Security Error (jiný původ)
    }

    // nemůžeme ani NAČÍST URL stránky ve vnitřním rámu
    try {
      // nelze načíst URL z objektu Location
*!*
      let href = iframe.contentWindow.location.href; // CHYBA
*/!*
    } catch(e) {
      alert(e); // Security Error
    }

    // ...můžeme ZAPSAT do lokace (a tím načíst do vnitřního rámu něco jiného)!
*!*
    iframe.contentWindow.location = '/'; // OK
*/!*

    iframe.onload = null; // smažeme handler, aby se nespustil po změně lokace
  };
</script>
```

Uvedený kód zobrazí chyby pro všechny operace kromě:

- Získání odkazu na vnitřní okno `iframe.contentWindow` - to je dovoleno.
- Zápisu do `location`.

Naproti tomu jestliže má `<iframe>` stejný původ, můžeme s ním provádět cokoli:

```html run
<!-- iframe ze stejného sídla -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // můžeme dělat cokoli
    iframe.contentDocument.body.prepend("Ahoj, světe!");
  };
</script>
```

```smart header="`iframe.onload` oproti `iframe.contentWindow.onload`"
Událost `iframe.onload` (na značce `<iframe>`) je v zásadě totéž jako `iframe.contentWindow.onload` (na objektu vnořeného okna). Spustí se, když se vnořené okno kompletně načte i se všemi zdroji.

...Nemůžeme však přistupovat k `iframe.contentWindow.onload` pro vnitřní rám jiného původu, proto používáme `iframe.onload`.
```

## Okna na subdoméně: document.domain

Podle definice mají dvě URL s různými doménami různé původy.

Jestliže však dvě okna mají stejnou doménu druhého řádu, například `jan.site.com`, `petr.site.com` a `site.com` (takže jejich společná doména druhého řádu je `site.com`), můžeme přimět prohlížeč, aby tento rozdíl ignoroval, takže s nimi pro účely meziokenní komunikace můžeme zacházet, jako by pocházely ze „stejného původu“.

Aby to fungovalo, mělo by každé takové okno spustit tento kód:

```js
document.domain = 'site.com';
```

To je vše. Nyní spolu mohou komunikovat bez omezení. Opakujeme, že to je možné jen u stránek se stejnou doménou druhého řádu.

```warn header="Zastaralá, ale stále funguje"
Vlastnost `document.domain` podstupuje odstraňování ze [specifikace](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction). Doporučenou náhradou je meziokenní posílání zpráv (brzy bude vysvětleno).

Přesto ji v současnosti všechny prohlížeče stále podporují. A tato podpora zůstane zachována i v budoucnu, aby se nerozbil starý kód, který se spoléhá na `document.domain`.
```


## Vnitřní rám: záludnost s nesprávným dokumentem

Když vnitřní rám pochází ze stejného původu a my můžeme přistupovat k jeho `document`, je tady jedna záludnost. Nevztahuje se k záležitostem ohledně stejného původu, ale je důležité o ní vědět.

Vnitřní rám má dokument ihned po svém vytvoření. Ale tento dokument se liší od dokumentu, do něhož se načte!

Jestliže tedy s tímto dokumentem něco okamžitě provedeme, bude to pravděpodobně ztraceno.

Podívejte se zde:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let starýDokument = iframe.contentDocument;
  iframe.onload = function() {
    let novýDokument = iframe.contentDocument;
*!*
    // načtený dokument není stejný jako původní!
    alert(starýDokument == novýDokument); // false
*/!*
  };
</script>
```

Neměli bychom pracovat s dokumentem rámu, který ještě nebyl načten, protože to je *nesprávný dokument*. Jestliže na něm nastavíme handlery událostí, budou ignorovány.

Jak zjistit okamžik, kdy je dokument na místě?

Správný dokument je zaručeně na místě, když se spustí `iframe.onload`. Tato událost se však spustí až tehdy, když je načten celý vnitřní rám se všemi zdroji.

Můžeme se pokusit zachytit příslušný okamžik dříve ověřováním v `setInterval`:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let starýDokument = iframe.contentDocument;

  // každých 100 ms zkontrolujeme, zda je dokument nový
  let časovač = setInterval(() => {
    let novýDokument = iframe.contentDocument;
    if (novýDokument == starýDokument) return;

    alert("Nový dokument je tady!");

    clearInterval(časovač); // zrušíme setInterval, už ho nepotřebujeme
  }, 100);
</script>
```

## Kolekce: window.frames

Alternativním způsobem, jak získat objekt okna pro `<iframe>`, je získat ho z jmenné kolekce `window.frames`:

- Podle čísla: `window.frames[0]` -- objekt okna pro první rám v dokumentu.
- Podle názvu: `window.frames.názevRámu` -- objekt okna pro rám obsahující `name="názevRámu"`.

Příklad:

```html run
<iframe src="/" style="height:80px" name="okno" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.okno); // true
</script>
```

Vnitřní rám může uvnitř obsahovat jiné rámy. Příslušné objekty `window` pak tvoří hierarchii.

Navigační odkazy jsou:

- `window.frames` -- kolekce „dětských“ oken (pro vnořené rámy).
- `window.parent` -- odkaz na „rodičovské“ (vnější) okno.
- `window.top` -- odkaz na nejvyšší rodičovské okno.

Příklad:

```js run
window.frames[0].parent === window; // true
```

Pomocí vlastnosti `top` můžeme zjistit, zda je aktuální dokument otevřen uvnitř rámu nebo ne:

```js run
if (window == top) { // aktuální okno == window.top?
  alert('Skript je v nejvyšším okně, ne v rámu');
} else {
  alert('Skript běží v rámu!');
}
```

## Atribut „sandbox“ vnitřního rámu

Atribut `sandbox` (pískoviště) nám umožní zakázat uvnitř `<iframe>` určité akce, aby zabránil spuštění nevěrohodného kódu. Vytvoří tedy z vnitřního rámu „pískoviště“, s nímž se bude zacházet, jako by pocházelo z jiného původu, a/nebo s určitými dalšími omezeními.

Na `<iframe sandbox src="...">` se aplikuje „standardní sada“ omezení. Tu však můžeme zmírnit, pokud do hodnoty tohoto atributu uvedeme seznam omezení oddělených mezerami, která by se neměla aplikovat, například: `<iframe sandbox="allow-forms allow-popups">`.

Jinými slovy, prázdný atribut `"sandbox"` vytvoří nejpřísnější možná omezení, ale můžeme uvést mezerami oddělený seznam těch, která nechceme použít.

Seznam omezení je následující:

`allow-same-origin`
: Standardně `"sandbox"` vynucuje pro vnitřní rám politiku „jiného původu“. Jinými slovy, nutí prohlížeč zacházet s tímto `iframe`, jako by pocházel z jiného původu, i když jeho `src` ukazuje na stejné sídlo, se všemi omezeními pro skripty, která z toho vyplývají. Tato volba toto chování ruší.

`allow-top-navigation`
: Umožňuje tomuto `iframe` změnit `parent.location`.

`allow-forms`
: Umožňuje z tohoto `iframe` posílat formuláře.

`allow-scripts`
: Umožňuje z tohoto `iframe` spouštět skripty.

`allow-popups`
: Umožňuje z tohoto `iframe` otevírat vyskakovací okna pomocí `window.open`.

Další omezení najdete v [manuálu](mdn:/HTML/Element/iframe).

Následující příklad demonstruje vnitřní rám jako pískoviště se standardní sadou omezení: `<iframe sandbox src="...">`. Rám obsahuje krátký JavaScriptový kód a formulář.

Prosíme všimněte si, že v něm nic nefunguje. Standardní sada omezení je tedy opravdu přísná:

[codetabs src="sandbox" height=140]


```smart
Účelem atributu `"sandbox"` je výhradně *přidat další* omezení. Nemůže je odstranit. Konkrétně nedokáže zmírnit omezení stejného původu, pokud rám pochází z jiného původu.
```

## Posílání zpráv mezi okny

Rozhraní `postMessage` umožňuje oknům, aby spolu navzájem hovořila, a to bez ohledu na jejich původ.

Je to tedy způsob, jak obejít politiku „stejného původu“. Umožňuje oknu z `john-smith.com` komunikovat s `gmail.com` a vyměňovat si s ním informace, ale jen tehdy, pokud obě okna souhlasí a volají příslušné JavaScriptové funkce. Tím je to bezpečné pro uživatele.

Rozhraní se skládá ze dvou částí.

### postMessage

Okno, které chce poslat zprávu, zavolá na přijímajícím okně metodu [postMessage](mdn:api/Window.postMessage). Jinými slovy, chceme-li poslat zprávu oknu `okno`, měli bychom volat `okno.postMessage(data, původCíle)`.

Argumenty:

`data`
: Data k odeslání. Může to být libovolný objekt, data budou naklonována „algoritmem strukturované serializace“. IE podporuje pouze řetězce, takže pokud chceme tento prohlížeč podporovat, měli bychom na složitých objektech volat `JSON.stringify`.

`původCíle`
: Specifikuje původ cílového okna, takže zprávu získá pouze okno se zadaným původem.

Argument `původCíle` je bezpečnostní opatření. Nezapomeňte, že jestliže cílové okno pochází z jiného původu, nemůžeme v odesílajícím okně načíst jeho `location`. Nemůžeme tedy s jistotou vědět, jaká stránka je v cílovém okně právě otevřená: uživatel se mohl přesunout jinam a odesílající okno o tom nemá ponětí.

Specifikace `původCíle` zaručuje, že okno získá data jen tehdy, je-li stále na správné stránce. To je důležité, když jsou data důvěrná.

Například zde `okno` získá zprávu jen tehdy, pokud obsahuje dokument z původu `http://example.com`:

```html no-beautify
<iframe src="http://example.com" name="příklad">

<script>
  let okno = window.frames.příklad;

  okno.postMessage("zpráva", "http://example.com");
</script>
```

Pokud si tuto kontrolu nepřejeme, můžeme nastavit `původCíle` na `*`.

```html no-beautify
<iframe src="http://example.com" name="příklad">

<script>
  let okno = window.frames.příklad;

*!*
  okno.postMessage("zpráva", "*");
*/!*
</script>
```


### onmessage

Aby cílové okno zprávu obdrželo, mělo by mít handler události `message`. Ten se spustí, když je volána `postMessage` (a kontrola `původCíle` je úspěšná).

Objekt této události má speciální vlastnosti:

`data`
: Data z `postMessage`.

`origin`
: Původ odesílatele, například `http://javascript.info`.

`source`
: Odkaz na odesílající okno. Pokud chceme, můžeme okamžitě poslat zprávu zpět voláním `source.postMessage(...)`.

Tento handler bychom měli přiřadit metodou `addEventListener`, krátká syntaxe `window.onmessage` nefunguje.

Příklad:

```js
window.addEventListener("zpráva", function(událost) {
  if (událost.origin != 'http://javascript.info') {
    // něco z neznámé domény, ignorujme to
    return;
  }

  alert( "obdrženo: " + událost.data );

  // můžeme poslat zprávu zpět voláním událost.source.postMessage(...)
});
```

Celý příklad:

[codetabs src="postmessage" height=120]

## Shrnutí

Abychom mohli volat metody jiného okna a přistupovat k jeho obsahu, měli bychom na něj nejprve mít odkaz.

Pro vyskakovací okna máme tyto odkazy:
- Z otevírajícího okna: `window.open` -- otevře nové okno a vrátí odkaz na ně.
- Z vyskakovacího okna: `window.opener` -- ve vyskakovacím okně odkaz na otevírající.

U vnitřních rámů můžeme přistupovat k rodičovským/dětským oknům pomocí:
- `window.frames` -- kolekce objektů vnořených oken,
- `window.parent`, `window.top` jsou odkazy na rodičovské a nejvyšší okno,
- `iframe.contentWindow` je okno uvnitř značky `<iframe>`.

Jestliže okna mají stejný původ (doména, port, protokol), mohou navzájem jedno s druhým dělat, co chtějí.

Jinak jsou možné jen následující akce:
- Změnit `location` druhého okna (přístup jen pro zápis).
- Poslat druhému oknu zprávu.

Výjimky jsou:
- Okna, která mají stejnou doménu druhého řádu: `a.site.com` a `b.site.com`. Pak je nastavení `document.domain='site.com'` v obou oknech uvede do stavu „stejného původu“.
- Jestliže vnitřní rám má atribut `sandbox`, je nuceně uveden do stavu „jiného původu“, pokud v hodnotě atributu není uvedeno `allow-same-origin`. To lze použít ke spuštění nevěrohodného kódu ve vnitřních rámech ze stejného sídla.

Rozhraní `postMessage` umožňuje vzájemný hovor mezi dvěma okny jakýchkoli původů:

1. Odesílatel zavolá `cílovéOkno.postMessage(data, původCíle)`.
2. Pokud `původCíle` není `'*'`, prohlížeč ověří, zda okno `cílovéOkno` má původ `původCíle`.
3. Pokud ano, pak `cílovéOkno` spustí událost `message` se speciálními vlastnostmi:
    - `origin` -- původ odesílajícího okna (např. `http://my.site.com`).
    - `source` -- odkaz na odesílající okno.
    - `data` -- data, libovolný objekt kdekoli kromě IE, který podporuje pouze řetězce.

    K nastavení handleru této události v cílovém okně bychom měli použít `addEventListener`.