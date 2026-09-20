function zřetěz(polePolí) {
  // ...váš kód...
}

let kusyDat = [
  new Uint8Array([0, 1, 2]),
  new Uint8Array([3, 4, 5]),
  new Uint8Array([6, 7, 8])
];

console.log(Array.from(zřetěz(kusyDat))); // 0, 1, 2, 3, 4, 5, 6, 7, 8

console.log(zřetěz(kusyDat).constructor.name); // Uint8Array
