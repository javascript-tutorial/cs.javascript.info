# Vyskakovací okna a metody oken

Vyskakovací okno (popup) je jeden z nejstarších způsobů, jak zobrazit uživateli další dokument.

V zásadě jenom zavoláte:
```js
window.open('https://javascript.info/')
```

...A tím se otevře nové okno se zadanou URL. Většina moderních prohlížečů je konfigurována tak, aby otevřela URL v nové záložce a ne v samostatném okně.

Vyskakovací okna existují už opravdu dlouhou dobu. Původní myšlenkou bylo zobrazit další obsah bez nutnosti zavřít hlavní okno. V současnosti jsou jiné způsoby, jak to udělat: můžeme načíst obsah dynamicky pomocí [fetch](info:fetch) a zobrazit jej v dynamicky generovaném `<div>`. Vyskakovací okna tedy nejsou něco, co bychom používali každý den.

Vyskakovací okna jsou navíc problematická na mobilních zařízeních, která nezobrazují více oken současně.

Stále však existují úlohy, v nichž se vyskakovací okna dosud používají, např. pro autorizaci OAuth (přihlášení s Googlem/Facebookem/...), protože:

1. Vyskakovací okno je oddělené okno, které má své vlastní nezávislé JavaScriptové prostředí. Otevření vyskakovacího okna od třetí strany z neprověřené stránky je tedy bezpečné.
2. Otevřít vyskakovací okno je velmi jednoduché.
3. Ve vyskakovacím okně je možné navigovat (měnit URL) a posílat zprávy oknu, které je otevřelo.

## Blokování vyskakovacích oken

V minulosti zlomyslné stránky vyskakovací okna hojně zneužívaly. Špatná stránka mohla otevřít hromadu vyskakovacích oken s reklamami. Nyní se tedy většina prohlížečů snaží chránit uživatele a vyskakovací okna blokovat.

**Většina prohlížečů blokuje vyskakovací okna, pokud jsou volána jinde než v uživatelsky spuštěných handlerech událostí, například `onclick`.**

Příklad:
```js
// vyskakovací okno blokováno
window.open('https://javascript.info');

// vyskakovací okno povoleno
button.onclick = () => {
  window.open('https://javascript.info');
};
```

Tímto způsobem jsou uživatelé do určité míry chráněni před nechtěnými vyskakovacími okny, ale přitom tato funkcionalita není zcela potlačena.

## window.open

Syntaxe pro otevření vyskakovacího okna je: `window.open(url, název, parametry)`:

url
: URL k načtení do nového okna.

název
: Název nového okna. Každé okno má název ve vlastnosti `window.name` a zde můžeme specifikovat, které okno máme použít. Pokud už existuje okno s uvedeným názvem, zadané URL se otevře v něm. V opačném případě se otevře nové okno.

parametry
: Konfigurační řetězec pro nové okno. Obsahuje nastavení, oddělená čárkou. V parametrech nesmějí být mezery, například: `width=200,height=100`.

Nastavení v `parametry`:

- Umístění:
  - `left/top` (čísla) -- souřadnice levého horního rohu okna na obrazovce. Je tady omezení: nové okno nemůže být umístěno mimo obrazovku.
  - `width/height` (čísla) -- šířka a výška nového okna. Minimální šířka a výška je omezena, takže není možné vytvořit neviditelné okno.
- Vlastnosti okna:
  - `menubar` (yes/no) -- zobrazí nebo skryje v novém okně menu prohlížeče.
  - `toolbar` (yes/no) -- zobrazí nebo skryje v novém okně navigační lištu prohlížeče (tlačítka Zpět, Dopředu, Aktualizovat atd.).
  - `location` (yes/no) -- zobrazí nebo skryje v novém okně pole s URL. FF a IE je standardně neumožňují skrýt.
  - `status` (yes/no) -- zobrazí nebo skryje stavovou lištu. I tu většina prohlížečů vždy zobrazí.
  - `resizable` (yes/no) -- umožňuje zakázat změnu velikosti nového okna. Nedoporučuje se používat.
  - `scrollbars` (yes/no) -- umožňuje zakázat posuvníky v novém okně. Nedoporučuje se používat.

Existuje i několik méně podporovaných vlastností specifických pro jednotlivé prohlížeče, které se obvykle nepoužívají. Příklady naleznete na <a href="https://developer.mozilla.org/en/DOM/window.open">window.open v MDN</a>.

## Příklad: minimalistické okno

Otevřeme okno s minimální sadou vlastností, jen abychom viděli, které z nich prohlížeč umožňuje zakázat:

```js run
let parametry = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', parametry);
```

Zde je většina „vlastností okna“ zakázána a okno je umístěno mimo obrazovku. Spusťte si tento příklad a uvidíte, co se doopravdy stane. Většina prohlížečů „opraví“ podivnosti jako nulovou `width/height` a `left/top` mimo obrazovku. Například Chrome otevře takové okno v plné šířce a výšce, takže bude roztaženo přes celou obrazovku.

