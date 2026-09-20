
# API metody fetch

O metodě `fetch` jsme se už leccos dozvěděli.

Podívejme se nyní na zbytek API, abychom probrali všechny její možnosti.

```smart
Prosíme všimněte si, že většina zde uvedených voleb se používá jen vzácně. Metodu `fetch` budete moci správně používat, i když tuto kapitolu přeskočíte.

Je však dobré vědět, co všechno `fetch` umí, a v případě potřeby se sem vrátit a přečíst si podrobnosti.
```

Následující seznam obsahuje všechny volby `fetch` spolu s jejich standardními hodnotami (alternativy jsou uvedeny v komentářích):

```js
let příslib = fetch(url, {
  method: "GET", // POST, PUT, DELETE, atd.
  headers: {
    // hodnota hlavičky s typem obsahu se obvykle nastavuje automaticky
    // v závislosti na těle požadavku
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined, // řetězec, FormData, Blob, BufferSource nebo URLSearchParams
  referrer: "about:client", // nebo "", aby nebyla poslána žádná hlavička Referer,
  // nebo URL z aktuálního původu
  referrerPolicy: "strict-origin-when-cross-origin", // no-referrer-when-downgrade, no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache nebo only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // kontrolní součet, např. "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController pro zastavení požadavku
  window: window // null
});
```

Úctyhodný seznam, že?

V kapitole <info:fetch> jsme podrobně probrali `method`, `headers` a `body`.

V kapitole <info:fetch-abort> jsme probrali volbu `signal`.

Nyní prozkoumejme ostatní volby.

## referrer, referrerPolicy

Tyto volby stanovují způsob, jak `fetch` nastavuje HTTP hlavičku `Referer`.

Tato hlavička je obvykle nastavována automaticky a obsahuje URL stránky, která vytvořila požadavek. Ve většině scénářů není vůbec důležitá, ale někdy z bezpečnostních důvodů má smysl ji odstranit nebo zkrátit.

**Volba `referrer` umožňuje nastavit libovolný `Referer` (v rámci aktuálního původu) nebo jej odstranit.**

Nechceme-li poslat žádný referer, nastavíme prázdný řetězec:
```js
fetch('/page', {
*!*
  referrer: "" // bez hlavičky Referer
*/!*
});
```

Chceme-li nastavit jinou URL uvnitř aktuálního původu:

```js
fetch('/page', {
  // předpokládejme, že jsme na https://javascript.info
  // můžeme nastavit jakoukoli hlavičku Referer, ale jen uvnitř aktuálního původu
*!*
  referrer: "https://javascript.info/jinastranka"
*/!*
});
```

**Volba `referrerPolicy` nastavuje obecná pravidla pro `Referer`.**

Požadavky se dělí na tři druhy:

1. Požadavky na stejný původ.
2. Požadavky na jiný původ.
3. Požadavky z HTTPS na HTTP (z bezpečného protokolu na méně bezpečný).

Na rozdíl od volby `referrer`, která umožňuje hodnotu `Referer` přesně nastavit, `referrerPolicy` sděluje prohlížeči obecná pravidla pro všechny druhy požadavků.

