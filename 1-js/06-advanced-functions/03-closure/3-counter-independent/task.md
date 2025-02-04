importance: 5

---

# Jsou čítače nezávislé?

Zde vytvoříme dva čítače: `čítač` a `čítač2` pomocí téže funkce `vytvořČítač`.

Jsou nezávislé? Co zobrazí druhý čítač? `0,1` nebo `2,3` nebo něco jiného?

```js
function vytvořČítač() {
  let počet = 0;

  return function() {
    return počet++;
  };
}

let čítač = vytvořČítač();
let čítač2 = vytvořČítač();

alert( čítač() ); // 0
alert( čítač() ); // 1

*!*
alert( čítač2() ); // ?
alert( čítač2() ); // ?
*/!*
```

