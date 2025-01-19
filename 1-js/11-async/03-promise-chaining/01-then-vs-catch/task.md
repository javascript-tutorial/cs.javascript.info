# Příslib: then oproti catch

Jsou tyto fragmenty kódu ekvivalentní? Jinými slovy, chovají se zcela stejně za každých okolností a pro jakékoli handlery?

```js
příslib.then(f1).catch(f2);
```

Oproti:

```js
příslib.then(f1, f2);
```
