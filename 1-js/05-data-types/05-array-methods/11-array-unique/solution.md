Projděme si prvky pole:
- U každého prvku ověříme, zda výsledné pole již tento prvek obsahuje.
- Pokud je tomu tak, budeme ho ignorovat, jinak ho přidáme do výsledku.

```js run demo
function unikát(pole) {
  let výsledek = [];

  for (let řetězec of pole) {
    if (!výsledek.includes(řetězec)) {
      výsledek.push(řetězec);
    }
  }

  return výsledek;
}

let řetězce = ["Haré", "Kršna", "Haré", "Kršna",
  "Kršna", "Kršna", "Haré", "Haré", ":-O"
];

alert( unikát(řetězce) ); // Haré, Kršna, :-O
```

Tento kód funguje, ale má potenciální problém s výkonem.

Metoda `výsledek.includes(řetězec)` vnitřně prochází pole `výsledek` a porovná každý jeho prvek s `řetězec`, aby našla shodu.

Jestliže tedy v poli `výsledek` je `100` prvků a žádný se nerovná `řetězec`, pak projde celé pole `výsledek` a provede právě `100` porovnání. A je-li `výsledek` velký, např. `10000`, pak se vykoná `10000` porovnání.

To samo o sobě není problém, jelikož JavaScriptové motory jsou velmi rychlé, takže projít pole `10000` prvků je otázkou mikrosekund.

My však provádíme takový test pro každý prvek `pole` v cyklu `for`.

Jestliže tedy `pole.length` je `10000`, budeme mít něco jako `10000*10000` = 100 miliónů porovnání. To je hodně.

Toto řešení je tedy dobré jen pro malá pole.

Později v kapitole <info:map-set> uvidíme, jak je optimalizovat.
