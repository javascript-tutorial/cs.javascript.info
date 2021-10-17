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
<<<<<<< Updated upstream
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
=======
    let střelec = function() { // vytvoříme funkci střelec,
      alert( i );              // která by měla zobrazit své číslo
    };
    střelci.push(střelec); // a přidáme ji do pole
    i++;
  }

  // ...a vrátíme pole střelci
  return střelci;
>>>>>>> Stashed changes
}

let armáda = vytvořArmádu();

<<<<<<< Updated upstream
army[0](); // the shooter number 0 shows 10
army[5](); // and number 5 also outputs 10...
// ... all shooters show 10 instead of their 0, 1, 2, 3...
```

Why do all of the shooters show the same value? Fix the code so that they work as intended.
=======
*!*
// všichni střelci zobrazí 10 místo svých čísel 0, 1, 2, 3...
armáda[0](); // 10 od střelce číslo 0
armáda[1](); // 10 od střelce číslo 1
armáda[2](); // 10 ...a tak dále.
*/!*
```

Proč všichni střelci zobrazují stejnou hodnotu?

Opravte kód, aby fungoval tak, jak je zamýšleno.
>>>>>>> Stashed changes

