
# Objekty URL

Zabudovaná třída [URL](https://url.spec.whatwg.org/#api) poskytuje vhodné rozhraní pro vytváření a parsování URL adres.

Žádná metoda pro práci se sítí nevyžaduje přímo `URL` objekt, všem postačují řetězce. Technicky tedy nemusíme `URL` používat. Někdy však může být opravdu nápomocná.

## Vytvoření URL

Syntaxe pro vytvoření nového `URL` objektu je následující:

```js
new URL(url, [báze])
```

- **`url`** -- úplná URL nebo cesta (pokud je nastavena báze, viz níže),
- **`báze`** -- nepovinná bázová URL: pokud je nastavena a argument `url` obsahuje pouze cestu, pak se URL vygeneruje relativně vůči `báze`.

Příklad:

```js
let url = new URL('https://javascript.info/profile/admin');
```

Tyto dvě URL jsou stejné:

```js run
let url1 = new URL('https://javascript.info/profile/admin');
let url2 = new URL('/profile/admin', 'https://javascript.info');

alert(url1); // https://javascript.info/profile/admin
alert(url2); // https://javascript.info/profile/admin
```

Můžeme snadno vytvořit novou URL z relativní cesty vzhledem k existující URL:

```js run
let url = new URL('https://javascript.info/profile/admin');
let nováURL = new URL('tester', url);

alert(nováURL); // https://javascript.info/profile/tester
```

Objekt `URL` nám umožňuje okamžitě přistupovat ke svým komponentám, takže je to pěkný způsob, jak parsovat URL, například:

```js run
let url = new URL('https://javascript.info/url');

alert(url.protocol); // https:
alert(url.host);     // javascript.info
alert(url.pathname); // /url
```

Zde je přehled komponent URL:

![](url-object.svg)

- `href` je úplná URL, totéž jako `url.toString()`
- `protocol` končí dvojtečkou `:`
- `search` - řetězec parametrů, začíná otazníkem `?`
- `hash` začíná znakem hashe `#`
- pokud je přítomna HTTP autentifikace, mohou tam být i vlastnosti `user` (uživatel) a `password` (heslo): `http://login:password@site.com` (v přehledu nezobrazeno, používá se zřídka).


```smart header="Objekty `URL` můžeme předávat do síťových (a většiny jiných) metod místo řetězců"
Objekt `URL` můžeme používat ve `fetch` nebo `XMLHttpRequest`, téměř všude, kde je očekáván řetězec s URL.

Obecně může být objekt `URL` předán do libovolné metody místo řetězce. Většina metod provádí konverzi na řetězec, která převede objekt `URL` na řetězec s úplnou URL.
```

## SearchParams „?...“

Dejme tomu, že chceme vytvořit URL se zadanými vyhledávacími parametry, například `https://google.com/search?query=JavaScript`.

Můžeme je poskytnout v řetězci URL:

```js
new URL('https://google.com/search?query=JavaScript')
```

...Parametry však musejí být zakódovány, jestliže obsahují mezery, nelatinská písmena a podobně (podrobnosti dále).

K tomu slouží URL vlastnost: `url.searchParams`, objekt typu [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams).

Ten poskytuje vhodné metody pro vyhledávací parametry:

- **`append(název, hodnota)`** -- přidá parametr s názvem `název`,
- **`delete(název)`** -- odstraní parametr s názvem `název`,
- **`get(název)`** -- vrátí parametr s názvem `název`,
- **`getAll(název)`** -- vrátí všechny parametry s názvem `název` (to je dovoleno, např. `?uživatel=Jan&uživatel=Petr`),
- **`has(název)`** -- ověří existenci parametru s názvem `název`,
- **`set(název, hodnota)`** -- nastaví nebo nahradí parametr s názvem `název`,
- **`sort()`** -- seřadí parametry podle názvů, potřebná jen zřídka,
- ...a je také iterovatelný, podobně jako `Map`.

Příklad s parametry, které obsahují mezery a interpunkční znaménka:

```js run
let url = new URL('https://google.com/search');

url.searchParams.set('q', 'otestuj mne!'); // přidán parametr s mezerou a vykřičníkem !

alert(url); // https://google.com/search?q=otestuj+mne%21

url.searchParams.set('tbs', 'qdr:y'); // přidán parametr s dvojtečkou :

// parametry se automaticky zakódují
alert(url); // https://google.com/search?q=otestuj+mne%21&tbs=qdr%3Ay

// iterace nad vyhledávacími parametry (dekódovanými)
for(let [název, hodnota] of url.searchParams) {
  alert(`${název}=${hodnota}`); // q=otestuj mne!, pak tbs=qdr:y
}
```


## Kódování

Znaky, které jsou v URL povoleny a které ne, definuje standard [RFC3986](https://tools.ietf.org/html/rfc3986).

Ty, které nejsou povoleny, například nelatinská písmena a mezery, musejí být zakódovány -- nahrazeny svými UTF-8 kódy s předponou `%`, např. `%20` (mezeru lze z historických důvodů zakódovat jako `+`, ale to je výjimka).

Dobrá zpráva je, že objekty `URL` to automaticky ošetřují. Stačí předat všechny parametry nezakódované a pak převést `URL` na řetězec:

```js run
// v tomto příkladu použijeme některé znaky z kyrilice

let url = new URL('https://ru.wikipedia.org/wiki/Тест');

url.searchParams.set('key', 'ъ');
alert(url); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
```

Jak vidíte, byly zakódovány `Тест` v URL cestě i `ъ` v parametru.

URL se prodloužila, neboť každé písmeno kyrilice je v UTF-8 reprezentováno dvěma byty, a tak pro ně byly vytvořeny dvě entity `%..`.

### Kódování řetězců

V dřívějších dobách, než se objevily objekty `URL`, lidé používali pro URL řetězce.

V současnosti jsou objekty `URL` často vhodnější, ale stále je možné používat i řetězce. V mnoha případech při použití řetězců dostaneme kratší kód.

Pokud však používáme řetězce, musíme speciální znaky zakódovat a dekódovat ručně.

K tomu slouží zabudované funkce:

- [encodeURI](mdn:/JavaScript/Reference/Global_Objects/encodeURI) - zakóduje URL jako celek.
- [decodeURI](mdn:/JavaScript/Reference/Global_Objects/decodeURI) - dekóduje ji zpět.
- [encodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/encodeURIComponent) - zakóduje URL komponentu, např. vyhledávací parametr, kontrolní součet nebo cestu.
- [decodeURIComponent](mdn:/JavaScript/Reference/Global_Objects/decodeURIComponent) - dekóduje ji zpět.

Naskýtá se přirozená otázka: „Jaký je rozdíl mezi `encodeURIComponent` a `encodeURI`? Kdy bychom měli kterou z nich použít?"

Snadno tomu porozumíme, když se podíváme na URL, která je rozdělena na komponenty ve výše uvedeném obrázku:

```
https://site.com:8080/path/page?p1=v1&p2=v2#hash
```

Jak vidíme, znaky jako `:`, `?`, `=`, `&`, `#` jsou v URL povoleny.

...Naproti tomu když se podíváme na samostatnou URL komponentu, např. vyhledávací parametr, tyto znaky musejí být zakódovány, aby se nerozbilo formátování.

- `encodeURI` zakóduje pouze znaky, které jsou v URL zcela zakázány.
- `encodeURIComponent` zakóduje tytéž znaky a navíc ještě znaky `#`, `$`, `&`, `+`, `,`, `/`, `:`, `;`, `=`, `?` a `@`.

Pro celou URL tedy můžeme použít `encodeURI`:

```js run
// použijeme v URL cestě znaky z kyrilice
let url = encodeURI('http://site.com/привет');

alert(url); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82
```

...Zatímco pro URL parametry bychom místo ní měli použít `encodeURIComponent`:

```js run
let hudba = encodeURIComponent('Rock&Roll');

let url = `https://google.com/search?q=${hudba}`;
alert(url); // https://google.com/search?q=Rock%26Roll
```

Srovnejte si to s `encodeURI`:

```js run
let hudba = encodeURI('Rock&Roll');

let url = `https://google.com/search?q=${hudba}`;
alert(url); // https://google.com/search?q=Rock&Roll
```

Jak vidíme, `encodeURI` nezakódovala `&`, protože to je v celé URL legitimní znak.

Uvnitř vyhledávacího parametru bychom však měli `&` zakódovat, jinak dostaneme `q=Rock&Roll` - což je ve skutečnosti `q=Rock` plus nějaký obskurní parametr `Roll`. To není to, co jsme zamýšleli.

Pro každý vyhledávací parametr bychom tedy měli používat jen `encodeURIComponent`, aby jej do URL řetězce vložila korektně. Nejbezpečnějším způsobem je zakódovat název i hodnotu, pokud si nejsme absolutně jisti, že obsahují výhradně povolené znaky.

````smart header="Rozdíl v kódování oproti `URL`"
Třídy [URL](https://url.spec.whatwg.org/#url-class) a [URLSearchParams](https://url.spec.whatwg.org/#interface-urlsearchparams) jsou založeny na nejnovější specifikaci URI: [RFC3986](https://tools.ietf.org/html/rfc3986), zatímco funkce `encode*` jsou založeny na zastaralé verzi [RFC2396](https://www.ietf.org/rfc/rfc2396.txt).

Je mezi nimi několik rozdílů, např. IPv6 adresy se zakódují odlišně:

```js run
// platná URL s IPv6 adresou
let url = 'http://[2607:f8b0:4005:802::1007]/';

alert(encodeURI(url)); // http://%5B2607:f8b0:4005:802::1007%5D/
alert(new URL(url)); // http://[2607:f8b0:4005:802::1007]/
```

Jak vidíme, `encodeURI` nahradila hranaté závorky `[...]`, což není korektní. Důvodem je, že IPv6 URL v době vzniku RFC2396 (srpen 1998) ještě neexistovaly.

Takové případy jsou však vzácné, většinou funkce `encode*` fungují správně.
````
