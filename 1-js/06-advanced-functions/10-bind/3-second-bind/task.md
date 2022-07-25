importance: 5

---

# Druhá vazba

Můžeme změnit `this` další vazbou?

Jaký bude výstup?

```js no-beautify
function f() {
  alert(this.jméno);
}

f = f.bind( {jméno: "Jan"} ).bind( {jméno: "Anna" } );

f();
```

