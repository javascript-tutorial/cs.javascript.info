# XMLHttpRequest

`XMLHttpRequest` je zabudovaný prohlížečový objekt, který umožňuje v JavaScriptu vytvářet HTTP požadavky.

Přestože má v názvu slovo „XML“, může pracovat s libovolnými daty, nejenom s formátem XML. Můžeme odesílat a stahovat soubory, sledovat průběh a mnoho dalšího.

V současnosti existuje jiná, modernější metoda `fetch`, která `XMLHttpRequest` poněkud odsouvá do pozadí.

Při vývoji moderních webů se `XMLHttpRequest` používá ze tří důvodů:

1. Historické důvody: potřebujeme podporovat již existující skripty obsahující `XMLHttpRequest`.
2. Musíme podporovat staré prohlížeče a nechceme používat polyfilly (např. aby skripty zůstaly krátké).
3. Potřebujeme něco, co `fetch` zatím neumí, např. sledovat průběh odesílání.

Zdá se vám to povědomé? Pokud ano, je to v pořádku a můžete pokračovat k `XMLHttpRequest`. Jinak prosíme přejděte k <info:fetch>.

## Základy

XMLHttpRequest má dva režimy práce: synchronní a asynchronní.

Nejprve se podíváme na asynchronní, který se používá ve většině případů.

K provedení požadavku musíme učinit čtyři kroky:

1. Vytvoříme `XMLHttpRequest`:
    ```js
    let xhr = new XMLHttpRequest();
    ```
    Konstruktor nemá žádné argumenty.

2. Inicializujeme ho, zpravidla hned po `new XMLHttpRequest`:
    ```js
    xhr.open(metoda, URL, [async, uživatel, heslo])
    ```
    
    Tato metoda specifikuje hlavní parametry požadavku:

    - `metoda` -- HTTP metoda. Obvykle `"GET"` nebo `"POST"`.
    - `URL` -- požadovaná URL, řetězec, může to být i objekt [URL](info:url).
    - `async` -- pokud je výslovně nastaven na `false`, bude požadavek synchronní, probereme to zanedlouho.
    - `uživatel`, `heslo` -- uživatelské jméno a heslo pro základní HTTP autentifikaci (pokud jsou potřeba).

    Prosíme všimněte si, že volání `open` přes svůj název neotevírá spojení, ale jen konfiguruje požadavek. Síťová aktivita začíná teprve voláním `send`.

3. Pošleme požadavek.

    ```js
    xhr.send([tělo])
    ```

    Tato metoda otevírá spojení a posílá požadavek na server. Nepovinný parametr `tělo` obsahuje tělo požadavku.

    Některé metody požadavků, např. `GET`, nemají žádné tělo. Jiné metody, např. `POST`, používají `tělo` k odeslání dat na server. Příklady uvidíme později.

4. Nasloucháme událostem `xhr`, abychom získali odpověď.

    Nejčastěji se používají tyto tři události:
    - `load` -- když je požadavek dokončen (i když HTTP status je např. 400 nebo 500) a celá odpověď je přijata.
    - `error` -- když se požadavek nepodařilo provést, např. kvůli nefunkční síti nebo špatné URL.
    - `progress` -- spouští se periodicky během stahování odpovědi, oznamuje, kolik bylo staženo.

    ```js
    xhr.onload = function() {
      alert(`Načteno: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // spustí se jen tehdy, když se požadavek vůbec nepovedlo provést
      alert(`Chyba sítě`);
    };

    xhr.onprogress = function(událost) { // spouští se periodicky
      // událost.loaded - kolik bytů bylo staženo
      // událost.lengthComputable = true, pokud server poslal hlavičku Content-Length
      // událost.total - celkový počet bytů (je-li lengthComputable)
      alert(`Získáno ${událost.loaded} z ${událost.total}`);
    };
    ```

Následuje celý příklad. Uvedený kód načítá z URL na `/article/xmlhttprequest/example/load` ze serveru a vypisuje průběh:

```js run
// 1. Vytvoříme nový objekt XMLHttpRequest
let xhr = new XMLHttpRequest();

// 2. Nakonfigurujeme ho: požadavek GET na URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Pošleme požadavek po síti
xhr.send();

// 4. Toto bude voláno po přijetí odpovědi
xhr.onload = function() {
  if (xhr.status != 200) { // analýza HTTP statusu odpovědi
    alert(`Chyba ${xhr.status}: ${xhr.statusText}`); // např. 404: Not Found
  } else { // zobrazení odpovědi
    alert(`Hotovo, přijato ${xhr.response.length} bytů`); // response je odpověď serveru
  }
};

