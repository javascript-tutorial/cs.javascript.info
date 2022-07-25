function tlumič(func, ms) {

  let jeTlumena = false,
    uloženéArgumenty,
    uloženéThis;

  function wrapper() {

    if (jeTlumena) {
      // zapamatujeme si poslední argumenty, abychom je mohli volat po vychladnutí
      uloženéArgumenty = arguments;
      uloženéThis = this;
      return;
    }

    // jinak přejdeme do stavu vychladnutí
    func.apply(this, arguments);

    jeTlumena = true;

    // načasujeme resetování jeTlumena po prodlevě
    setTimeout(function() {
      jeTlumena = false;
      if (uloženéArgumenty) {
        // pokud byla nějaká volání, uloženéThis/uloženéArgumenty obsahují ty poslední
        // rekurzívní volání spustí funkci a znovu nastaví vychladnutí
        wrapper.apply(uloženéThis, uloženéArgumenty);
        uloženéArgumenty = uloženéThis = null;
      }
    }, ms);
  }

  return wrapper;
}