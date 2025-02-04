importance: 5

---
# Funkce v if

Podívejte se na kód. Jaký bude výsledek volání na posledním řádku?

```js run
let věta = "Ahoj";

if (true) {
  let uživatel = "Jan";

  function řekniAhoj() {
    alert(`${věta}, ${uživatel}`);
  }
}

*!*
řekniAhoj();
*/!*
```