xhr.onprogress = function(událost) {
  if (událost.lengthComputable) {
    alert(`Přijato ${událost.loaded} z ${událost.total} bytů`);
  } else {
    alert(`Přijato ${událost.loaded} bytů`); // není Content-Length
  }

};

xhr.onerror = function() {
  alert("Požadavek neuspěl");
};
```

Jakmile server odpoví, můžeme získat výsledek z následujících vlastností `xhr`:

`status`
: Kód HTTP statusu (číslo): `200`, `404`, `403` a podobně, v případě selhání mimo HTTP může být `0`.

`statusText`
: Zpráva HTTP statusu (řetězec): obvykle `OK` pro `200`, `Not Found` pro `404`, `Forbidden` pro `403` a podobně.

`response` (staré skripty mohou používat `responseText`)
: Tělo odpovědi serveru.

Můžeme také specifikovat časový limit pomocí vlastnosti `timeout`:

```js
xhr.timeout = 10000; // časový limit v ms, 10 sekund
```

Jestliže požadavek během stanovené doby neuspěje, bude zrušen a vyvolá se událost `timeout`.

````smart header="Vyhledávací parametry URL"
K přidání parametrů do URL, např. `?název=hodnota`, a zajištění správného kódování můžeme použít objekt [URL](info:url):

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'otestuj mne!');

// parametr 'q' je zakódován
xhr.open('GET', url); // https://google.com/search?q=otestuj+mne%21
```

````

## Typ odpovědi

K nastavení formátu odpovědi můžeme použít vlastnost `xhr.responseType`:

- `""` (standardně) -- získáme ji jako řetězec,
- `"text"` -- získáme ji jako řetězec,
- `"arraybuffer"` -- získáme ji jako `ArrayBuffer` (pro binární data, viz kapitolu <info:arraybuffer-binary-arrays>),
- `"blob"` -- získáme ji jako `Blob` (pro binární data, viz kapitolu <info:blob>),
- `"document"` -- získáme ji jako XML dokument (můžeme používat XPath a jiné metody XML) nebo HTML dokument (podle MIME typu přijatých dat),
- `"json"` -- získáme ji jako JSON (automaticky se rozparsuje).

Získejme například odpověď jako JSON:

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

// odpověď je {"message": "Hello, world!"}
xhr.onload = function() {
  let objOdpovědi = xhr.response;
  alert(objOdpovědi.message); // Hello, world!
};
```

```smart
Ve starých skriptech můžete najít i vlastnosti `xhr.responseText` a dokonce `xhr.responseXML`.

Ty existují z historických důvodů, abychom získali řetězec anebo XML dokument. V současnosti bychom měli nastavit formát v `xhr.responseType` a načíst `xhr.response`, jak je ukázáno výše.
```

## Stavy připravenosti

`XMLHttpRequest` během zpracování požadavku mění svůj stav. Jeho aktuální stav je k dispozici v `xhr.readyState`.

Všechny stavy podle [specifikace](https://xhr.spec.whatwg.org/#states):

```js
UNSENT = 0; // úvodní stav
OPENED = 1; // voláno open
HEADERS_RECEIVED = 2; // přijaty hlavičky odpovědi
LOADING = 3; // odpověď se načítá (byl přijat datový paket)
DONE = 4; // odpověď kompletní
```

Objekt `XMLHttpRequest` mezi nimi přechází v pořadí `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`. Stav `3` se opakuje pokaždé, když je ze sítě přijat datový paket.

Můžeme je sledovat pomocí události `readystatechange`:

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // načítání
  }
  if (xhr.readyState == 4) {
    // požadavek hotov
  }
};
```

Posluchače události `readystatechange` najdete v zastaralém kódu. Jsou tam z historických důvodů, jelikož v dřívější době neexistovala `load` a jiné události. V dnešní době je vytlačují handlery `load/error/progress`.

## Zrušení požadavku

Požadavek můžeme kdykoli zrušit voláním `xhr.abort()`:

```js
xhr.abort(); // zruší požadavek
```

Tím se vyvolá událost `abort` a `xhr.status` se nastaví na `0`.

## Synchronní požadavky

Pokud je v metodě `open` třetí parametr `async` nastaven na `false`, požadavek se provede synchronně.

Jinými slovy, běh JavaScriptu se při `send()` pozastaví a obnoví se až po přijetí odpovědi. Podobá se to příkazům `alert` nebo `prompt`.

