importance: 5

---

# Fibonacciho čísla

Posloupnost [Fibonacciho čísel](https://cs.wikipedia.org/wiki/Fibonacciho_posloupnost) je dána vzorcem <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. Jinými slovy, každé další číslo je součtem dvou předcházejících.

První dvě čísla jsou `1`, pak `2(1+1)`, pak `3(1+2)`, `5(2+3)` a tak dále: `1, 1, 2, 3, 5, 8, 13, 21...`.

Fibonacciho čísla mají vztah ke [zlatému řezu](https://cs.wikipedia.org/wiki/Zlatý_řez) a mnoha přírodním jevům okolo nás.

Napište funkci `fib(n)`, která vrátí `n-té` Fibonacciho číslo.

Příklad funkčnosti:

```js
function fib(n) { /* váš kód */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

P.S. Tato funkce by měla být rychlá. Volání `fib(77)` by nemělo trvat déle než zlomek sekundy.

