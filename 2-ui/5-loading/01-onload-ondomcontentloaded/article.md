# Stránka: DOMContentLoaded, load, beforeunload, unload

Životní cyklus HTML stránky obsahuje tři důležité události:

- `DOMContentLoaded` -- prohlížeč načetl celý HTML kód a sestavil DOM strom, ale ještě se nenačetly externí zdroje, např. obrázky `<img>` nebo styly.
- `load` -- načten je nejen HTML kód, ale i všechny externí zdroje: obrázky, styly atd.
- `beforeunload/unload` -- uživatel opouští stránku.

Každá událost může být užitečná:

- událost `DOMContentLoaded` -- DOM je připraven, handler tedy může vyhledávat DOM uzly a inicializovat rozhraní.
- událost `load` -- externí zdroje jsou načteny, takže jsou aplikovány styly, jsou známy velikosti obrázků atd.
- událost `beforeunload` -- uživatel opouští stránku: můžeme ověřit, zda uživatel uložil změny, a zeptat se ho, zda chce opravdu odejít.
- událost `unload` -- uživatel již téměř odešel, ale stále můžeme spustit některé operace, například odeslat statistiku.

Prozkoumejme tyto události podrobně.

## DOMContentLoaded

Událost `DOMContentLoaded` nastává na objektu `document`.

K jejímu zachycení musíme použít `addEventListener`:

```js
document.addEventListener("DOMContentLoaded", připraven);
// ne "document.onDOMContentLoaded = ..."
```

Příklad:

```html run height=200 refresh
<script>
  function připraven() {
    alert('DOM je připraven');

    // obrázek ještě není načten (pokud nebyl v mezipaměti), takže velikost bude 0x0
    alert(`Velikost obrázku: ${obrázek.offsetWidth}x${obrázek.offsetHeight}`);
  }

*!*
  document.addEventListener("DOMContentLoaded", připraven);
*/!*
</script>

<img id="obrázek" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

V tomto příkladu se handler `DOMContentLoaded` spustí, když je dokument načten, takže vidí všechny elementy včetně `<img>` pod sebou.

Nečeká však na načtení obrázku, proto `alert` zobrazí nulovou velikost.

Na první pohled je událost `DOMContentLoaded` velmi jednoduchá. DOM strom je připraven -- událost je tady. Má však několik zvláštností.

### DOMContentLoaded a skripty

Když prohlížeč zpracovává HTML dokument a narazí na značku `<script>`, musí spustit skript dříve, než bude pokračovat ve vytváření DOMu. To je preventivní opatření, jelikož skripty mohou chtít měnit DOM a dokonce do něj zapisovat pomocí `document.write`, takže`DOMContentLoaded` musí počkat.

DOMContentLoaded se tedy spustí vždy až po takových skriptech:

```html run
<script>
  document.addEventListener("DOMContentLoaded", () => {
    alert("DOM připraven!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Knihovna načtena, inline skript spuštěn");
</script>
```

V uvedeném příkladu vidíme nejprve „Knihovna načtena...“ a až pak „DOM připraven!“ (všechny skripty byly spuštěny).

```warn header="Skripty, které neblokují DOMContentLoaded"
Z tohoto pravidla existují dvě výjimky:
1. Skripty s atributem `async`, které probereme [o něco později](info:script-async-defer), neblokují `DOMContentLoaded`.
2. Skripty, které jsou generovány dynamicky voláním `document.createElement('script')` a pak jsou přidány na webovou stránku, tuto událost také neblokují.
```

### DOMContentLoaded a styly

Externí kaskádové styly nemají na DOM žádný vliv, takže `DOMContentLoaded` na ně nečeká.

Je tady však chyták. Jestliže máme skript až za stylem, skript musí počkat, dokud se styl nenačte:

```html run
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // skript se nespustí, dokud není styl načten
  alert(getComputedStyle(document.body).marginTop);
</script>
```

Důvodem je, že skript může chtít získat souřadnice a jiné vlastnosti elementů závislé na stylu, podobně jako v uvedeném příkladu. Pochopitelně musí počkat, než se styly načtou.

Jelikož `DOMContentLoaded` čeká na skripty, bude nyní čekat i na styly před nimi.

### Automatické vyplňování zabudované v prohlížeči

Firefox, Chrome a Opera při `DOMContentLoaded` automaticky vyplňují formuláře.

Například jestliže stránka obsahuje formulář s loginem a heslem a prohlížeč si tyto hodnoty pamatuje, pak se je při `DOMContentLoaded` může pokusit automaticky vyplnit (pokud to uživatel povolil).

Jestliže je tedy `DOMContentLoaded` zdržena dlouho se načítajícími skripty, automatické vyplňování čeká také. Pravděpodobně jste to už viděli na některých stránkách (používáte-li automatické vyplňování) -- pole s loginem a heslem se nevyplnila hned, ale čekala, než se načte celá stránka. To je právě čekání na událost `DOMContentLoaded`.


## window.onload [#window-onload]

Událost `load` na objektu `window` se spustí, když je načtena celá stránka včetně stylů, obrázků a dalších zdrojů. Tato událost je k dispozici ve vlastnosti `onload`.

Následující příklad zobrazí velikost obrázku správně, protože `window.onload` čeká na načtení všech obrázků:

```html run height=200 refresh
<script>
  window.onload = function() { // můžeme také použít window.addEventListener('load', (událost) => {
    alert('Stránka načtena');

    // v této chvíli je obrázek načten
    alert(`Velikost obrázku: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

Když návštěvník opouští stránku, spustí se na `window` událost `unload`. Můžeme v ní udělat něco, co nevyžaduje prodlevu, například zavřít příslušná vyskakovací okna.

Pozoruhodnou výjimkou je posílání analytických dat.

Dejme tomu, že shromažďujeme data o tom, jak je stránka používána: kliknutí myší, rolování, zobrazené oblasti stránky a podobně.

Když nás uživatel opouští, pochopitelně nastane událost `unload` a my bychom chtěli poslat tato data na server.

Pro takové potřeby slouží speciální metoda `navigator.sendBeacon(url, data)`, popsaná ve specifikaci <https://w3c.github.io/beacon/>.

Tato metoda posílá data na pozadí. Přesun na jinou stránku se nezpozdí: prohlížeč opustí stránku, ale stále provádí `sendBeacon`.

Používá se následovně:
```js
let analytickáData = { /* objekt s nashromážděnými daty */ };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analytickáData));
});
```

- Požadavek se posílá metodou POST.
- Můžeme poslat nejenom řetězec, ale i formuláře a jiné formáty, jak je popsáno v kapitole <info:fetch>. Obvykle se však posílá objekt převedený na řetězec.
- Velikost dat je omezena na 64 KB.

Když je požadavek `sendBeacon` ukončen, prohlížeč již pravděpodobně opustil dokument, takže nemůžeme žádným způsobem získat odpověď serveru (která bývá pro analytická data obvykle prázdná).

Pro provádění podobných požadavků „po opuštění stránky“ v metodě [fetch](info:fetch) existuje v obecných síťových požadavcích také přepínač `keepalive`. Další informace o něm najdete v kapitole <info:fetch-api>.

Pokud chceme zrušit přechod na jinou stránku, tady to udělat nemůžeme. Můžeme však použít jinou událost -- `onbeforeunload`.

## window.onbeforeunload [#window.onbeforeunload]

Jestliže uživatel inicioval navigaci pryč z naší stránky nebo se pokouší zavřít okno, handler `beforeunload` se zeptá na dodatečné potvrzení.

Pokud tuto událost zrušíme, prohlížeč se může zeptat návštěvníka, zda si je jist.

Můžete si to zkusit spuštěním následujícího kódu a znovunačtením stránky:

```js run
window.onbeforeunload = function() {
  return false;
};
```

Z historických důvodů se za zrušení události považuje i vrácení neprázdného řetězce. Před určitou dobou prohlížeče tento řetězec zobrazovaly jako zprávu, ale [moderní specifikace](https://html.spec.whatwg.org/#unloading-documents) uvádí, že by to dělat neměly.

Zde je příklad:

```js run
window.onbeforeunload = function() {
  return "Na stránce jsou neuložené změny. Chcete ji opustit?";
};
```

Chování bylo změněno proto, že někteří autoři webů zneužívali handler této události k zobrazování zavádějících a otravných zpráv. V současnosti tedy staré prohlížeče mohou stále tento řetězec zobrazit jako zprávu, ale kromě toho nelze žádným způsobem změnit zprávu, která se uživateli zobrazí.

````warn header="Metoda `událost.preventDefault()` z handleru `beforeunload` nefunguje"
Může to vypadat podivně, ale většina prohlížečů `událost.preventDefault()` ignoruje.

Což znamená, že následující kód zřejmě nebude fungovat:
```js run
window.addEventListener("beforeunload", (událost) => {
  // nefunguje, takže tento handler události nic neudělá
	událost.preventDefault();
});
```

Abychom obdrželi výsledek podobný výše uvedenému kódu, měli bychom místo toho v takových handlerech nastavit `událost.returnValue` na řetězec:
```js run
window.addEventListener("beforeunload", (událost) => {
  // funguje, totéž jako vrácení z window.onbeforeunload
	událost.returnValue = "Na stránce jsou neuložené změny. Chcete ji opustit?";
});
```
````

## readyState

Co se stane, když nastavíme handler `DOMContentLoaded` až po načtení dokumentu?

Pochopitelně se nikdy nespustí.

Existují případy, kdy si nejsme jisti, zda je dokument již připraven nebo ne, ale chtěli bychom spustit naši funkci tehdy, když bude DOM načten, ať je to hned nebo později.

Aktuální stav načítání nám sděluje vlastnost `document.readyState`.

Má tři možné hodnoty:

- `"loading"` -- dokument se načítá.
- `"interactive"` -- dokument je celý načten.
- `"complete"` -- dokument je celý načten a jsou načteny i všechny jeho zdroje (např. obrázky).

Můžeme tedy zkontrolovat `document.readyState` a nastavit handler nebo spustit kód okamžitě, jakmile dokument bude připraven.

Příklad:

```js
function pracuj() { /*...*/ }

