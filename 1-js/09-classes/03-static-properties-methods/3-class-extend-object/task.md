importance: 3

---

# Třída rozšiřuje Object?

Jak víme, všechny objekty běžně dědí z `Object.prototype` a získávají přístup k „obecným“ objektovým metodám jako `hasOwnProperty` a podobně.

Například:

```js run
class Králík {
  constructor(jméno) {
    this.jméno = jméno;
  }
}

let králík = new Králík("Bobek");

*!*
// metoda hasOwnProperty je z Object.prototype
alert( králík.hasOwnProperty('jméno') ); // true
*/!*
```

Pokud však výslovně uvedeme `„class Králík extends Object“`, bude se výsledek lišit od prostého `„class Králík“`?

Jaký je rozdíl?

Zde je příklad takového kódu (nefunguje -- proč? opravte ho):

```js
class Králík extends Object {
  constructor(jméno) {
    this.jméno = jméno;
  }
}

let králík = new Králík("Bobek");

alert( králík.hasOwnProperty('jméno') ); // Chyba
```