Možné hodnoty jsou popsány ve [specifikaci politiky refereru](https://w3c.github.io/webappsec-referrer-policy/):

- **`"strict-origin-when-cross-origin"`** -- standardní hodnota: na stejný původ se posílá úplný `Referer`, na jiný původ se posílá jen původ, při požadavku HTTPS→HTTP se neposílá nic.
- **`"no-referrer-when-downgrade"`** -- vždy se posílá úplný `Referer` s výjimkou požadavků z HTTPS na HTTP (na méně bezpečný protokol).
- **`"no-referrer"`** -- `Referer` se nikdy neposílá.
- **`"origin"`** -- v `Referer` se posílá jen původ a ne celé URL stránky, např. jen `http://site.com` místo `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- na stejný původ se posílá úplný `Referer`, ale u požadavků jiného původu jen původ (stejně jako výše).
- **`"same-origin"`** -- na stejný původ se posílá úplný `Referer`, ale u požadavků jiného původu se `Referer` neposílá.
- **`"strict-origin"`** -- posílá se jen původ, u požadavků HTTPS→HTTP se `Referer` neposílá.
- **`"unsafe-url"`** -- v `Referer` se vždy posílá celá URL, i u požadavků HTTPS→HTTP.

Následující tabulka obsahuje všechny kombinace:

| Hodnota | Na stejný původ | Na jiný původ | HTTPS→HTTP |
|-------|----------------|-------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` | úplný | úplný | - |
| `"origin"` | původ | původ | původ |
| `"origin-when-cross-origin"` | úplný | původ | původ |
| `"same-origin"` | úplný | - | - |
| `"strict-origin"` | původ | původ | - |
| `"strict-origin-when-cross-origin"` nebo `""` (standardně) | úplný | původ | - |
| `"unsafe-url"` | úplný | úplný | úplný |

Řekněme, že máme administrátorskou zónu se strukturou URL, která by neměla být vidět mimo toto sídlo.

Jestliže pošleme `fetch`, standardně pošle vždy hlavičku `Referer` s celou URL naší stránky (kromě požadavků z HTTPS na HTTP, které hlavičku `Referer` nebudou obsahovat).

Například `Referer: https://javascript.info/admin/secret/paths`.

Pokud bychom chtěli, aby jiná webová sídla znala jen původ a ne celou URL cestu, můžeme nastavit:

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

Můžeme to umístit do všech volání `fetch` nebo třeba integrovat do JavaScriptové knihovny našeho projektu, která provádí všechny požadavky, a použít `fetch` v ní.

Jediný rozdíl oproti standardnímu chování spočívá v tom, že na požadavky jiného původu `fetch` posílá jen částečnou URL obsahující jen původ (např. `https://javascript.info` bez cesty). Pro požadavky na náš původ budeme stále mít úplný `Referer` (což může být užitečné pro účely ladění).

```smart header="Politika refereru není jen pro `fetch`"
Politika refereru, popsaná ve [specifikaci](https://w3c.github.io/webappsec-referrer-policy/), neslouží jen pro metodu `fetch`, ale je globálnější.

Konkrétně je možné nastavit standardní politiku pro celou stránku pomocí HTTP hlavičky `Referrer-Policy` nebo v jednotlivých odkazech pomocí `<a rel="noreferrer">`.
```

## mode

Volba `mode` je zabezpečení, které brání nechtěným požadavkům jiného původu:

- **`"cors"`** -- standardně, požadavky jiného původu jsou povoleny, jak je popsáno v kapitole <info:fetch-crossorigin>,
- **`"same-origin"`** -- požadavky jiného původu jsou zakázány,
- **`"no-cors"`** -- jsou povoleny jen bezpečné požadavky jiného původu.

Tato volba může být užitečná, když URL pro `fetch` pochází od třetí strany a my bychom chtěli „vypínač“, který omezí možnosti posílání požadavků jiného původu.

## credentials

Volba `credentials` specifikuje, zda má `fetch` v požadavku posílat cookies a hlavičky pro HTTP autorizaci.

- **`"same-origin"`** -- standardně, neposílají se v požadavcích jiného původu,
- **`"include"`** -- vždy se posílají, od serveru jiného původu vyžaduje `Access-Control-Allow-Credentials`, aby JavaScript mohl přistupovat k odpovědi, bylo to vysvětleno v kapitole <info:fetch-crossorigin>,
- **`"omit"`** -- nikdy se neposílají, ani v požadavcích stejného původu.

## cache

Standardně požadavky `fetch` využívání standardní HTTP mezipaměť. To znamená, že respektují hlavičky `Expires` a `Cache-Control`, posílají `If-Modified-Since` a podobně, stejně jako běžné HTTP požadavky.

Volba `cache` umožňuje HTTP mezipaměť ignorovat nebo vyladit její používání:

- **`"default"`** -- `fetch` používá standardní pravidla a hlavičky pro HTTP mezipaměť,
- **`"no-store"`** -- HTTP mezipaměť se zcela ignoruje, tento režim se stane standardním, jestliže nastavíme hlavičku `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match` nebo `If-Range`,
- **`"reload"`** -- nepřebírá výsledek z HTTP mezipaměti (pokud tam je), ale umístí do mezipaměti odpověď (pokud hlavičky odpovědi tuto akci povolí),
- **`"no-cache"`** -- pokud je odpověď v mezipaměti, vytvoří podmíněný požadavek, jinak vytvoří běžný požadavek. Umístí odpověď do HTTP mezipaměti,
- **`"force-cache"`** -- použije odpověď z HTTP mezipaměti, i když je stará. Pokud v HTTP mezipaměti není odpověď, vytvoří běžný HTTP požadavek a chová se jako obvykle,
- **`"only-if-cached"`** -- použije odpověď z HTTP mezipaměti, i když je stará. Pokud v HTTP mezipaměti není odpověď, nastane chyba. Funguje jen tehdy, když je `mode` nastaven na `"same-origin"`.

## redirect

Za normálních okolností `fetch` průhledně následuje HTTP přesměrování, např. 301, 302 atd.

Volba `redirect` to umožňuje změnit:

- **`"follow"`** -- standardní, HTTP přesměrování je následováno,
- **`"error"`** -- v případě HTTP přesměrování nastane chyba,
- **`"manual"`** -- umožňuje zpracovat HTTP přesměrování ručně. V případě přesměrování obdržíme speciální objekt odpovědi, který obsahuje `odpověď.type="opaqueredirect"` a nulový nebo prázdný status a většinu dalších vlastností.

## integrity

Volba `integrity` umožňuje zkontrolovat, zda odpověď odpovídá předem známému kontrolnímu součtu.

Jak je popsáno ve [specifikaci](https://w3c.github.io/webappsec-subresource-integrity/), podporované hashovací funkce jsou SHA-256, SHA-384 a SHA-512. V závislosti na prohlížeči mohou být i další.

Například stahujeme soubor a víme, že jeho kontrolní součet SHA-256 je „abcdef“ (skutečný kontrolní součet by samozřejmě byl delší).

Můžeme jej umístit do volby `integrity` následovně:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

Pak `fetch` vypočítá SHA-256 sama o sobě a porovná ji s naším řetězcem. V případě neshody nastane chyba.

## keepalive

Volba `keepalive` oznamuje, že požadavek může „přežít“ webovou stránku, která jej vyvolala.

Například shromažďujeme statistiku o tom, jak aktuální návštěvník využívá naši stránku (jak kliká myší, které části stránky si zobrazuje), abychom uživatelské zkušenosti analyzovali a vylepšovali.

Když návštěvník naši stránku opustí, chtěli bychom uložit data na server.

Můžeme k tomu využít událost `window.onunload`:

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

Za normálních okolností, když je dokument odstraněn, všechny síťové požadavky k němu příslušející jsou zastaveny. Avšak volba `keepalive` říká prohlížeči, aby provedl požadavek v pozadí, i když návštěvník opustil stránku. Tato volba je tedy pro úspěch našeho požadavku klíčová.

Má několik omezení:

- Nemůžeme posílat megabyty dat: velikost těla u požadavků s `keepalive` je omezena na 64 KB.
    - Pokud potřebujeme shromažďovat velké množství statistických dat o návštěvě, měli bychom je odesílat pravidelně v paketech, aby jich na poslední požadavek `onunload` nezbylo příliš mnoho.
    - Tento limit platí pro všechny požadavky s `keepalive` dohromady. Jinými slovy, můžeme provádět více požadavků s `keepalive` současně, ale součet délek jejich těl by neměl překročit 64 KB.
- Pokud je dokument odstraněn, nemůžeme zpracovat odpověď serveru. V našem příkladu tedy `fetch` díky `keepalive` uspěje, ale další funkce již nebudou fungovat.
    - Ve většině případů, například při odesílání statistik, to není problém, jelikož server jenom přijme data a obvykle na takové požadavky odešle prázdnou odpověď.
