
# Volání asynchronní funkce z neasynchronní

Máme „obyčejnou“ funkci nazvanou `f`. Jak můžeme volat `async` funkci `čekej()` a použít její výsledek uvnitř `f`?

```js
async function čekej() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...co byste sem měli napsat?
  // musíme volat asynchronní čekej() a čekat, než obdržíme 10
  // pamatujte, že nemůžeme použít „await“
}
```

P.S. Tento úkol je technicky velmi jednoduchý, ale tato otázka je u vývojářů, kteří s async/await teprve začínají, vcelku běžná.
