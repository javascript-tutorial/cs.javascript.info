function špión(funkce) {

  function obal(...argumenty) {
    // použijeme ...argumenty místo arguments, abychom do obal.volání uložili „skutečné“ pole
    obal.volání.push(argumenty);
    return funkce.apply(this, argumenty);
  }

  obal.volání = [];

  return obal;
}
