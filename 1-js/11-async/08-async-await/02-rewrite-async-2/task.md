
# Přepište „opětovné vyvolání“ za použití async/await

Následuje příklad „opětovného vyvolání“. Přepište jej za použití `async/await` místo `.then/catch`.

A ve funkci `demoUživatelGitHubu` se zbavte rekurze ve prospěch cyklu: s `async/await` to bude lehké.

```js run
class ChybaHttp extends Error {
  constructor(odpověď) {
    super(`${odpověď.status} pro ${odpověď.url}`);
    this.name = 'ChybaHttp';
    this.odpověď = odpověď;
  }
}

function načtiJson(url) {
  return fetch(url)
    .then(odpověď => {
      if (odpověď.status == 200) {
        return odpověď.json();
      } else {
        throw new ChybaHttp(odpověď);
      }
    });
}

// Ptáme se na uživatelské jméno, dokud GitHub nevrátí platného uživatele
function demoUživatelGitHubu() {
  let jméno = prompt("Zadejte jméno", "iliakan");

  return načtiJson(`https://api.github.com/users/${jméno}`)
    .then(uživatel => {
      alert(`Celé jméno: ${uživatel.name}.`);
      return uživatel;
    })
    .catch(chyba => {
      if (chyba instanceof ChybaHttp && chyba.odpověď.status == 404) {
        alert("Takový uživatel neexistuje, prosím zadejte znovu.");
        return demoUživatelGitHubu();
      } else {
        throw chyba;
      }
    });
}

demoUživatelGitHubu();
```
