
# Asynchronní iterace a generátory

Asynchronní iterace nám umožňuje iterovat nad daty, která přicházejí asynchronně, na požádání. Například když něco stahujeme po částech ze sítě. A asynchronní generátory nám to ještě usnadňují.

Nejprve se podíváme na jednoduchý příklad, abychom pochopili syntaxi, a pak si prohlédneme případ použití z reálného života.

## Připomínka iterovatelných objektů

Připomeňme si téma iterovatelných objektů.

Myšlenkou je, že máme objekt, například `rozsah` zde:
```js
let rozsah = {
  začátek: 1,
  konec: 5
};
```

...A rádi bychom nad ním používali cyklus `for..of`, např. `for(hodnota of rozsah)`, kterým budeme získávat hodnoty od `1` do `5`.

Jinými slovy, chceme přidat objektu *schopnost iterace*.

To můžeme implementovat pomocí speciální metody s názvem `Symbol.iterator`:

- Tato metoda je volána konstruktem `for..of`, když je cyklus zahájen, a měla by vrátit objekt obsahující metodu `next`.
- Při každé iteraci je metoda `next()` volána pro další hodnotu.
- Metoda `next()` by měla vrátit hodnotu ve tvaru `{done: true/false, value:<hodnota cyklu>}`, kde `done:true` znamená konec cyklu.

Zde je implementace iterovatelného objektu `rozsah`:

```js run
let rozsah = {
  začátek: 1,
  konec: 5,

*!*
  [Symbol.iterator]() { // voláno jednou, na začátku for..of
*/!*
    return {
      aktuální: this.začátek,
      poslední: this.konec,

*!*
      next() { // voláno při každé iteraci pro získání další hodnoty
*/!*
        if (this.aktuální <= this.poslední) {
          return { done: false, value: this.aktuální++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for(let hodnota of rozsah) {
  alert(hodnota); // 1, pak 2, pak 3, pak 4, pak 5
}
```

Pokud vám něco není jasné, prosíme navštivte kapitolu [](info:iterable), která vysvětluje všechny podrobnosti o běžných iterovatelných objektech.

## Asynchronní iterovatelné objekty

Asynchronní iteraci potřebujeme, když hodnoty přicházejí asynchronně: po `setTimeout` nebo prodlevě jiného druhu.

Nejběžnějším případem je, že objekt potřebuje k doručení další hodnoty vytvořit síťový požadavek. Příklad z reálného života uvidíme o něco později.

Abychom učinili objekt asynchronně iterovatelným:

1. Použijeme `Symbol.asyncIterator` místo `Symbol.iterator`.
2. Metoda `next()` by měla vrátit příslib (aby byl splněn další hodnotou).
    - Zajistí to klíčové slovo `async`. Můžeme jednoduše vytvořit `async next()`.
3. K iteraci nad takovým objektem bychom měli používat cyklus `for await (let prvek of iterovatelnýObjekt)`.
    - Všimněte si slova `await`.

Jako počáteční příklad vytvořme iterovatelný objekt `rozsah`. Bude podobný tomu předchozímu, ale nyní bude vracet hodnoty asynchronně, jednu za sekundu.

Vše, co musíme udělat, je provést několik náhrad ve výše uvedeném kódu:

```js run
let rozsah = {
  začátek: 1,
  konec: 5,

*!*
  [Symbol.asyncIterator]() { // (1)
*/!*
    return {
      aktuální: this.začátek,
      poslední: this.konec,

*!*
      async next() { // (2)
*/!*

*!*
        // poznámka: uvnitř asynchronní funkce next můžeme použít „await“:
        await new Promise(splň => setTimeout(splň, 1000)); // (3)
*/!*

        if (this.aktuální <= this.poslední) {
          return { done: false, value: this.aktuální++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

*!*
  for await (let hodnota of rozsah) { // (4)
    alert(hodnota); // 1,2,3,4,5
  }
*/!*

})()
```

Jak vidíme, tato struktura se podobá obyčejným iterátorům:

