
# Přepište na šipkové funkce

Přepište funkční výrazy v následujícím kódu na šipkové funkce:

```js run
function zeptejSe(otázka, ano, ne) {
  if (confirm(otázka)) ano();
  else ne();
}

zeptejSe(
  "Souhlasíte?",
  function() { alert("Souhlasil jste."); },
  function() { alert("Zrušil jste provádění."); }
);
```
