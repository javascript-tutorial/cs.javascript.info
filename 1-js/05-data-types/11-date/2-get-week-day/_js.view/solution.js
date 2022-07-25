function vraťDenVTýdnu(datum) {
  let dny = ['NE', 'PO', 'ÚT', 'ST', 'ČT', 'PÁ', 'SO'];

  return dny[datum.getDay()];
}
