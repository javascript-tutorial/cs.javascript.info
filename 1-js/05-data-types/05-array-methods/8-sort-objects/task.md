importance: 5

---

# Seřazení uživatelů podle věku

Napište funkci `seřaďPodleVěku(uživatelé)`, která obdrží pole objektů s vlastností `věk` a seřadí je podle této vlastnosti.

Příklad:

```js no-beautify
let jan = { jméno: "Jan", věk: 25 };
let petr = { jméno: "Petr", věk: 30 };
let marie = { jméno: "Marie", věk: 28 };

let pole = [ petr, jan, marie ];

seřaďPodleVěku(pole);

// nyní: [jan, marie, petr]
alert(pole[0].jméno); // Jan
alert(pole[1].jméno); // Marie
alert(pole[2].jméno); // Petr
```
