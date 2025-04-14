```js run untrusted
class ChybaFormátu extends SyntaxError {
  constructor(zpráva) {
    super(zpráva);
    this.name = this.constructor.name;
  }
}

let chyba = new ChybaFormátu("chyba formátování");

alert( chyba.message ); // chyba formátování
alert( chyba.name ); // ChybaFormátu
alert( chyba.stack ); // zásobník

alert( chyba instanceof SyntaxError ); // true
```
