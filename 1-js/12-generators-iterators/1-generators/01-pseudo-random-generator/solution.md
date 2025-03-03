```js run demo
function* pseudonáhodné(semínko) {
  let hodnota = semínko;

  while(true) {
    hodnota = hodnota * 16807 % 2147483647;
    yield hodnota;
  }

};

let generátor = pseudonáhodné(1);

alert(generátor.next().value); // 16807
alert(generátor.next().value); // 282475249
alert(generátor.next().value); // 1622650073
```

Prosíme všimněte si, že totéž se dá provést i s obyčejnou funkcí, například:

```js run
function pseudonáhodné(semínko) {
  let hodnota = semínko;

  return function() {
    hodnota = hodnota * 16807 % 2147483647;
    return hodnota;
  }
}

let generátor = pseudonáhodné(1);

alert(generátor()); // 16807
alert(generátor()); // 282475249
alert(generátor()); // 1622650073
```

To funguje také. Ale pak ztratíme možnost iterovat pomocí `for..of` a používat skládání generátorů, které může být užitečné jinde.
