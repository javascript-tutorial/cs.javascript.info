# Promisifikace

„Promisifikace“ je dlouhý výraz pro jednoduchou transformaci. Je to převod funkce, která přijímá callback, na funkci, která vrací příslib.

Takové transformace jsou ve skutečném životě často požadovány, jelikož mnoho funkcí a knihoven je založeno na callbaccích. Přísliby jsou však vhodnější, takže promisifikace těchto funkcí dává smysl.

Pro lepší porozumění se podívejme na příklad.

Máme například funkci `načtiSkript(zdroj, callback)` z kapitoly <info:callbacks>.

```js run
function načtiSkript(zdroj, callback) {
  let skript = document.createElement('script');
  skript.src = zdroj;

  skript.onload = () => callback(null, skript);
  skript.onerror = () => callback(new Error(`Chyba načítání skriptu pro ${zdroj}`));

  document.head.append(skript);
}

// použití:
// načtiSkript('path/script.js', (chyba, skript) => {...})
```

Tato funkce načte skript ze zadaného zdroje `zdroj` a pak volá `callback(chyba)` v případě chyby nebo `callback(null, skript)` v případě úspěšného načtení. To je široce rozšířená úmluva pro používání callbacků, kterou jsme již viděli.

Promisifikujme tuto funkci.

Vytvořme novou funkci `načtiSkriptPříslibem(zdroj)`, která udělá totéž (načte skript), ale místo používání callbacků vrátí příslib.

Jinými slovy, předáme do ní jenom `zdroj` (ne `callback`) a jako návratovou hodnotu obdržíme příslib, který se splní s hodnotou `skript`, bude-li načítání úspěšné, a jinak se zamítne s chybou.

Zde je:
```js
let načtiSkriptPříslibem = function(zdroj) {
  return new Promise((splň, zamítni) => {
    načtiSkript(zdroj, (chyba, skript) => {
      if (chyba) zamítni(chyba);
      else splň(skript);
    });
  });
};

// použití:
// načtiSkriptPříslibem('path/script.js').then(...)
```

Jak vidíme, nová funkce je obalem okolo původní funkce `načtiSkript`. Zavolá ji a poskytne jí svůj vlastní callback, který se převede na příslib `splň/zamítni`.

Nyní `načtiSkriptPříslibem` dobře zapadne do kódu založeného na příslibech. Máme-li raději přísliby než callbacky (a brzy pro to uvidíme další důvody), použijeme místo původní funkce tuto.

V praxi můžeme potřebovat promisifikovat více než jednu funkci, takže dává smysl použít pomocnou funkci.

Nazveme ji `promisifikuj(f)`: bude přijímat funkci `f`, která má být promisifikována, a vrátí obalovou funkci.

```js
function promisifikuj(f) {
  return function (...argumenty) { // vrátí obalovou funkci (*)
    return new Promise((splň, zamítni) => {
      function callback(chyba, výsledek) { // náš vlastní callback pro f (**)
        if (chyba) {
          zamítni(chyba);
        } else {
          splň(výsledek);
        }
      }

      argumenty.push(callback); // připojí náš vlastní callback na konec argumentů funkce f

      f.call(this, ...argumenty); // zavolá původní funkci
    });
  };
}

// použití:
let načtiSkriptPříslibem = promisifikuj(načtiSkript);
načtiSkriptPříslibem(...).then(...);
```

Kód může vypadat trochu složitě, ale v zásadě je to totéž, co jsme napsali výše, když jsme promisifikovali funkci `načtiSkript`.

Volání `promisifikuj(f)` vrátí obal okolo `f` `(*)`. Tento obal vrátí příslib, předá volání původní funkci `f` a výsledek zpracuje ve vlastním callbacku `(**)`.

Zde funkce `promisifikuj` předpokládá, že původní funkce očekává callback s právě dvěma argumenty `(chyba, výsledek)`. S tím se setkáváme nejčastěji. Náš vlastní callback je přesně ve správném formátu a funkce `promisifikuj` v takovém případě funguje skvěle.

Ale co když původní funkce `f` očekává callback s více argumenty `callback(chyba, výsledek1, výsledek2, ...)`?

Můžeme naši pomocnou funkci vylepšit. Vytvořme pokročilejší verzi `promisifikuj`.

- Když bude volána jako `promisifikuj(f)`, měla by fungovat podobně jako uvedená verze.
- Když bude volána jako `promisifikuj(f, true)`, měla by vrátit příslib, který se splní s polem výsledků callbacku. To je určeno právě pro callbacky s mnoha argumenty.

```js
// promisifikuj(f, true) pro získání pole výsledků
function promisifikuj(f, víceArgumentů = false) {
  return function (...argumenty) {
    return new Promise((splň, zamítni) => {
      function *!*callback(chyba, ...výsledky*/!*) { // náš vlastní callback pro f
        if (chyba) {
          zamítni(chyba);
        } else {
          // je-li uvedeno víceArgumentů, splní se se všemi výsledky callbacku
          *!*splň(víceArgumentů ? výsledky : výsledky[0]);*/!*
        }
      }

      argumenty.push(callback);

      f.call(this, ...argumenty);
    });
  };
}

// použití:
f = promisifikuj(f, true);
f(...).then(poleVýsledků => ..., chyba => ...);
```

Jak vidíte, je to v zásadě totéž jako výše, ale `splň` se volá buď jen s jedním, nebo se všemi argumenty, podle toho, zda je argument `víceArgumentů` pravdivý.

Pro exotičtější formáty callbacků, např. takové, které vůbec neobsahují argument `chyba`: `callback(výsledek)`, můžeme takové funkce promisifikovat ručně bez použití pomocné funkce.

Existují i moduly s trochu flexibilnějšími promisifikačními funkcemi, např. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). V Node.js k tomu slouží zabudovaná funkce `util.promisify`.

```smart
Promisifikace je skvělý přístup, zvláště když používáte `async/await` (bude vysvětleno později v kapitole <info:async-await>), ale není to úplná náhrada za callbacky.

Pamatujte, že příslib může mít jen jediný výsledek, ale callback lze technicky volat mnohokrát.

Promisifikace má tedy smysl jen u funkcí, které volají callback pouze jednou. Další volání budou ignorována.
```
