```js run demo
function filtrujPodleRozsahu(pole, a, b) {
  // závorky kolem výrazu jsou přidány pro lepší čitelnost
  return pole.filter(prvek => (a <= prvek && prvek <= b));
}

let testovacíPole = [5, 3, 8, 1];

let filtrovanéPole = filtrujPodleRozsahu(testovacíPole, 1, 4); 

alert( filtrovanéPole ); // 3,1 (odpovídající hodnoty)

alert( testovacíPole ); // 5,3,8,1 (nezměněno)
```
