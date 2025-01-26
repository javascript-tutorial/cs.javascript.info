function sečtiProdeje(prodeje) {

  let součet = 0;
  for (let prodej of Object.values(prodeje)) {
    součet += prodej;
  }

  return součet;
}

