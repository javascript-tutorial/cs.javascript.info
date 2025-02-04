Aby druhé závorky fungovaly, ty první musejí vrátit funkci.

Například:

```js run
function sečti(a) {

  return function(b) {
    return a + b; // vezme "a" z vnějšího lexikálního prostředí
  };

}

alert( sečti(1)(2) ); // 3
alert( sečti(5)(-1) ); // 4
```

