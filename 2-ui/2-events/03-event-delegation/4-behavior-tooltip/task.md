importance: 5

---

# Podpora tooltipu

Vytvořte kód v JavaScriptu pro podporu tooltipu.

Když ukazatel myši najede nad element obsahující `data-tooltip`, měl by se nad ním objevit tooltip, a když ho opustí, tooltip se skryje.

Příklad HTML s poznámkami:
```html
<button data-tooltip="tento tooltip je delší než element">Krátké tlačítko</button>
<button data-tooltip="HTML<br>tooltip">Další tlačítko</button>
```

Mělo by to fungovat následovně:

[iframe src="solution" height=200 border=1]

V této úloze předpokládáme, že uvnitř všech elementů obsahujících `data-tooltip` se nachází pouze text, žádné vnořené značky (zatím).

Podrobnosti:

- Vzdálenost mezi elementem a tooltipem by měla být `5px`.
- Tooltip by měl být centrován vzhledem k elementu, pokud je to možné.
- Tooltip by neměl překračovat okraje okna. Standardně by se měl zobrazit nad elementem, ale jestliže je element u vrchu stránky a nad ním není pro tooltip místo, pak pod ním.
- Obsah tooltipu je uveden v atributu `data-tooltip`. Může jím být jakýkoli HTML kód.

Budete zde potřebovat dvě události:
- `mouseover` se spustí, když ukazatel najede nad element.
- `mouseout` se spustí, když ukazatel opustí element.

Prosíme použijte delegování událostí: nastavte na `document` dva handlery, které budou sledovat všechna „najetí“ a „opuštění“ elementů obsahujících `data-tooltip`, a spravujte tooltipy v nich.

Po implementaci tohoto chování budou moci přidávat elementy s tooltipy i lidé, kteří JavaScript neznají.

P.S. Může se zobrazit pouze jeden tooltip současně.
