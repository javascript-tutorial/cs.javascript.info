# Načítání zdrojů: onload a onerror

Prohlížeč nám umožňuje sledovat načítání externích zdrojů -- skriptů, vnitřních rámů, obrázků a jiných.

K tomu slouží dvě události:

- `onload` -- úspěšné načtení,
- `onerror` -- došlo k chybě.

## Načítání skriptu

Řekněme, že potřebujeme načíst skript třetí strany a zavolat funkci, která je v něm obsažena.

Můžeme jej načíst dynamicky, například:

```js
let skript = document.createElement('script');
skript.src = "my.js";

document.head.append(skript);
```

...Jak ale spustit funkci, která je deklarována uvnitř tohoto skriptu? Musíme počkat, než se skript načte, a teprve pak ji můžeme volat.

```smart
Pro naše vlastní skripty bychom zde mohli použít [JavaScriptové moduly](info:modules), ale knihovny třetích stran je příliš široce nepřijímají.
```

### script.onload

Hlavním pomocníkem je událost `load`, která se spustí poté, co je skript načten a vykonán.

Příklad:

```js run untrusted
let skript = document.createElement('script');

// můžeme načíst jakýkoli skript z jakékoli domény
skript.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(skript);

*!*
skript.onload = function() {
  // skript vytvoří proměnnou "_"
  alert( _.VERSION ); // zobrazí verzi knihovny
};
*/!*
```

V `onload` tedy můžeme používat proměnné skriptu, spouštět jeho funkce a podobně.

...A co když načítání selže? Například když takový skript neexistuje (chyba 404) nebo server je mimo provoz (nedostupný).

### script.onerror

Chyby, která nastávají během načítání skriptu, můžeme sledovat v události `error`.

Vyžádejme si například skript, který neexistuje:

```js run
let skript = document.createElement('script');
skript.src = "https://example.com/404.js"; // takový skript neexistuje
document.head.append(skript);

*!*
skript.onerror = function() {
  alert("Chyba při načítání " + this.src); // Chyba při načítání https://example.com/404.js
};
*/!*
```

Prosíme všimněte si, že tady nemůžeme získat podrobnosti o HTTP chybě. Nevíme, zda to byla chyba 404, 500 nebo nějaká jiná. Víme jen to, že načítání neuspělo.

```warn
Události `onload`/`onerror` sledují pouze samotné načítání.

Chyby, které mohou nastat při zpracování a výkonu skriptu, jsou mimo dosah těchto událostí. To znamená, že jestliže se skript načte úspěšně, `onload` se spustí i tehdy, když v něm jsou programové chyby. Pro sledování chyb ve skriptech můžeme použít globální handler `window.onerror`.
```

## Jiné zdroje

Události `load` a `error` fungují i pro jiné zdroje, v zásadě pro každý zdroj, který obsahuje externí `src`.

Příklad:

```js run
let obrázek = document.createElement('img');
obrázek.src = "https://js.cx/clipart/train.gif"; // (*)

obrázek.onload = function() {
  alert(`Obrázek načten, velikost ${obrázek.width}x${obrázek.height}`);
};

obrázek.onerror = function() {
  alert("Při načítání obrázku došlo k chybě");
};
```

Jsou tady však některé zvláštnosti:

- Většina zdrojů se začne načítat ve chvíli, kdy jsou přidány do dokumentu. Výjimkou je však `<img>`, který se začne načítat, když obdrží zdroj `(*)`.
- Pro `<iframe>` se událost `iframe.onload` spustí vždy, když skončilo načítání vnitřního rámu, a to jak při úspěšném načtení, tak v případě chyby.

Je tomu tak z historických důvodů.

## Politika jiného původu

Platí pravidlo, že skripty z jednoho webového sídla nemohou přistupovat k obsahu z jiného sídla. Například skript na `https://facebook.com` nemůže přečíst uživatelovu poštovní schránku na `https://gmail.com`.

Nebo, přesněji řečeno, z jednoho původu (trojice doména/port/protokol) nelze přistupovat k obsahu jiného původu. I když tedy máme subdoménu nebo jen jiný port, jsou to odlišné původy, které nemají přístup k sobě navzájem.

Toto pravidlo má vliv i na zdroje z jiných domén.

Jestliže používáme skript z jiné domény a v něm je chyba, nemůžeme o ní získat podrobnosti.

Vezměme například skript `error.js`, který se skládá z jediného (špatného) volání funkce:
```js
// 📁 error.js
takováFunkceNení();
```

