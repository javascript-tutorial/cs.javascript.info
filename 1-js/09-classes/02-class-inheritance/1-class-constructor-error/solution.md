Je to proto, že konstruktor dítěte musí volat `super()`.

Zde je opravený kód:

```js run
class Zvíře {

  constructor(jméno) {
    this.jméno = jméno;
  }

}

class Králík extends Zvíře {
  constructor(jméno) {  
    *!*
    super(jméno);
    */!*
    this.datumVytvoření = Date.now();
  }
}

*!*
let králík = new Králík("Bílý králík"); // nyní v pořádku
*/!*
alert(králík.jméno); // Bílý králík
```
