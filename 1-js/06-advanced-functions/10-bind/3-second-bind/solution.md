Odpověď: **Jan**.

```js run no-beautify
function f() {
  alert(this.jméno);
}

f = f.bind( {jméno: "Jan"} ).bind( {jméno: "Petr"} );

f(); // Jan
```

Exotický objekt [vázané funkce](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects), vracený funkcí `f.bind(...)`, si pamatuje kontext (a argumenty, jsou-li uvedeny) jen v době vytvoření.

Funkci nelze navázat znovu.
