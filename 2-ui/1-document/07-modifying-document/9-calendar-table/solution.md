Vytvoříme tabulku jako řetězec: `"<table>...</table>"` a pak ji přiřadíme do `innerHTML`.

Algoritmus:

1. Vytvoříme záhlaví tabulky se značkou `<th>` a názvy dnů v týdnu.
2. Vytvoříme objekt s datem `d = new Date(rok, měsíc-1)`. To je první den v měsíci `měsíc` (bereme v úvahu, že měsíce v JavaScriptu začínají od `0`, ne od `1`).
3. Několik prvních buněk před prvním dnem v měsíci `d.getDay()` může být prázdných. Vyplníme je značkami `<td></td>`.
4. Zvýšíme den v `d`: `d.setDate(d.getDate()+1)`. Pokud `d.getMonth()` ještě není další měsíc, přidáme do kalendáře další buňku `<td>`. Pokud je to neděle, přidáme nový řádek <code>"&lt;/tr&gt;&lt;tr&gt;"    </code>.
5. Pokud měsíc skončil, ale řádek tabulky ještě není zcela zaplněný, přidáme do něj prázdné `<td>`, abychom dokončili čtverec.
