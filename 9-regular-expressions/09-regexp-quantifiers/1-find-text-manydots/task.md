importance: 5

---

#  Jak najít výpustku "..." ?

Vytvořte regulární výraz, který najde výpustku: 3 (nebo více?) teček za sebou.

Otestujte si ho:

```js
let rv = /váš RV/g;
alert( "Ahoj!... Jak se máš?.....".match(rv) ); // ..., .....
```
