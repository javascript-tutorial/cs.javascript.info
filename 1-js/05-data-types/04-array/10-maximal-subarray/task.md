importance: 2

---

# Maximální podpole

Na vstupu je pole čísel, např. `pole = [1, -2, 3, 4, -9, 6]`.

Úkol zní: najděte souvislé podpole tohoto pole s maximálním součtem prvků.

Napište funkci `vraťMaxSoučetPodpole(pole)`, která tento součet vrátí.

Příklad:

```js
vraťMaxSoučetPodpole([-1, *!*2, 3*/!*, -9]) == 5 (součet zvýrazněných prvků)
vraťMaxSoučetPodpole([*!*2, -1, 2, 3*/!*, -9]) == 6
vraťMaxSoučetPodpole([-1, 2, 3, -9, *!*11*/!*]) == 11
vraťMaxSoučetPodpole([-2, -1, *!*1, 2*/!*]) == 3
vraťMaxSoučetPodpole([*!*100*/!*, -9, 2, -3, 5]) == 100
vraťMaxSoučetPodpole([*!*1, 2, 3*/!*]) == 6 (vezmi vše)
```

Jsou-li všechny prvky záporné, znamená to, že nevezmeme žádný (podpole je prázdné), takže součet je nulový:

```js
vraťMaxSoučetPodpole([-1, -2, -3]) = 0
```

Snažte se prosíme vymyslet rychlé řešení: [O(n<sup>2</sup>)](https://cs.wikipedia.org/wiki/Landauova_notace) nebo dokonce O(n), jestliže to dokážete.