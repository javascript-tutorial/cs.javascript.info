importance: 4

---

# Zjištění průměrného věku

Napište funkci `vraťPrůměrnýVěk(uživatelé)`, která obdrží pole objektů s vlastností `věk` a vrátí průměrný věk.

Vzorec pro výpočet průměru je `(věk1 + věk2 + ... + věkN) / N`.

Příklad:

```js no-beautify
let jan = { jméno: "Jan", věk: 25 };
let petr = { jméno: "Petr", věk: 30 };
let marie = { jméno: "Marie", věk: 29 };

let pole = [ jan, petr, marie ];

alert( vraťPrůměrnýVěk(pole) ); // (25 + 30 + 29) / 3 = 28
```
