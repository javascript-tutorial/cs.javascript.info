Pro nalezení anagramů rozdělíme každé slovo na písmena a ta seřadíme podle abecedy. Po seřazení písmen budou všechny anagramy stejné.

Příklad:

```
rak, kra -> akr
kostel, stolek -> eklost
reklama, makrela, karamel -> aaeklmr
...
```

Varianty slov se seřazenými písmeny použijeme jako klíče mapy, abychom uložili pro každý klíč jen jednu hodnotu:

```js run
function odstraňAnagramy(pole) {
  let mapa = new Map();

  for (let slovo of pole) {
    // rozdělíme slovo na písmena, seřadíme je a znovu spojíme
*!*
    let seřazené = slovo.toLowerCase().split('').sort().join(''); // (*)
*/!*
    mapa.set(seřazené, slovo);
  }

  return Array.from(mapa.values());
}

let pole = ["rak", "reklama", "makrela", "KRA", "kostel", "stolek", "karamel"];

alert( odstraňAnagramy(pole) );
```

Seřazení písmen se děje ve zřetězeném volání na řádku `(*)`.

Pro přehlednost jej rozdělme na několik řádků:

```js
let seřazené = slovo // KRA
  .toLowerCase() // kra
  .split('') // ['k','r','a']
  .sort() // ['a','k','r']
  .join(''); // akr
```

Dvě různá slova `'KRA'` a `'rak'` budou seřazena stejně na `'akr'`.

Další řádek vloží slovo do mapy:

```js
mapa.set(seřazené, slovo);
```

Jestliže příště přijde slovo se stejným seřazením písmen, přepíše v mapě předchozí hodnotu se stejným klíčem. Vždy tedy budeme mít pro každou seřazenou skupinu písmen nejvýše jedno slovo.

Nakonec `Array.from(mapa.values())` vezme iterovatelný objekt nad hodnotami mapy (klíče ve výsledku nepotřebujeme), vytvoří z těchto hodnot pole a vrátí je.

Zde bychom mohli místo `Map` použít i planý objekt, neboť klíče jsou řetězce.

Řešení by pak mohlo vypadat následovně:

```js run demo
function odstraňAnagramy(pole) {
  let obj = {};

  for (let i = 0; i < pole.length; i++) {
    let seřazené = pole[i].toLowerCase().split("").sort().join("");
    obj[seřazené] = pole[i];
  }

  return Object.values(obj);
}

let pole = ["rak", "reklama", "makrela", "KRA", "kostel", "stolek", "karamel"];

alert( odstraňAnagramy(pole) );
```
