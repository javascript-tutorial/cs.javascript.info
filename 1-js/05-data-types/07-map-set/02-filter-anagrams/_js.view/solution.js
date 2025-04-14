
function odstraňAnagramy(pole) {
  let mapa = new Map();

  for(let slovo of pole) {
    let seřazené = slovo.toLowerCase().split("").sort().join("");
    mapa.set(seřazené, slovo);
  }

  return Array.from(mapa.values());
}