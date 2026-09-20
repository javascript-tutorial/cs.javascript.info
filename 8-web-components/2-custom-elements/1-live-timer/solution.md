
Prosíme všimněte si:
1. Když je element odstraněn z dokumentu, smažeme časovač `setInterval`. To je důležité, jinak by tikal dál, i když by už nebyl zapotřebí. A prohlížeč by ho nemohl odstranit z paměti a vyčistit paměť, na kterou se odkazuje.
2. K aktuálnímu datu můžeme přistupovat ve vlastnosti `elem.datum`. Všechny třídní metody a vlastnosti jsou samozřejmě metody a vlastnosti elementu.
