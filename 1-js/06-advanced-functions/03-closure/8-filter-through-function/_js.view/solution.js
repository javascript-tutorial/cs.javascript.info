
function vPoli(pole) {
  return x => pole.includes(x);
}

function mezi(a, b) {
  return x => (x >= a && x <= b);
}