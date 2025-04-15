importance: 5

---

# Řazení podle vlastnosti

Máme pole objektů, které chceme seřadit:

```js
let uživatelé = [
  { jméno: "Jan", věk: 20, příjmení: "Janík" },
  { jméno: "Petr", věk: 18, příjmení: "Petřík" },
  { jméno: "Anna", věk: 19, příjmení: "Hadrabová" }
];
```

Obvyklý způsob, jak to udělat, by byl:

```js
// podle jména (Anna, Jan, Petr)
uživatelé.sort((a, b) => a.jméno > b.jméno ? 1 : -1);

// podle věku (Petr, Anna, Jan)
uživatelé.sort((a, b) => a.věk > b.věk ? 1 : -1);
```

Můžeme to učinit ještě stručněji, například takto?

```js
uživatelé.sort(podleVlastnosti('jméno'));
uživatelé.sort(podleVlastnosti('věk'));
```

Místo psaní funkce tedy jednoduše napíšeme `podleVlastnosti(názevVlastnosti)`.

Napište funkci `podleVlastnosti`, kterou k tomu můžeme použít.
