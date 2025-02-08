importance: 5

---

# Opravte funkci, která ztrácí „this“

Volání `zeptejSeNaHeslo()` v následujícím kódu by mělo zkontrolovat heslo a pak podle toho, jaká je odpověď, zavolat `uživatel.přihlášeníOK/přihlášeníSelhalo`.

Vede však k chybě. Proč?

Opravte zvýrazněný řádek tak, aby všechno začalo fungovat správně (ostatní řádky neměňte).

```js run
function zeptejSeNaHeslo(ok, selhal) {
  let heslo = prompt("Heslo?", '');
  if (heslo == "rockstar") ok();
  else selhal();
}

let uživatel = {
  jméno: 'Jan',

  přihlášeníOK() {
    alert(`${this.jméno} přihlášen`);
  },

  přihlášeníSelhalo() {
    alert(`${this.jméno} se nedokázal přihlásit`);
  },

};

*!*
zeptejSeNaHeslo(uživatel.přihlášeníOK, uživatel.přihlášeníSelhalo);
*/!*
```
