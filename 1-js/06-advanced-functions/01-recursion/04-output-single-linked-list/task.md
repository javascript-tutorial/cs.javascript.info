importance: 5

---

# Vypište lineární spojový seznam

Dejme tomu, že máme lineární spojový seznam (popsaný v kapitole <info:recursion>):

```js
let seznam = {
  hodnota: 1,
  další: {
    hodnota: 2,
    další: {
      hodnota: 3,
      další: {
        hodnota: 4,
        další: null
      }
    }
  }
};
```

Napište funkci `vypišSeznam(seznam)`, která vypíše prvky seznamu jeden po druhém.

Vytvořte dvě varianty řešení: pomocí cyklu a pomocí rekurze.

Která je lepší: s rekurzí nebo bez ní?
