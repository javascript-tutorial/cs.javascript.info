Řešení je krátké, ale může vypadat trochu komplikovaně, proto je opatřím rozsáhlými komentáři:

```js
let seřazenéŘádky = Array.from(tabulka.tBodies[0].rows) // 1
  .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

tabulka.tBodies[0].append(...seřazenéŘádky); // (3)
```

Algoritmus krok za krokem:

1. Získáme z `<tbody>` všechny značky `<tr>`.
2. Pak je seřadíme podle obsahu první značky `<td>` (pole se jménem).
3. Nyní vložíme uzly ve správném pořadí pomocí `.append(...seřazenéŘádky)`.

Nemusíme elementy řádků odstraňovat, stačí je „znovu vložit“ a z původního umístění se odstraní automaticky.

P.S. V našem případě je v tabulce explicitně uvedeno `<tbody>`, ale i kdyby HTML tabulka `<tbody>` neobsahovala, DOM struktura je vždy bude mít.