Následuje přepsaný příklad, v němž je třetí parametr `open` nastaven na `false`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/hello.txt', *!*false*/!*);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Chyba ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
} catch(err) { // místo onerror
  alert("Požadavek neuspěl");
}
```

Možná to vypadá dobře, ale synchronní volání se používají jen vzácně, protože blokují JavaScript na stránce, dokud načítání neskončí. V některých prohlížečích přitom není možné rolovat. Jestliže synchronní volání trvá příliš dlouho, prohlížeč může navrhnout zavření „zaseknuté“ stránky.

Pro synchronní požadavky není k dispozici množství pokročilých vlastností `XMLHttpRequest`, například požadavek na jinou doménu nebo nastavení časového limitu. Navíc, jak vidíte, nemůžeme sledovat průběh načítání.

Kvůli tomu všemu se synchronní požadavky používají jen velmi zřídka, téměř vůbec. Nebudeme o nich nadále hovořit.

## HTTP hlavičky

`XMLHttpRequest` umožňuje posílat vlastní hlavičky i číst hlavičky odpovědi.

Pro HTTP hlavičky existují tři metody:

`setRequestHeader(název, hodnota)`
: Nastaví hlavičku požadavku s názvem `název` na hodnotu `hodnota`.

    Příklad:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Omezení hlaviček"
    Některé hlavičky, např. `Referer` a `Host`, jsou spravovány výlučně prohlížečem.
    Jejich úplný seznam najdete ve [specifikaci](https://xhr.spec.whatwg.org/#the-setrequestheader()-method).

    Z důvodů bezpečnosti uživatele a korektnosti požadavku nemá `XMLHttpRequest` dovoleno je měnit.
    ```

    ````warn header="Nemůžeme odstranit hlavičku"
    Další zvláštností `XMLHttpRequest` je, že nemůžeme `setRequestHeader` zrušit.

    Jakmile je hlavička nastavena, je nastavena. Další volání přidají do hlavičky informace, nepřepíší ji.

    Příklad:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // hlavička bude:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(název)`
: Vrátí hlavičku odpovědi s názvem `název` (kromě `Set-Cookie` a `Set-Cookie2`).

    Příklad:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Vrátí všechny hlavičky odpovědi kromě `Set-Cookie` a `Set-Cookie2`.

    Každá hlavička je vrácena na samostatném řádku, například:

    ```http
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    Konce řádků mezi hlavičkami jsou vždy `"\r\n"` (nezávisle na OS), takže můžeme řetězec snadno rozdělit na jednotlivé hlavičky. Oddělovač mezi názvem a hodnotou hlavičky je vždy dvojtečka následovaná mezerou `": "`. To je pevně dáno ve specifikaci.

    Jestliže tedy chceme získat objekt obsahující dvojice název/hodnota, musíme přidat krátký kód v JS.

    Například takto (předpokládáme, že pokud dvě hlavičky mají stejný název, pak druhá přepíše tu první):

    ```js
    let hlavičky = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((výsledek, aktuální) => {
        let [název, hodnota] = aktuální.split(': ');
        výsledek[název] = hodnota;
        return výsledek;
      }, {});

    // hlavičky['Content-Type'] = 'image/png'
    ```

## POST, FormData

K vytvoření požadavku POST můžeme použít zabudovaný objekt [FormData](mdn:api/FormData).

Syntaxe:

```js
let formData = new FormData([form]); // vytvoří objekt, může ho vyplnit z <form>
formData.append(název, hodnota); // přidá pole
```

Vytvoříme ho, můžeme ho vyplnit z formuláře, v případě potřeby přidáme další pole pomocí `append` a pak:

1. `xhr.open('POST', ...)` – použijeme metodu `POST`.
2. `xhr.send(formData)` odešle formulář na server.

Příklad:

```html run refresh
<form name="osoba">
  <input name="name" value="Jan">
  <input name="surname" value="Novák">
</form>

<script>
  // předvyplní FormData z formuláře
  let formData = new FormData(document.forms.person);

  // přidá jedno další pole
  formData.append("middle", "Leoš");

  // odešle data
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
```

Formulář bude poslán v kódování `multipart/form-data`.

Pokud bychom raději chtěli JSON, zavoláme `JSON.stringify` a pošleme ho jako řetězec.

Jen nesmíme zapomenout nastavit hlavičku `Content-Type: application/json`, mnoho programů na serverové straně při ní automaticky dekóduje JSON:

```js
let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  jméno: "Jan",
  příjmení: "Novák"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
