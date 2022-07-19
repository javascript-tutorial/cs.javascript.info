
# Přístup k poli[-1]

V některých programovacích jazycích můžeme přistupovat k prvkům pole pomocí záporných indexů, počítaných od konce.

Například:

```js
let pole = [1, 2, 3];

pole[-1]; // 3, poslední prvek
pole[-2]; // 2, jeden krok od konce
pole[-3]; // 1, dva kroky od konce
```

Jinými slovy, `pole[-N]` je totéž jako `pole[pole.length - N]`.

Vytvořte proxy, která bude toto chování implementovat.

Měla by fungovat takto:

```js
let pole = [1, 2, 3];

pole = new Proxy(pole, {
  /* váš kód */
});

alert( pole[-1] ); // 3
alert( pole[-2] ); // 2

// Ostatní funkcionalita pole by měla zůstat tak, „jak je“
```
