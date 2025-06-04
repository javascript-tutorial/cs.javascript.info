importance: 2

---

# Sčítání s libovolným počtem závorek

Napište funkci `sečti`, která bude fungovat takto:

```js
sečti(1)(2) == 3; // 1 + 2
sečti(1)(2)(3) == 6; // 1 + 2 + 3
sečti(5)(-1)(2) == 6
sečti(6)(-1)(-2)(-3) == 0
sečti(0)(1)(2)(3)(4)(5) == 15
```

P.S. Rada: možná budete pro svou funkci potřebovat nastavit vlastní konverzi objektu na primitiv.