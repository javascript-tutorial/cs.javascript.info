function unikát(pole) {
  let výsledek = [];

  for (let str of pole) {
    if (!výsledek.includes(str)) {
      výsledek.push(str);
    }
  }

  return výsledek;
}
