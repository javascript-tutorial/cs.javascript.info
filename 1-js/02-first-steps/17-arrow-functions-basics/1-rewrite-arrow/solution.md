
```js run
function zeptejSe(otázka, ano, ne) {
  if (confirm(otázka)) ano();
  else ne();
}

zeptejSe(
  "Souhlasíte?",
*!*
  () => alert("Souhlasil jste."),
  () => alert("Zrušil jste provádění.")
*/!*
);
```

Vypadá to stručně a čistě, že?
