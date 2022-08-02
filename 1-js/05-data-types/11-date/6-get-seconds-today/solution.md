Abychom získali počet sekund, můžeme vygenerovat datum z dnešního dne a času 00:00:00 a pak je odečíst od „nynějška“.

Rozdílem bude počet milisekund od začátku dne, který bychom měli vydělit 1000, abychom získali sekundy:

```js run
function vraťDnešníSekundy() {
  let nyní = new Date();

  // vytvoříme objekt z dnešního dne/měsíce/roku
  let dnešek = new Date(nyní.getFullYear(), nyní.getMonth(), nyní.getDate());

  let rozdíl = nyní - dnešek; // rozdíl v milisekundách
  return Math.round(rozdíl / 1000); // vytvoříme sekundy
}

alert( vraťDnešníSekundy() );
```

Alternativním řešením by bylo získat hodiny, minuty, sekundy a převést je na sekundy:

```js run
function vraťDnešníSekundy() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert( vraťDnešníSekundy() );
```
