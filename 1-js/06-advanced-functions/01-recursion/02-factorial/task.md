importance: 4

---

# Výpočet faktoriálu

[Faktoriál](https://cs.wikipedia.org/wiki/Faktoriál) přirozeného čísla je toto číslo násobené `„sebou samým minus 1“`, pak `„sebou samým minus 2“` a tak dále, až do `1`. Faktoriál `n` se značí `n!`.

Můžeme napsat definici faktoriálu takto:

```js
n! = n * (n - 1) * (n - 2) * ...*1
```

Hodnoty faktoriálů pro různá `n`:

```js
1! = 1
2! = 2 * 1 = 2
3! = 3 * 2 * 1 = 6
4! = 4 * 3 * 2 * 1 = 24
5! = 5 * 4 * 3 * 2 * 1 = 120
```

Úkolem je napsat funkci `faktoriál(n)`, která vypočítá `n!` pomocí rekurzívních volání.

```js
alert( faktoriál(5) ); // 120
```

P.S. Rada: `n!` lze zapsat jako `n * (n-1)!`. Například: `3! = 3*2! = 3*2*1! = 6`.
