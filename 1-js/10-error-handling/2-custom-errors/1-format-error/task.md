importance: 5

---

# Dědění ze třídy SyntaxError

Vytvořte třídu `ChybaFormátu`, která je zděděna ze zabudované třídy `SyntaxError`.

Měla by podporovat vlastnosti `message`, `name` a `stack`.

Příklad použití:

```js
let chyba = new ChybaFormátu("chyba formátování");

alert( chyba.message ); // chyba formátování
alert( chyba.name ); // ChybaFormátu
alert( chyba.stack ); // zásobník

alert( chyba instanceof ChybaFormátu ); // true
alert( chyba instanceof SyntaxError ); // true (protože je zděděna ze SyntaxError)
```
