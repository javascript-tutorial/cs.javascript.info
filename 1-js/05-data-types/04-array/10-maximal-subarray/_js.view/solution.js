function vraťMaxSoučetPodpole(arr) {
  let maxSoučet = 0;
  let částečnýSoučet = 0;

  for (let prvek of pole) {
    částečnýSoučet += prvek;
    maxSoučet = Math.max(maxSoučet, částečnýSoučet);
    if (částečnýSoučet < 0) částečnýSoučet = 0;
  }
  return maxSoučet;
}