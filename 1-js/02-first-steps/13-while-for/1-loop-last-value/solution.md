Odpověď: `1`.

```js run
let i = 3;

while (i) {
  alert( i-- );
}
```

Každá iterace cyklu sníží `i` o `1`. Ověření `while(i)` zastaví cyklus, když `i = 0`.

Jednotlivé kroky cyklu tedy vytvoří následující posloupnost:

```js
let i = 3;

alert(i--); // zobrazí 3, sníží i na 2

alert(i--) // zobrazí 2, sníží i na 1

alert(i--) // zobrazí 1, sníží i na 0

// hotovo, ověření while(i) ukončí cyklus
```
