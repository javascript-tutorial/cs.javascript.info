
```js run demo
function načtiČíslo() {
  let číslo;

  do {
    číslo = prompt("Zadejte číslo, prosím:", 0);
  } while ( !isFinite(číslo) );

  if (číslo === null || číslo === '') return null;
  
  return +číslo;
}

alert(`Načteno: ${načtiČíslo()}`);
```

Řešení je trochu složitější, než by mohlo být, protože si musíme poradit s `null`/prázdnými řádky.

Ve skutečnosti tedy přijímáme vstup tak dlouho, dokud to není „skutečné číslo“. Tuto podmínku splňují i `null` (storno) a prázdný řádek, protože v číselné podobě jsou obě `0`.

Po skončení musíme zacházet s `null` a s prázdným řádkem speciálně (vrátit `null`), jelikož jejich konverze na číslo by vrátila `0`.

