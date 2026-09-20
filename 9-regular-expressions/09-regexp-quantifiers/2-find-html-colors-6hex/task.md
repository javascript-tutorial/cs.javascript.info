# Regulární výraz pro HTML barvy

Vytvořte regulární výraz, který najde HTML barvy zapsané ve tvaru `#ABCDEF`: nejprve `#` a pak 6 hexadecimálních znaků.

Příklad použití:

```js
let rv = /...váš RV.../

let řetězec = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( řetězec.match(rv) )  // #121212,#AA00ef
```

P.S. V této úloze se nemusíte zabývat jinými formáty barev, např. `#123` nebo `rgb(1,2,3)` atd.
