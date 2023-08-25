importance: 3

---

# Vynásobte hodnoty číselných vlastností dvěma

Vytvořte funkci `vynásobČísla(obj)`, která vynásobí hodnoty všech číselných vlastností objektu `obj` dvěma.

Například:

```js
// před voláním
let menu = {
  šířka: 200,
  výška: 300,
  titulek: "Moje menu"
};

vynásobČísla(menu);

// po volání
menu = {
  šířka: 400,
  výška: 600,
  titulek: "Moje menu"
};
```

Prosíme všimněte si, že `vynásobČísla` nemusí nic vracet. Měla by modifikovat samotný objekt.

P.S. Pro kontrolu, zda hodnota je číslo, použijte `typeof`.


