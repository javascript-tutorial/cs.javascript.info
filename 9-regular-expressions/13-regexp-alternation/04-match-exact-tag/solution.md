
Začátek vzoru je zřejmý: `pattern:<style`.

...Pak ale nemůžeme jednoduše napsat `pattern:<style.*?>`, protože tomu by odpovídalo i `match:<styler>`.

Potřebujeme buď mezeru za `match:<style` a pak nepovinně něco dalšího, nebo koncové `match:>`.

V jazyce regulárních výrazů: `pattern:<style(>|\s.*?>)`.

V akci:

```js run
let rv = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(rv) ); // <style>, <style test="...">
```