Přidejme normální možnosti pro umístění a rozumné souřadnice `width`, `height`, `left`, `top`:

```js run
let parametry = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', parametry);
```

Většina prohlížečů zobrazí uvedený příklad tak, jak požadujeme.

Pravidla pro neuvedená nastavení:

- Pokud ve volání `open` není uveden 3. argument nebo je prázdný, pak se použijí standardní okenní parametry.
- Pokud v něm je řetězec parametrů, ale nejsou uvedeny některé vlastnosti typu `yes/no`, pak se předpokládá, že neuvedené vlastnosti mají hodnotu `no`. Když tedy specifikujete parametry, ujistěte se, že jste všechny požadované vlastnosti výslovně nastavili na `yes`.
- Pokud není uvedeno `left/top`, pak se prohlížeč pokusí otevřít nové okno poblíž naposledy otevřeného okna.
- Pokud není uvedeno `width/height`, pak bude nové okno mít stejnou velikost jako poslední otevřené.

## Přístup do vyskakovacího okna z hlavního okna

Volání `open` vrátí odkaz na nové okno, který můžeme použít k manipulaci s jeho vlastnostmi, změně umístění a dalším věcem.

V tomto příkladu generujeme obsah vyskakovacího okna v JavaScriptu:

```js
let novéOkno = window.open("about:blank", "ahoj", "width=200,height=200");

novéOkno.document.write("Ahoj, světe!");
```

A zde změníme obsah po načtení:

```js run
let novéOkno = open('/', 'příklad', 'width=300,height=300')
novéOkno.focus();

alert(novéOkno.location.href); // (*) about:blank, načítání ještě nezačalo

novéOkno.onload = function() {
  let html = `<div style="font-size:30px">Vítejte!</div>`;
*!*
  novéOkno.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

Prosíme všimněte si, že nové okno není načteno okamžitě po `window.open`. To ukazuje `alert` na řádku `(*)`. S jeho modifikací tedy počkáme na `onload`. Můžeme také použít handler `DOMContentLoaded` pro `novéOkno.document`.

```warn header="Politika stejného původu"
Okna mohou navzájem volně přistupovat ke svým obsahům jen tehdy, pokud pocházejí ze stejného původu (stejný protokol://doména:port).

V jiných případech, např. pokud hlavní okno je ze `site.com` a vyskakovací z `gmail.com`, to z důvodu bezpečnosti uživatele není možné. Podrobnosti najdete v kapitole <info:cross-window-communication>.
```

## Přístup do hlavního okna z vyskakovacího okna

Obdobně může vyskakovací okno přistupovat k „otevírajícímu“ pomocí odkazu `window.opener`. Ten je `null` ve všech oknech kromě vyskakovacích.

Pokud si spustíte následující kód, nahradí obsah otevírajícího (aktuálního) okna za „Test“:

```js run
let novéOkno = window.open("about:blank", "ahoj", "width=200,height=200");

novéOkno.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

Spojení mezi okny je tedy obousměrné: hlavní okno a vyskakovací okno mají odkazy na sebe navzájem.

## Zavření vyskakovacího okna

Zavření okna: `okno.close()`.

Ověření, zda je okno zavřeno: `okno.closed`.

Technicky je metoda `close()` k dispozici pro každé `window`, ale pokud `window` není vytvořeno voláním `window.open()`, většina prohlížečů `window.close()` ignoruje. Funguje tedy jedině na vyskakovacích oknech.

Pokud je okno zavřeno, vlastnost `closed` je `true`. To je užitečné pro ověření, zda je vyskakovací (nebo hlavní) okno stále otevřené nebo ne. Uživatel je může kdykoli zavřít a náš kód by měl tuto možnost brát v úvahu.

Tento kód načte a pak zavře okno:

```js run
let novéOkno = open('/', 'příklad', 'width=300,height=300');

novéOkno.onload = function() {
  novéOkno.close();
  alert(novéOkno.closed); // true
};
```


## Přesun a změna velikosti

K přesunu nebo změně velikosti okna slouží následující metody:

`okno.moveBy(x,y)`
: Přesune okno relativně k aktuální pozici o `x` pixelů doprava a `y` pixelů dolů. Záporné hodnoty jsou povoleny (způsobí přesun doleva/nahoru).

`okno.moveTo(x,y)`
: Přesune okno na souřadnice `(x,y)` na obrazovce.

`okno.resizeBy(šířka,výška)`
: Změní velikost okna o zadanou hodnotu `šířka/výška` vzhledem k aktuální velikosti. Záporné hodnoty jsou povoleny.

`okno.resizeTo(šířka,výška)`
: Změní velikost okna na zadanou hodnotu.

Existuje i událost `okno.onresize`.

```warn header="Jen pro vyskakovací okna"
Aby prohlížeč zabránil zneužití, obvykle tyto metody blokuje. Spolehlivě fungují jen na vyskakovacích oknech, která jsme otevřeli a která nemají žádné další záložky.
```

```warn header="Není zde minimalizace ani maximalizace"
JavaScript nemá žádný způsob, jak minimalizovat nebo maximalizovat okno. Tyto funkce na úrovni operačního systému jsou před vývojáři předních stran ukryty.

Metody pro přesun a změnu velikosti na minimalizovaných a maximalizovaných oknech nefungují.
```

## Rolování okna

O rolování okna jsme již hovořili v kapitole <info:size-and-scroll-window>.

`okno.scrollBy(x,y)`
: Roluje okno o `x` pixelů doprava a `y` dolů relativně vzhledem k aktuálnímu rolování. Záporné hodnoty jsou povoleny.

`okno.scrollTo(x,y)`
: Roluje okno na zadané souřadnice `(x,y)`.

`element.scrollIntoView(nahoře = true)`
: Roluje okno tak, aby se `element` zobrazil nahoře (standardně) anebo při `element.scrollIntoView(false)` dole.

Existuje i událost `okno.onscroll`.

## Získání a ztráta fokusu na okně

Teoreticky existují metody `okno.focus()` a `okno.blur()`, které způsobí, že okno získá/ztratí fokus. A existují také události `focus/blur`, které umožňují zachytit okamžik, kdy návštěvník vstoupí do okna nebo se přepne jinam.

V praxi jsou však do značné míry omezené, jelikož v minulosti je zlomyslné stránky zneužívaly.

Podívejte se například na tento kód:

```js run
window.onblur = () => window.focus();
```

Když se uživatel pokusí přepnout se mimo okno (`window.onblur`), kód vrátí oknu fokus. Jeho záměrem je „uzamknout“ uživatele uvnitř `window`.

Prohlížeče tedy musely zavést mnohá omezení, aby takový kód zakázaly a chránily uživatele před reklamami a zlomyslnými stránkami. Konkrétní omezení závisejí na prohlížeči.

Například prohlížeč na mobilech obvykle `window.focus()` zcela ignoruje. Získání fokusu nefunguje ani tehdy, když se vyskakovací okno otevře v samostatné záložce a nikoli v novém okně.

Stále však existují případy použití, kdy taková volání fungují a mohou být užitečná.

Například:

- Když otevřeme vyskakovací okno, může být dobrý nápad spustit na něm `novéOkno.focus()`. Jen pro případ, kdy to na některých kombinacích OS/prohlížeče zajistí, že uživatel pak bude v novém okně.
- Jestliže chceme sledovat, kdy návštěvník opravdu využívá naši webovou aplikaci, můžeme sledovat `window.onfocus/onblur`. To nám umožní pozastavit/obnovit aktivity na stránce, animace a podobně. Nicméně prosíme, všimněte si, že událost `blur` znamená, že se uživatel přepnul z okna jinam, ale stále může okno pozorovat. Okno je v pozadí, ale pořád může být viditelné.

## Shrnutí

Vyskakovací okna se používají jen zřídka, protože k nim existují alternativy: načíst a zobrazit informace na stránce nebo ve vnitřním rámu.

Pokud se chystáme otevřít vyskakovací okno, je dobrým zvykem o tom uživatele informovat. Ikona „otevření okna“ vedle odkazu nebo tlačítka umožní návštěvníkovi vydržet změnu fokusu a mít obě okna na paměti.

- Vyskakovací okno lze otevřít voláním `open(url, název, parametry)`, které vrátí odkaz na nově otevřené okno.
- Prohlížeče blokují volání `open` z kódu odjinud než z uživatelských akcí. Zpravidla se objeví oznámení, takže to uživatel může povolit.
- Prohlížeče standardně otevírají novou záložku, ale pokud je uvedena velikost, otevře se nové vyskakovací okno.
- Vyskakovací okno může přistupovat k otevírajícímu oknu pomocí vlastnosti `window.opener`.
- Hlavní okno a vyskakovací okno se mohou navzájem volně číst a modifikovat, jestliže mají stejný původ. V opačném případě si mohou navzájem měnit lokaci a [vyměňovat zprávy](info:cross-window-communication).

Vyskakovací okno uzavřete voláním `close()`. Může je zavřít i uživatel (stejně jako každé jiné okno). Vlastnost `okno.closed` má pak hodnotu `true`.

- Metody `focus()` a `blur()` umožňují oknu získat/ztratit fokus. Nefungují však všude.
- Události `focus` a `blur` umožňují sledovat přepnutí do a z okna. Všimněte si však, že okno může být stále vidět, i když je po `blur` na pozadí.
