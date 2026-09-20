Regulární výraz hledající 3-cifernou barvu `#abc`: `pattern:/#[a-f0-9]{3}/i`.

Můžeme přidat přesně 3 další nepovinné hexadecimální číslice. Nepotřebujeme jich více ani méně. Barva má buď 3, nebo 6 číslic.

Použijme k tomu kvantifikátor `pattern:{1,2}`: získáme `pattern:/#([a-f0-9]{3}){1,2}/i`.

Zde je vzor `pattern:[a-f0-9]{3}` uzavřen do závorek, aby se na něj aplikoval kvantifikátor `pattern:{1,2}`.

V akci:

```js run
let rv = /#([a-f0-9]{3}){1,2}/gi;

let řetězec = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( řetězec.match(rv) ); // #3f3 #AA00ef #abc
```

Je tady malý problém: vzor nalezl `match:#abc` v `subject:#abcd`. Abychom tomu zabránili, můžeme na konec přidat `pattern:\b`:

```js run
let rv = /#([a-f0-9]{3}){1,2}\b/gi;

let řetězec = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( řetězec.match(rv) ); // #3f3 #AA00ef
```
