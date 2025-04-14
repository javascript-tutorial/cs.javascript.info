
```js run no-beautify
let jan = { jméno: "Jan", příjmení: "Novák", id: 1 };
let petr = { jméno: "Petr", příjmení: "Horák", id: 2 };
let marie = { jméno: "Marie", příjmení: "Králová", id: 3 };

let uživatelé = [ jan, petr, marie ];

*!*
let mapovaníUživatelé = uživatelé.map(uživatel => ({
  celéJméno: `${uživatel.jméno} ${uživatel.příjmení}`,
  id: uživatel.id
}));
*/!*

/*
mapovaníUživatelé = [
  { celéJméno: "Jan Novák", id: 1 },
  { celéJméno: "Petr Horák", id: 2 },
  { celéJméno: "Marie Králová", id: 3 }
]
*/

alert( mapovaníUživatelé[0].id ); // 1
alert( mapovaníUživatelé[0].celéJméno ); // Jan Novák
```

Prosíme všimněte si, že v šipkové funkci musíme použít závorky navíc.

Nemůžeme ji napsat takto:
```js
let mapovaníUživatelé = uživatelé.map(uživatel => *!*{*/!*
  celéJméno: `${uživatel.jméno} ${uživatel.příjmení}`,
  id: uživatel.id
});
```

Jak si pamatujeme, existují dva druhy šipkových funkcí: bez těla `hodnota => výraz` a s tělem `hodnota => {...}`.

Zde JavaScript zachází s `{` jako se začátkem těla funkce, ne jako se začátkem objektu. Řešením je uzavřít objekt do „obyčejných“ závorek:

```js
let mapovaníUživatelé = uživatelé.map(uživatel => *!*({*/!*
  celéJméno: `${uživatel.jméno} ${uživatel.příjmení}`,
  id: uživatel.id
}));
```

Nyní je to v pořádku.


