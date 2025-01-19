# Promisifikace

„Promisifikace“ *(česky lze přeložit jako „zpříslibování“ nebo „převedení do příslibů“ -- pozn. překl.)* je dlouhý výraz pro jednoduchou transformaci. Je to převod funkce, která přijímá callback, na funkci, která vrací příslib.

Takové transformace jsou ve skutečném životě často požadovány, jelikož na callbaccích je založeno mnoho funkcí a knihoven. Přísliby jsou však vhodnější, takže dává smysl tyto funkce promisifikovat.

Pro lepší porozumění se podívejme na příklad.

Například máme funkci `načtiSkript(src, callback)` z kapitoly <info:callbacks>.

```js run
function načtiSkript(src, callback) {
  let skript = document.createElement('script');
  skript.src = src;

  skript.onload = () => callback(null, skript);
  skript.onerror = () => callback(new Error(`Chyba načítání skriptu pro ${src}`));

  document.head.append(skript);
}

// použití:
// načtiSkript('path/script.js', (chyba, skript) => {...})
```

Tato funkce načte skript ze zadaného zdroje `src` a pak volá `callback(chyba)` v případě chyby nebo `callback(null, skript)` v případě úspěšného načtení. To je široce rozšířená úmluva pro používání callbacků, kterou jsme již viděli.

Promisifikujme tuto funkci.

Vytvořme novou funkci `načtiSkriptPříslibem(src)`, která udělá totéž (načte skript), ale namísto používání callbacků vrátí příslib.

Jinými slovy, předáme do ní jenom `src` (ne `callback`) a jako návratovou hodnotu obdržíme příslib, který se splní s hodnotou `skript`, je-li načtení úspěšné, a jinak se zamítne s chybou.

Zde je:
```js
let načtiSkriptPříslibem = function(src) {
  return new Promise((resolve, reject) => {
    načtiSkript(src, (chyba, skript) => {
      if (chyba) reject(chyba);
      else resolve(skript);
    });
  });
};

// použití:
// načtiSkriptPříslibem('path/script.js').then(...)
```

Jak vidíme, nová funkce je wrapperem okolo původní funkce `načtiSkript`, který ji zavolá a poskytne jí svůj vlastní callback, který se převede na příslib `resolve/reject`.

Nyní `načtiSkriptPříslibem` dobře zapadne do kódu založeného na příslibech. Máme-li raději přísliby než callbacky (a brzy pro to uvidíme další důvody), použijeme místo původní funkce tuto.

V praxi můžeme potřebovat promisifikovat více než jednu funkci, takže dává smysl použít pomocnou funkci.

Nazveme ji `promisifikuj(f)`: bude přijímat funkci `f`, která má být promisifikována, a vrátí wrapperovou funkci.

```js
function promisifikuj(f) {
  return function (...args) { // vrátí wrapperovou funkci (*)
    return new Promise((resolve, reject) => {
      function callback(chyba, výsledek) { // náš vlastní callback pro f (**)
        if (chyba) {
          reject(chyba);
        } else {
          resolve(výsledek);
        }
      }

      args.push(callback); // připojí náš vlastní callback na konec argumentů funkce f

      f.call(this, ...args); // zavolá původní funkci
    });
  };
}

// použití:
let načtiSkriptPříslibem = promisifikuj(načtiSkript);
načtiSkriptPříslibem(...).then(...);
```

Kód může vypadat trochu složitě, ale v zásadě je to totéž, co jsme napsali výše, když jsme promisifikovali funkci `načtiSkript`.

Volání `promisifikuj(f)` vrátí wrapper okolo `f` `(*)`. Tento wrapper vrátí příslib, předá volání původní funkci `f` a výsledek zpracuje ve vlastním callbacku `(**)`.

Zde funkce `promisifikuj` předpokládá, že původní funkce očekává callback s právě dvěma argumenty `(chyba, výsledek)`. S tím se setkáváme nejčastěji. Náš vlastní callback je přesně ve správném formátu a funkce `promisifikuj` v takovém případě funguje skvěle.

Ale co když původní funkce `f` očekává callback s více argumenty `callback(chyba, výsledek1, výsledek2, ...)`?

Můžeme naši pomocnou funkci vylepšit. Vytvořme pokročilejší verzi `promisifikuj`.

- Když bude volána jako `promisifikuj(f)`, měla by fungovat podobně jako výše uvedená verze.
- Když bude volána jako `promisifikuj(f, true)`, měla by vrátit příslib, který se splní s polem výsledků callbacku. To platí právě pro callbacky s mnoha argumenty.

```js
// promisifikuj(f, true) pro získání pole výsledků
function promisifikuj(f, víceArgumentů = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(chyba, ...výsledky*/!*) { // náš vlastní callback pro f
        if (chyba) {
          reject(chyba);
        } else {
          // je-li uvedeno víceArgumentů, splní se se všemi výsledky callbacku
          *!*resolve(víceArgumentů ? výsledky : výsledky[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
}

// použití:
f = promisifikuj(f, true);
f(...).then(poleVýsledků => ..., chyba => ...);
```

Jak vidíte, je to v zásadě totéž jako výše, ale `resolve` se volá buď jen s jedním, nebo se všemi argumenty, podle toho, zda je parametr `víceArgumentů` pravdivý.

Pro exotičtější formáty callbacku, např. takové, které vůbec neobsahují argument `chyba`: `callback(výsledek)`, můžeme takové funkce promisifikovat ručně bez použití pomocné funkce.

Existují i moduly s trochu flexibilnějšími promisifikačními funkcemi, např. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). V Node.js k tomu slouží zabudovaná funkce `util.promisify`.

```smart
Promisifikace je skvělý přístup, zvláště když používáte `async/await` (vysvětleno později v kapitole <info:async-await>), ale není to úplná náhrada za callbacky.

Pamatujte, že příslib může mít jen jediný výsledek, ale callback lze technicky volat mnohokrát.

Promisifikace má tedy smysl jen u funkcí, které volají callback pouze jednou. Další volání budou ignorována.
```
