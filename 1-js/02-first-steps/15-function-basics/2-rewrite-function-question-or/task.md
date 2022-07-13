importance: 4

---

# Přepište funkci pomocí „?“ nebo „||“

Následující funkce vrátí `true`, jestliže parametr `věk` je větší než `18`.

Jinak se zeptá na povolení a vrátí výsledek dotazu:


```js
function ověřVěk(věk) {
  if (věk > 18) {
    return true;
  } else {
    return confirm('Dovolili ti to rodiče?');
  }
}
```

Přepište ji, aby dělala totéž, ale bez použití `if` a na jediný řádek.

Vytvořte dvě varianty `ověřVěk`:

1. Pomocí operátoru otazníku `?`
2. Pomocí OR `||`
