importance: 4

---

# Konstanta velkými písmeny?

Prohlédněte si následující kód:

```js
const datumNarození = '18.04.1982';

const věk = nějakýKód(datumNarození);
```

Zde máme konstantu `datumNarození` a také konstantu `věk`.

Konstanta `věk` se vypočítá z konstanty `datumNarození` pomocí `nějakýKód()`, což znamená volání funkce, které jsme zatím nevysvětlili (ale brzy tak učiníme!), ale na podrobnostech zde nezáleží, podstatné je, že `věk` se vypočítá nějak podle `datumNarození`.

Bylo by správné použít pro název proměnné `datumNarození` velká písmena? A pro `věk`? Nebo dokonce pro obě?

```js
const DATUM_NAROZENÍ = '18.04.1982'; // napsat DATUM_NAROZENÍ velkými písmeny?

const VĚK = nějakýKód(DATUM_NAROZENÍ); // napsat VĚK velkými písmeny?
```
