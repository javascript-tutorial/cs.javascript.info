Odpověď zní: `3`.

```js run
alert( null || 2 && 3 || 4 );
```

Operátor AND `&&` má vyšší prioritu než `||`, proto se vykoná jako první.

Výsledek `2 && 3 = 3`, takže z výrazu se stane:

```
null || 3 || 4
```

Nyní bude výsledkem první pravdivá hodnota: `3`.

