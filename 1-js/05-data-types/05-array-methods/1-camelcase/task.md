importance: 5

---

# Změňte border-left-width na borderLeftWidth

Napište funkci `camelizace(řetězec)`, která změní slova oddělená pomlčkou, např. „můj-krátký-řetězec“, na velbloudí notaci „můjKrátkýŘetězec“.

To znamená, že odstraní všechny pomlčky a u všech slov za pomlčkami změní první písmeno na velké.

Příklad:

```js
camelizace("background-color") == 'backgroundColor';
camelizace("list-style-image") == 'listStyleImage';
camelizace("-webkit-transition") == 'WebkitTransition';
```

P.S. Rada: použijte `split` pro rozdělení řetězce na pole, přeměňte je a spojte zpět pomocí `join`.
