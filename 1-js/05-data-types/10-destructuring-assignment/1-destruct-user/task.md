importance: 5

---

# Destrukturační přiřazení

Máme objekt:

```js
let uživatel = {
  jméno: "Jan",
  roky: 30
};
```

Napište destrukturační přiřazení, které načte:

- vlastnost `jméno` do proměnné `jméno`.
- vlastnost `roky` do proměnné `věk`.
- vlastnost `jeAdmin` do proměnné `jeAdmin` (false, pokud taková vlastnost není).

Zde je příklad hodnot po vašem přiřazení:

```js
let uživatel = { jméno: "Jan", roky: 30 };

// váš kód na levé straně:
// ... = uživatel

alert( jméno ); // Jan
alert( věk ); // 30
alert( jeAdmin ); // false
```
