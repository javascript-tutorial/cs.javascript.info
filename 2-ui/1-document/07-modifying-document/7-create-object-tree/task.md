importance: 5

---

# Vytvořte strom z objektu

Napište funkci `vytvořStrom`, která z vnořeného objektu vytvoří vnořený seznam `ul/li`.

Například:

```js
let data = {
  "Ryby": {
    "pstruh": {},
    "losos": {}
  },

  "Stromy": {
    "Velké": {
      "sekvoj": {},
      "dub": {}
    },
    "Kvetoucí": {
      "jabloň": {},
      "magnólie": {}
    }
  }
};
```

Syntaxe:

```js
let kontejner = document.getElementById('kontejner');
*!*
vytvořStrom(kontejner, data); // vytvoří strom v kontejneru
*/!*
```

Výsledek (strom) by měl vypadat takto:

[iframe border=1 src="build-tree-dom"]

Zvolte si jeden ze dvou způsobů, jak tento úkol vyřešit:

1. Vytvořte HTML pro strom a přiřaďte jej do `kontejner.innerHTML`.
2. Vytvořte uzly stromu a připojujte je DOM metodami.

Pokud dokážete obojí, bude to vynikající.

P.S. Strom by neměl obsahovat elementy „navíc“, například prázdné `<ul></ul>` pro listy.
