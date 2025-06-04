Nemůžeme „nahradit“ první znak, protože řetězce v JavaScriptu jsou neměnné.

Můžeme však vytvořit z existujícího řetězce nový, který bude mít první znak převedený na velké písmeno:

```js
let novýŘetězec = řetězec[0].toUpperCase() + řetězec.slice(1);
```

Je tady však malý problém. Jestliže `řetězec` je prázdný, pak `řetězec[0]` je `undefined`, a protože `undefined` nemá metodu `toUpperCase()`, dostaneme chybu.

Nejjednodušší způsob, jak to vyřešit, je přidat test na prázdný řetězec, například takto:

```js run demo
function velkéPrvníPísmeno(řetězec) {
  if (!řetězec) return řetězec;

  return řetězec[0].toUpperCase() + řetězec.slice(1);
}

alert( velkéPrvníPísmeno("jan") ); // Jan
```
