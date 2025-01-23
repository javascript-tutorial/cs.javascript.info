importance: 4

---

# Filtrace podle rozsahu „na místě“

Napište funkci `filtrujPodleRozsahuNaMístě(pole, a, b)`, která obdrží pole `pole` a odstraní z něj všechny hodnoty, které neleží mezi `a` a `b`. Test je: `a ≤ pole[i] ≤ b`.

Funkce by měla jen modifikovat pole. Neměla by nic vracet.

Příklad:
```js
let pole = [5, 3, 8, 1];

filtrujPodleRozsahuNaMístě(pole, 1, 4); // odstraní čísla, která nejsou od 1 do 4

alert( pole ); // [3, 1]
```