1. Abychom učinili objekt asynchronně iterovatelným, musí obsahovat metodu `Symbol.asyncIterator` `(1)`.
2. Tato metoda musí vracet objekt s metodou `next()`, která vrací příslib `(2)`.
3. Metoda `next()` nemusí být `async`, může to být běžná metoda vracející příslib, ale `async` nám umožňuje použít `await`, takže je vhodné. Zde prostě sekundu počkáme `(3)`.
4. K iteraci použijeme `for await(let hodnota of rozsah)` `(4)`, jmenovitě přidáme „await“ za „for“. Tento cyklus jedenkrát volá `rozsah[Symbol.asyncIterator]()` a pak pro získávání hodnot volá jeho `next()`.

Uvedeme malou tabulku s rozdíly:

|       | Iterátory | Asynchronní iterátory |
|-------|-----------|-----------------|
Objektová metoda, která poskytne iterátor | `Symbol.iterator` | `Symbol.asyncIterator` |
| Návratová hodnota `next()` je              | libovolná hodnota         | `Promise`  |
| K iteraci se používá                          | `for..of`         | `for await..of` |

````warn header="Roztažená syntaxe `...` asynchronně nefunguje"
Prvky jazyka, které vyžadují obvyklé, synchronní iterátory, nefungují s asynchronními.

Nebude fungovat například roztažená syntaxe:
```js
alert( [...rozsah] ); // Chyba, není Symbol.iterator
```

To je přirozené, protože ta očekává `Symbol.iterator`, ne `Symbol.asyncIterator`.

To je také případ cyklu `for..of`: syntaxe bez `await` potřebuje `Symbol.iterator`.
````

## Připomínka generátorů

Nyní si připomeňme generátory, protože ty nám umožňují iterační kód značně zkrátit. Když bychom rádi vytvořili iterovatelný objekt, většinou použijeme generátory.

Pro zjednodušení, když vypustíme některé důležité věci, to jsou „funkce, které generují (vydávají) hodnoty“. Jsou podrobně vysvětleny v kapitole [](info:generators).

Generátory jsou označeny jako `function*` (všimněte si hvězdičky) a ke generování hodnot používají `yield`. Pak nad nimi můžeme procházet cyklem `for..of`.

Tento příklad generuje posloupnost hodnot od `začátek` po `konec`:

```js run
function* generujPosloupnost(začátek, konec) {
  for (let i = začátek; i <= konec; i++) {
    yield i;
  }
}

for(let hodnota of generujPosloupnost(1, 5)) {
  alert(hodnota); // 1, pak 2, pak 3, pak 4, pak 5
}
```

Jak už víme, abychom učinili objekt iterovatelným, měli bychom do něj přidat `Symbol.iterator`.

```js
let rozsah = {
  začátek: 1,
  konec: 5,
*!*
  [Symbol.iterator]() {
    return <objekt s metodou next, aby rozsah byl iterovatelný>
  }
*/!*
}
```

Běžnou praxí pro `Symbol.iterator` je vrátit generátor, tím se kód zkrátí, jak vidíte:

```js run
let rozsah = {
  začátek: 1,
  konec: 5,

  *[Symbol.iterator]() { // zkratka pro [Symbol.iterator]: function*()
    for(let hodnota = this.začátek; hodnota <= this.konec; hodnota++) {
      yield hodnota;
    }
  }
};

for(let hodnota of rozsah) {
  alert(hodnota); // 1, pak 2, pak 3, pak 4, pak 5
}
```

Pokud by vás zajímaly další podrobnosti, přečtěte si prosíme kapitolu [](info:generators).

V obyčejných generátorech nemůžeme používat `await`. Všechny hodnoty musejí přicházet synchronně, jak vyžaduje konstrukt `for..of`.

Co kdybychom chtěli generovat hodnoty asynchronně, například ze síťových požadavků?

Přejděme k asynchronním generátorům, které nám to umožní.

## Asynchronní generátory (konečně)

Když chceme vytvořit objekt, který asynchronně generuje posloupnost hodnot, ve většině praktických aplikací můžeme použít asynchronní generátor.

Syntaxe je jednoduchá: před `function*` uvedeme `async`. To učiní generátor asynchronním.

A pak k iteraci nad ním použijeme `for await (...)`, například:

