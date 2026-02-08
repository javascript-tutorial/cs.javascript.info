importance: 5

---

# Editace TD po kliknutí

Umožněte editaci buněk v tabulce po kliknutí.

- Po kliknutí by se buňka měla stát „editovatelnou“ (uvnitř se objeví textová plocha), můžeme měnit HTML kód. Neměla by změnit velikost, veškerá geometrie by měla zůstat stejná.
- Pod buňkou se objeví tlačítka OK a STORNO pro ukončení/zrušení editace.
- Může být editována pouze jedna buňka současně. Dokud je `<td>` v „editačním režimu“, kliknutí na ostatní buňky bude ignorováno.
- Tabulka může obsahovat mnoho buněk. Použijte delegování událostí.

Demo:

[iframe src="solution" height=400]