if (document.readyState == 'loading') {
  // stále se načítá, počkáme na událost
  document.addEventListener('DOMContentLoaded', pracuj);
} else {
  // DOM je připraven!
  pracuj();
}
```

Když se stav změní, spustí se událost nazvaná `readystatechange`, takže si všechny stavy můžeme nechat vypsat, například takto:

```js run
// aktuální stav
console.log(document.readyState);

// vypíšeme změnu stavu
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

Událost `readystatechange` je alternativní mechanikou, jak sledovat stav načítání dokumentu. Objevila se před dlouhou dobou a v současnosti se používá jen málokdy.

Pro úplnost se podívejme na celý tok událostí.

Zde je dokument s `<iframe>`, `<img>` a handlery, které logují události:

```html
<script>
  log('počáteční readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="https://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

Funkční příklad najdete [na pískovišti](sandbox:readystate).

Obvyklý výstup:
1. [1] počáteční readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

Čísla v hranatých závorkách udávají přibližný čas, kdy se to stane. Události se stejným číslem se stanou přibližně ve stejnou dobu (+- několik milisekund).

- `document.readyState` se změní na `interactive` těsně před `DOMContentLoaded`. Tyto dvě věci ve skutečnosti znamenají totéž.
- `document.readyState` se změní na `complete`, když jsou načteny všechny zdroje (`iframe` a `img`). Zde vidíme, že se to stane přibližně ve stejnou dobu jako `img.onload` (`img` je poslední zdroj) a `window.onload`. Přepnutí do stavu `complete` znamená totéž jako `window.onload`. Rozdíl je v tom, že `window.onload` se vždy spustí až po všech ostatních handlerech `load`.


## Shrnutí

Události při načítání stránky:

- Událost `DOMContentLoaded` se spustí na `document`, když je připraven DOM. V této chvíli můžeme na elementy aplikovat JavaScript.
  - Skripty jako `<script>...</script>` nebo `<script src="..."></script>` událost `DOMContentLoaded` blokují, prohlížeč čeká na jejich spuštění.
  - Obrázky a další zdroje se mohou stále ještě načítat.
- Událost `load` na `window` se spustí, když je načtena celá stránka a všechny zdroje. Používáme ji zřídka, jelikož zpravidla nemáme důvod čekat tak dlouho.
- Událost `beforeunload` na `window` se spustí, když uživatel chce opustit stránku. Pokud ji zrušíme, prohlížeč se zeptá, zda uživatel opravdu chce odejít (např. má neuložené změny).
- Událost `unload` na `window` se spustí, když uživatel skutečně odchází. V jejím handleru můžeme provádět jen jednoduché věci, které nevyžadují prodlevu nebo dotaz na uživatele. Kvůli tomuto omezení se používá zřídkakdy. Můžeme poslat síťový požadavek voláním `navigator.sendBeacon`.
- `document.readyState` je aktuální stav dokumentu, jeho změny můžeme sledovat v události `readystatechange`:
  - `loading` -- dokument se načítá.
  - `interactive` -- dokument je zpracován, spustí se přibližně současně jako `DOMContentLoaded`, ale před ní.
  - `complete` -- dokument a jeho zdroje jsou načteny, spustí se přibližně současně jako `window.onload`, ale před ní.