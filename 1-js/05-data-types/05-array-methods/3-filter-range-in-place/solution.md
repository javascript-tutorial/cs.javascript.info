```js run demo
function filtrujPodleRozsahuNaMístě(pole, a, b) {

  for (let i = 0; i < pole.length; i++) {
    let hodnota = pole[i];

    // odstraní hodnotu, jestliže je mimo interval
    if (hodnota < a || hodnota > b) {
      pole.splice(i, 1);
      i--;
    }
  }

}

let testovacíPole = [5, 3, 8, 1];

filtrujPodleRozsahuNaMístě(testovacíPole, 1, 4); // odstraní čísla, která nejsou od 1 do 4

alert( testovacíPole ); // [3, 1]
```
