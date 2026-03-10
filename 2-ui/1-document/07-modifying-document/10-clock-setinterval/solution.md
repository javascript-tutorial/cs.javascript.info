
Nejprve vytvořme HTML/CSS.

Každá komponenta hodin bude vypadat skvěle ve svém vlastním `<span>`:

```html
<div id="hodiny">
  <span class="hod">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

Budeme také potřebovat CSS k jejich obarvení.

Funkce `aktualizuj` bude aktualizovat hodiny, aby ji funkce `setInterval` mohla každou sekundu volat:

```js
function aktualizuj() {
  let hodiny = document.getElementById('hodiny');
*!*
  let datum = new Date(); // (*)
*/!*
  let hod = datum.getHours();
  if (hod < 10) hod = '0' + hod;
  hodiny.children[0].innerHTML = hod;

  let minuty = datum.getMinutes();
  if (minuty < 10) minuty = '0' + minuty;
  hodiny.children[1].innerHTML = minuty;

  let sekundy = datum.getSeconds();
  if (sekundy < 10) sekundy = '0' + sekundy;
  hodiny.children[2].innerHTML = sekundy;
}
```

Na řádku `(*)` pokaždé zjistíme aktuální datum, protože volání `setInterval` nejsou spolehlivá: může k nim docházet s prodlevami.

Funkce pro správu hodin:

```js
let idČasovače;

function spusťHodiny() { // spustí hodiny  
  if (!idČasovače) { // nový interval nastavíme, jen pokud hodiny neběží
    idČasovače = setInterval(aktualizuj, 1000);
  }
  aktualizuj(); // (*)
}

function zastavHodiny() {
  clearInterval(idČasovače);
  idČasovače = null; // (**)
}
```

Prosíme všimněte si, že volání `aktualizuj()` není jen nastaveno ve `spusťHodiny()`, ale spustí se okamžitě na řádku `(*)`. Jinak by návštěvník musel čekat do prvního spuštění `setInterval` a hodiny by do té doby byly prázdné.

Je také důležité nastavit nový interval ve funkci `spusťHodiny()` jen tehdy, když hodiny neběží. Jinak by několik kliknutí na spouštěcí tlačítko nastavilo více souběžných intervalů. Ještě horší by bylo, že bychom si pamatovali jen `idČasovače` posledního intervalu a ztratili odkazy na všechny ostatní. Pak bychom už nikdy nedokázali hodiny zastavit! Všimněte si, že když jsou na řádku `(**)` hodiny zastaveny, musíme `idČasovače` smazat, abychom mohli hodiny znovu spustit voláním `spusťHodiny()`.
