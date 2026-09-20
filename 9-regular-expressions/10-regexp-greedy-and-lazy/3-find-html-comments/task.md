# Najděte HTML komentáře

Najděte v textu všechny HTML komentáře:

```js
let rv = /váš RV/g;

let řetězec = `... <!-- Můj -- komentář
 test --> ..  <!----> .. 
`;

alert( řetězec.match(rv) ); // '<!-- Můj -- komentář \n test -->', '<!---->'
```
