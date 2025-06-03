function jePrázdný(obj) {
  for (let klíč in obj) {
    // pokud cyklus začal, je tam nějaká vlastnost
    return false;
  }
  return true;
}
