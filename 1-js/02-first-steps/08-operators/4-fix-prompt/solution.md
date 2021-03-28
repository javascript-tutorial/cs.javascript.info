Důvodem je, že funkce `prompt` vrací uživatelský vstup jako řetězec.

V proměnných jsou tedy hodnoty po řadě `"1"` a `"2"`.

```js run
let a = "1"; // prompt("První číslo?", 1);
let b = "2"; // prompt("Druhé číslo?", 2);

alert(a + b); // 12
```

To, co bychom měli udělat, je před sečtením převést řetězce na čísla. Například použít `Number()` nebo před ně uvést `+`.

Například rovnou před `prompt`:

```js run
let a = +prompt("První číslo?", 1);
let b = +prompt("Druhé číslo?", 2);

alert(a + b); // 3
```

Nebo až při volání `alert`:

```js run
let a = prompt("První číslo?", 1);
let b = prompt("Druhé číslo?", 2);

alert(+a + +b); // 3
```

V posledním kódu používáme současně unární i binární `+`. Vypadá to legračně, že?
