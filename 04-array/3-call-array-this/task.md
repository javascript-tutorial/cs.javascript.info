importance: 5

---

# Volání v kontextu pole

Jaký je výsledek? Proč?

```js
let pole = ["a", "b"];

pole.push(function() {
  alert( this );
});

pole[2](); // ?
```

