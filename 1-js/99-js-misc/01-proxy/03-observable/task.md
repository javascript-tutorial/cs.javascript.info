
# Pozorovatelný objekt

Vytvořte funkci `učiňPozorovatelným(cíl)`, která „učiní objekt pozorovatelným“ tím, že vrátí proxy.

Mělo by to fungovat takto:

```js run
function učiňPozorovatelným(cíl) {
  /* váš kód */
}

let uživatel = {};
uživatel = učiňPozorovatelným(uživatel);

uživatel.pozoruj((klíč, hodnota) => {
  alert(`SET ${klíč}=${hodnota}`);
});

uživatel.jméno = "Jan"; // oznámí: SET jméno=Jan
```

Jinými slovy, objekt vrácený funkcí `učiňPozorovatelným` je stejný jako původní, ale navíc obsahuje metodu `pozoruj(handler)`, která nastaví funkci `handler` tak, aby byla volána při každé změně vlastnosti.

Kdykoli se změní některá vlastnost, je zavolán `handler(klíč, hodnota)` s názvem a hodnotou oné vlastnosti.

P.S. V této úloze se postarejte jen o zápis do vlastnosti. Ostatní operace mohou být implementovány podobně.
