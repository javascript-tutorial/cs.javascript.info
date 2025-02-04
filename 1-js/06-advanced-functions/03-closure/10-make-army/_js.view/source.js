function vytvořArmádu() {
  let střelci = [];

  let i = 0;
  while (i < 10) {
    let střelec = function() { // funkce střelec
      alert( i );              // by měla zobrazit své číslo
    };
    střelci.push(střelec);
    i++;
  }

  return střelci;
}

/*
let armáda = vytvořArmádu();

armáda[0](); // střelec číslo 0 zobrazí 10
armáda[5](); // a číslo 5 zobrazí také 10...
// ... všichni střelci zobrazí 10 místo svého čísla 0, 1, 2, 3...
*/
