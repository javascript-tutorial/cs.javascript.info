importance: 5

---

# Sečtěte všechna čísla až do zadaného

Napište funkci `sečtiDo(n)`, která vypočítá součet čísel `1 + 2 + ... + n`.

Například:

```js no-beautify
sečtiDo(1) = 1
sečtiDo(2) = 2 + 1 = 3
sečtiDo(3) = 3 + 2 + 1 = 6
sečtiDo(4) = 4 + 3 + 2 + 1 = 10
...
sečtiDo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

Vytvořte 3 varianty řešení:

1. Pomocí cyklu for.
2. Pomocí rekurze `sečtiDo(n) = n + sečtiDo(n-1)` pro `n > 1`.
3. Pomocí vzorce pro [aritmetickou posloupnost](https://cs.wikipedia.org/wiki/Aritmetická_posloupnost).

Příklad výsledku:

```js
function sečtiDo(n) { /*... váš kód ... */ }

alert( sečtiDo(100) ); // 5050
```

P.S. Která varianta řešení je nejrychlejší? A nejpomalejší? Proč?

P.P.S. Můžeme použít rekurzi k výpočtu `sečtiDo(100000)`? 
