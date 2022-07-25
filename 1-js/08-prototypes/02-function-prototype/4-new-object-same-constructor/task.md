importance: 5

---

# Vytvoření objektu se stejným konstruktorem

Představme si, že máme libovolný objekt `obj`, který je vytvořen konstruktorem -- nevíme jakým, ale rádi bychom pomocí něj vytvořili nový objekt.

Můžeme to udělat takto?

```js
let obj2 = new obj.constructor();
```

Uveďte příklad konstruktoru pro `obj`, pro který by takový kód správně fungoval. A příklad, pro který by fungoval špatně.
