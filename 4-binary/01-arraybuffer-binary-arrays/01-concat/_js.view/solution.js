function zřetěz(polePolí) {
  // součet délek jednotlivých polí
  let celkováDélka = polePolí.reduce((součet, hodnota) => součet + hodnota.length, 0);

  let výsledek = new Uint8Array(celkováDélka);
  
  if (!polePolí.length) return výsledek;

  // pro každé pole - zkopírujeme je do výsledku
  // každé další pole se zkopíruje právě za předchozí
  let délka = 0;
  for(let pole of polePolí) {
    výsledek.set(pole, délka);
    délka += pole.length;
  }

  return výsledek;
}
