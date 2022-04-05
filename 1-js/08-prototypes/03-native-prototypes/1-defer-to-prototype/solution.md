

```js run
Function.prototype.odlož = function(ms) {
  setTimeout(this, ms);
};

function f() {
  alert("Ahoj!");
}

f.odlož(1000); // zobrazí "Ahoj!" za 1 sekundu
```
