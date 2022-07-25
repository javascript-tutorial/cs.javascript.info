Nemůžeme „nahradit“ první znak, protože řetězce v JavaScriptu jsou neměnné.

Můžeme však vytvořit z existujícího řetězce nový, který bude mít první znak převedený na velké písmeno:

```js
let novýŘetězec = řetězec[0].toUpperCase() + řetězec.slice(1);
```

Je tady však malý problém. Jestliže `řetězec` je prázdný, pak `řetězec[0]` je `undefined`, a protože `undefined` nemá metodu `toUpperCase()`, dostaneme chybu.

Jsou zde dvě varianty řešení:

1. Použít `řetězec.charAt(0)`, jelikož ta vždy vrátí řetězec (možná prázdný).
2. Přidat kontrolu na prázdný řetězec.

Zde je druhá varianta:

```js run demo
function velkéPrvníPísmeno(řetězec) {
  if (!řetězec) return řetězec;

  return řetězec[0].toUpperCase() + řetězec.slice(1);
}

alert( velkéPrvníPísmeno("jan") ); // Jan
```

