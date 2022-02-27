
# Přepište za použití async/await

Přepište tento příklad kódu z kapitoly <info:promise-chaining> za použití `async/await` namísto `.then/catch`:

```js run
function načtiJson(url) {
  return fetch(url)
    .then(odpověď => {
      if (odpověď.status == 200) {
        return odpověď.json();
      } else {
        throw new Error(odpověď.status);
      }
    });
}

načtiJson('https://javascript.info/takovy-uzivatel-neni.json')
  .catch(alert); // Chyba: 404
```
