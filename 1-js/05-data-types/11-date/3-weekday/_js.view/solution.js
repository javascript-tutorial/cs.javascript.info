function vraťMístníDenVTýdnu(datum) {

  let den = datum.getDay();

  if (den == 0) { // 0. den v týdnu (neděle) je v Evropě 7.
    den = 7;
  }

  return den;
}
