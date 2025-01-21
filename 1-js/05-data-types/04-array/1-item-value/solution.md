Výsledek je `4`:


```js run
let ovoce = ["Jablko", "Hruška", "Pomeranč"];

let nákupníKošík = ovoce;

nákupníKošík.push("Banán");

*!*
alert( ovoce.length ); // 4
*/!*
```

Je to tím, že pole jsou objekty. Proto jsou `nákupníKošík` i `ovoce` odkazy na totéž pole.

