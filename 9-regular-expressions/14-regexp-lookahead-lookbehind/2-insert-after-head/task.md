# Vložení za hlavičku

Máme řetězec s HTML dokumentem.

Napište regulární výraz, který vloží `<h1>Ahoj</h1>` hned za značku `<body>`. Tato značka může obsahovat atributy.

Například:

```js
let rv = /váš regulární výraz/;

let řetězec = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

řetězec = řetězec.replace(rv, `<h1>Ahoj</h1>`);
```

Pak by hodnota proměnné `řetězec` měla být následující:

```html
<html>
  <body style="height: 200px"><h1>Ahoj</h1>
  ...
  </body>
</html>
```
