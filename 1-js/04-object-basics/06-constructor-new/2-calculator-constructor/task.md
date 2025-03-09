importance: 5

---

# Vytvořte nový Kalkulátor

Vytvořte konstruktor `Kalkulátor`, který bude vytvářet objekty se třemi metodami:

- `načti()` se funkcí `prompt` zeptá na dvě hodnoty a uloží je jako vlastnosti objektu s názvy po řadě `a` a `b`.
- `součet()` vrátí součet těchto hodnot.
- `součin()` vrátí součin těchto hodnot.

Například:

```js
let kalkulátor = new Kalkulátor();
kalkulátor.načti();

alert( "Součet=" + kalkulátor.součet() );
alert( "Součin=" + kalkulátor.součin() );
```

[demo]
