**Odpověď: chyba.**

Zkuste to:
```js run
function vytvořUživatele() {
  return {
    jméno: "Jan",
    odkaz: this
  };
}

let uživatel = vytvořUživatele();

alert( uživatel.odkaz.jméno ); // Chyba: Nelze načíst vlastnost 'jméno' objektu undefined
```

Je to proto, že pravidla, která nastavují `this`, se nedívají do definice objektu. Záleží jen na okamžiku volání.

Zde je hodnota `this` uvnitř `vytvořUživatele()` `undefined`, protože tato funkce je volána jako funkce, ne jako metoda „tečkovou“ syntaxí.

Hodnota `this` je stejná pro celou funkci, bloky kódu a objektové literály ji neovlivňují.

Takže `odkaz: this` vezme ve skutečnosti aktuální `this` této funkce.

Můžeme funkci přepsat a vrátit stejné `this` s hodnotou `undefined`:

```js run
function vytvořUživatele(){
  return this; // tentokrát tady není objektový literál
}

alert( vytvořUživatele().jméno ); // Chyba: Nelze načíst vlastnost 'jméno' objektu undefined
```
Jak vidíte, výsledek `alert( vytvořUživatele().jméno )` je stejný jako výsledek `alert( uživatel.odkaz.jméno )` z předchozího příkladu.

Toto je opačný příklad:

```js run
function vytvořUživatele() {
  return {
    jméno: "Jan",
*!*
    odkaz() {
      return this;
    }
*/!*
  };
}

let uživatel = vytvořUživatele();

alert( uživatel.odkaz().jméno ); // Jan
```

Teď to funguje, protože `uživatel.odkaz()` je metoda. A hodnota `this` se nastaví na objekt před tečkou `.`.