
1. Aby to celé *jakkoli* fungovalo, výsledek funkce `součet` musí být funkce.
2. Tato funkce si musí udržovat v paměti aktuální hodnotu mezi voláními.
3. Podle zadání se funkce musí stát číslem, když je použita v `==`. Funkce jsou objekty, takže konverze se odehrává tak, jak je popsáno v kapitole <info:object-toprimitive>, a my můžeme poskytnout svou vlastní metodu, která toto číslo vrátí.

Nyní kód:

<<<<<<< Updated upstream
```js run
function sum(a) {
=======
```js demo run
function součet(a) {
>>>>>>> Stashed changes

  let aktuálníSoučet = a;

  function f(b) {
    aktuálníSoučet += b;
    return f;
  }

  f.toString = function() {
    return aktuálníSoučet;
  };

  return f;
}

alert( součet(1)(2) ); // 3
alert( součet(5)(-1)(2) ); // 6
alert( součet(6)(-1)(-2)(-3) ); // 0
alert( součet(0)(1)(2)(3)(4)(5) ); // 15
```

Prosíme všimněte si, že funkce `součet` se ve skutečnosti spustí jenom jednou. Vrátí funkci `f`.

Pak při každém následném volání `f` přičte svůj parametr k součtu `aktuálníSoučet` a vrátí sebe sama.

**Na posledním řádku `f` není rekurze.**

Rekurze by vypadala takto:

```js
function f(b) {
  aktuálníSoučet += b;
  return f(); // <-- rekurzívní volání
}
```

V našem případě vracíme jen funkci, aniž bychom ji volali:

```js
function f(b) {
  aktuálníSoučet += b;
  return f; // <-- nevolá sama sebe, vrací sama sebe
}
```

Tato `f` bude použita při dalším volání a opět vrátí sebe sama, tolikrát, kolikrát je zapotřebí. Když ji pak použijeme jako číslo nebo řetězec -- `toString` vrátí `aktuálníSoučet`. Zde bychom pro konverzi mohli také použít `Symbol.toPrimitive` nebo `valueOf`.
