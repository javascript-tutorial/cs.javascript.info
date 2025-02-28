
# Znovusplnění příslibu?


Jaký je výstup následujícího kódu?

```js
let příslib = new Promise(function(splň, zamítni) {
  splň(1);

  setTimeout(() => splň(2), 1000);
});

příslib.then(alert);
```
