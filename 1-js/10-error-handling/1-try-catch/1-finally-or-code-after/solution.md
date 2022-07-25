Rozdíl uvidíme, když se podíváme na kód uvnitř funkce.

Chování se liší, pokud v něm je „vyskočení“ z `try...catch`.

Například když uvnitř `try...catch` je `return`. Klauzule `finally` se spustí při *jakémkoli* opuštění `try...catch`, dokonce i příkazem `return`: ihned po ukončení `try...catch`, ale ještě předtím, než řízení převezme volající kód.

```js run
function f() {
  try {
    alert('začátek');
*!*
    return "výsledek";
*/!*
  } catch (chyba) {
    /// ...
  } finally {
    alert('úklid!');
  }
}

f(); // úklid!
```

...Nebo když je tam `throw`, například:

```js run
function f() {
  try {
    alert('začátek');
    throw new Error("chyba");
  } catch (chyba) {
    // ...
    if("nemůžeme ošetřit chybu") {
*!*
      throw chyba;
*/!*
    }

  } finally {
    alert('úklid!')
  }
}

f(); // úklid!
```

Je to právě `finally`, co nám zde úklid zajistí. Kdybychom umístili kód na konec funkce `f`, v těchto situacích by se nespustil.
