
Otevírací značka je `pattern:\[(b|url|quote)]`.

Abychom pak našli vše až do uzavírací značky, použijeme vzor `pattern:.*?` s příznakem `pattern:s`, aby našel každý znak včetně nového řádku, a pak přidáme zpětný odkaz na uzavírací značku.

Celý vzor: `pattern:\[(b|url|quote)\].*?\[/\1]`.

V akci:

```js run
let rv = /\[(b|url|quote)].*?\[\/\1]/gs;

let řetězec = `
  [b]ahoj![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( řetězec.match(rv) ); // [b]ahoj![/b],[quote][url]http://google.com[/url][/quote]
```

Prosíme všimněte si, že jsme museli uvést únikový znak nejen před `pattern:[`, ale i před lomítkem uzavírací značky `pattern:[\/\1]`, protože lomítko normálně uzavírá vzor.
