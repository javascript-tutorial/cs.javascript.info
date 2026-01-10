importance: 5

---

# Vytvořte oznámení

Napište funkci `zobrazOznámení(možnosti)`, která vytvoří oznámení: `<div class="oznámení">` v zadaném kontextu. Toto oznámení by mělo za 1,5 sekundy automaticky zmizet.

Možnosti jsou:

```js
// zobrazí element s textem "Ahoj" poblíž pravého horního rohu okna
zobrazOznámení({
  top: 10, // 10px od horního okraje okna (standardně 0px)
  right: 10, // 10px od pravého okraje okna (standardně 0px)
  html: "Ahoj!", // HTML s oznámením
  className: "uvítání" // další třída pro tento div (nepovinná)
});
```

[demo src="solution"]

Pro zobrazení elementu na zadaných souřadnicích shora a zprava použijte umisťování pomocí CSS. Zdrojový dokument obsahuje nezbytné styly.
