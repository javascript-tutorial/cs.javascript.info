Výsledek bude: **chyba**.

Zkuste si to spustit:

```js run
let x = 1;

function funkce() {
*!*
  console.log(x); // ReferenceError: Nelze přistupovat k 'x' před inicializací
*/!*
  let x = 2;
}

funkce();
```

<<<<<<< Updated upstream
In this example we can observe the peculiar difference between a "non-existing" and "unitialized" variable.
=======
V tomto příkladu můžeme vidět podivný rozdíl mezi „neexistující“ a „neinicializovanou“ proměnnou.
>>>>>>> Stashed changes

Jak jste si mohli přečíst v článku [](info:closure), proměnná začíná v „neinicializovaném“ stavu od chvíle, kdy provádění vstoupí do kódového bloku (nebo funkce). A zůstane neinicializovaná až do příslušného příkazu `let`.

Jinými slovy, před `let` proměnná technicky existuje, ale nemůže být používána.

Výše uvedený kód to demonstruje.

```js
function funkce() {
*!*
  // engine zná lokální proměnnou x od začátku této funkce,
  // ale ta je "neinicializovaná" (nepoužitelná) až do příkazu let ("mrtvá zóna")
  // proto chyba
*/!*

  console.log(x); // ReferenceError: Nelze přistupovat k 'x' před inicializací

  let x = 2;
}
```

Tato zóna dočasné nepoužitelnosti proměnné (od začátku kódového bloku do `let`) se někdy nazývá „mrtvá zóna“.
