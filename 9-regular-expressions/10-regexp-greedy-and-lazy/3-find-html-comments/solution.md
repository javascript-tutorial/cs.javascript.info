Musíme najít začátek komentáře `match:<!--` a pak všechno až do konce `match:-->`.

Přijatelná varianta je `pattern:<!--.*?-->` -- liknavý kvantifikátor přinutí tečku zastavit se těsně před `match:-->`. Musíme také uvést příznak `pattern:s`, aby tečka zahrnovala i znaky nového řádku.

Jinak by se nenašly víceřádkové komentáře:

```js run
let rv = /<!--.*?-->/gs;

let řetězec = `... <!-- Můj -- komentář
 test --> ..  <!----> .. 
`;

alert( řetězec.match(rv) ); // '<!-- Můj -- komentář \n test -->', '<!---->'
```
