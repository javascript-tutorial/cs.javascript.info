# Najděte dvojice BB-značek

„BB-značka“ vypadá jako `[značka]...[/značka]`, kde `značka` je jedna z následujících: `b`, `url` nebo `quote`.

Například:
```
[b]text[/b]
[url]http://google.com[/url]
```

BB-značky lze vnořit do sebe. Značka však nemůže být vnořena do stejné značky, například:

```
Běžné:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

Nemůže se stát:
[b][b]text[/b][/b]
```

Značky mohou obsahovat konce řádků, to se běžně stává:

```
[quote]
  [b]text[/b]
[/quote]
```

Vytvořte regulární výraz, který najde všechny BB-značky i s jejich obsahem.

Například:

```js
let rv = /váš RV/příznaky;

let řetězec = "..[url]http://google.com[/url]..";
alert( řetězec.match(rv) ); // [url]http://google.com[/url]
```

Pokud jsou značky vnořené, potřebujeme vnější značku (pokud chceme, můžeme pokračovat v hledání v jejím obsahu):

```js
let rv = /váš RV/příznaky;

let řetězec = "..[url][b]http://google.com[/b][/url]..";
alert( řetězec.match(rv) ); // [url][b]http://google.com[/b][/url]
```
