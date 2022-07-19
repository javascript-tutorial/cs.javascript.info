importance: 5

---

# Iterovatelné klíče

Chtěli bychom uložit pole klíčů mapy `mapa.keys()` do proměnné a pak na ně používat metody polí, např. `push`.

Tohle však nefunguje:

```js run
let mapa = new Map();

mapa.set("jméno", "Jan");

let klíče = mapa.keys();

*!*
// Chyba: klíče.push není funkce
klíče.push("další");
*/!*
```

Proč? Jak můžeme opravit kód, aby `klíče.push` fungovalo?
