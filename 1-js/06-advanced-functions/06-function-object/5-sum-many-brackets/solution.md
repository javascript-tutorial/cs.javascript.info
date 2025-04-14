
1. Aby to celé *jakkoli* fungovalo, výsledek funkce `sečti` musí být funkce.
2. Tato funkce si musí udržovat v paměti aktuální hodnotu mezi voláními.
3. Podle zadání se funkce musí stát číslem, když je použita v `==`. Funkce jsou objekty, takže konverze se odehrává tak, jak je popsáno v kapitole <info:object-toprimitive>, a my můžeme poskytnout svou vlastní metodu, která toto číslo vrátí.

Nyní kód:

```js demo run
function sečti(a) {

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

alert( sečti(1)(2) ); // 3
alert( sečti(5)(-1)(2) ); // 6
alert( sečti(6)(-1)(-2)(-3) ); // 0
alert( sečti(0)(1)(2)(3)(4)(5) ); // 15
```

Prosíme všimněte si, že funkce `sečti` se ve skutečnosti spustí jenom jednou. Vrátí funkci `f`.

Pak funkce `f` při každém následném volání přičte svůj parametr k součtu `aktuálníSoučet` a vrátí sebe sama.

**Na posledním řádku funkce `f` není rekurze.**

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

Tato funkce `f` bude použita při dalším volání a opět vrátí sebe sama, tolikrát, kolikrát je zapotřebí. Když ji pak použijeme jako číslo nebo řetězec, `toString` vrátí `aktuálníSoučet`. Zde bychom pro konverzi mohli také použít `Symbol.toPrimitive` nebo `valueOf`.
