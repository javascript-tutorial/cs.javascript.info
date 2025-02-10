Podívejme se pozorně na to, co se děje při volání `rychlý.žer("jablko")`.

1. Metoda `rychlý.žer` je nalezena v prototypu (`=křeček`) a pak se spustí s `this=rychlý` (objekt před tečkou).

2. Pak `this.žaludek.push()` musí najít vlastnost `žaludek` a zavolat na ní `push`. Hledá `žaludek` v `this` (`=rychlý`), ale nic nenajde.

3. Pak následuje řetězec prototypů a najde `žaludek` v objektu `křeček`.

4. Pak na něm volá `push`, čímž přidá potravu do *žaludku prototypu*.

Všichni křečci tedy sdílejí jediný žaludek!

Jak pro `líný.žaludek.push(...)`, tak pro `rychlý.žaludek.push()` je vlastnost `žaludek` nalezena v prototypu (protože není v samotném objektu) a pak jsou do ní vložena nová data.

Prosíme všimněte si, že při jednoduchém přiřazení `this.žaludek=` se to nestane:

```js run
let křeček = {
  žaludek: [],

  žer(potrava) {
*!*
    // přiřazení do this.žaludek namísto this.žaludek.push
    this.žaludek = [potrava];
*/!*
  }
};

let rychlý = {
   __proto__: křeček
};

let líný = {
  __proto__: křeček
};

// Rychlý křeček našel potravu
rychlý.žer("jablko");
alert( rychlý.žaludek ); // jablko

// Žaludek líného křečka je prázdný
alert( líný.žaludek ); // <nic>
```

Teď vše funguje správně, protože `this.žaludek=` nehledá `žaludek`, ale hodnota se zapíše přímo do objektu `this`.

Problému se můžeme zcela vyhnout i tak, že zajistíme, aby každý křeček měl svůj vlastní žaludek:

```js run
let křeček = {
  žaludek: [],

  žer(potrava) {
    this.žaludek.push(potrava);
  }
};

let rychlý = {
  __proto__: křeček,
*!*
  žaludek: []
*/!*
};

let líný = {
  __proto__: křeček,
*!*
  žaludek: []
*/!*
};

// Rychlý křeček našel potravu
rychlý.žer("jablko");
alert( rychlý.žaludek ); // jablko

// Žaludek líného křečka je prázdný
alert( líný.žaludek ); // <nic>
```

Běžné řešení je, že všechny vlastnosti, které popisují stav určitého objektu, jako třeba uvedený `žaludek`, by měly být zapisovány přímo do tohoto objektu. Tím předejdeme takovýmto problémům.
