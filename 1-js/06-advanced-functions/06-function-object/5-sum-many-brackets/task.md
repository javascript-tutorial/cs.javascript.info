importance: 2

---

# Sčítání s libovolným počtem závorek

Napište funkci `součet`, která bude fungovat takto:

```js
součet(1)(2) == 3; // 1 + 2
součet(1)(2)(3) == 6; // 1 + 2 + 3
součet(5)(-1)(2) == 6
součet(6)(-1)(-2)(-3) == 0
součet(0)(1)(2)(3)(4)(5) == 15
```

P.S. Rada: možná budete pro svou funkci potřebovat nastavit vlastní konverzi objektu na primitiv.