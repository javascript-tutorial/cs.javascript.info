# Objekty localStorage, sessionStorage

Webové ukládací objekty `localStorage` a `sessionStorage` umožňují ukládat v prohlížeči dvojice klíč/hodnota.

Zajímavé na nich je to, že data přežijí znovunačtení stránky (u `sessionStorage`) a dokonce kompletní restart prohlížeče (u `localStorage`). Velmi brzy to uvidíme.

K čemu jsou další objekty, když už máme cookies?

- Na rozdíl od cookies nejsou webové ukládací objekty s každým požadavkem odesílány na server. Z toho důvodu do nich můžeme uložit mnohem více dat. Většina moderních prohlížečů dovoluje nejméně 5 megabytů dat (nebo více) a umožňuje to konfigurovat ve svých nastaveních.
- Rovněž na rozdíl od cookies nemůže server manipulovat s ukládacími objekty pomocí HTTP hlaviček. Všechno se provádí v JavaScriptu.
- Úložiště je vázáno na původ (trojice doména/protokol/port). To znamená, že různé protokoly nebo subdomény vytvářejí různé ukládací objekty a nemohou vzájemně přistupovat ke svým datům.

Oba ukládací objekty poskytují stejné metody a vlastnosti:

- `setItem(klíč, hodnota)` -- uloží dvojici klíč/hodnota.
- `getItem(klíč)` -- vrátí hodnotu podle klíče.
- `removeItem(klíč)` -- odstraní klíč s jeho hodnotou.
- `clear()` -- vymaže vše.
- `key(index)` -- vrátí klíč na zadané pozici.
- `length` -- počet uložených dvojic.

Jak vidíte, podobají se kolekci `Map` (`setItem/getItem/removeItem`), ale navíc umožňují přístup podle indexu metodou `key(index)`.

Podívejme se, jak to funguje.

## Demo pro localStorage

Hlavní vlastnosti `localStorage` jsou:

- Je sdílen mezi všemi záložkami a okny stejného původu.
- Data neexpirují. Zůstanou uložena po restartu prohlížeče a dokonce i po restartu operačního systému.

Když si například spustíte tento kód...

```js run
localStorage.setItem('test', 1);
```

...a zavřete a pak otevřete prohlížeč nebo jen otevřete stejnou stránku v jiném okně, můžete získat uložená data takto:

```js run
alert( localStorage.getItem('test') ); // 1
```

Musíme jen být na stejném původu (doména/protokol/port), URL cesta se může lišit.

Objekt `localStorage` sdílejí všechna okna se stejným původem, takže pokud nastavíme data v jednom okně, změna bude viditelná i v ostatních.

## Objektový přístup

Načítat a ukládat klíče můžeme i čistě objektovým přístupem, například:

```js run
// uložení klíče
localStorage.test = 2;

// načtení klíče
alert( localStorage.test ); // 2

// odstranění klíče
delete localStorage.test;
```

Z historických důvodů je to dovoleno a většinou to funguje, ale obecně se to nedoporučuje, protože:

1. Jestliže je klíč generován uživatelem, může jím být cokoli, např. `length`, `toString` nebo název jiné zabudované metody `localStorage`. V takovém případě `getItem/setItem` fungují dobře, ale objektový přístup selže:

    ```js run
    let klíč = 'length';
    localStorage[klíč] = 5; // Chyba, nelze nastavit vlastnost length
    ```

2. Existuje událost `storage`, která se spustí při změně dat. Při objektovém přístupu se tato událost nespustí. Uvidíme to později v této kapitole.

## Cyklus nad klíči

Jak jsme viděli, tyto metody poskytují funkcionalitu „načti/ulož/odstraň klíč“. Ale jak získat všechny uložené hodnoty nebo klíče?

Naneštěstí ukládací objekty nejsou iterovatelné.

Jedním způsobem je procházet je v cyklu jako pole:

```js run
for(let i=0; i<localStorage.length; i++) {
  let klíč = localStorage.key(i);
  alert(`${klíč}: ${localStorage.getItem(klíč)}`);
}
```

Dalším způsobem je použít cyklus `for klíč in localStorage`, stejně jako u běžných objektů.

Ten iteruje nad klíči, ale také vypíše několik zabudovaných polí, která nepotřebujeme:

```js run
// špatný pokus
for(let klíč in localStorage) {
  alert(klíč); // zobrazí getItem, setItem a jiné zabudované věci
}
```

...Musíme tedy buď odfiltrovat pole z prototypu kontrolou `hasOwnProperty`:

```js run
for(let klíč in localStorage) {
  if (!localStorage.hasOwnProperty(klíč)) {
    continue; // přeskakuje klíče jako "setItem", "getItem" atd.
  }
  alert(`${klíč}: ${localStorage.getItem(klíč)}`);
}
```

...Nebo prostě načíst „vlastní“ klíče pomocí `Object.keys` a pak nad nimi spustit cyklus, je-li to zapotřebí:

```js run
let klíče = Object.keys(localStorage);
for(let klíč of klíče) {
  alert(`${klíč}: ${localStorage.getItem(klíč)}`);
}
```

To funguje, protože `Object.keys` vrátí jen klíče, které náleží objektu, a ignoruje prototyp.

## Pouze řetězce

Prosíme všimněte si, že klíč i hodnota musejí být řetězce.

Pokud jsou jiného typu, například číslo nebo objekt, budou automaticky převedeny na řetězec:

```js run
localStorage.uživatel = {jméno: "Jan"};
alert(localStorage.uživatel); // [object Object]
```

Můžeme ovšem k ukládání objektů použít `JSON`:

```js run
localStorage.uživatel = JSON.stringify({jméno: "Jan"});

// o něco později
let uživatel = JSON.parse( localStorage.uživatel );
alert( uživatel.jméno ); // Jan
```

Je také možné převést na řetězec celý ukládací objekt, např. pro účely ladění:

```js run
// do JSON.stringify přidáme formátovací možnosti, aby objekt vypadal lépe
alert( JSON.stringify(localStorage, null, 2) );
```

## sessionStorage

Objekt `sessionStorage` se používá výrazně méně často než `localStorage`.

Jeho vlastnosti a metody jsou stejné, ale objekt je mnohem omezenější:

- Objekt `sessionStorage` existuje jedině uvnitř aktuální záložky prohlížeče.
  - Další záložka se stejnou stránkou bude mít jiné úložiště.
  - Objekt je však sdílen mezi vnitřními rámy ve stejné záložce (za předpokladu, že pocházejí ze stejného původu).
- Data přežijí znovunačtení stránky, ale ne zavření a otevření záložky.

Podívejme se na to v akci.

Spusťte si tento kód...

```js run
sessionStorage.setItem('test', 1);
```

...Pak aktualizujte stránku. Nyní stále můžete získat data:

```js run
alert( sessionStorage.getItem('test') ); // po aktualizaci: 1
```

...Ale pokud si otevřete tutéž stránku v jiné záložce a zkusíte to znovu tam, uvedený kód vrátí `null`, což znamená „nic nenalezeno“.

Je to proto, že `sessionStorage` je vázán nejen na původ, ale i na záložku prohlížeče. Z toho důvodu se `sessionStorage` používá zřídkakdy.

## Událost storage

Když jsou data v `localStorage` nebo `sessionStorage` změněna, spustí se událost [storage](https://html.spec.whatwg.org/multipage/webstorage.html#the-storageevent-interface) s následujícími vlastnostmi:

- `key` – klíč, který byl změněn (`null`, pokud bylo voláno `.clear()`).
- `oldValue` – původní hodnota (`null`, pokud byl přidán nový klíč).
- `newValue` – nová hodnota (`null`, pokud byl klíč odstraněn).
- `url` – URL dokumentu, na němž ke změně došlo.
- `storageArea` – objekt `localStorage` nebo `sessionStorage`, v němž ke změně došlo.

Důležité je, že tato událost se spustí na všech objektech `window`, v nichž je úložiště dostupné, kromě toho, který ji způsobil.

Vysvětlíme to.

Představte si, že máte dvě okna a v obou je stejné sídlo. Objekt `localStorage` je tedy sdílen oběma.

```online
Možná budete chtít otevřít si tuto stránku ve dvou oknech prohlížeče, abyste otestovali následující kód.
```

Jestliže obě okna naslouchají `window.onstorage`, pak každé bude reagovat na změny, ke kterým došlo ve druhém okně.

```js run
// spustí se při změnách, které byly učiněny ve stejném úložišti z jiných dokumentů
window.onstorage = událost => { // můžeme použít i window.addEventListener('storage', událost => {
  if (událost.key != 'nyní') return;
  alert(událost.key + ':' + událost.newValue + " na " + událost.url);
};

localStorage.setItem('nyní', Date.now());
```

Prosíme všimněte si, že událost také obsahuje `událost.url` -- URL dokumentu, v němž byla data změněna.

Navíc `událost.storageArea` obsahuje ukládací objekt -- tato událost je stejná pro `sessionStorage` i pro `localStorage`, takže `událost.storageArea` se odkazuje na objekt, který byl změněn. Můžeme v něm dokonce chtít něco nastavit, abychom na změnu „odpověděli“.

**To umožňuje různým oknům stejného původu vyměňovat si zprávy.**

Moderní prohlížeče podporují také [Broadcast Channel API](mdn:/api/Broadcast_Channel_API), speciální API pro komunikaci mezi okny stejného původu. Má více schopností, ale je méně podporováno. Existují knihovny, které provádějí polyfill tohoto API založený na `localStorage`, díky němuž je dostupné všude.

## Shrnutí

Webové ukládací objekty `localStorage` a `sessionStorage` umožňují v prohlížeči ukládat dvojice klíč/hodnota.

- Jak `klíč`, tak `hodnota` musejí být řetězce.
- Omezení velikosti je 5 MB nebo více, závisí na prohlížeči.
- Tato data neexpirují.
- Data jsou vázána na původ (doména/protokol/port).

| `localStorage` | `sessionStorage` |
|----------------|------------------|
| Sdílena mezi všemi záložkami a okny se stejným původem | Viditelná uvnitř záložky prohlížeče včetně vnitřních rámů se stejným původem |
| Přežije restart prohlížeče | Přežije znovunačtení stránky (ale ne zavření záložky) |

API:

- `setItem(klíč, hodnota)` -- uloží dvojici klíč/hodnota.
- `getItem(klíč)` -- vrátí hodnotu podle klíče.
- `removeItem(klíč)` -- odstraní klíč s jeho hodnotou.
- `clear()` -- vymaže vše.
- `key(index)` -- vrátí klíč na pozici `index`.
- `length` -- počet uložených dvojic.
- K získání všech klíčů použijte `Object.keys`.
- Ke klíčům přistupujeme jako k vlastnostem objektu, v takovém případě se nespustí událost `storage`.

Událost `storage`:

- Spustí se při volání `setItem`, `removeItem`, `clear`.
- Obsahuje všechna data o prováděné operaci (`key/oldValue/newValue`), `url` dokumentu a ukládací objekt `storageArea`.
- Spouští se na všech objektech `window`, které mají přístup k úložišti, s výjimkou toho, který ji vygeneroval (uvnitř záložky u `sessionStorage`, globálně u `localStorage`).
