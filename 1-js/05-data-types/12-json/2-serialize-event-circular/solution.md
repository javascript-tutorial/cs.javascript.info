
```js run
let místnost = {
  číslo: 23
};

let mítink = {
  titul: "Konference",
  obsazenoČím: [{jméno: "Jan"}, {jméno: "Alice"}],
  místo: místnost
};

místnost.obsazenoČím = mítink;
mítink.onSám = mítink;

alert( JSON.stringify(mítink, function nahrazení(klíč, hodnota) {
  return (klíč != "" && hodnota == mítink) ? undefined : hodnota;
}));

/* 
{
  "titul":"Konference",
  "obsazenoČím":[{"jméno":"Jan"},{"jméno":"Alice"}],
  "místo":{"číslo":23}
}
*/
```

Zde musíme testovat i to, zda `klíč==""`, abychom vyloučili první volání, kde je v pořádku, že `hodnota` je `mítink`.

