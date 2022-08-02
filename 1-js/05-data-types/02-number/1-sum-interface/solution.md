

```js run demo
let a = +prompt("První číslo?", "");
let b = +prompt("Druhé číslo?", "");

alert( a + b );
```

Všimněte si unárního plus `+` před `prompt`, které okamžitě konvertuje hodnotu na číslo.

Jinak by `a` a `b` byly řetězce a součtem by bylo jejich zřetězení, tedy: `"1" + "2" = "12"`.