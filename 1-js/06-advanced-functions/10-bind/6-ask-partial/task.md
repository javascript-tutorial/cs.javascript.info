importance: 5

---

# Částečná aplikace pro přihlášení

Tato úloha je trochu složitější variantou úlohy <info:task/question-use-bind>. 

Objekt `uživatel` se změnil. Nyní má místo dvou funkcí `přihlášeníOK/přihlášeníSelhalo` jedinou funkci `uživatel.přihlaš(true/false)`.

Co bychom měli předat funkci `zeptejSeNaHeslo` v následujícím kódu, aby volala `uživatel.přihlaš(true)` jako `ok` a `uživatel.přihlaš(false)` jako `selhal`?

```js
function zeptejSeNaHeslo(ok, selhal) {
  let heslo = prompt("Heslo?", '');
  if (heslo == "rockstar") ok();
  else selhal();
}

let uživatel = {
  jméno: 'Jan',

  přihlaš(výsledek) {
    alert( this.jméno + (výsledek ? ' se přihlásil' : ' se nedokázal přihlásit') );
  }
};

*!*
zeptejSeNaHeslo(?, ?); // ?
*/!*
```

Vaše změny by měly modifikovat pouze zvýrazněnou část.

