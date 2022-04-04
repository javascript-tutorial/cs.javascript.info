importance: 5

---

# Špiónský dekorátor

Vytvořte dekorátor `špión(funkce)`, který by měl vrátit wrapper, který si bude ukládat všechna volání funkce do své vlastnosti `volání`.

Každé volání bude uloženo jako pole argumentů.

Například:

```js
function práce(a, b) {
  alert( a + b ); // práce je jakákoli funkce nebo metoda
}

*!*
práce = špión(práce);
*/!*

práce(1, 2); // 3
práce(4, 5); // 9

for (let argumenty of práce.volání) {
  alert( 'volání:' + argumenty.join() ); // "volání:1,2", "volání:4,5"
}
```

P.S. Takový dekorátor je někdy užitečný pro unit-testování. Jeho pokročilá forma je `sinon.spy` v knihovně [Sinon.JS](http://sinonjs.org/).
