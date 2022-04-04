
Každý `setTimeout` se spustí teprve po dokončení aktuálního kódu.

Proměnná `i` bude obsahovat poslední hodnotu: `100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// předpokládáme, že doba výkonu této funkce je větší než 100 ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