```js run
*!*async*/!* function* generujPosloupnost(začátek, konec) {

  for (let i = začátek; i <= konec; i++) {

*!*
    // Hurá, můžeme použít await!
    await new Promise(splň => setTimeout(splň, 1000));
*/!*

    yield i;
  }

}

(async () => {

  let generátor = generujPosloupnost(1, 5);
  for *!*await*/!* (let hodnota of generátor) {
    alert(hodnota); // 1, pak 2, pak 3, pak 4, pak 5 (s prodlevou mezi nimi)
  }

})();
```

Jelikož je generátor asynchronní, můžeme uvnitř něj používat `await`, spoléhat se na přísliby, provádět síťové požadavky a podobně.

````smart header="Rozdíl pod kapotou"
Jestliže jste pokročilý čtenář a pamatujete si podrobnosti o generátorech, je tady technicky vnitřní rozdíl.

U asynchronních generátorů je metoda `generátor.next()` asynchronní, vrací přísliby.

V obyčejném generátoru bychom k získávání hodnot použili `výsledek = generator.next()`. V asynchronním generátoru bychom měli přidat `await`, například takto:

```js
výsledek = await generator.next(); // výsledek = {value: ..., done: true/false}
```
Z tohoto důvodu asynchronní generátory fungují s `for await...of`.
````

### Asynchronní iterovatelný rozsah

Jako `Symbol.iterator` můžeme používat obyčejné generátory, aby byl iterační kód kratší.

Obdobně můžeme jako `Symbol.asyncIterator` používat asynchronní generátory, abychom implementovali asynchronní iteraci.

Například můžeme přimět objekt `rozsah`, aby generoval hodnoty asynchronně, jednu za sekundu, nahrazením synchronního `Symbol.iterator` za asynchronní `Symbol.asyncIterator`:

```js run
let rozsah = {
  začátek: 1,
  konec: 5,

  // tento řádek je totéž jako [Symbol.asyncIterator]: async function*() {
*!*
  async *[Symbol.asyncIterator]() {
*/!*
    for(let hodnota = this.začátek; hodnota <= this.konec; hodnota++) {

      // učiňme přestávku mezi hodnotami, na něco čekáme
      await new Promise(splň => setTimeout(splň, 1000));

      yield hodnota;
    }
  }
};

(async () => {

  for *!*await*/!* (let hodnota of rozsah) {
    alert(hodnota); // 1, pak 2, pak 3, pak 4, pak 5
  }

})();
```

Nyní hodnoty přicházejí s prodlevou 1 sekunda mezi sebou.

```smart
Technicky můžeme do objektu přidat `Symbol.iterator` i `Symbol.asyncIterator` současně, bude tedy iterovatelný jak synchronně (`for..of`), tak asynchronně (`for await..of`).

V praxi by to však bylo podivné.
```

## Příklad z reálného života: stránkovaná data

Dosud jsme viděli základní příklady, abychom tomu porozuměli. Nyní se podívejme na případ použití z reálného života.

Existuje mnoho online služeb, které doručují stránkovaná data. Například když potřebujeme seznam uživatelů, požadavek vrátí předdefinovaný počet (např. 100 uživatelů) -- „jednu stránku“ a poskytne URL další stránky.

Tento vzorec je zcela běžný. Neplatí to jen pro uživatele, ale v zásadě pro cokoli.

Například GitHub nám umožňuje získávat commity stejným způsobem, po stránkách:

- Měli bychom vytvořit požadavek do `fetch` ve tvaru `https://api.github.com/repos/<úložiště>/commits`.
- GitHub odpoví JSONem se 30 commity a také nám v hlavičce `Link` poskytne odkaz na další stránku.
- Tento odkaz pak můžeme použít pro další požadavek, k získání dalších commitů, a tak dále.

V našem kódu bychom rádi měli jednodušší způsob, jak získávat commity.

Vytvořme funkci `stáhniCommity(úložiště)`, která nám bude načítat commity a bude vytvářet požadavky, kdykoli budou zapotřebí. A nechme ji, aby se postarala o všechny záležitosti ohledně stránkování. Pro nás to bude jednoduchá asynchronní iterace `for await..of`.

Použití tedy bude následující:

```js
for await (let commit of stáhniCommity("uživatel/úložiště")) {
  // zpracování commitu
}
```

