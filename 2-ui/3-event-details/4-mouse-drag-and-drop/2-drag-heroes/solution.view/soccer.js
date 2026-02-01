let jeTáhnutí = false;

document.addEventListener('mousedown', function(událost) {

  let taženýElement = událost.target.closest('.přetahovatelný');

  if (!taženýElement) return;

  událost.preventDefault();

  taženýElement.ondragstart = function() {
      return false;
  };

  let souřadnice, posunX, posunY;

  začniTáhnutí(taženýElement, událost.clientX, událost.clientY);

  function onMouseUp(událost) {
    ukončiTáhnutí();
  };

  function onMouseMove(událost) {
    přesuňNa(událost.clientX, událost.clientY);
  }

  // při začátku táhnutí:
  //   zapamatujeme si úvodní posun
  //   přesuneme element s position:fixed jako přímé dítě těla (body)
  function začniTáhnutí(element, clientX, clientY) {
    if(jeTáhnutí) {
      return;
    }

    jeTáhnutí = true;

    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    posunX = clientX - element.getBoundingClientRect().left;
    posunY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';

    přesuňNa(clientX, clientY);
  };

  // na konci přepneme element na absolutní souřadnice, abychom jej upevnili v dokumentu
  function ukončiTáhnutí() {
    if(!jeTáhnutí) {
      return;
    }

    jeTáhnutí = false;

    taženýElement.style.top = parseInt(taženýElement.style.top) + window.pageYOffset + 'px';
    taženýElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    taženýElement.removeEventListener('mouseup', onMouseUp);
  }

  function přesuňNa(clientX, clientY) {
    // nové souřadnice, relativní vzhledem k oknu
    let novéX = clientX - posunX;
    let novéY = clientY - posunY;

    // ověříme, zda nové souřadnice jsou pod dolním okrajem okna
    let novýDolní = novéY + taženýElement.offsetHeight; // nový dolní okraj

    // jsou pod oknem? pak rolujeme stránku
    if (novýDolní > document.documentElement.clientHeight) {
      // okenní souřadnice konce dokumentu
      let dokumentDolní = document.documentElement.getBoundingClientRect().bottom;

      // rolování dokumentu dolů o 10px má problém
      // může rolovat za konec dokumentu
      // Math.min(kolik zbývá do konce, 10)
      let rolováníY = Math.min(dokumentDolní - novýDolní, 10);

      // výpočty jsou nepřesné, může dojít k zaokrouhlovacím chybám, které by vedly k rolování nahoru
      // to by nemělo být možné, tady to zajistíme
      if (rolováníY < 0) rolováníY = 0;

      window.scrollBy(0, rolováníY);

      // rychlý posun myši může dostat ukazatel za konec dokumentu
      // pokud se tak stane -
      // omezíme nové Y na maximální možnou hodnotu (přesně dolní okraj dokumentu)
      novéY = Math.min(novéY, document.documentElement.clientHeight - taženýElement.offsetHeight);
    }

    // ověříme, zda nové souřadnice jsou nad horním okrajem okna (podobná logika)
    if (novéY < 0) {
      // rolování nahoru
      let rolováníY = Math.min(-novéY, 10);
      if (rolováníY < 0) rolováníY = 0; // ověříme chyby přesnosti

      window.scrollBy(0, -rolováníY);
      // rychlý posun myši může dostat ukazatel před začátek dokumentu
      novéY = Math.max(novéY, 0); // novéY nesmí být menší než 0
    }


    // omezíme nové X hranicemi okna
    // zde není rolování, takže je to jednoduché
    if (novéX < 0) novéX = 0;
    if (novéX > document.documentElement.clientWidth - taženýElement.offsetWidth) {
      novéX = document.documentElement.clientWidth - taženýElement.offsetWidth;
    }

    taženýElement.style.left = novéX + 'px';
    taženýElement.style.top = novéY + 'px';
  }

});
