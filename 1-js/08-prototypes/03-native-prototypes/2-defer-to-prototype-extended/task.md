importance: 4

---

# Přidejte do funkcí dekorační „defer()“

Přidejte do prototypu všech funkcí metodu `odlož(ms)`, která vrátí wrapper, který odloží volání funkce o `ms` milisekund.

Zde je příklad, jak by to mělo fungovat:

```js
function f(a, b) {
  alert( a + b );
}

f.odlož(1000)(1, 2); // zobrazí 3 za 1 sekundu
```

Prosíme všimněte si, že argumenty by měly být předány původní funkci.
