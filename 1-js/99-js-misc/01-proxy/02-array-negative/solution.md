
```js run
let pole = [1, 2, 3];

pole = new Proxy(pole, {
  get(cíl, vlastnost, příjemce) {
    if (vlastnost < 0) {
      // i když k poli přistupujeme přes pole[1],
      // vlastnost je řetězec, takže jej musíme konvertovat na číslo
      vlastnost = +vlastnost + cíl.length;
    }
    return Reflect.get(cíl, vlastnost, příjemce);
  }
});


alert(pole[-1]); // 3
alert(pole[-2]); // 2
```
