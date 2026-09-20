Odpověď: `pattern:\d\d[-:]\d\d`.

```js run
let rv = /\d\d[-:]\d\d/g;
alert( "Snídaně v 09:00. Večeře v 21-30".match(rv) ); // 09:00, 21-30
```

Prosíme všimněte si, že pomlčka `pattern:'-'` má v hranatých závorkách speciální význam, ale jen mezi jinými znaky a ne na začátku nebo na konci, takže před ní nemusíme uvádět únikový znak.
