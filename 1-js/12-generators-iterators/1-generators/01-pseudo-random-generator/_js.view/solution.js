function* pseudoNáhodné(semínko) {
  let hodnota = semínko;

  while(true) {
    hodnota = hodnota * 16807 % 2147483647
    yield hodnota;
  }

};
