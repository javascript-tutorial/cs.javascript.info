# Chyba ve funkci setTimeout

Co myslíte? Spustí se `.catch`? Zdůvodněte svou odpověď.

```js
new Promise(function(splň, zamítni) {
  setTimeout(() => {
    throw new Error("Ouha!");
  }, 1000);
}).catch(alert);
```
