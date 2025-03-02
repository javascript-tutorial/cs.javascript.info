
Poznámky jsou pod kódem:

```js run
async function načtiJson(url) { // (1)
  let odpověď = await fetch(url); // (2)

  if (odpověď.status == 200) {
    let json = await odpověď.json(); // (3)
    return json;
  }

  throw new Error(odpověď.status);
}

načtiJson('https://javascript.info/takovy-uzivatel-neni.json')
  .catch(alert); // Chyba: 404 (4)
```

Poznámky:

1. Funkce `načtiJson` se stává asynchronní (`async`).
2. Všechna `.then` uvnitř jsou nahrazena za `await`.
3. Můžeme vrátit `return odpověď.json()` místo čekání na tuto funkci, například:

    ```js
    if (odpověď.status == 200) {
      return odpověď.json(); // (3)
    }
    ```

    Pak by vnější kód musel počkat pomocí `await`, než se tento příslib vyhodnotí. V našem případě na tom nezáleží.
4. Chyba vyvolaná z `načtiJson` je ošetřena pomocí `.catch`. Nemůžeme zde použít `await načtiJson(…)`, protože nejsme uvnitř funkce s `async`.
