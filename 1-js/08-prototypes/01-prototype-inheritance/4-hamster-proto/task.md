importance: 5

---

# Proč jsou oba křečci sytí?

Máme dva křečky: `rychlý` a `líný`, kteří jsou zděděni z obecného objektu `křeček`.

Když jednoho z nich nakrmíme, bude sytý i ten druhý. Proč? Jak to můžeme opravit?

```js run
let křeček = {
  žaludek: [],

  žer(potrava) {
    this.žaludek.push(potrava);
  }
};

let rychlý = {
  __proto__: křeček
};

let líný = {
  __proto__: křeček
};

// Tento křeček nalezl potravu
rychlý.žer("jablko");
alert( rychlý.žaludek ); // jablko

// Tento ji má také, proč? Opravte to, prosíme.
alert( líný.žaludek ); // jablko
```

