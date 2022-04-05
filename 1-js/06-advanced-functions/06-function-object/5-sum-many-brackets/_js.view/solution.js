function součet(a) {

  let aktuálníSoučet = a;

  function f(b) {
    aktuálníSoučet += b;
    return f;
  }

  f.toString = function() {
    return aktuálníSoučet;
  };

  return f;
}
