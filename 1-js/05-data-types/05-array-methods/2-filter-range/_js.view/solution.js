
function filtrujPodleRozsahu(pole, a, b) {
  // závorky kolem výrazu jsou přidány pro lepší čitelnost
  return pole.filter(prvek => (a <= prvek && prvek <= b));
}