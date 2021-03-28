Odpověď zní: vykoná se první a třetí `alert`.

Podrobnosti:

```js run
// Vykoná se.
// Výsledek -1 || 0 = -1, tedy pravda.
if (-1 || 0) alert( 'první' );

// Nevykoná se.
// -1 && 0 = 0, nepravda.
if (-1 && 0) alert( 'druhý' );

// Vykoná se.
// Operátor && má vyšší prioritu než ||,
// takže -1 && 1 se vykoná jako první, což dává tento řetězec:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( 'třetí' );
```

