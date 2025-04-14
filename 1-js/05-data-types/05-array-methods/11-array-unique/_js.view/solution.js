function unikát(pole) {
  let výsledek = [];

  for (let řetězec of pole) {
    if (!výsledek.includes(řetězec)) {
      výsledek.push(řetězec);
    }
  }

  return výsledek;
}
