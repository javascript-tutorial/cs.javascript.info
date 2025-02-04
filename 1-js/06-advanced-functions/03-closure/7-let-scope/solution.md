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

V tomto příkladu můžeme vidět pozoruhodný rozdíl mezi „neexistující“ a „neinicializovanou“ proměnnou.

Jak jste si mohli přečíst v článku [](info:closure), proměnná začíná v „neinicializovaném“ stavu ve chvíli, kdy běh vstoupí do kódového bloku (nebo do funkce). A zůstane neinicializovaná až do příslušného příkazu `let`.

Jinými slovy, před `let` proměnná technicky existuje, ale nemůže být používána.

Uvedený kód to demonstruje.

```js
function funkce() {
*!*
  // motor zná lokální proměnnou x od začátku této funkce,
  // ale ta je „neinicializovaná“ (nepoužitelná) až do příkazu let („mrtvá zóna“)
  // proto chyba
*/!*

  console.log(x); // ReferenceError: Nelze přistupovat k 'x' před inicializací

  let x = 2;
}
```

Tato zóna dočasné nepoužitelnosti proměnné (od začátku kódového bloku do `let`) se někdy nazývá „mrtvá zóna“.
