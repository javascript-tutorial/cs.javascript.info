importance: 5

---

# Použití „this“ v objektovém literálu

Zde funkce `vytvořUživatele` vrátí objekt.

Jaký je výsledek přístupu k jejímu `ref`? Proč?

```js
function vytvořUživatele() {
  return {
    jméno: "Jan",
    ref: this
  };
}

let uživatel = vytvořUživatele();

alert( uživatel.ref.jméno ); // Jaký je výsledek?
```

