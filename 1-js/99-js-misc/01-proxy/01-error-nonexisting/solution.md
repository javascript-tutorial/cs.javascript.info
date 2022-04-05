
```js run
let uživatel = {
  jméno: "Jan"
};

function wrap(cíl) {
  return new Proxy(cíl, {
    get(cíl, vlastnost, příjemce) {
      if (vlastnost in cíl) {
        return Reflect.get(cíl, vlastnost, příjemce);
      } else {
        throw new ReferenceError(`Vlastnost neexistuje: "${vlastnost}"`)
      }
    }
  });
}

uživatel = wrap(uživatel);

alert(uživatel.jméno); // Jan
alert(uživatel.věk); // ReferenceError: Vlastnost neexistuje: "věk"
```
