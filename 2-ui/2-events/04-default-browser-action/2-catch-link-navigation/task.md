importance: 5

---

# Zachytávejte odkazy v elementu

Zajistěte, aby se všechny odkazy v elementu obsahujícím `id="obsah"` zeptaly uživatele, zda opravdu chce odejít. Pokud nebude chtít, prohlížeč na ně nepřejde.

Příklad:

[iframe height=100 border=1 src="solution"]

Podrobnosti:

- HTML kód uvnitř elementu může být kdykoli načten nebo dynamicky generován, nemůžeme tedy najít všechny odkazy a umístit na ně handlery. Použijte delegování událostí.
- Obsah může obsahovat vnořené značky, a to i uvnitř odkazů, např. `<a href=".."><i>...</i></a>`.
