
# Znovusplnění příslibu?


Jaký je výstup níže uvedeného kódu?

```js
let příslib = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

příslib.then(alert);
```
