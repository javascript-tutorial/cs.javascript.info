importance: 5

---

# Mapování na objekty

Máme pole objektů `uživatel`, každý z nich má vlastnosti `jméno`, `příjmení` a `id`.

Napište kód, který z něj vytvoří jiné pole, které bude obsahovat objekty s vlastnostmi `id` a `celéJméno`, kde `celéJméno` se vygeneruje ze `jméno` a `příjmení`.

Příklad:

```js no-beautify
let jan = { jméno: "Jan", příjmení: "Novák", id: 1 };
let petr = { jméno: "Petr", příjmení: "Horák", id: 2 };
let marie = { jméno: "Marie", příjmení: "Králová", id: 3 };

let uživatelé = [ jan, petr, marie ];

*!*
let mapovaníUživatelé = /* ... váš kód ... */
*/!*

/*
mapovaníUživatelé = [
  { celéJméno: "Jan Novák", id: 1 },
  { celéJméno: "Petr Horák", id: 2 },
  { celéJméno: "Marie Králová", id: 3 }
]
*/

alert( mapovaníUživatelé[0].id ) // 1
alert( mapovaníUživatelé[0].celéJméno ) // Jan Novák
```

Ve skutečnosti tedy potřebujete mapovat jedno pole objektů na druhé. Zkuste zde použít `=>`. Je tady malý chyták.