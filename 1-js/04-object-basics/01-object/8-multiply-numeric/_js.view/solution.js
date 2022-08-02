function vynásobČísla(obj) {
  for (let klíč in obj) {
    if (typeof obj[klíč] == 'number') {
      obj[klíč] *= 2;
    }
  }
}