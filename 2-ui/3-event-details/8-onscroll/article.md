# Rolování

Na rolování stránky nebo elementu nám umožňuje reagovat událost `scroll`. Můžeme s ní provádět některé opravdu pěkné věci.

Například:
- Zobrazit nebo skrýt další ovládací prvky nebo informace podle toho, kde v dokumentu se uživatel nachází.
- Načíst další data, když uživatel doroluje na konec stránky.

Následující malá funkce zobrazuje aktuální délku rolování:

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('ukažRolování').innerHTML = window.pageYOffset + 'px';
});
```

```online
V akci:

Aktuální rolování = <b id="ukažRolování">rolování okna</b>
```

Událost `scroll` funguje dobře na `window` i na rolovatelných elementech.

## Zákaz rolování

Jak zakážeme, aby něco mohlo být rolováno?

Nemůžeme zakázat rolování voláním `událost.preventDefault()` v posluchači `onscroll`, protože ten se spustí až *poté*, co k rolování skutečně dojde.

Můžeme však zakázat rolování voláním `událost.preventDefault()` na události, která rolování způsobila, například na události `keydown` pro `key:pageUp` a `key:pageDown`.

Jestliže přidáme handler k těmto událostem a v něm zavoláme `událost.preventDefault()`, rolování se nespustí.

Způsobů, jak vyvolat rolování, je mnoho, proto je spolehlivější použít vlastnost `overflow` v CSS.

Následuje několik úloh, které můžete vyřešit nebo se na ně podívat, abyste viděli, jak se `onscroll` aplikuje.
