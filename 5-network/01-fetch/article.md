
# Fetch

JavaScript umí posílat síťové požadavky na server a načítat nové informace, kdykoli jsou zapotřebí.

Můžeme například použít síťový požadavek k:

- odeslání objednávky,
- načtení informací o uživateli,
- stažení posledních aktualizací ze serveru,
- ...atd.

...A to všechno je možné bez znovunačtení stránky!

Pro síťové požadavky z JavaScriptu se používá zastřešující pojem „AJAX“ (zkratka z <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML -- „Asynchronní JavaScript a XML“). Nemusíme však používat XML: tento pojem pochází z dřívější doby, proto se tam toto slovo vyskytuje. Možná jste tento pojem už slyšeli.

Poslat síťový požadavek a získat informace ze serveru je možné mnoha způsoby.

Metoda `fetch()` je moderní a víceúčelová, proto začneme s ní. Není podporována ve starých prohlížečích (lze použít polyfill), ale v moderních je podporována velmi dobře.

Její základní syntaxe je:

```js
let příslib = fetch(url, [volby])
```

- **`url`** -- URL, z níž se má stahovat.
- **`volby`** -- nepovinné volby: metoda, hlavičky atd.

Bez objektu `volby` je to jednoduchý požadavek GET, který stáhne obsah adresy `url`.

Prohlížeč začne tento požadavek ihned plnit a vrátí příslib, který by měl volající kód použít k získání výsledku.

Získání odpovědi je obvykle dvoufázový proces.

