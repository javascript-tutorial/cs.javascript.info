importance: 5

---

# Co zobrazí setTimeout?

V níže uvedeném kódu je načasováno volání `setTimeout`, pak proběhne náročný výpočet, jehož dokončení bude trvat více než 100 ms.

Kdy se načasovaná funkce spustí?

1. Po cyklu.
2. Před cyklem.
3. Na začátku cyklu.


Co zobrazí `alert`?

```js
let i = 0;

setTimeout(() => alert(i), 100); // ?

// předpokládáme, že doba výkonu této funkce je větší než 100 ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
