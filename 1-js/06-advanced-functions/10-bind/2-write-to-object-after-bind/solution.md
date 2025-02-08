Odpověď: `null`.


```js run
function f() {
  alert( this ); // null
}

let uživatel = {
  g: f.bind(null)
};

uživatel.g();
```

Kontext vázané funkce je napevno nastaven. Není žádný způsob, jak jej dále změnit.

I když tedy spustíme `uživatel.g()`, původní funkce se volá s `this=null`.
