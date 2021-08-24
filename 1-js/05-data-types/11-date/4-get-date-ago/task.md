importance: 4

---

# Který den v měsíci byl před mnoha dny?

Vytvořte funkci `vraťDenPřed(datum, dny)`, která vrátí den v měsíci, který byl `dny` dnů přede dnem `datum`.

Například jestliže dnes je 20., pak `vraťDenPřed(new Date(), 1)` by měla vrátit 19. a `vraťDenPřed(new Date(), 2)` by měla vrátit 18.

Měla by spolehlivě fungovat i pro `dny=365` nebo více:

```js
let datum = new Date(2015, 0, 2);

alert( vraťDenPřed(datum, 1) ); // 1, (1. leden 2015)
alert( vraťDenPřed(datum, 2) ); // 31, (31. prosinec 2014)
alert( vraťDenPřed(datum, 365) ); // 2, (2. leden 2014)
```

P.S. Funkce by neměla modifikovat zadané `datum`.