Nyní jej načteme ze stejného sídla, na němž je umístěn:

```html run height=0
<script>
window.onerror = function(zpráva, url, řádek, sloupec, objektChyby) {
  alert(`${zpráva}\n${url}, ${řádek}:${sloupec}`);
};
</script>
<script src="/article/onload-onerror/crossorigin/error.js"></script>
```

Vidíme pěkné chybové hlášení, například:

```
Uncaught ReferenceError: takováFunkceNení is not defined
https://javascript.info/article/onload-onerror/crossorigin/error.js, 1:1
```

Teď načteme stejný skript z jiné domény:

```html run height=0
<script>
window.onerror = function(zpráva, url, řádek, sloupec, objektChyby) {
  alert(`${zpráva}\n${url}, ${řádek}:${sloupec}`);
};
</script>
<script src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

Hlášení je odlišné, například:

```
Script error.
, 0:0
```

Podrobnosti se mohou na různých prohlížečích lišit, ale myšlenka je stejná: jakékoli informace o vnitřních záležitostech skriptu, včetně zásobníku volání při chybě, jsou skryty. Právě proto, že skript pochází z jiné domény.

Co když potřebujeme podrobnosti o chybě?

Existuje mnoho služeb (můžeme si vytvořit i svou vlastní), které naslouchají globálním chybám pomocí `window.onerror`, ukládají je a poskytují rozhraní pro přístup k nim a jejich analýzu. To je skvělé, jelikož vidíme skutečné chyby, které vyvolali naši uživatelé. Pokud však skript pochází z jiného původu, nemáme o jeho chybách mnoho informací, jak jsme právě viděli.

Podobná politika jiného původu (cross-origin policy, CORS) je vyžadována i pro ostatní druhy zdrojů.

**Abychom umožnili přístup na jiný původ, značka `<script>` musí mít atribut `crossorigin` a vzdálený server navíc musí poskytovat speciální hlavičky.**

Přístup na jiný původ má tři úrovně:

1. **Atribut `crossorigin` není uveden** -- přístup zakázán.
2. **`crossorigin="anonymous"`** -- přístup povolen, jestliže odpověď serveru obsahuje hlavičku `Access-Control-Allow-Origin` obsahující `*` nebo náš původ. Prohlížeč neposílá na vzdálený server autorizační informace ani cookies.
3. **`crossorigin="use-credentials"`** -- přístup povolen, jestliže server pošle zpět hlavičku `Access-Control-Allow-Origin` obsahující náš původ a hlavičku `Access-Control-Allow-Credentials: true`. Prohlížeč posílá na vzdálený server autorizační informace a cookies.

```smart
Další informace o přístupu na jiný původ si můžete přečíst v kapitole <info:fetch-crossorigin>. Ta sice popisuje metodu `fetch` pro síťové požadavky, ale její politika je naprosto stejná.

„Cookies“ a podobné věci jsou momentálně mimo náš rámec, ale můžete si o nich přečíst v kapitole <info:cookie>.
```

V našem případě jsme neměli atribut `crossorigin`, proto byl přístup na jiný původ zakázán. Přidejme ho.

Můžeme si vybrat mezi `"anonymous"` (neposílají se cookies, potřebujeme od serveru jednu hlavičku) a `"use-credentials"` (posílají se i cookies, potřebujeme od serveru dvě hlavičky).

Pokud nás nezajímají cookies, vydáme se cestou `"anonymous"`:

```html run height=0
<script>
window.onerror = function(zpráva, url, řádek, sloupec, objektChyby) {
  alert(`${zpráva}\n${url}, ${řádek}:${sloupec}`);
};
</script>
<script *!*crossorigin="anonymous"*/!* src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

Za předpokladu, že server poskytne hlavičku `Access-Control-Allow-Origin`, je nyní vše v pořádku. Máme úplné chybové hlášení.

## Shrnutí

Obrázky `<img>`, externí styly, skripty a jiné zdroje poskytují události `load` a `error`, které umožňují sledovat jejich načítání:

- `load` se spustí při úspěšném načtení,
- `error` se spustí při neúspěšném načtení.

Jedinou výjimku představuje `<iframe>`: z historických důvodů se na něm vždy spustí `load`, ať načítání dopadne jakkoli, i když stránka nebude nalezena.

Pro zdroje funguje i událost `readystatechange`, ale používá se zřídka, jelikož události `load/error` jsou jednodušší.
