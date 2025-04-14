importance: 5

---

# Vázaná funkce jako metoda

Jaký bude výstup?

```js
function f() {
  alert( this ); // ?
}

let uživatel = {
  g: f.bind(null)
};

uživatel.g();
```

