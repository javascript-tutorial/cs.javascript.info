Myšlenka je jednoduchá: odečíst zadaný počet dní od `datum`:

```js
function vraťDenPřed(datum, dny) {
  datum.setDate(datum.getDate() - dny);
  return datum.getDate();
}
```

...Funkce by však neměla měnit `datum`. To je důležité, jelikož vnější kód, který nám datum předává, neočekává, že bude změněno.

Abychom to implementovali, naklonujeme datum, např. takto:

```js run demo
function vraťDenPřed(datum, dny) {
  let kopieData = new Date(datum);

  kopieData.setDate(datum.getDate() - dny);
  return kopieData.getDate();
}

let datum = new Date(2015, 0, 2);

alert( vraťDenPřed(datum, 1) ); // 1, (1. leden 2015)
alert( vraťDenPřed(datum, 2) ); // 31, (31. prosinec 2014)
alert( vraťDenPřed(datum, 365) ); // 2, (2. leden 2014)
```
