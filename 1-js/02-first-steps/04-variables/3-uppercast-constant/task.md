importance: 4

---

# Konstanta velkými písmeny?

Prohlédněte si následující kód:

```js
const datumNarození = '18.04.1982';

const věk = nějakýKód(datumNarození);
```

<<<<<<< HEAD
Zde máme konstantu `datumNarození` a pomocí nějakého kódu se z této proměnné vypočítá `věk` (kód není pro stručnost uveden, na podrobnostech zde nezáleží).
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4

Bylo by správné použít pro název proměnné `datumNarození` velká písmena? A pro `věk`? Nebo dokonce pro obě?

```js
<<<<<<< HEAD
const DATUM_NAROZENÍ = '18.04.1982'; // velkými písmeny?

const VĚK = nějakýKód(DATUM_NAROZENÍ); // velkými písmeny?
=======
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
>>>>>>> ff4ef57c8c2fd20f4a6aa9032ad37ddac93aa3c4
```
