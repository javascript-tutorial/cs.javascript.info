function vraťDenPřed(datum, dny) {
  let kopieData = new Date(datum);

  kopieData.setDate(datum.getDate() - dny);
  return kopieData.getDate();
}
