importance: 5

---

# Práce s prototypem

Následuje kód, který vytvoří dva objekty a pak je změní.

Jaké hodnoty se v tomto procesu zobrazí?

```js
let zvíře = {
  skáče: null
};
let králík = {
  __proto__: zvíře,
  skáče: true
};

alert( králík.skáče ); // ? (1)

delete králík.skáče;

alert( králík.skáče ); // ? (2)

delete zvíře.skáče;

alert( králík.skáče ); // ? (3)
```

Odpovědi by měly být tři.
