
# Fetch: průběh stahování

Metoda `fetch` umožňuje sledovat průběh *stahování*.

Prosíme všimněte si, že v současnosti neexistuje žádný způsob, jak by `fetch` mohla sledovat průběh *odesílání*. K tomuto účelu prosíme používejte [XMLHttpRequest](info:xmlhttprequest), který probereme později.

Ke sledování průběhu stahování můžeme použít vlastnost `odpověď.body`. To je `ReadableStream` -- speciální objekt, který poskytuje tělo po částech v pořadí, v jakém přicházejí. Objekty `ReadableStream` jsou popsány ve specifikaci [API Streams](https://streams.spec.whatwg.org/#rs-class).

Na rozdíl od `odpověď.text()`, `odpověď.json()` a jiných metod nám `odpověď.body` dává úplnou kontrolu nad procesem načítání a my můžeme kdykoli spočítat, kolik dat se již načetlo.

Následuje nástin kódu, který načte odpověď z `odpověď.body`:

```js
// místo odpověď.json() a jiných metod
const reader = odpověď.body.getReader();

// nekonečná smyčka, dokud se tělo stahuje
while(true) {
  // done je true pro poslední část
  // value je Uint8Array s byty načtené části
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Načteno ${value.length} bytů`)
}
```

Výsledkem volání `await reader.read()` je objekt se dvěma vlastnostmi:
- **`done`** -- `true`, když je načítání kompletní, jinak `false`.
- **`value`** -- typové pole bytů: `Uint8Array`.

```smart
API Streams popisuje také asynchronní iteraci nad `ReadableStream` pomocí cyklu `for await..of`, ale to zatím není široce podporováno (viz [vlastnosti prohlížečů](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), proto používáme cyklus `while`.
```

V cyklu dostáváme části odpovědi, dokud načítání neskončí, tedy než se `done` nastaví na `true`.

Abychom tento proces mohli logovat, stačí nám pro každý získaný fragment `value` přičíst jeho délku k počítadlu.

Následující plně funkční příklad načítá odpověď a loguje průběh načítání v konzoli, další vysvětlení budou následovat:

```js run async
// Krok 1: začneme načítat a získáme reader
let odpověď = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = odpověď.body.getReader();

// Krok 2: zjistíme celkovou délku
const délkaObsahu = +odpověď.headers.get('Content-Length');

// Krok 3: načteme data
let obdrženáDélka = 0; // kolik bytů jsme do této chvíle obdrželi
let části = []; // pole získaných binárních částí (dohromady tvoří tělo)
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  části.push(value);
  obdrženáDélka += value.length;

  console.log(`Načteno ${obdrženáDélka} z ${délkaObsahu}`)
}

// Krok 4: spojíme části do jediného Uint8Array
let všechnyČásti = new Uint8Array(obdrženáDélka); // (4.1)
let pozice = 0;
for(let část of části) {
	všechnyČásti.set(část, pozice); // (4.2)
	pozice += část.length;
}

// Krok 5: dekódujeme do řetězce
let výsledek = new TextDecoder("utf-8").decode(všechnyČásti);

// Jsme hotovi!
let příspěvky = JSON.parse(výsledek);
alert(příspěvky[0].author.login);
```

Vysvětlíme to krok za krokem:

1. Provedeme `fetch` jako obvykle, ale místo volání `odpověď.json()` získáme reader proudu `response.body.getReader()`.

    Prosíme všimněte si, že nemůžeme načíst tutéž odpověď oběma těmito metodami: pro získání výsledku použijeme buď reader, nebo metodu odpovědi.
2. Před načtením můžeme zjistit délku celé odpovědi z hlavičky `Content-Length`.

    Hlavička může chybět u požadavku jiného původu (viz kapitolu <info:fetch-crossorigin>) a server ji technicky nemusí nastavit, ale většinou tam je.
3. Voláme `await reader.read()`, dokud nejsme hotovi.

    Jednotlivé části odpovědi shromažďujeme v poli `části`. To je důležité, jelikož po načtení odpovědi ji už nemůžeme načíst znovu voláním `odpověď.json()` nebo jiným způsobem (můžete si to zkusit, nastane chyba).
4. Nakonec tedy máme `části` -- pole bytových částí `Uint8Array`. Musíme je spojit do jediného výsledku. Naneštěstí neexistuje žádná metoda, která by je dokázala sama zřetězit, proto k tomu použijeme krátký kód:
    1. Vytvoříme `všechnyČásti = new Uint8Array(obdrženáDélka)` -- pole prvků stejného typu o celkové délce všech částí.
    2. Pak do něj metodou `.set(část, pozice)` zkopírujeme každou `část`, jednu za druhou.
5. Výsledek máme v poli `všechnyČásti`. To je však bytové pole, ne řetězec.

    Abychom vytvořili řetězec, musíme tyto byty interpretovat. K tomu právě slouží zabudovaný [TextDecoder](info:text-decoder). Na řetězci pak můžeme volat `JSON.parse`, pokud je to zapotřebí.

    Co když místo řetězce potřebujeme binární obsah? To je ještě jednodušší. Nahradíme kroky 4 a 5 jediným řádkem, který vytvoří `Blob` ze všech částí:
    ```js
    let blob = new Blob(části);
    ```

Nakonec máme výsledek (jako řetězec nebo blob, co se nám hodí víc) a sledování průběhu tohoto procesu.

Opakujeme, prosíme všimněte si, že to nefunguje pro proces *odesílání* (to s metodou `fetch` v současnosti není možné), jedině pro *stahování*.

Dále, jestliže velikost není známa, měli bychom v cyklu kontrolovat proměnnou `obdrženáDélka`, a jakmile dosáhne určitého limitu, ukončit cyklus. Tím zajistíme, že `části` nepřekročí dostupnou paměť.