```

Metoda `.send(tělo)` je značně všestranná. Dokáže poslat téměř jakékoli `tělo`, včetně objektů `Blob` a `BufferSource`.

## Průběh odesílání

Událost `progress` se spouští jedině ve fázi stahování.

To znamená, že když něco posíláme metodou `POST`, `XMLHttpRequest` nejprve odešle naše data (tělo požadavku) a pak stáhne odpověď.

Jestliže odesíláme něco velkého, bezpochyby nás více zajímá sledování průběhu odesílání. Ale tady nám `xhr.onprogress` nepomůže.

Existuje jiný objekt bez metod, určený ke sledování událostí při odesílání: `xhr.upload`.

Generuje podobné události jako `xhr`, ale `xhr.upload` je spouští výhradně při odesílání:

- `loadstart` -- odesílání začalo.
- `progress` -- spouští se periodicky během odesílání.
- `abort` -- odesílání zrušeno.
- `error` -- chyba mimo HTTP.
- `load` -- odesílání úspěšně dokončeno.
- `timeout` -- vypršel časový limit odesílání (je-li nastavena vlastnost `timeout`).
- `loadend` -- odesílání skončilo, ať už úspěšně nebo s chybou.

Příklad handlerů:

```js
xhr.upload.onprogress = function(událost) {
  alert(`Odesláno ${událost.loaded} z ${událost.total} bytů`);
};

xhr.upload.onload = function() {
  alert(`Odeslání úspěšně dokončeno.`);
};

xhr.upload.onerror = function() {
  alert(`Chyba při odesílání: ${xhr.status}`);
};
```

Následuje příklad z reálného života: odeslání souboru se zobrazováním průběhu:

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(soubor) {
  let xhr = new XMLHttpRequest();

  // sledujeme průběh odesílání
*!*
  xhr.upload.onprogress = function(událost) {
    console.log(`Odesláno ${událost.loaded} z ${událost.total}`);
  };
*/!*

  // konec sledování: úspěch nebo chyba
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("úspěch");
    } else {
      console.log("chyba " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(soubor);
}
</script>
```

## Požadavky na jiný původ

`XMLHttpRequest` dokáže vytvářet požadavky na jiný původ. Používá stejnou politiku CORS jako [fetch](info:fetch-crossorigin).

Stejně jako `fetch` standardně neposílá na jiný původ cookies a HTTP autorizaci. Povolíme to tak, že nastavíme `xhr.withCredentials` na `true`:

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://kdekoli.com/request');
...
```

Podrobnosti o hlavičkách jiného původu naleznete v kapitole <info:fetch-crossorigin>.


## Shrnutí

Typický kód požadavku GET s `XMLHttpRequest`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP chyba?
    // zpracování chyby
    alert( 'Chyba: ' + xhr.status);
    return;
  }

  // získáme odpověď z xhr.response
};

xhr.onprogress = function(událost) {
  // oznámíme průběh
  alert(`Načteno ${událost.loaded} z ${událost.total}`);
};

xhr.onerror = function() {
  // zpracování chyby mimo HTTP (např. nedostupné sítě)
};
```

Událostí existuje ve skutečnosti více, jejich seznam uvádí [moderní specifikace](https://xhr.spec.whatwg.org/#events) (v pořadí, v jakém se objeví):

- `loadstart` -- požadavek začal.
- `progress` -- byl přijat datový paket odpovědi, celé dosud přijaté tělo odpovědi je v `response`.
- `abort` -- požadavek byl zrušen voláním `xhr.abort()`.
- `error` -- nastala chyba spojení, např. špatný název domény. Pro HTTP chyby, např. 404, se nevyvolává.
- `load` -- požadavek byl úspěšně dokončen.
- `timeout` -- požadavek byl zrušen kvůli vypršení časového limitu (stane se jen tehdy, když byl limit nastaven).
- `loadend` -- spustí se po `load`, `error`, `timeout` nebo `abort`.

Události `error`, `abort`, `timeout` a `load` se vzájemně vylučují. Může nastat pouze jedna z nich.

Nejčastěji se používají události dokončení načítání (`load`), selhání načítání (`error`), nebo můžeme použít jediný handler `loadend` a ověřovat v něm vlastnosti objektu požadavku `xhr`, abychom viděli, co se stalo.

Už jsme viděli i jinou událost: `readystatechange`. Historicky se objevila před dlouhou dobou, než se ustálila specifikace. V dnešní době není nutné ji používat, můžeme ji nahradit novějšími událostmi, ale ve starších skriptech ji často můžeme najít.

Pokud potřebujeme sledovat specificky odesílání, měli bychom naslouchat stejným událostem na objektu `xhr.upload`.
