**Odpověď: chyba.**

Zkuste to:
```js run
function vytvořUživatele() {
  return {
    jméno: "Jan",
    ref: this
  };
}

let uživatel = vytvořUživatele();

alert( uživatel.ref.jméno ); // Error: Cannot read property 'jméno' of undefined
```

Je to proto, že pravidla, která nastavují `this`, se nedívají do definice objektu. Záleží jen na momentu volání.

Zde je hodnota `this` uvnitř `vytvořUživatele()` `undefined`, protože tato funkce je volána jako funkce, ne jako metoda „tečkovou“ syntaxí.

Hodnota `this` je stejná pro celou funkci, bloky kódu a objektové literály ji neovlivňují.

Takže `ref: this` vezme ve skutečnosti aktuální `this` této funkce.

Můžeme funkci přepsat a vrátit stejné `this` s hodnotou `undefined`:

```js run
function vytvořUživatele(){
  return this; // tentokrát tady není objektový literál
}

alert( vytvořUživatele().jméno ); // Error: Cannot read property 'jméno' of undefined
```
Jak vidíte, výsledek `alert( vytvořUživatele().jméno )` je stejný jako výsledek `alert( uživatel.ref.jméno )` z předchozího příkladu.

Toto je opačný příklad:

```js run
function vytvořUživatele() {
  return {
    jméno: "Jan",
*!*
    ref() {
      return this;
    }
*/!*
  };
}

let uživatel = vytvořUživatele();

alert( uživatel.ref().jméno ); // Jan
```

Teď to funguje, protože `uživatel.ref()` je metoda. A hodnota `this` se nastaví na objekt před tečkou `.`.