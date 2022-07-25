
function filtrujPodleRozsahuNaMístě(arr, a, b) {

  for (let i = 0; i < pole.length; i++) {
    let hodnota = pole[i];

    // odstraní hodnotu, jestliže je mimo interval
    if (hodnota < a || hodnota > b) {
      pole.splice(i, 1);
      i--;
    }
  }

}
