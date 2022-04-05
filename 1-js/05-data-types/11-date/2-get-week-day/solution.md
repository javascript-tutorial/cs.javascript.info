Metoda `datum.getDay()` vrací číslo dne v týdnu počínajíc nedělí.

Vytvoříme pole dnů v týdnu, abychom mohli získat název příslušného dne podle jeho čísla:

```js run demo
function vraťDenVTýdnu(datum) {
  let dny = ['NE', 'PO', 'ÚT', 'ST', 'ČT', 'PÁ', 'SO'];

  return dny[datum.getDay()];
}

let datum = new Date(2014, 0, 3); // 3. leden 2014
alert( vraťDenVTýdnu(datum) ); // PÁ
```
