
Chyba nastane proto, že funkce `zeptejSeNaHeslo` obdrží funkce `přihlášeníOK/přihlášeníSelhalo` bez objektu.

Když je zavolá, přirozeně předpokládají `this=undefined`.

Navažme kontext funkcí `bind`:

```js run
function zeptejSeNaHeslo(ok, selhal) {
  let heslo = prompt("Heslo?", '');
  if (heslo == "rockstar") ok();
  else selhal();
}

let uživatel = {
  jméno: 'Jan',

  přihlášeníOK() {
    alert(`${this.jméno} se přihlásil`);
  },

  přihlášeníSelhalo() {
    alert(`${this.jméno} se nedokázal přihlásit`);
  },

};

*!*
zeptejSeNaHeslo(uživatel.přihlášeníOK.bind(uživatel), uživatel.přihlášeníSelhalo.bind(uživatel));
*/!*
```

Teď to funguje.

Alternativní řešení by mohlo být:
```js
//...
zeptejSeNaHeslo(() => uživatel.přihlášeníOK(), () => uživatel.přihlášeníSelhalo());
```

Obvykle to také funguje a vypadá dobře.

Je to však méně spolehlivé ve složitějších situacích, kdy se proměnná `uživatel` může změnit *po* volání `zeptejSeNaHeslo`, ale *před* odpovědí návštěvníka a voláním `() => uživatel.přihlášeníOK()`. 
