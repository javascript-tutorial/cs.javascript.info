importance: 5

---

# Vlastnost funkce po bind

Ve vlastnosti funkce je nějaká hodnota. Změní se po `bind`? Proč, nebo proč ne?

```js run
function řekniAhoj() {
  alert( this.jméno );
}
řekniAhoj.test = 5;

*!*
let vázaná = řekniAhoj.bind({
  jméno: "Jan"
});

alert( vázaná.test ); // jaký bude výstup? A proč?
*/!*
```

