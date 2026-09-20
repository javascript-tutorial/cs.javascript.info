Abychom něco vložili za značku `<body>`, musíme ji napřed najít. Můžeme k tomu použít vzor regulárního výrazu `pattern:<body.*?>`.

V této úloze nemusíme měnit značku `<body>`. Potřebujeme jen vložit text za ni.

Můžeme to udělat následovně:

```js run
let řetězec = '...<body style="...">...';
řetězec = řetězec.replace(/<body.*?>/, '$&<h1>Ahoj</h1>');

alert(řetězec); // ...<body style="..."><h1>Ahoj</h1>...
```

V nahrazovacím řetězci `$&` znamená samotnou shodu, tedy část zdrojového textu, která odpovídá `pattern:<body.*?>`. Bude nahrazena sama sebou plus `<h1>Ahoj</h1>`.

Alternativou je použít zpětné nahlédnutí:

```js run
let řetězec = '...<body style="...">...';
řetězec = řetězec.replace(/(?<=<body.*?>)/, `<h1>Ahoj</h1>`);

alert(řetězec); // ...<body style="..."><h1>Ahoj</h1>...
```

Jak vidíte, tento regulární výraz obsahuje pouze nahlížecí část.

Funguje následovně:
- Na každé pozici v textu.
- Ověří, zda jí předchází `pattern:<body.*?>`.
- Pokud ano, máme shodu.

Značka `pattern:<body.*?>` nebude vrácena. Výsledkem tohoto RV je doslova prázdný řetězec, ale shoda se najde jen na pozicích, před kterými se nachází `pattern:<body.*?>`.

Nahrazuje tedy „prázdný řádek“, jemuž předchází `pattern:<body.*?>`, za `<h1>Ahoj</h1>`. To je vložení za `<body>`.

P.S. Užitečné mohou být i příznaky RV, konkrétně `pattern:s` nebo `pattern:i`: `pattern:/<body.*?>/si`. Příznak `pattern:s` způsobí, že tečka `pattern:.` najde znak nového řádku, a příznak `pattern:i` způsobí, že `pattern:<body>` najde i `match:<BODY>` bez ohledu na malá a velká písmena.
