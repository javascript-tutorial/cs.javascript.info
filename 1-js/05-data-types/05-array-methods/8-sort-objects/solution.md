```js run no-beautify
function seřaďPodleVěku(pole) {
  pole.sort((a, b) => a.věk - b.věk);
}

let jan = { jméno: "Jan", věk: 25 };
let petr = { jméno: "Petr", věk: 30 };
let marie = { jméno: "Marie", věk: 28 };

let pole = [ petr, jan, marie ];

seřaďPodleVěku(pole);

// nyní seřazenéPole je: [jan, marie, petr]
alert(pole[0].jméno); // Jan
alert(pole[1].jméno); // Marie
alert(pole[2].jméno); // Petr
```
