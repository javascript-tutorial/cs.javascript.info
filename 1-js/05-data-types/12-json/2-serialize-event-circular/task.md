importance: 5

---

# Vyřaďte zpětné odkazy

V jednoduchých případech kruhových odkazů můžeme závadnou vlastnost vyřadit ze serializace podle jejího názvu.

Někdy však nemůžeme použít jen název, protože stejný název může být použit jak v kruhových odkazech, tak v normálních vlastnostech. Můžeme tedy zkontrolovat vlastnost podle její hodnoty.

Napište funkci `replacer`, která zřetězí všechno, ale odstraní vlastnosti, které se odkazují na `mítink`:

```js run
let místnost = {
  číslo: 23
};

let mítink = {
  titul: "Konference",
  obsazenoČím: [{jméno: "Jan"}, {jméno: "Alice"}],
  místo: místnost
};

*!*
// kruhové odkazy
místnost.obsazenoČím = mítink;
mítink.self = mítink;
*/!*

alert( JSON.stringify(mítink, function replacer(klíč, hodnota) {
  /* váš kód */
}));

/* výsledek by měl být:
{
  "titul":"Konference",
  "obsazenoČím":[{"jméno":"Jan"},{"jméno":"Alice"}],
  "místo":{"číslo":23}
}
*/
```
