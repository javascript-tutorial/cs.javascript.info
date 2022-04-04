# Chyba při načítání neexistující vlastnosti

Pokus o načtení neexistující vlastnosti zpravidla vrátí `undefined`.

Vytvořte proxy, která při pokusu o načtení neexistující vlastnosti místo toho vyvolá chybu.

To nám může pomoci brzy detekovat programátorské chyby.

Napište funkci `wrap(cíl)`, která vezme objekt `cíl` a vrátí proxy, která přidá tento funkcionální aspekt.

Mělo by to fungovat takto:

```js
let uživatel = {
  jméno: "Jan"
};

function wrap(cíl) {
  return new Proxy(cíl, {
*!*
      /* váš kód */
*/!*
  });
}

uživatel = wrap(uživatel);

alert(uživatel.jméno); // Jan
*!*
alert(uživatel.věk); // ReferenceError: Vlastnost neexistuje: "věk"
*/!*
```
