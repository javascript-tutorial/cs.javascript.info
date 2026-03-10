importance: 5

---

# „Chytrý“ tooltip

Napište funkci, která zobrazí tooltip nad elementem, jen když návštěvník přesune ukazatel myši *na něj*, ale ne *přes něj*.

Jinými slovy, jestliže návštěvník přesune ukazatel nad element a zastaví se tam, tooltip se zobrazí. Ale pokud jen přesune myš přes element jinam, pak to není třeba -- kdo by chtěl další blikání?

Technicky můžeme změřit rychlost ukazatele nad elementem, a pokud je nízká, pak předpokládáme, že ukazatel vstoupil „na element“ a zobrazíme tooltip. Pokud je vysoká, budeme ukazatel ignorovat.

Vytvořte k tomu univerzální objekt `new Setrvání(možnosti)`.

Jeho `možnosti`:
- `elem` -- sledovaný element.
- `over` -- funkce, která bude volána, když ukazatel vstoupí na element, tedy když se nad ním pohybuje pomalu nebo se na něm zastavil.
- `out` -- funkce, která bude volána, když ukazatel opustí element (pokud byla předtím volána `over`).

Příklad použití takového objektu s tooltipem:

```js
// příklad tooltipu
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// objekt bude sledovat myš a volat over/out
new Setrvání({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

Demo:

[iframe src="solution" height=140]

Jestliže pohybujete myší nad „hodinami“ rychle, nic se neděje. Pokud jí pohybujete pomalu nebo se nad nimi zastavíte, zobrazí se tooltip.

Prosíme všimněte si, že tooltip „neblikne“, když se kurzor přesune mezi podelementy hodin.
