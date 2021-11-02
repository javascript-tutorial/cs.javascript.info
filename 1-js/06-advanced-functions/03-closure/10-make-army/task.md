importance: 5

---

# Armáda funkcí

Následující kód vytvoří pole `střelci`.

Každá funkce má vypsat své číslo. Ale něco je špatně...

```js run
function vytvořArmádu() {
  let střelci = [];

  let i = 0;
  while (i < 10) {
    let střelec = function() { // vytvoříme funkci střelec,
      alert( i );              // která by měla zobrazit své číslo
    };
    střelci.push(střelec); // a přidáme ji do pole
    i++;
  }

  // ...a vrátíme pole střelci
  return střelci;
}

let armáda = vytvořArmádu();

*!*
// všichni střelci zobrazí 10 místo svých čísel 0, 1, 2, 3...
armáda[0](); // 10 od střelce číslo 0
armáda[1](); // 10 od střelce číslo 1
armáda[2](); // 10 ...a tak dále.
*/!*
```

Proč všichni střelci zobrazují stejnou hodnotu?

Opravte kód, aby fungoval tak, jak je zamýšleno.
