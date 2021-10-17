```js demo
function tlumič(funkce, ms) {

  let jeTlumena = false,
    uloženéArgumenty,
    uloženéThis;

  function wrapper() {

    if (jeTlumena) { // (2)
      uloženéArgumenty = arguments;
      uloženéThis = this;
      return;
    }

    funkce.apply(this, arguments); // (1)

    jeTlumena = true;

    setTimeout(function() {
      jeTlumena = false; // (3)
      if (uloženéArgumenty) {
        wrapper.apply(uloženéThis, uloženéArgumenty);
        uloženéArgumenty = uloženéThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

Volání funkce `tlumič(funkce, ms)` vrátí `wrapper`.

1. Během prvního volání `wrapper` jen spustí funkci `funkce` a nastaví stav chladnutí (`jeTlumena = true`).
2. V tomto stavu se všechna volání budou ukládat do `uloženéArgumenty/uloženéThis`. Prosíme všimněte si, že kontext i argumenty jsou stejně důležité a měly by se ukládat do paměti. K reprodukování volání potřebujeme obojí.
3. Po uplynutí `ms` milisekund se spustí `setTimeout`. Stav chladnutí se odstraní (`jeTlumena = false`), a pokud jsme ignorovali nějaká volání, `wrapper` se spustí s posledními zapamatovanými argumenty a kontextem.

Třetí krok nespouští funkci `funkce`, ale `wrapper`, protože potřebujeme nejenom spustit `funkce`, ale také znovu vstoupit do stavu chladnutí a nastavit timeout, abychom jej vyresetovali.
