# Časování: setTimeout a setInterval

Můžeme se rozhodnout, že funkci nespustíme právě teď, ale až za nějakou dobu. To se nazývá „časování volání“.

K tomu existují dvě metody:

- `setTimeout` nám umožňuje spustit funkci jednou po uplynutí zadaného časového intervalu.
- `setInterval` nám umožňuje spouštět funkci opakovaně, nejprve po uplynutí zadaného časového intervalu a pak ji neustále v tomto intervalu opakovat.

Tyto metody nejsou součástí specifikace JavaScriptu, ale většina prostředí obsahuje interní plánovač a tyto metody poskytuje. Konkrétně jsou podporovány ve všech prohlížečích a v Node.js.

## setTimeout

Syntaxe:

```js
let idČasovače = setTimeout(funkce|kód, [prodleva], [arg1], [arg2], ...)
```

Parametry:

`funkce|kód`
: Funkce nebo řetězec kódu, který se má spustit.
Obvykle to bývá funkce. Z historických důvodů lze předat i řetězec kódu, ale to se nedoporučuje.

`prodleva`
: Prodleva před spuštěním v milisekundách (1000 ms = 1 sekunda), defaultně 0.

`arg1`, `arg2`...
: Argumenty této funkce (není podporováno v IE9-).

Například tento kód zavolá `řekniAhoj()` po uplynutí jedné sekundy:

```js run
function řekniAhoj() {
  alert('Ahoj');
}

*!*
setTimeout(řekniAhoj, 1000);
*/!*
```

S argumenty:

```js run
function řekniAhoj(věta, kdo) {
  alert( věta + ', ' + kdo );
}

*!*
setTimeout(řekniAhoj, 1000, "Ahoj", "Jan"); // Ahoj, Jan
*/!*
```

Je-li první argument řetězec, pak z něj JavaScript vytvoří funkci.

Tohle tedy bude fungovat také:

```js run no-beautify
setTimeout("alert('Ahoj')", 1000);
```

Používání řetězců se však nedoporučuje, místo nich používejte šipkové funkce, například takto:

```js run no-beautify
setTimeout(() => alert('Ahoj'), 1000);
```

````smart header="Předejte funkci, ale nevolejte ji"
Začínající vývojáři někdy dělají chybu v tom, že za funkci přidají závorky `()`:

```js
// špatně!
setTimeout(řekniAhoj(), 1000);
```
To nefunguje, protože `setTimeout` očekává odkaz na funkci. A zde `řekniAhoj()` zavolá funkci a funkci `setTimeout` se předá *výsledek jejího volání*. V našem případě je výsledek `řekniAhoj` `undefined` (funkce nic nevrací), takže se nic nenačasuje.
````

### Zrušení pomocí clearTimeout

Volání `setTimeout` vrátí „identifikátor časovače“ `idČasovače`, který můžeme použít ke zrušení spuštění.

Syntaxe zrušení:

```js
let idČasovače = setTimeout(...);
clearTimeout(idČasovače);
```

V níže uvedeném kódu načasujeme funkci a pak ji zrušíme (rozmysleli jsme si to). Výsledkem bude, že se nic nestane:

```js run no-beautify
let idČasovače = setTimeout(() => alert("tohle se nikdy nestane"), 1000);
alert(idČasovače); // identifikátor časovače

clearTimeout(idČasovače);
alert(idČasovače); // stejný identifikátor (po zrušení se nevynuloval)
```

Jak vidíme z výstupu `alert`, v prohlížeči je identifikátorem časovače číslo. V jiných prostředích to může být něco jiného, například Node.js vrací objekt časovače s dalšími metodami.

Opakujeme, že pro tyto metody neexistuje žádná univerzální specifikace, takže je to v pořádku.

Pro prohlížeče jsou časovače popsány v [sekci časovačů](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) HTML Living Standardu.

## setInterval

Metoda `setInterval` má stejnou syntaxi jako `setTimeout`:

```js
let idČasovače = setInterval(funkce|kód, [prodleva], [arg1], [arg2], ...)
```

Všechny argumenty mají stejný význam. Na rozdíl od `setTimeout` však bude funkce spuštěna nejenom jednou, ale pravidelně vždy po zadaném časovém intervalu.

Chceme-li zastavit další volání, měli bychom zavolat `clearInterval(idČasovače)`.

Následující příklad zobrazí zprávu každé 2 sekundy. Po 5 sekundách bude výstup zastaven:

```js run
// opakovat s intervalem 2 sekundy
let idČasovače = setInterval(() => alert('tik'), 2000);

// konec po 5 sekundách
setTimeout(() => { clearInterval(idČasovače); alert('stop'); }, 5000);
```

```smart header="Zatímco je zobrazen `alert`, čas plyne dál"
Ve většině prohlížečů včetně Chrome a Firefoxu interní časovač „tiká“ dál, zatímco je zobrazeno `alert/confirm/prompt`.

Když si tedy spustíte výše uvedený kód a okno `alert` nějakou dobu nezrušíte, pak bude následující `alert` zobrazen hned, jakmile to uděláte. Skutečný interval mezi zobrazeními tedy bude kratší než 2 sekundy.
```

## Vnořený setTimeout

Existují dva způsoby, jak něco pravidelně spouštět.

První je `setInterval`. Druhý je vnořený `setTimeout`, například takto:

```js
/** namísto:
let idČasovače = setInterval(() => alert('tik'), 2000);
*/

let idČasovače = setTimeout(function tik() {
  alert('tik');
*!*
  idČasovače = setTimeout(tik, 2000); // (*)
*/!*
}, 2000);
```

Výše uvedený `setTimeout` načasuje další volání na konci aktuálního `(*)`.

Vnořený `setTimeout` je flexibilnější metoda než `setInterval`. Tímto způsobem můžeme příští volání načasovat odlišně v závislosti na výsledcích aktuálního.

Například potřebujeme napsat službu, která každých 5 sekund pošle na server žádost o data, ale v případě, že je server přetížen, by tento interval měla zvýšit na 10, 20, 40 sekund...

Zde je pseudokód:
```js
let prodleva = 5000;

let idČasovače = setTimeout(function požadavek() {
  ...pošle požadavek...

  if (požadavek neuspěl kvůli přetížení serveru) {
    // zvýšíme interval dalšího spuštění
    prodleva *= 2;
  }

  idČasovače = setTimeout(požadavek, prodleva);

}, prodleva);
```

A jestliže funkce, které časujeme, zatěžují CPU, můžeme měřit dobu, jakou trvá jejich spuštění, a naplánovat si další volání na dříve nebo později.

**Vnořený `setTimeout` nám umožňuje nastavovat prodlevu mezi voláními přesněji než `setInterval`.**

Porovnejme si dva fragmenty kódu. První používá `setInterval`:

```js
let i = 1;
setInterval(function() {
  funkce(i++);
}, 100);
```

Druhý používá vnořený `setTimeout`:

```js
let i = 1;
setTimeout(function spusť() {
  funkce(i++);
  setTimeout(spusť, 100);
}, 100);
```

Pro `setInterval` vnitřní plánovač spustí `funkce(i++)` každých 100 ms:

![](setinterval-interval.svg)

Všimli jste si?

**Skutečná prodleva mezi voláními `funkce` pro `setInterval` je nižší, než uvedená v kódu!**

To je normální, protože doba, kterou zabere výkon `funkce`, „zkonzumuje“ část intervalu.

Může se stát, že výkon `funkce` bude trvat déle, než jsme očekávali, a vyžádá si více než 100 ms.

V takovém případě engine počká, až se `funkce` dokončí, pak zkontroluje plánovač, a pokud jeho čas vypršel, spustí funkci *okamžitě* znovu.

V krajním případě, jestliže výkon funkce trvá vždy déle než `prodleva` ms, bude k voláním docházet úplně bez pauzy.

A zde je obrázek pro vnořený `setTimeout`:

![](settimeout-interval.svg)

**Vnořený `setTimeout` zaručuje pevnou prodlevu (zde 100 ms).**

Je to proto, že nové volání je naplánováno na konci předchozího.

````smart header="Garbage collection a callback funkce setInterval/setTimeout"
Když je do `setInterval/setTimeout` předána funkce, vytvoří se na ni interní odkaz a ten se uloží do plánovače. To brání funkci, aby byla odstraněna garbage collectorem, přestože na ni nejsou žádné jiné odkazy.

```js
// funkce zůstane v paměti, dokud ji plánovač nezavolá
setTimeout(function() {...}, 100);
```

Pro `setInterval` funkce zůstane v paměti, dokud není zavolán `clearInterval`.

