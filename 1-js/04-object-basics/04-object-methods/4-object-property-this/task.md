importance: 5

---

# Použití „this“ v objektovém literálu

Zde funkce `vytvořUživatele` vrátí objekt.

Jaký je výsledek přístupu k jeho vlastnosti `odkaz`? Proč?

```js
function vytvořUživatele() {
  return {
    jméno: "Jan",
    odkaz: this
  };
}

let uživatel = vytvořUživatele();

alert( uživatel.odkaz.jméno ); // Jaký je výsledek?
```

