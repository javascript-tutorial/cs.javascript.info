function vytvořArmádu() {

  let střelci = [];

  for(let i = 0; i < 10; i++) {
    let střelec = function() { // funkce střelec
      alert( i );              // by měla zobrazit své číslo
    };
    střelci.push(střelec);
  }

  return střelci;
}
