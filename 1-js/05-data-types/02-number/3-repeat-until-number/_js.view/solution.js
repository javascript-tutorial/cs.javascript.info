
function načtiČíslo() {
  let číslo;

  do {
    číslo = prompt("Zadejte číslo, prosím:", 0);
  } while ( !isFinite(číslo) );

  if (číslo === null || číslo === '') return null;
  
  return +číslo;
}