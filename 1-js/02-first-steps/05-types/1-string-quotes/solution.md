
Obrácené čárky vkládají do řetězce hodnotu výrazu uvnitř `${...}`.

```js run
let jméno = "Ilja";

// výrazem je číslo 1
alert( `ahoj ${1}` ); // ahoj 1

// výrazem je řetězec "jméno"
alert( `ahoj ${"jméno"}` ); // ahoj jméno

// výrazem je proměnná, hodnota se vloží do řetězce
alert( `ahoj ${jméno}` ); // ahoj Ilja
```
