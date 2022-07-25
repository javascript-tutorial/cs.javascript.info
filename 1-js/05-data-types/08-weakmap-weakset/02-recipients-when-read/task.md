importance: 5

---

# Uložení data přečtení

Máme stejné pole zpráv, jako [v předchozí úloze](info:task/recipients-read). Situace je obdobná.

```js
let zprávy = [
  {text: "Ahoj", od: "Jan"},
  {text: "Jak se máš?", od: "Jan"},
  {text: "Brzy se uvidíme", od: "Alice"}
];
```

Otázka teď zní: kterou datovou strukturu byste doporučili k uložení informace „kdy byla zpráva přečtena“?

V předchozí úloze jsme potřebovali ukládat jen skutečnost „ano/ne“. Nyní musíme ukládat datum, které by mělo zůstat v paměti jen do doby, než bude zpráva odklizena garbage collectorem.

P.S. Data lze ukládat jako objekty vestavěné třídy `Date`, kterou probereme později.
