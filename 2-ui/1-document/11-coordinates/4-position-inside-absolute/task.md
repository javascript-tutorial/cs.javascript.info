importance: 5

---

# Umístěte poznámku dovnitř (absolutně)

Rozšiřte předchozí úlohu <info:task/position-at-absolute>: naučte funkci `umístiNa(kotva, pozice, elem)` vložit `elem` dovnitř elementu `kotva`.

Nové hodnoty argumentu `pozice`:

- `nahoru-ven`, `doprava-ven`, `dolů-ven` -- fungují stejně jako dříve, vloží `elem` nad/doprava/pod element `kotva`.
- `nahoru-dovnitř`, `doprava-dovnitř`, `dolů-dovnitř` -- vloží `elem` dovnitř elementu `kotva`: připevní jej k hornímu/pravému/dolnímu okraji.

Příklad:

```js
// zobrazí poznámku nad citátem
umístiNa(blockquote, "nahoru-ven", poznámka);

// zobrazí poznámku uvnitř citátu nahoře
umístiNa(blockquote, "nahoru-dovnitř", poznámka);
```

Výsledek:

[iframe src="solution" height="310" border="1" link]

Jako zdrojový kód použijte řešení úlohy <info:task/position-at-absolute>.
