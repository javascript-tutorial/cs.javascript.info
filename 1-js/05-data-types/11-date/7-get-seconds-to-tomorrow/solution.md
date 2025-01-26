Abychom získali počet milisekund zbývajících do zítřka, můžeme odečíst aktuální datum od „zítřka 00:00:00“.

Nejprve tento „zítřek“ vygenerujeme a pak to provedeme:

```js run
function vraťSekundyDoZítřka() {
  let nyní = new Date();

  // zítřejší datum
  let zítřek = new Date(nyní.getFullYear(), nyní.getMonth(), *!*nyní.getDate()+1*/!*);

  let rozdíl = zítřek - nyní; // rozdíl v ms
  return Math.round(rozdíl / 1000); // převod na sekundy
}

alert(vraťSekundyDoZítřka());
```

Alternativní řešení:

```js run
function vraťSekundyDoZítřka() {
  let nyní = new Date();
  let hodiny = nyní.getHours();
  let minuty = nyní.getMinutes();
  let sekundy = nyní.getSeconds();
  let celkemSekundDnes = (hodiny * 60 + minuty) * 60 + sekundy;
  let celkemSekundZaDen = 86400;

  return celkemSekundZaDen - celkemSekundDnes;
}

alert(vraťSekundyDoZítřka());
```

Prosíme všimněte si, že mnoho zemí používá letní čas, takže mohou existovat dny, které mají 23 nebo 25 hodin. S takovými dny můžeme chtít zacházet odlišně.
