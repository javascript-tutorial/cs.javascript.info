importance: 4

---

# Vytvoření klíčovaného objektu z pole

Řekněme, že máme pole uživatelů ve formě `{id:..., jméno:..., věk... }`.

Vytvořte funkci `seskupPodleId(pole)`, která z něj vytvoří objekt, jehož klíči budou hodnoty `id` a hodnotami prvky pole.

Příklad:

```js
let uživatelé = [
  {id: 'jan', jméno: "Jan Novák", věk: 20},
  {id: 'anna', jméno: "Anna Nováková", věk: 24},
  {id: 'petr', jméno: "Petr Petřík", věk: 31},
];

let uživateléPodleId = seskupPodleId(uživatelé);

/*
// po volání bychom měli mít:

uživateléPodleId = {
  jan: {id: 'jan', jméno: "Jan Novák", věk: 20},
  anna: {id: 'anna', jméno: "Anna Nováková", věk: 24},
  petr: {id: 'petr', jméno: "Petr Petřík", věk: 31},
}
*/
```

Taková funkce se opravdu hodí, když pracujeme se serverovými daty.

V této úloze předpokládáme, že `id` je unikátní. V poli nesmějí být dva prvky se stejným `id`.

Prosíme použijte v řešení metodu pole `.reduce`.