**V první fázi se `příslib`, vrácený metodou `fetch`, splní s objektem zabudované třídy [Response](https://fetch.spec.whatwg.org/#response-class) hned, jakmile server pošle hlavičky odpovědi.**

V této fázi můžeme zkontrolovat HTTP status, abychom viděli, zda požadavek byl úspěšný nebo ne, zkontrolovat hlavičky, ale tělo ještě nemáme.

Příslib je zamítnut, jestliže metoda `fetch` nedokázala tento HTTP požadavek vytvořit, např. kvůli síťovým problémům, nebo když zadané webové sídlo neexistuje. Abnormální HTTP statusy, např. 404 nebo 500, chybu nevyvolají.

HTTP status vidíme ve vlastnostech odpovědi:

- **`status`** -- kód HTTP statusu, např. 200.
- **`ok`** -- boolean, `true`, pokud kód HTTP statusu je 200-299.

Příklad:

```js
let odpověď = await fetch(url);

if (odpověď.ok) { // pokud HTTP status je 200-299
  // získáme tělo odpovědi (metodou vysvětlenou dále)
  let json = await odpověď.json();
} else {
  alert("HTTP chyba: " + odpověď.status);
}
```

**Abychom ve druhé fázi získali tělo odpovědi, musíme volat další metodu.**

`Response` poskytuje několik metod založených na příslibech, které slouží k přístupu k tělu v různých formátech:

- **`response.text()`** -- načte odpověď a vrátí ji jako text,
- **`response.json()`** -- rozparsuje odpověď ve formátu JSON,
- **`response.formData()`** -- vrátí odpověď jako objekt `FormData` (bude vysvětleno v [příští kapitole](info:formdata)),
- **`response.blob()`** -- vrátí odpověď jako [blob](info:blob) (binární data s typem),
- **`response.arrayBuffer()`** -- vrátí odpověď jako [ArrayBuffer](info:arraybuffer-binary-arrays) (nízkoúrovňová reprezentace binárních dat),
- kromě toho `response.body` je objekt třídy [ReadableStream](https://streams.spec.whatwg.org/#rs-class), který umožňuje načtení těla po částech, příklad uvidíme později.

Například získejme objekt JSON s posledními příspěvky z GitHubu:

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let odpověď = await fetch(url);

*!*
let příspěvky = await odpověď.json(); // načteme tělo odpovědi a parsujeme je jako JSON
*/!*

alert(příspěvky[0].author.login);
```

Nebo totéž bez `await` za použití čistě příslibové syntaxe:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(odpověď => odpověď.json())
  .then(příspěvky => alert(příspěvky[0].author.login));
```

K získání odpovědi v textové podobě použijeme `await odpověď.text()` místo `.json()`:

```js run async
let odpověď = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await odpověď.text(); // načteme tělo odpovědi jako text

alert(text.slice(0, 80) + '...');
```

Pro ukázku načítání v binárním formátu načteme a zobrazíme obrázek s logem [specifikace „fetch“](https://fetch.spec.whatwg.org) (podrobnosti o operacích na `Blob` najdete v kapitole [Blob](info:blob)):

```js async run
let odpověď = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await odpověď.blob(); // stáhneme jako objekt Blob
*/!*

// vytvoříme z něj <img>
let obrázek = document.createElement('img');
obrázek.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(obrázek);

// zobrazíme jej
obrázek.src = URL.createObjectURL(blob);

setTimeout(() => { // po třech sekundách zmizí
  obrázek.remove();
  URL.revokeObjectURL(obrázek.src);
}, 3000);
```

````warn
Můžeme si zvolit pouze jednu metodu načtení těla.

Jestliže jsme odpověď již získali voláním `odpověď.text()`, pak následné `odpověď.json()` nebude fungovat, neboť obsah těla již byl zpracován.

```js
let text = await odpověď.text(); // tělo odpovědi je spotřebováno
let parsovaný = await odpověď.json(); // selže (tělo je již spotřebováno)
```
````

## Hlavičky odpovědi

Hlavičky odpovědi jsou k dispozici v objektu `odpověď.headers`, který je podobný mapě.

Není to přesně Map, ale obsahuje podobné metody k získání jednotlivých hlaviček podle názvu nebo k iteraci nad nimi:

```js run async
let odpověď = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// získáme jednu hlavičku
alert(odpověď.headers.get('Content-Type')); // application/json; charset=utf-8

// iterujeme nad všemi hlavičkami
for (let [klíč, hodnota] of odpověď.headers) {
  alert(`${klíč} = ${hodnota}`);
}
```

## Hlavičky požadavku

K nastavení hlaviček požadavku v metodě `fetch` můžeme použít volbu `headers`, která obsahuje objekt s odesílanými hlavičkami, například:

```js
let odpověď = fetch(chráněnéURL, {
  headers: {
    Authentication: 'secret'
  }
});
```

...Existuje však seznam [zakázaných HTTP hlaviček](https://fetch.spec.whatwg.org/#forbidden-header-name), které nastavit nemůžeme:

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

Tyto hlavičky zajišťují správný a bezpečný HTTP, takže jsou nastavovány výlučně prohlížečem.

## Požadavky POST

K vytvoření požadavku `POST` nebo s nějakou jinou metodou musíme nastavit ve volbách metody `fetch`:

- **`method`** -- HTTP metoda, např. `POST`,
- **`body`** -- tělo požadavku, jedno z následujících:
  - řetězec (např. zakódovaný v JSONu),
  - objekt `FormData` k odeslání dat jako `multipart/form-data`,
  - `Blob`/`BufferSource` k odeslání binárních dat,
  - [URLSearchParams](info:url), k odeslání dat v kódování `x-www-form-urlencoded`, používáno zřídka.

Ve většině případů se používá formát JSON.

Například tento kód odešle objekt `uživatel` jako JSON:

```js run async
let uživatel = {
  jméno: 'Jan',
  příjmení: 'Novák'
};

*!*
let odpověď = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(uživatel)
});
*/!*

let výsledek = await odpověď.json();
alert(výsledek.message);
```

Prosíme všimněte si, že jestliže je `body` požadavku řetězec, pak se hlavička `Content-Type` standardně nastaví na `text/plain;charset=UTF-8`.

Pokud však chceme poslat JSON, použijeme volbu `headers`, abychom místo toho poslali `application/json`, správný `Content-Type` pro data zakódovaná v JSONu.

## Poslání obrázku

Metodou `fetch` můžeme také poslat binární data pomocí objektů `Blob` nebo `BufferSource`.

V následujícím příkladu máme `<canvas>`, do něhož můžeme kreslit pohybem myši nad ním. Kliknutím na tlačítko „Odeslat“ pošleme obrázek na server:

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Odeslat" onclick="odeslat()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function odeslat() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
      let odpověď = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // server odpoví potvrzením a velikostí obrázku
      let výsledek = await odpověď.json();
      alert(výsledek.message);
    }

  </script>
</body>
```

Prosíme všimněte si, že zde nenastavujeme `Content-Type` ručně, protože objekt `Blob` obsahuje vestavěný typ (zde `image/png`, který je generován metodou `toBlob`). Při odesílání objektu `Blob` bude hodnota `Content-Type` nastavena na tento typ.

Funkci `odeslat()` můžeme přepsat bez použití `async/await` následovně:

```js
function odeslat() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch/post/image', {
      method: 'POST',
      body: blob
    })
      .then(odpověď => odpověď.json())
      .then(výsledek => alert(JSON.stringify(výsledek, null, 2)))
  }, 'image/png');
}
```

## Shrnutí

Obvyklý požadavek na stažení se skládá ze dvou volání `await`:

```js
let odpověď = await fetch(url, volby); // vyhodnotí se s hlavičkami odpovědi
let výsledek = await odpověď.json(); // načte tělo jako JSON
```

Nebo bez `await`:

```js
fetch(url, volby)
  .then(odpověď => odpověď.json())
  .then(výsledek => /* zpracování výsledku */)
```

Vlastnosti odpovědi:
- `odpověď.status` -- HTTP kód odpovědi,
- `odpověď.ok` -- `true`, pokud status je 200-299,
- `odpověď.headers` -- objekt podobný Map s HTTP hlavičkami.

Metody pro získání těla odpovědi:
- **`response.text()`** -- vrátí odpověď jako text,
- **`response.json()`** -- rozparsuje odpověď ve formátu JSON do objektu,
- **`response.formData()`** -- vrátí odpověď jako objekt `FormData` (kódování `multipart/form-data`, viz příští kapitolu),
- **`response.blob()`** -- vrátí odpověď jako [blob](info:blob) (binární data s typem),
- **`response.arrayBuffer()`** -- vrátí odpověď jako [ArrayBuffer](info:arraybuffer-binary-arrays) (nízkoúrovňová reprezentace binárních dat).

Dosud uvedené volby stahování:
- `method` -- HTTP metoda,
- `headers` -- objekt s hlavičkami požadavku (ne všechny hlavičky jsou povoleny),
- `body` -- data k odeslání (tělo požadavku) jako objekt `string`, `FormData`, `BufferSource`, `Blob` nebo `UrlSearchParams`.

V příští kapitole uvidíme další volby a případy použití metody `fetch`.
