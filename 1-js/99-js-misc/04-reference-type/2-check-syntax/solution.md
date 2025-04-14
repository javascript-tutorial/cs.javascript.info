**Chyba!**

Zkuste si to:

```js run
let uživatel = {
  jméno: "Jan",
  jdi: function() { alert(this.jméno) }
}

(uživatel.jdi)() // chyba!
```

Ve většině prohlížečů nám chybová zpráva nedává mnoho informací o tom, co bylo špatně.

**Chyba se objevila proto, že za `uživatel = {...}` chybí středník.**

JavaScript automaticky nevloží středník před závorku `(uživatel.jdi)()`, takže přečte kód jako:

```js no-beautify
let uživatel = { jdi:... }(uživatel.jdi)()
```

Pak také vidíme, že takový spojený výraz je syntakticky voláním objektu `{ jdi: ... }` jako funkce s argumentem `(uživatel.jdi)`. A to se také odehrává na stejném řádku jako `let uživatel`, takže objekt `uživatel` ještě ani nebyl definován, proto nastane chyba.

Jestliže vložíme středník, bude vše v pořádku:

```js run
let uživatel = {
  jméno: "Jan",
  jdi: function() { alert(this.jméno) }
}*!*;*/!*

(uživatel.jdi)() // Jan
```

Prosíme všimněte si, že závorky okolo `(uživatel.jdi)` tady nic nedělají. Obvykle nastavují pořadí operací, ale tady jako první zafunguje tečka `.` tak jako tak, takže závorky nemají žádný efekt. Vadí jenom chybějící středník.
