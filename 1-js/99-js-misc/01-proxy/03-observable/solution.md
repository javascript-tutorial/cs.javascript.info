Řešení se skládá ze dvou částí:

1. Kdykoli je zavoláno `.pozoruj(handler)`, musíme si handler někde pamatovat, abychom jej mohli volat později. Handlery si můžeme ukládat rovnou do objektu a jako klíč vlastnosti použít náš symbol.
2. Potřebujeme proxy s pastí `set`, která v případě jakékoli změny zavolá handlery.

```js run
let handlery = Symbol('handlery');

function učiňPozorovatelným(cíl) {
  // 1. Inicializace skladu handlerů
  cíl[handlery] = [];

  // Uložíme funkci handleru do pole pro budoucí volání
  cíl.pozoruj = function(handler) {
    this[handlery].push(handler);
  };

  // 2. Vytvoříme proxy pro zpracování změn
  return new Proxy(cíl, {
    set(cíl, vlastnost, hodnota, příjemce) {
      let úspěch = Reflect.set(...arguments); // předáme operaci objektu
      if (úspěch) { // pokud při nastavování vlastnosti nedošlo k chybě,
        // zavoláme všechny handlery
        cíl[handlery].forEach(handler => handler(vlastnost, hodnota));
      }
      return úspěch;
    }
  });
}

let uživatel = {};

uživatel = učiňPozorovatelným(uživatel);

uživatel.pozoruj((klíč, hodnota) => {
  alert(`SET ${klíč}=${hodnota}`);
});

uživatel.jméno = "Jan";
```
