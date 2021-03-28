importance: 4

---

# Konstanta velkými písmeny?

Prohlédněte si následující kód:

```js
const datumNarození = '18.04.1982';

const věk = nějakýKód(datumNarození);
```

Zde máme konstantu `datumNarození` a pomocí nějakého kódu se z této proměnné vypočítá `věk` (kód není pro stručnost uveden, na podrobnostech zde nezáleží).

Bylo by správné použít pro název proměnné `datumNarození` velká písmena? A pro `věk`? Nebo dokonce pro obě?

```js
const DATUM_NAROZENÍ = '18.04.1982'; // velkými písmeny?

const VĚK = nějakýKód(DATUM_NAROZENÍ); // velkými písmeny?
```

