function špión(funkce) {

  function wrapper(...argumenty) {
    // použijeme ...argumenty místo arguments, abychom do wrapper.volání uložili „skutečné“ pole
    wrapper.volání.push(argumenty);
    return funkce.apply(this, argumenty);
  }

  wrapper.volání = [];

  return wrapper;
}
