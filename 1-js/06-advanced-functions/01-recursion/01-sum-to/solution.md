Řešení pomocí cyklu:

```js run
function sečtiDo(n) {
  let součet = 0;
  for (let i = 1; i <= n; i++) {
    součet += i;
  }
  return součet;
}

alert( sečtiDo(100) );
```

Řešení pomocí rekurze:

```js run
function sečtiDo(n) {
  if (n == 1) return 1;
  return n + sečtiDo(n - 1);
}

alert( sečtiDo(100) );
```

Řešení pomocí vzorce: `sečtiDo(n) = n*(n+1)/2`:

```js run
function sečtiDo(n) {
  return n * (n + 1) / 2;
}

alert( sečtiDo(100) );
```

P.S. Nejrychlejší řešení je pochopitelně pomocí vzorce. Pro jakékoli číslo `n` vykonává pouze 3 operace. Matematika pomáhá!

Druhá nejlepší co do rychlosti je varianta s cyklem. V rekurzívní i v cyklové variantě sčítáme stejná čísla, ale rekurze vyžaduje vnořená volání a správu prováděcího zásobníku. To také vyžaduje zdroje, takže je to pomalejší.

P.P.S. Některé enginy podporují optimalizaci „koncového volání“: je-li rekurzívní volání ve funkci úplně poslední (jako ve výše uvedené `sečtiDo`), pak se nemusí obnovovat provádění vnější funkce, takže si engine nemusí pamatovat její prováděcí kontext. To odstraní paměťovou zátěž, takže bude možné provést výpočet `sečtiDo(100000)`. Pokud však engine JavaScriptu nepodporuje optimalizaci koncového volání (a většina enginů ji nepodporuje), nastane chyba: bude překročena maximální velikost zásobníku, protože celková velikost zásobníku je obvykle omezena.
