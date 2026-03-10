// <td> pod ukazatelem právě teď (pokud nějaká je)
let aktuálníElem = null;

tabulka.onmouseover = function(událost) {
  // před vstupem na nový element myš vždy opustí předchozí
  // jestliže aktuálníElem je nastaven, neopustili jsme předchozí <td>,
  // jde o mouseover uvnitř něj, tuto událost budeme ignorovat
  if (aktuálníElem) return;

  let cíl = událost.target.closest('td');

  // nepřesunuli jsme se na <td> - ignorovat
  if (!cíl) return;

  // přesunuli jsme se na <td>, ale mimo naši tabulku (to je možné v případě vnořených tabulek)
  // ignorovat
  if (!tabulka.contains(cíl)) return;

  // hurá! vstoupili jsme na novou <td>
  aktuálníElem = cíl;
  přiPříchodu(aktuálníElem);
};


tabulka.onmouseout = function(událost) {
  // pokud jsme nyní mimo jakoukoli <td>, budeme tuto událost ignorovat
  // to je pravděpodobně pohyb uvnitř tabulky, ale mimo <td>,
  // např. z <tr> na jinou <tr>
  if (!aktuálníElem) return;

  // opouštíme element - kam? Možná na potomka?
  let cílPohybu = událost.relatedTarget;

  while (cílPohybu) {
    // projdeme řetězec rodičů a prověříme to - pokud jsme stále uvnitř aktuálníElem,
    // je to vnitřní přesun - budeme ho ignorovat
    if (cílPohybu == aktuálníElem) return;

    cílPohybu = cílPohybu.parentNode;
  }

  // opravdu jsme opustili <td>
  přiOdchodu(aktuálníElem);
  aktuálníElem = null;
};

// veškeré funkce pro zpracování vstupu/opuštění elementu
function přiPříchodu(elem) {
  elem.style.background = 'pink';

  // zobrazíme to v textarea
  text.value += `dovnitř -> ${aktuálníElem.tagName}.${aktuálníElem.className}\n`;
  text.scrollTop = 1e6;
}

function přiOdchodu(elem) {
  elem.style.background = '';

  // zobrazíme to v textarea
  text.value += `ven <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
