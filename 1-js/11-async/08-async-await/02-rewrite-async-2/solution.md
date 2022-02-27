
Nejsou tady žádné triky. Stačí uvnitř `demoUživatelGithubu` nahradit `.catch` za `try..catch` a přidat `async/await`, kde jsou zapotřebí:

```js run
class ChybaHttp extends Error {
  constructor(odpověď) {
    super(`${odpověď.status} pro ${odpověď.url}`);
    this.name = 'ChybaHttp';
    this.odpověď = odpověď;
  }
}

async function načtiJson(url) {
  let odpověď = await fetch(url);
  if (odpověď.status == 200) {
    return odpověď.json();
  } else {
    throw new ChybaHttp(odpověď);
  }
}

// Ptáme se na uživatelské jméno, dokud Github nevrátí platného uživatele
async function demoUživatelGithubu() {

  let uživatel;
  while(true) {
    let jméno = prompt("Zadejte jméno", "iliakan");

    try {
      uživatel = await načtiJson(`https://api.github.com/users/${jméno}`);
      break; // žádná chyba, opustíme cyklus
    } catch(chyba) {
      if (chyba instanceof ChybaHttp && chyba.odpověď.status == 404) {
        // po alertu bude cyklus pokračovat
        alert("Takový uživatel neexistuje, prosím zadejte znovu.");
      } else {
        // neznámá chyba, vyvoláme ji znovu
        throw chyba;
      }
    }      
  }


  alert(`Celé jméno: ${uživatel.name}.`);
  return uživatel;
}

demoUživatelGithubu();
```
