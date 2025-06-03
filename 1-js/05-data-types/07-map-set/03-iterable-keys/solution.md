
Je to proto, že `mapa.keys()` vrací iterovatelný objekt, ale ne pole.

Můžeme jej převést na pole pomocí `Array.from`:


```js run
let mapa = new Map();

mapa.set("jméno", "Jan");

*!*
let klíče = Array.from(mapa.keys());
*/!*

klíče.push("další");

alert(klíče); // jméno,další
```
