První řešení, o které se pokusíme, bude rekurzívní.

Fibonacciho čísla jsou podle definice rekurzívní:

```js run
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
// fib(77); // bude extrémně pomalé!
```

...Ale pro velké hodnoty `n` to bude velmi pomalé. Například `fib(77)` může na nějaký čas zablokovat engine, protože spotřebuje všechny zdroje CPU.

Je to proto, že funkce učiní příliš mnoho vnořených volání. Stejné hodnoty se budou počítat znovu a znovu.

Podívejme se například na část výpočtu `fib(5)`:

```js no-beautify
...
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
...
```

Zde vidíme, že hodnota `fib(3)` je zapotřebí pro `fib(5)` i pro `fib(4)`. Takže `fib(3)` bude volána a vyhodnocena dvakrát zcela nezávisle na sobě.

Zde je úplný rekurzívní strom:

![rekurzívní strom Fibonacciho čísel](fibonacci-recursion-tree.svg)

Můžeme jasně vidět, že `fib(3)` se vypočítá dvakrát a `fib(2)` třikrát. Celkový počet výpočtů roste mnohem rychleji než `n`, takže už pro `n=77` bude obrovský.

Můžeme to optimalizovat tak, že si budeme pamatovat již vypočtené hodnoty: jestliže se např. hodnota `fib(3)` vypočítá jednou, budeme ji pak moci využít k dalším výpočtům.

Další variantou by bylo vzdát se rekurze a použít úplně jiný algoritmus založený na cyklu.

Místo abychom šli od `n` dolů k nižším hodnotám, můžeme vytvořit cyklus, který začne od `1` a `2`, pak vypočítá `fib(3)` jako jejich součet, pak `fib(4)` jako součet předchozích dvou hodnot, pak `fib(5)` a tak to jde výš a výš, až se dostaneme k požadované hodnotě. V každém kroku si musíme pamatovat jen dvě předchozí hodnoty.

Zde jsou kroky nového algoritmu podrobně.

Začátek:

```js
// a = fib(1), b = fib(2), tyto hodnoty jsou podle definice 1
let a = 1, b = 1;

// získáme c = fib(3) jako jejich součet
let c = a + b;

/* nyní máme fib(1), fib(2), fib(3)
a  b  c
1, 1, 2
*/
```

Nyní chceme získat `fib(4) = fib(2) + fib(3)`.

Posuneme proměnné: `a,b` budou představovat `fib(2),fib(3)` a `c` bude jejich součet:

```js no-beautify
a = b; // nyní a = fib(2)
b = c; // nyní b = fib(3)
c = a + b; // c = fib(4)

/* nyní máme posloupnost:
   a  b  c
1, 1, 2, 3
*/
```

Další krok nám dává další číslo v posloupnosti:

```js no-beautify
a = b; // nyní a = fib(3)
b = c; // nyní b = fib(4)
c = a + b; // c = fib(5)

/* posloupnost nyní je (jedno další číslo):
      a  b  c
1, 1, 2, 3, 5
*/
```

...A tak dále, dokud nezískáme požadovanou hodnotu. Je to mnohem rychlejší než rekurze a neobsahuje žádné dvojí výpočty.

Úplný kód:

```js run
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757
```

Cyklus začíná `i=3`, protože první a druhá hodnota posloupnosti jsou napevno zakódovány do proměnných `a=1`, `b=1`.

Tento přístup se nazývá [dynamické programování](https://cs.wikipedia.org/wiki/Dynamické_programování).