Je tady vedlejší efekt. Funkce se odkazuje na vnější lexikální prostředí, takže dokud existuje, existují i vnější proměnné. Ty mohou zabrat mnohem více paměti než samotná funkce. Když tedy načasovanou funkci už nepotřebujeme, je lepší ji zrušit, i kdyby byla velmi malá.
````

## setTimeout s nulovou prodlevou

Existuje speciální způsob použití: `setTimeout(funkce, 0)` nebo jen `setTimeout(funkce)`.

To načasuje výkon `funkce` na co nejdříve. Plánovač ji však spustí až poté, co bude dokončen aktuálně spouštěný skript.

Funkce je tedy načasována ke spuštění „hned po“ aktuálním skriptu.

Například tohle vypíše „Ahoj“ a hned pak „světe“:

```js run
setTimeout(() => alert("světe"));

alert("Ahoj");
```

První řádek „uloží volání do kalendáře po 0 ms“. Avšak plánovač „zkontroluje kalendář“ až poté, co bude aktuální skript dokončen, takže `"Ahoj"` půjde jako první a `"světe"` až po něm.

V prohlížečích existují i pokročilejší způsoby použití načasování s nulovou prodlevou, které probereme v kapitole <info:event-loop>.

````smart header="Nulová prodleva není ve skutečnosti nulová (v prohlížeči)"

V prohlížeči je omezení, jak často se mohou vnořené časovače spouštět. [HTML Living Standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers) říká: „po pěti vnořených časovačích musí být interval alespoň 4 milisekundy.“

Na níže uvedeném příkladu si předvedeme, co to znamená. Volání `setTimeout` v něm načasuje samo sebe s nulovou prodlevou. Každé volání si pamatuje skutečný čas od předchozího v poli `časy`. Jak budou vypadat skutečné prodlevy? Podívejme se:

```js run
let začátek = Date.now();
let časy = [];

setTimeout(function spusť() {
  časy.push(Date.now() - začátek); // zapamatujeme si prodlevu z předchozího volání

  if (začátek + 100 < Date.now()) alert(časy); // za 100 ms zobrazíme prodlevy
  else setTimeout(spusť); // jinak znovu načasujeme
});

// příklad výstupu:
// 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100
```

Nejprve se časovače spustí okamžitě (tak, jak je uvedeno ve specifikaci) a pak vidíme `9, 15, 20, 24...`. Do hry vstupuje povinná prodleva aspoň 4 ms mezi voláními.

Podobná věc se stane, jestliže použijeme `setInterval` namísto `setTimeout`: `setInterval(f)` spustí `f` několikrát s nulovou prodlevou a poté s prodlevou nejméně 4 ms.

Toto omezení pochází z prastarých časů a mnoho skriptů na něm závisí, takže existuje z historických důvodů.

Pro JavaScript na straně serveru toto omezení neexistuje a jsou tam jiné způsoby, jak načasovat okamžitou asynchronní činnost, například [setImmediate](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args) pro Node.js. Tato poznámka je tedy specifická pro prohlížeče.
````

## Shrnutí

- Metody `setTimeout(funkce, prodleva, ...argumenty)` a `setInterval(funkce, prodleva, ...argumenty)` nám umožňují spustit funkci `funkce` jednou/pravidelně po `prodleva` milisekundách.
- Chceme-li spuštění zrušit, měli bychom volat `clearTimeout/clearInterval` s hodnotou, kterou vrátila funkce   `setTimeout/setInterval`.
- Flexibilnější alternativou k `setInterval` jsou vnořená volání `setTimeout`, která nám umožňují nastavit čas *mezi* voláními přesněji.
- Nulová prodleva v `setTimeout(funkce, 0)` (totéž jako `setTimeout(funkce)`) se používá k načasování volání „co nejdříve, ale až poté, co bude dokončen aktuální skript“.
- Prohlížeč omezuje minimální prodlevu pro pět nebo více vnořených volání `setTimeout` nebo pro `setInterval` (po 5. volání) na 4 ms. Je tomu tak z historických důvodů.

Prosíme všimněte si, že žádná časovací metoda *nezaručuje* přesnou prodlevu.

Například časovač v prohlížeči může zpomalit z mnoha důvodů:
- CPU je přetížen.
- Záložka prohlížeče běží na pozadí.
- Laptop je v režimu úspory baterie.

To všechno může zvýšit minimální rozlišení časovače (minimální prodlevu) na 300 ms nebo dokonce 1000 ms v závislosti na prohlížeči a nastavení výkonu na úrovni OS.
