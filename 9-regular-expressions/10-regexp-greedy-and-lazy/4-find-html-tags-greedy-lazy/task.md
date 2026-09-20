# Najděte HTML značky

Vytvořte regulární výraz, který najde všechny (otevírací i uzavírací) HTML značky i s jejich atributy.

Příklad použití:

```js run
let rv = /váš RV/g;

let řetězec = '<> <a href="/"> <input type="radio" checked> <b>';

alert( řetězec.match(rv) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

Zde předpokládáme, že atributy značky nesmějí obsahovat `<` a `>` (ani v uvozovkách), což úlohu trochu zjednoduší.
