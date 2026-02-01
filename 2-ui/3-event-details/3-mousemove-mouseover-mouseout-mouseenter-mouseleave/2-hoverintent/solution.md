
Algoritmus vypadá jednoduše:
1. Umístíme na element handlery `onmouseover/out`. Můžeme zde použít i `onmouseenter/leave`, ale ty jsou méně univerzální a kdybychom zavedli delegování, nefungovaly by.
2. Když na element vstoupí ukazatel myši, začneme měřit rychlost v `mousemove`.
3. Pokud je rychlost nízká, spustíme `over`.
4. Když opustíme element a bylo spuštěno `over`, spustíme `out`.

Jak ale měřit rychlost?

Prvním nápadem může být spustit každých `100ms` funkci, která změří vzdálenost mezi předchozími a nynějšími souřadnicemi. Bude-li malá, bude rychlost nízká.

Naneštěstí v JavaScriptu není žádný způsob, jak zjistit „aktuální souřadnice myši“. Neexistuje žádná funkce jako `getCurrentMouseCoordinates()`.

Jediný způsob, jak zjistit souřadnice, je naslouchat událostem myši, např. `mousemove`, a zjišťovat souřadnice z objektu události.

Vytvoříme tedy handler pro `mousemove`, aby sledoval souřadnice a pamatoval si je. A pak je jednou za `100ms` budeme porovnávat.

P.S. Prosíme všimněte si, že testy v řešení používají `dispatchEvent`, aby viděly, zda tooltip funguje správně.
