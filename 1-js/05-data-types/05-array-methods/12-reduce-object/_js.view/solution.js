function seskupPodleId(pole) {
  return pole.reduce((obj, hodnota) => {
    obj[hodnota.id] = hodnota;
    return obj;
  }, {})
}
