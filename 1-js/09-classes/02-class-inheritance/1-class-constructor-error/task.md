importance: 5

---

# Chyba při vytváření instance

Zde je kód, v němž třída `Králík` rozšiřuje třídu `Zvíře`.

Naneštěstí objekty `Králík` nemohou být vytvořeny. Co je špatně? Opravte to.
```js run
class Zvíře {

  constructor(jméno) {
    this.jméno = jméno;
  }

}

class Králík extends Zvíře {
  constructor(jméno) {  
    this.jméno = jméno;
    this.datumVytvoření = Date.now();
  }
}

*!*
let králík = new Králík("Bílý králík"); // Chyba: this není definováno
*/!*
alert(králík.jméno);
```
