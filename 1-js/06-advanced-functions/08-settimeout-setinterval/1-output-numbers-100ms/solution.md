
Pomocí `setInterval`:

```js run
function vypišČísla(začátek, konec) {
  let aktuální = začátek;

  let idČasovače = setInterval(function() {
    alert(aktuální);
    if (aktuální == konec) {
      clearInterval(idČasovače);
    }
    aktuální++;
  }, 1000);
}

// použití:
vypišČísla(5, 10);
```

Pomocí vnořeného `setTimeout`:


```js run
function vypišČísla(začátek, konec) {
  let aktuální = začátek;

  setTimeout(function spusť() {
    alert(aktuální);
    if (aktuální < konec) {
      setTimeout(spusť, 1000);
    }
    aktuální++;
  }, 1000);
}

// použití:
vypišČísla(5, 10);
```

Všimněte si, že v obou řešeních je úvodní prodleva před prvním výstupem. Funkce je poprvé volána za `1000 ms`.

Jestliže chceme, aby se funkce spustila okamžitě, můžeme přidat další volání na samostatný řádek, například takto:

```js run
function vypišČísla(začátek, konec) {
  let aktuální = začátek;

  function spusť() {
    alert(aktuální);
    if (aktuální == konec) {
      clearInterval(idČasovače);
    }
    aktuální++;
  }

*!*
  spusť();
*/!*
  let idČasovače = setInterval(spusť, 1000);
}

vypišČísla(5, 10);
```
