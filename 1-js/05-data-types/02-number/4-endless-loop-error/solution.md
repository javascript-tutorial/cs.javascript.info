Protože `i` nikdy nebude rovno `10`.

Spusťme si jej, abychom viděli *skutečné* hodnoty `i`:

```js run
let i = 0;
while (i < 11) {
  i += 0.2;
  if (i > 9.8 && i < 10.2) alert( i );
}
```

Žádná z nich není přesně `10`.

Takové věci se dějí kvůli ztrátám přesnosti při přičítání desetinných čísel jako `0.2`.

Důsledek: když pracujete s desetinnými čísly, vyvarujte se testů rovnosti.