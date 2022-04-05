# Pomalé řešení

Můžeme spočítat všechny možné podsoučty.

Nejjednodušším způsobem je vzít každý prvek a počítat součty všech podpolí, která jím začínají.

Například pro `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Začínající -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Začínající 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Začínající 3:
3
3 + (-9)
3 + (-9) + 11

// Začínající -9
-9
-9 + 11

// Začínající 11
11
```

Kód je ve skutečnosti vnořený cyklus: vnější cyklus prochází prvky pole, vnitřní počítá podsoučty počínaje aktuálním prvkem.

```js run
function vraťMaxSoučetPod(pole) {
  let maxSoučet = 0; // nevezmeme-li žádné prvky, vrátí se nula

  for (let i = 0; i < pole.length; i++) {
    let součetPevnýZačátek = 0;
    for (let j = i; j < pole.length; j++) {
      součetPevnýZačátek += pole[j];
      maxSoučet = Math.max(maxSoučet, součetPevnýZačátek);
    }
  }

  return maxSoučet;
}

alert( vraťMaxSoučetPod([-1, 2, 3, -9]) ); // 5
alert( vraťMaxSoučetPod([-1, 2, 3, -9, 11]) ); // 11
alert( vraťMaxSoučetPod([-2, -1, 1, 2]) ); // 3
alert( vraťMaxSoučetPod([1, 2, 3]) ); // 6
alert( vraťMaxSoučetPod([100, -9, 2, -3, 5]) ); // 100
```

Toto řešení má časovou složitost [O(n<sup>2</sup>)](https://cs.wikipedia.org/wiki/Landauova_notace). Jinými slovy, když zvětšíme pole dvojnásobně, algoritmus bude pracovat čtyřikrát déle.

Pro velká pole (1000, 10000 nebo více prvků) mohou takové algoritmy vést k vážnému zpomalení.

# Rychlé řešení

Budeme procházet prvky pole a pamatovat si aktuální částečný součet prvků v proměnné `s`. Bude-li `s` v některém bodě záporné, přiřadíme `s=0`. Odpovědí bude maximum všech takových `s`.

Pokud je popis příliš vágní, prosíme nahlédněte do kódu, je dosti krátký:

```js run demo
function vraťMaxSoučetPod(pole) {
  let maxSoučet = 0;
  let částečnýSoučet = 0;

  for (let prvek of pole) { // pro každý prvek pole
    částečnýSoučet += prvek; // přičteme jej do částečnýSoučet
    maxSoučet = Math.max(maxSoučet, částečnýSoučet); // zapamatujeme si maximum
    if (částečnýSoučet < 0) částečnýSoučet = 0; // je-li součet záporný, vynulujeme ho
  }

  return maxSoučet;
}

alert( vraťMaxSoučetPod([-1, 2, 3, -9]) ); // 5
alert( vraťMaxSoučetPod([-1, 2, 3, -9, 11]) ); // 11
alert( vraťMaxSoučetPod([-2, -1, 1, 2]) ); // 3
alert( vraťMaxSoučetPod([100, -9, 2, -3, 5]) ); // 100
alert( vraťMaxSoučetPod([1, 2, 3]) ); // 6
alert( vraťMaxSoučetPod([-1, -2, -3]) ); // 0
```

Tento algoritmus vyžaduje přesně 1 průchod polem, takže jeho časová složitost je O(n).

Podrobnější informace o algoritmu můžete najít zde: [Maximum subarray problem (Problém maximálního podpole)](http://en.wikipedia.org/wiki/Maximum_subarray_problem). Není-li stále jasné, proč to funguje, potom si prosíme projděte algoritmus na výše uvedených příkladech a podívejte se, jak funguje. Je to lepší než jakákoli slova.
