
Odpověď: `pattern:\b\d\d:\d\d\b`.

```js run
alert( "Snídaně je v 09:00 v místnosti 123:456.".match( /\b\d\d:\d\d\b/ ) ); // 09:00
```
