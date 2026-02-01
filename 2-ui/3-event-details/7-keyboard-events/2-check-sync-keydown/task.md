importance: 5

---

# Rozšíření horkých kláves

Vytvořte funkci `spusťNaKlávesy(funkce, kód1, kód2, ... kód_n)`, která spustí funkci `funkce` při současném stisknutí kláves s kódy `kód1`, `kód2`, ..., `kód_n`.

Například následující kód zobrazí `alert`, když jsou stisknuty současně `"Q"` a `"W"` (v jakémkoli jazyce, s CapsLockem nebo bez něj).

```js no-beautify
spusťNaKlávesy(
  () => alert("Ahoj!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]