Zde je taková funkce, implementovaná jako asynchronní generátor:

```js
async function* stáhniCommity(úložiště) {
  let url = `https://api.github.com/repos/${úložiště}/commits`;

  while (url) {
    const odpověď = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // GitHub potřebuje hlavičku s uživatelským agentem
    });

    const tělo = await odpověď.json(); // (2) odpověď v JSONu (pole commitů)

    // (3) v hlavičkách je URL další stránky, vydolujeme ho
    let dalšíStránka = odpověď.headers.get('Link').match(/<(.*?)>; rel="next"/);
    dalšíStránka = dalšíStránka?.[1];

    url = dalšíStránka;

    for(let commit of tělo) { // (4) vydáme commity jeden po druhém, dokud stránka neskončí
      yield commit;
    }
  }
}
```

Podrobnější vysvětlení, jak to funguje:

1. K načtení commitů používáme metodu prohlížeče [fetch](info:fetch).

    - Úvodní URL je `https://api.github.com/repos/<úložiště>/commits` a další stránka bude v hlavičce odpovědi `Link`.
    - Metoda `fetch` nám umožňuje poskytnout autorizaci a další hlavičky, pokud jsou zapotřebí -- zde GitHub vyžaduje hlavičku `User-Agent`.
2. Commity jsou vráceny ve formátu JSON.
3. Z hlavičky `Link` odpovědi bychom měli získat URL další stránky. Hlavička má speciální formát, takže pro ni použijeme regulární výraz (o tomto prvku jazyka se dozvíme v kapitole [Regulární výrazy](info:regular-expressions)).
    - URL další stránky může vypadat jako `https://api.github.com/repositories/93253246/commits?page=2`. Generuje je samotný GitHub.
4. Pak budeme vydávat získané commity jeden po druhém, a když dojdou, spustí se další iterace `while(url)`, která vytvoří další požadavek.

Příklad použití (zobrazí na konzoli autory commitů):

```js run
(async () => {

  let počet = 0;

  for await (const commit of stáhniCommity('javascript-tutorial/en.javascript.info')) {

    console.log(commit.author.login);

    if (++počet == 100) { // zastavíme se po 100 commitech
      break;
    }
  }

})();

// Poznámka: Pokud tohle spouštíte v externím pískovišti, musíte sem zkopírovat výše uvedenou funkci stáhniCommity
```

To je přesně to, co jsme chtěli.

Vnitřní mechaniky stránkovaných požadavků jsou zvnějšku neviditelné. Pro nás je to prostě jen asynchronní generátor, který vrací commity.

## Shrnutí

Obyčejné iterátory a generátory fungují dobře s daty, jejichž generování netrvá dlouhou dobu.

Když očekáváme, že data budou přicházet asynchronně s prodlevami, můžeme použít jejich asynchronní protějšky a `for await..of` místo `for..of`.

Syntaktické rozdíly mezi asynchronními a běžnými iterátory:

|       | Iterovatelný objekt | Asynchronní iterovatelný objekt |
|-------|-----------|-----------------|
| Metoda poskytující iterátor | `Symbol.iterator` | `Symbol.asyncIterator` |
| Návratová hodnota `next()` je          | `{value:…, done: true/false}`         | `Promise`, který se splní s `{value:…, done: true/false}`  |

Syntaktické rozdíly mezi asynchronními a běžnými generátory:

|       | Generátory | Asynchronní generátory |
|-------|-----------|-----------------|
| Deklarace | `function*` | `async function*` |
| Návratová hodnota `next()` je          | `{value:…, done: true/false}`         | `Promise`, který se splní s `{value:…, done: true/false}`  |

Při vývoji webů se často setkáváme s proudy dat, která přitékají po částech, například při stahování nebo odesílání velkého souboru.

Ke zpracování takových dat můžeme používat asynchronní generátory. Stojí také za zmínku, že v některých prostředích, např. v prohlížečích, existuje i další API nazvané Streams, které poskytuje speciální rozhraní pro práci s takovými proudy (streamy), pro transformaci dat a jejich předávání z jednoho proudu do druhého (např. při stahování z jednoho místa a okamžitém odesílání jinam).