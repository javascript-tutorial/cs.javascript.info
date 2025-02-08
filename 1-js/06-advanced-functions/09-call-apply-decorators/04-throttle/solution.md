```js demo
function tlum(funkce, ms) {

  let jeTlumena = false,
    uloženéArgumenty,
    uloženéThis;

  function obal() {

    if (jeTlumena) { // (2)
      uloženéArgumenty = arguments;
      uloženéThis = this;
      return;
    }
    jeTlumena = true;

    funkce.apply(this, arguments); // (1)

    setTimeout(function() {
      jeTlumena = false; // (3)
      if (uloženéArgumenty) {
        obal.apply(uloženéThis, uloženéArgumenty);
        uloženéArgumenty = uloženéThis = null;
      }
    }, ms);
  }

  return obal;
}
```

Volání funkce `tlum(funkce, ms)` vrátí `obal`.

1. Během prvního volání `obal` jen spustí funkci `funkce` a nastaví stav chladnutí (`jeTlumena = true`).
2. V tomto stavu se všechna volání budou ukládat do `uloženéArgumenty/uloženéThis`. Prosíme všimněte si, že kontext i argumenty jsou stejně důležité a obojí by se mělo ukládat do paměti. K reprodukci volání potřebujeme obojí současně.
3. Po uplynutí `ms` milisekund se spustí `setTimeout`. Stav chladnutí se odstraní (`jeTlumena = false`), a pokud jsme ignorovali nějaká volání, `obal` se spustí s posledními zapamatovanými argumenty a kontextem.

Třetí krok nespouští funkci `funkce`, ale `obal`, protože potřebujeme nejenom spustit `funkce`, ale také znovu vstoupit do stavu chladnutí a nastavit časovač, abychom jej obnovili.
