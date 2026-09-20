
Řešení:

```js run
let rv = /\.{3,}/g;
alert( "Ahoj!... Jak se máš?.....".match(rv) ); // ..., .....
```

Prosíme všimněte si, že tečka je speciální znak, takže před ni musíme vložit únikový znak: `\.`.
