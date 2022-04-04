function ověřSpam(řetězec) {
  let řetězecMalýmiPísmeny = řetězec.toLowerCase();

  return řetězecMalýmiPísmeny.includes('viagra') || řetězecMalýmiPísmeny.includes('xxx');
}