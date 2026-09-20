Potřebujeme najít `#` následované 6 hexadecimálními znaky.

Hexadecimální znak můžeme popsat jako `pattern:[0-9a-fA-F]`. Nebo když použijeme příznak `pattern:i`, stačí nám `pattern:[0-9a-f]`.

Pak jich můžeme najít 6 pomocí kvantifikátoru `pattern:{6}`.

Výsledkem bude regulární výraz `pattern:/#[a-f0-9]{6}/gi`.

```js run
let rv = /#[a-f0-9]{6}/gi;

let řetězec = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( řetězec.match(rv) );  // #121212,#AA00ef
```

Problém je, že nalezne barvu i v delších posloupnostech:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456
```

Abychom to opravili, můžeme na konec přidat `pattern:\b`:

```js run
// barva
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// toto není barva
alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
```
