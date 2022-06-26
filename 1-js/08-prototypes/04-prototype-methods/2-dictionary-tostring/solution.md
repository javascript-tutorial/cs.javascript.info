
Metoda může vzít všechny enumerovatelné klíče pomocí `Object.keys` a vydat jejich seznam.

Abychom učinili `toString` neenumerovatelnou, definujme ji pomocí deskriptoru vlastnosti. Syntaxe `Object.create` nám umožní poskytnout objekt s deskriptory vlastností jako druhým argumentem.

```js run
*!*
let slovník = Object.create(null, {
  toString: { // definujeme vlastnost toString
    value() { // value je funkce
      return Object.keys(this).join();
    }
  }
});
*/!*

slovník.jablko = "Jablko";
slovník.__proto__ = "test";

// v cyklu jsou jablko a __proto__
for(let klíč in slovník) {
  alert(klíč); // "jablko", pak "__proto__"
}  

// seznam vlastností oddělených čárkou, vydaný metodou toString
alert(slovník); // "jablko,__proto__"
```

Když vytvoříme vlastnost použitím deskriptoru, její přepínače jsou standardně `false`. Ve výše uvedeném kódu je tedy `slovník.toString` neenumerovatelná.

Pro přehled viz kapitolu [](info:property-descriptors).
