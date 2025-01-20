Maximální délka musí být `maxDélka`, takže musíme odříznout řetězec kratší o jeden znak, abychom získali místo pro výpustku.

Všimněte si, že pro výpustku existuje v Unicode jediný znak. Nejsou to tři tečky za sebou.

```js run demo
function zkrať(řetězec, maxDélka) {
  return (řetězec.length > maxDélka) ?
    řetězec.slice(0, maxDélka - 1) + '…' : řetězec;
}
```
