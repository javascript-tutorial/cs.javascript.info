Abychom získali čas, který uplynul od data `datum` do nynějška, odečteme data.

```js run demo
function formátujDatum(datum) {
  let rozdíl = new Date() - datum; // rozdíl v milisekundách

  if (rozdíl < 1000) { // méně než 1 sekunda
    return 'právě teď';
  }

  let sec = Math.floor(rozdíl / 1000); // převedeme rozdíl na sekundy

  if (sec < 60) {
    return 'před ' + sec + ' s';
  }

  let min = Math.floor(rozdíl / 60000); // převedeme rozdíl na minuty
  if (min < 60) {
    return 'před ' + min + ' min.';
  }

  // naformátujeme datum
  // před jednočíslicový den/měsíc/hodiny/minuty přidáme nulu
  let d = datum;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(složka => složka.slice(-2)); // z každé složky vezmeme poslední 2 číslice

  // spojíme složky do data
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formátujDatum(new Date(new Date - 1)) ); // "právě teď"

alert( formátujDatum(new Date(new Date - 30 * 1000)) ); // "před 30 s"

alert( formátujDatum(new Date(new Date - 5 * 60 * 1000)) ); // "před 5 min."

// včerejší datum, např. 31.12.2016 20:00
alert( formátujDatum(new Date(new Date - 86400 * 1000)) );
```

Alternativní řešení:

```js run
function formátujDatum(datum) {
  let denVMěsíci = datum.getDate();
  let měsíc = datum.getMonth() + 1;
  let rok = datum.getFullYear();
  let hodina = datum.getHours();
  let minuta = datum.getMinutes();
  let rozdílMs = new Date() - datum;
  let rozdílSec = Math.round(rozdílMs / 1000);
  let rozdílMin = rozdílSec / 60;
  let rozdílHod = rozdílMin / 60;

  // formátování
  rok = rok.toString().slice(-2);
  měsíc = měsíc < 10 ? '0' + měsíc : měsíc;
  denVMěsíci = denVMěsíci < 10 ? '0' + denVMěsíci : denVMěsíci;
  hodina = hodina < 10 ? '0' + hodina : hodina;
  minuta = minuta < 10 ? '0' + minuta : minuta;

  if (rozdílSec < 1) {
    return 'právě teď';  
  } else if (rozdílMin < 1) {
    return `před ${rozdílSec} s`
  } else if (rozdílHod < 1) {
    return `před ${rozdílMin} min.`
  } else {
    return `${denVMěsíci}.${měsíc}.${rok} ${hodina}:${minuta}`
  }
}

alert( formátujDatum(new Date(new Date - 1)) ); // "právě teď"

alert( formátujDatum(new Date(new Date - 30 * 1000)) ); // "před 30 s"

alert( formátujDatum(new Date(new Date - 5 * 60 * 1000)) ); // "před 5 min."

// včerejší datum, např. 31.12.2016 20:00
alert( formátujDatum(new Date(new Date - 86400 * 1000)) );
```
