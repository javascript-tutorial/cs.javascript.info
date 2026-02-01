
Měli bychom použít dva handlery: `document.onkeydown` a `document.onkeyup`.

Vytvořme množinu `stisknuté = new Set()`, v níž si budeme uchovávat aktuálně stisknuté klávesy.

První handler je do ní bude přidávat, druhý je z ní bude odstraňovat. Při každém `keydown` si ověříme, zda máme stisknutých dost kláves, a pokud ano, spustíme funkci.
