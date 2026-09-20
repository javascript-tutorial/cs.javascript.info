
Pro stažení uživatele potřebujeme: `fetch('https://api.github.com/users/USERNAME')`.

Jestliže odpověď má status `200`, zavoláme `.json()`, abychom načetli JS objekt.

V opačném případě, jestliže `fetch` selže nebo odpověď má jiný status než 200, jen vrátíme ve výsledném poli `null`.

Zde je tedy kód:

```js demo
async function vraťUživatele(jména) {
  let uživatelé = [];

  for(let jméno of jména) {
    let uživatel = fetch(`https://api.github.com/users/${jméno}`).then(
      úspěšnáOdpověď => {
        if (úspěšnáOdpověď.status != 200) {
          return null;
        } else {
          return úspěšnáOdpověď.json();
        }
      },
      neúspěšnáOdpověď => {
        return null;
      }
    );
    uživatelé.push(uživatel);
  }

  let výsledky = await Promise.all(uživatelé);

  return výsledky;
}
```

Prosíme všimněte si, že volání `.then` je připojeno přímo k `fetch`. Když tedy máme odpověď, nečeká na ostatní stahování, ale začne okamžitě načítat `.json()`.

Kdybychom použili `await Promise.all(jména.map(jméno => fetch(...)))` a volali `.json()` na výsledcích, napřed by se čekalo na odpovědi všech stahování. Přidáním `.json()` přímo ke každému `fetch` zajistíme, že jednotlivá stahování začnou načítat data jako JSON bez čekání na ostatní stahování.

Je to příklad toho, jak může být příslibové API nižší úrovně stále užitečné, i když převážně používáme `async/await`.
